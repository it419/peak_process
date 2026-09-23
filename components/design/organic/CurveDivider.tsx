import { cn } from "@/lib/utils/cn";

interface CurveDividerProps {
  /** CSS color value the curve is filled with — usually the section it flows out of. */
  fill: string;
  flip?: boolean;
  className?: string;
}

/** The signature Organic-design device: an asymmetric SVG wave that bridges
 *  two sections instead of a hard rule. Height comes entirely from
 *  `className`; `preserveAspectRatio="none"` lets it stretch full-width at
 *  any viewport with zero horizontal overflow. */
export function CurveDivider({ fill, flip = false, className }: CurveDividerProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none w-full overflow-hidden leading-[0]", className)}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className={cn("block h-full w-full", flip && "rotate-180")}
      >
        <path
          d="M0,38 C170,88 300,2 470,24 C650,46 760,96 955,58 C1145,22 1300,68 1440,34 L1440,100 L0,100 Z"
          style={{ fill }}
        />
      </svg>
    </div>
  );
}
