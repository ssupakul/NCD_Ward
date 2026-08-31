import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 min-h-11 px-4 text-sm font-medium rounded-lg transition-opacity transition-transform disabled:pointer-events-none disabled:opacity-40 active:opacity-80",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-foreground",
        secondary:
          "bg-surface-2 text-foreground shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
        ghost: "text-muted hover:text-foreground hover:bg-surface-2",
        ink: "bg-paper-foreground text-paper",
        danger: "bg-danger text-paper",
      },
      size: {
        default: "min-h-11 px-4",
        sm: "min-h-10 px-3 text-sm",
        lg: "min-h-12 px-5",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
