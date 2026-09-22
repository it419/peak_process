-- Peak Process Partners — Onboarding Platform
-- Schema for: MySQL 8.0.16+ (needs CHECK constraint support + JSON/REGEXP_LIKE)
-- Charset: utf8mb4 throughout (names, addresses, etc. may contain non-ASCII text).
--
-- Design principles applied throughout this file:
--   1. A row exists in a step's table only once that step has been saved at
--      least once. Absence of a row = "not started"; a row with some NULL
--      columns = "in progress"; all required columns populated = "complete".
--      This mirrors the frontend's own step-status logic (lib/onboarding/
--      completion.ts), which derives status from data presence/validity
--      rather than from a separately-stored flag — same approach here, so
--      there is nothing to keep in sync.
--   2. No `onboarding_steps`, `onboarding_checklist`, `document_requirements`,
--      or `users`/admin tables. The 7-step flow and the 5 document types are
--      fixed, hardcoded application config (lib/onboarding/steps.config.ts,
--      lib/onboarding/documents.config.ts) with zero DB-driven behavior
--      anywhere in the current app — adding tables for them would be state
--      with no reader. Document types are instead enforced as a MySQL ENUM.
--      There is currently no HR/admin UI in the app at all, so no admin
--      accounts table is created; see the accompanying write-up for how to
--      extend this later without a schema rewrite.
--   3. No `current_step` or `completion_percentage` columns. Both are cheap,
--      deterministic functions of the data already in these tables (exactly
--      what lib/onboarding/completion.ts already computes client-side from
--      the same shape) — storing them would just be a second source of
--      truth that can drift. Compute them server-side the same way.
--   4. Aadhaar / PAN / UAN are stored as application-layer AES-256-GCM
--      ciphertext (VARBINARY), never as plaintext columns. See the
--      accompanying write-up's Security section for the full reasoning on
--      what is and isn't encrypted and why.
--
-- Gotcha verified against a real server, worth knowing before writing your
-- own raw SQL against these tables: on MariaDB 10.4, `DEFAULT (UUID())`
-- (used below on every non-employees primary key) evaluates to an empty
-- string — not a fresh UUID per row — inside a multi-row
-- `INSERT ... VALUES (...), (...)` statement, which then fails on the
-- primary key. Provide `id` explicitly for multi-row inserts (see
-- db/seed.sql for the pattern) or insert one row at a time. The
-- application itself never hits this: Prisma generates each id
-- client-side rather than relying on this column default.

SET NAMES utf8mb4;

