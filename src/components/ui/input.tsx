import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-full border border-[#E0CEB7] bg-[#F8F1E7] px-4 py-2 text-sm text-[#6B1E2D] placeholder:text-[#8C3A4B]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1E2D] focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
