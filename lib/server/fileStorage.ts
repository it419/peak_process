import "server-only";
import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

/**
 * Local-disk file storage for resumes/other application documents. Lives
 * under a private `storage/` directory at the project root (gitignored,
 * never under `public/`) — the only read path is an authenticated admin
 * route (lib/server/applicationRepository.ts + the download API route),
 * never a direct URL. Swappable for real object storage later (e.g. Vercel
 * Blob) without changing callers: they only ever see `storagePath` +
 * `readStoredFile`/`saveUploadedFile`.
 */

const STORAGE_ROOT = path.resolve(process.cwd(), "storage");

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-150) || "file";
}

function assertWithinStorageRoot(absolutePath: string): void {
  const resolved = path.resolve(absolutePath);
  if (resolved !== STORAGE_ROOT && !resolved.startsWith(STORAGE_ROOT + path.sep)) {
    throw new Error("Invalid file path");
  }
}

export interface SavedFileMeta {
  storagePath: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

/** Writes an uploaded file under `storage/<subdir>/<uuid>-<name>`, returning DB-ready metadata. */
export async function saveUploadedFile(file: File, subdir: string): Promise<SavedFileMeta> {
  const safeName = sanitizeFileName(file.name);
  const relativePath = path.join(subdir, `${randomUUID()}-${safeName}`);
  const absolutePath = path.join(STORAGE_ROOT, relativePath);
  assertWithinStorageRoot(absolutePath);

  await mkdir(path.dirname(absolutePath), { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(absolutePath, buffer);

  return {
    storagePath: relativePath.split(path.sep).join("/"),
    fileName: file.name || safeName,
    fileSize: file.size,
    mimeType: file.type || "application/octet-stream",
  };
}

/** Reads a previously-saved file back into memory for an authenticated download route to stream. */
export async function readStoredFile(storagePath: string): Promise<Buffer> {
  const absolutePath = path.resolve(STORAGE_ROOT, storagePath);
  assertWithinStorageRoot(absolutePath);
  return readFile(absolutePath);
}
