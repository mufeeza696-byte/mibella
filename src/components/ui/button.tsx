import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer shadow-xs active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#6B1E2D] text-[#F8F1E7] hover:bg-[#822436] shadow-sm hover:shadow-md",
        secondary:
          "bg-[#F8F1E7] text-[#6B1E2D] border border-[#E0CEB7] hover:bg-[#E8D8C3] shadow-xs",
        outline:
          "border border-[#6B1E2D]/30 bg-transparent text-[#6B1E2D] hover:bg-[#6B1E2D] hover:text-[#F8F1E7]",
        ghost:
          "text-[#6B1E2D] hover:bg-[#E8D8C3]/50 hover:text-[#6B1E2D]",
        gold:
          "bg-gradient-to-r from-[#C5A880] to-[#DFCAAB] text-[#501521] font-semibold hover:opacity-95 shadow-sm",
        link: "text-[#6B1E2D] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-12 rounded-full px-8 text-base tracking-wide",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
