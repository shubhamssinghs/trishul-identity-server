import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { buttonVariantClasses, type UI_Size } from "@styles";
import type { BadgeProps } from "./types";

const sizeClasses: Record<UI_Size, string> = {
  xxs: "text-xs px-2 py-0.5",
  xs: "text-xs px-1 py-0",
  sm: "text-sm px-2.5 py-0.5",
  md: "text-base px-3 py-1",
  lg: "text-lg px-3.5 py-1.5",
  xl: "text-xl px-4 py-2",
};

export const Badge: React.FC<BadgeProps> = ({
  size = "sm",
  variant = "solid",
  color = "primary",
  className,
  children,
  rounded = true,
  ...rest
}) => {
  const classes = twMerge(
    clsx(
      "inline-flex items-center font-medium whitespace-nowrap gap-1",
      sizeClasses[size],
      buttonVariantClasses(variant, color, true),
      rounded ? "rounded-full" : "rounded",
      className
    )
  );

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};
