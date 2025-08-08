import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { inputVariantClasses, type UI_Color, type UI_Size } from "@styles";
import type { CheckboxProps } from "./types";

const checkboxSizeClasses: Record<UI_Size, string> = {
  xxs: "w-3 h-3",
  xs: "w-3.5 h-3.5",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-7 h-7",
};

export const Checkbox: React.FC<CheckboxProps> = ({
  size = "sm",
  variant = "outline",
  color = "light",
  isInvalid = false,
  isSuccess = false,
  errorMessage,
  successMessage,
  className,
  label,
  labelClassName,
  wrapperClassName,
  ...rest
}) => {
  const validationColor: UI_Color = isInvalid
    ? "error"
    : isSuccess
    ? "success"
    : color;

  const checkboxClass = twMerge(
    clsx(
      "form-checkbox rounded transition duration-150 ease-in-out outline-none focus:outline-none",
      checkboxSizeClasses[size],
      inputVariantClasses(variant, validationColor),
      className
    )
  );

  return (
    <div className={twMerge("space-y-1", wrapperClassName)}>
      <label className="inline-flex items-center gap-2">
        <input type="checkbox" className={checkboxClass} {...rest} />
        {label && (
          <span
            className={twMerge(
              "text-sm text-base-content select-none",
              labelClassName
            )}
          >
            {label}
          </span>
        )}
      </label>

      {isInvalid && errorMessage && (
        <p className="!text-error text-xs mt-1">{errorMessage}</p>
      )}
      {isSuccess && successMessage && (
        <p className="!text-success text-xs mt-1">{successMessage}</p>
      )}
    </div>
  );
};
