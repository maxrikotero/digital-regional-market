import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      children,
      disabled,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const variants = {
      primary:
        "bg-primary text-primary-foreground hover:opacity-90 active:scale-95",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95",
      outline:
        "border border-input bg-background hover:bg-accent/10 hover:text-accent-foreground active:scale-95",
      ghost: "hover:bg-accent/10 hover:text-accent-foreground active:scale-95",
      danger:
        "bg-accent text-accent-foreground hover:opacity-90 active:scale-95",
    };

    const sizes = {
      sm: "h-9 px-3 text-xs",
      md: "h-11 px-4 py-2", // 44px minimum touch target compliance
      lg: "h-14 px-8 text-lg",
      icon: "h-11 w-11",
    };

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {/* Slot must have exactly one child. If asChild is true, we strictly pass children.
            If we want loading state with asChild, the structure needs to be different or user must handle it. */}
        {asChild ? (
          children
        ) : (
          <>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
