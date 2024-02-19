import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  buttonType?: string;
  variant: "primary" | "danger" | "cancel";
}

const buttonVariants = cva(
  `p-2.5 px-5 text-[0.875rem] flex items-center gap-3 btn-neutral hover:border-neutral-400 rounded-md font-medium text-white hover:bg-neutral-700 hover:text-white`,
  {
    variants: {
      variant: {
        primary: "bg-primary_green",
        danger: "bg-red-400",
        cancel:
          "bg-white border text-neutral-800 border-primary_green hover:bg-neutral-50  hover:text-neutral-700",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className,
  variant,
  ...props
}) => {
  return (
    <button
      type={props.buttonType as "submit" | "reset" | "button" | undefined}
      className={cn(buttonVariants({ className, variant }))}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
