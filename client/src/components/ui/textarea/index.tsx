import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { inputVariantClasses, type UI_Color, type UI_Size } from "@styles";
import type { TextareaProps } from "./types";

const textareaSizeClasses: Record<UI_Size, string> = {
  xxs: "text-xs px-2 py-1",
  xs: "text-xs px-3 py-1.5",
  sm: "text-sm px-3 py-2",
  md: "text-base px-4 py-2.5",
  lg: "text-lg px-4 py-3",
  xl: "text-xl px-5 py-3.5",
};

export const Textarea: React.FC<TextareaProps> = ({
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
  rows = 3,
  ...rest
}) => {
  const validationColor: UI_Color = isInvalid
    ? "error"
    : isSuccess
    ? "success"
    : color;

  const textareaClasses = twMerge(
    clsx(
      "w-full rounded-box transition duration-150 ease-in-out",
      textareaSizeClasses[size],
      inputVariantClasses(variant, validationColor),
      className
    )
  );

  return (
    <div className={twMerge(wrapperClassName)}>
      {label && (
        <label
          htmlFor={rest.name}
          className={twMerge(
            "block text-sm font-medium text-base-content dark:text-text-dark mb-1",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <textarea
        id={rest.name}
        className={textareaClasses}
        rows={rows}
        aria-invalid={isInvalid}
        {...rest}
      />
      {isInvalid && errorMessage && (
        <p className="!text-error text-xs mt-1">{errorMessage}</p>
      )}
      {isSuccess && successMessage && (
        <p className="!text-success text-xs mt-1">{successMessage}</p>
      )}
    </div>
  );
};
