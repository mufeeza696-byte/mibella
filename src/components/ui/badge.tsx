import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 tracking-wide uppercase",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#6B1E2D] text-[#F8F1E7] shadow-xs",
        secondary:
          "border-[#E0CEB7] bg-[#E8D8C3] text-[#6B1E2D]",
        cream:
          "border-[#E0CEB7] bg-[#F8F1E7] text-[#6B1E2D]",
        gold:
          "border-[#C5A880]/40 bg-[#EBDDC8] text-[#501521] font-semibold",
        outline: "border-[#6B1E2D]/40 text-[#6B1E2D]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
