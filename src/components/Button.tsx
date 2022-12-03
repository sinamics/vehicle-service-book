import { type VariantProps, cva } from "class-variance-authority";
import type { HTMLAttributes } from "react";

const button = cva(["uppercase"], {
  variants: {
    intent: {
      primary: [
        "bg-blue-500",
        "text-white",
        "border-blue-500",
        "hover:bg-blue-600",
        "focus:bg-blue-200",
      ],
      info: [
        "bg-blue-500",
        "text-white",
        "border-blue-500",
        "hover:bg-blue-600",
        "focus:bg-blue-200",
      ],
      success: [
        "bg-green-500",
        "text-white",
        "border-green-500",
        "hover:bg-green-600",
        "focus:bg-green-200",
      ],
      warning: [
        "bg-yellow-500",
        "text-white",
        "border-yellow-500",
        "hover:bg-yellow-600",
        "focus:bg-yellow-200",
      ],
      danger: [
        "bg-red-500",
        "text-white",
        "border-red-500",
        "hover:bg-red-600",
        "focus:bg-red-200",
      ],
    },
    style: {
      outline: ["border", "border-gray-400", "hover:border-gray-500"],
      solid: ["border-none"],
    },
    radius: {
      none: ["rounded-none"],
      sm: ["rounded-sm"],
      md: ["rounded-md"],
      lg: ["rounded-lg"],
      full: ["rounded-full"],
    },
    size: {
      xs: ["py-2", "px-3", "text-xs", "font-medium"],
      sm: ["py-2", "px-3", "text-sm", "font-medium"],
      md: ["py-2.5", "px-5", "text-sm", "font-medium"],
      lg: ["py-3", "px-5", "text-base", "font-medium"],
      xl: ["py-3.5", "px-6", "text-base", "font-medium"],
    },
  },
  defaultVariants: {
    intent: "primary",
    style: "solid",
    radius: "lg",
    size: "md",
  },
});

type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & {
    children: React.ReactNode;
  };

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  style,
  radius,
  size,
  ...props
}) => {
  return (
    <button
      className={button({ intent, size, style, radius, className })}
      {...props}
    />
  );
};