-- ============================================================================
-- employees
-- One row per onboarding session. This is the anchor/identity row: it is
-- created the first time a browser hits the app (before any form data
-- exists), identified by an httpOnly session cookie — there is no login in
-- the current app, so this row *is* the "user" for now.
-- ============================================================================
CREATE TABLE employees (
    id                   CHAR(36)      NOT NULL DEFAULT (UUID()),
    session_token        CHAR(36)      NOT NULL DEFAULT (UUID()),
    full_name            VARCHAR(255)  NULL,
    status               ENUM('in_progress', 'submitted') NOT NULL DEFAULT 'in_progress',
    submission_reference VARCHAR(32)   NULL,
    submitted_at         DATETIME(3)   NULL,
    created_at           DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at           DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    PRIMARY KEY (id),
    UNIQUE KEY uq_employees_session_token (session_token),
    UNIQUE KEY uq_employees_submission_reference (submission_reference),
    CONSTRAINT chk_employees_submitted_consistency CHECK (
        (status = 'submitted' AND submitted_at IS NOT NULL AND submission_reference IS NOT NULL)
        OR
        (status = 'in_progress' AND submitted_at IS NULL AND submission_reference IS NULL)
    )
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ============================================================================
-- personal_information  (1:1 with employees — "Personal Information" step)
-- ============================================================================
CREATE TABLE personal_information (
    employee_id    CHAR(36)      NOT NULL,
    first_name     VARCHAR(100)  NULL,
    last_name      VARCHAR(100)  NULL,
    date_of_birth  DATE          NULL,
    gender         ENUM('female', 'male', 'non-binary', 'prefer-not-to-say') NULL,
    personal_email VARCHAR(255)  NULL,
    phone          VARCHAR(20)   NULL,
    home_address   VARCHAR(500)  NULL,

    -- AES-256-GCM ciphertext (12-byte IV + ciphertext + 16-byte auth tag),
    -- produced by lib/security/encryption.ts. Never written or read as
    -- plaintext SQL. Sized generously since ciphertext is a few bytes
    -- longer than the plaintext.
    aadhaar_number_enc VARBINARY(255) NULL,
    pan_number_enc     VARBINARY(255) NULL,
    uan_number_enc     VARBINARY(255) NULL,

    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    PRIMARY KEY (employee_id),
    CONSTRAINT fk_personal_information_employee
        FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE,
    CONSTRAINT chk_personal_information_email CHECK (
        personal_email IS NULL OR personal_email REGEXP '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'
    ),
    CONSTRAINT chk_personal_information_phone CHECK (
        phone IS NULL OR phone REGEXP '^\\+?[0-9 -]{10,15}$'
    )
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ============================================================================
-- employee_references  (1:many, but exactly two fixed slots — "References" step)
-- The app only ever writes a "primary" and a "secondary" reference (see
-- lib/schemas/references.schema.ts) — not an open-ended list — so this is
-- modeled as a typed child row rather than five flat columns per slot,
-- which stays normalized while still enforcing "at most one of each type"
-- via the unique key below.
-- ============================================================================
CREATE TABLE employee_references (
    id              CHAR(36)     NOT NULL DEFAULT (UUID()),
    employee_id     CHAR(36)     NOT NULL,
    reference_type  ENUM('primary', 'secondary') NOT NULL,
    name            VARCHAR(150) NULL,
    relationship    VARCHAR(100) NULL,
    company         VARCHAR(150) NULL,
    email           VARCHAR(255) NULL,
    phone           VARCHAR(20)  NULL,
    created_at      DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at      DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    PRIMARY KEY (id),
    UNIQUE KEY uq_employee_references_type (employee_id, reference_type),
    CONSTRAINT fk_employee_references_employee
        FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE,
    CONSTRAINT chk_employee_references_email CHECK (
        email IS NULL OR email REGEXP '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'
    ),
    CONSTRAINT chk_employee_references_phone CHECK (
        phone IS NULL OR phone REGEXP '^\\+?[0-9 -]{10,15}$'
    )
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE INDEX idx_employee_references_employee ON employee_references (employee_id);

-- ============================================================================
-- emergency_contacts  (1:1 — "Emergency Contact" step)
-- ============================================================================
CREATE TABLE emergency_contacts (
    employee_id           CHAR(36)     NOT NULL,
    name                  VARCHAR(150) NULL,
    relationship          VARCHAR(100) NULL,
    primary_phone         VARCHAR(20)  NULL,
    secondary_phone       VARCHAR(20)  NULL,
    same_as_home_address  BOOLEAN      NOT NULL DEFAULT FALSE,
    address               VARCHAR(500) NULL,
    created_at            DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at            DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    PRIMARY KEY (employee_id),
    CONSTRAINT fk_emergency_contacts_employee
        FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE,
    CONSTRAINT chk_emergency_contacts_phone CHECK (
        primary_phone IS NULL OR primary_phone REGEXP '^\\+?[0-9 -]{10,15}$'
    ),
    CONSTRAINT chk_emergency_contacts_secondary_phone CHECK (
        secondary_phone IS NULL OR secondary_phone REGEXP '^\\+?[0-9 -]{10,15}$'
    ),
    -- Mirrors the frontend's cross-field rule (emergencyContact.schema.ts):
    -- an address is required unless "same as home address" is checked.
    CONSTRAINT chk_emergency_contacts_address CHECK (
        same_as_home_address = TRUE OR address IS NULL OR CHAR_LENGTH(TRIM(address)) >= 10
    )
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ============================================================================
-- health_insurance  (1:1 — "Health Insurance" step, coverage + nominee)
-- ============================================================================
CREATE TABLE health_insurance (
    employee_id           CHAR(36)     NOT NULL,
    coverage_type         ENUM('self', 'self-spouse', 'self-family') NULL,
    nominee_name          VARCHAR(150) NULL,
    nominee_relationship  VARCHAR(100) NULL,
    created_at            DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at            DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    PRIMARY KEY (employee_id),
    CONSTRAINT fk_health_insurance_employee
        FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- ============================================================================
-- health_insurance_dependents  (1:many — up to 5 per employee)
-- The "up to 5" rule (healthInsurance.schema.ts: z.array(dependentSchema).max(5))
-- is a cross-row cardinality rule, which MySQL CHECK constraints cannot
-- express (they validate a single row, not an aggregate over siblings) —
-- enforce it in the API route alongside the existing Zod validation.
-- ============================================================================
CREATE TABLE health_insurance_dependents (
    id             CHAR(36)     NOT NULL DEFAULT (UUID()),
    employee_id    CHAR(36)     NOT NULL,
    name           VARCHAR(150) NOT NULL,
    relationship   VARCHAR(100) NOT NULL,
    date_of_birth  DATE         NOT NULL,
    created_at     DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (id),
    CONSTRAINT fk_health_insurance_dependents_health_insurance
        FOREIGN KEY (employee_id) REFERENCES health_insurance (employee_id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE INDEX idx_health_insurance_dependents_employee ON health_insurance_dependents (employee_id);

-- ============================================================================
-- employee_documents  ("Documents" step — one row per document type per employee)
-- document_type is a fixed enum matching lib/onboarding/documents.config.ts's
-- five ids exactly (identityProof, addressProof, resume,
-- educationalCertificates, offerLetter). File bytes are NOT stored here —
-- only metadata; storage_path points at an object-storage key/URL (see
-- write-up for the recommended Vercel Blob integration, not yet wired).
-- ============================================================================
CREATE TABLE employee_documents (
    id             CHAR(36) NOT NULL DEFAULT (UUID()),
    employee_id    CHAR(36) NOT NULL,
    document_type  ENUM('identityProof', 'addressProof', 'resume', 'educationalCertificates', 'offerLetter') NOT NULL,
    file_name      VARCHAR(255) NULL,
    file_size      INT UNSIGNED NULL COMMENT 'bytes',
    mime_type      VARCHAR(127) NULL,
    storage_path   VARCHAR(1024) NULL COMMENT 'object storage key/URL once wired up; NULL for offerLetter and while pending',
    status         ENUM('pending', 'uploading', 'uploaded', 'error', 'provided') NOT NULL DEFAULT 'pending',
    error_message  VARCHAR(500) NULL,
    uploaded_at    DATETIME(3) NULL,
    created_at     DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at     DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    PRIMARY KEY (id),
    UNIQUE KEY uq_employee_documents_type (employee_id, document_type),
    CONSTRAINT fk_employee_documents_employee
        FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE,
    CONSTRAINT chk_employee_documents_uploaded CHECK (
        status NOT IN ('uploaded', 'provided') OR (file_name IS NOT NULL AND uploaded_at IS NOT NULL)
    )
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE INDEX idx_employee_documents_employee ON employee_documents (employee_id);
