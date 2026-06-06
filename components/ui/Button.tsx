import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary-hover shadow-neon-sm hover:shadow-neon active:scale-[0.98]",
      secondary:
        "bg-background-elevated text-text-primary hover:bg-border-light border border-border",
      outline:
        "border-2 border-primary text-primary hover:bg-primary/10 active:scale-[0.98]",
      ghost: "text-text-secondary hover:text-primary hover:bg-primary/10",
      whatsapp:
        "bg-[#25D366] text-white hover:bg-[#20BD5A] shadow-md active:scale-[0.98]",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm gap-1.5",
      md: "h-11 px-6 text-sm gap-2",
      lg: "h-12 px-8 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
