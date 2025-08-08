import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { Button } from "../button";
import { toggleFallbackBg, toggleKnobSizes } from "@styles";
import type {
  ButtonToggleProps,
  CommonProps,
  KnobToggleProps,
  ToggleButtonProps,
} from "./types";

export const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
  const {
    isActive,
    onToggleChange,
    size = "md",
    variant = "solid",
    color = "primary",
    backgroundColor,
    className,
    disabled,
    as,
    ...rest
  } = props;

  const { wrapper, knob, translate } = toggleKnobSizes[size];
  const bgClass = backgroundColor?.[isActive ? "active" : "inactive"];
  const fallbackBg = isActive
    ? toggleFallbackBg[color][variant]
    : "bg-gray-300 dark:bg-gray-600";

  if (as === "knob") {
    const { renderKnobIcon, ...safeRest } = rest as Omit<
      KnobToggleProps,
      keyof CommonProps
    >;

    return (
      <button
        type="button"
        onClick={() => onToggleChange(!isActive)}
        disabled={disabled}
        className={twMerge(
          clsx(
            "relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-container-dark",
            wrapper,
            disabled && "opacity-50 cursor-not-allowed",
            bgClass ?? fallbackBg
          ),
          className
        )}
        {...safeRest}
      >
        <span
          className={clsx(
            "absolute left-1 inline-flex items-center justify-center rounded-full bg-white dark:bg-white/90 text-current shadow transition-transform duration-200 overflow-hidden",
            knob,
            isActive ? translate : "translate-x-0"
          )}
        >
          {renderKnobIcon?.(isActive)}
        </span>
      </button>
    );
  }

  const { children, ...buttonRest } = rest as Omit<
    ButtonToggleProps,
    keyof CommonProps
  >;

  return (
    <Button
      type="button"
      onClick={() => onToggleChange(!isActive)}
      disabled={disabled}
      size={size}
      variant={variant}
      color={color}
      className={twMerge(bgClass ?? fallbackBg, className)}
      {...buttonRest}
    >
      {children}
    </Button>
  );
};
