import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

import { buttonVariantClasses, type UI_Size } from "@styles";
import type { AnchorProps, ButtonProps, RouterLinkProps } from "./types";

const sizeClasses: Record<UI_Size, string> = {
  xxs: "text-xs px-2 py-1",
  xs: "text-xs px-3 py-1.5",
  sm: "text-sm px-3 py-2",
  md: "text-base px-4 py-2.5",
  lg: "text-lg px-4 py-3",
  xl: "text-xl px-5 py-3.5",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = "sm",
      variant = "solid",
      color = "primary",
      className,
      disabled,
      children,
      as = "button",
      ...props
    },
    ref
  ) => {
    const classes = twMerge(
      clsx(
        "rounded-box font-medium transition duration-150 ease-in-out",
        "focus:outline-none ",
        sizeClasses[size],
        buttonVariantClasses(variant, color),
        {
          "opacity-50 cursor-not-allowed": disabled,
        },
        className
      )
    );

    if (as === "link") {
      const linkProps = props as RouterLinkProps;
      return (
        <Link
          className={classes}
          {...linkProps}
          onClick={(e) => {
            if (disabled) e.preventDefault();
            linkProps.onClick?.(e);
          }}
        >
          {children}
        </Link>
      );
    }

    if (as === "anchor") {
      const anchorProps = props as AnchorProps;
      return (
        <a
          className={classes}
          {...anchorProps}
          onClick={(e) => {
            if (disabled) e.preventDefault();
            anchorProps.onClick?.(e);
          }}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : anchorProps.tabIndex}
        >
          {children}
        </a>
      );
    }

    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        className={classes}
        disabled={disabled}
        ref={ref}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
