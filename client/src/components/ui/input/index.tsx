import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { inputVariantClasses, type UI_Color, type UI_Size } from "@styles";
import type { InputProps } from "./types";

const inputSizeClasses: Record<UI_Size, string> = {
  xxs: "text-xs px-2 py-1",
  xs: "text-xs px-3 py-1.5",
  sm: "text-sm px-3 py-2",
  md: "text-base px-4 py-2.5",
  lg: "text-lg px-4 py-3",
  xl: "text-xl px-5 py-3.5",
};

export const Input: React.FC<InputProps> = ({
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
  autoComplete = "off",
  ...rest
}) => {
  const validationColor: UI_Color = isInvalid
    ? "error"
    : isSuccess
    ? "success"
    : color;

  const inputClasses = twMerge(
    clsx(
      "w-full rounded-box outline-none focus:outline-none transition duration-150 ease-in-out",
      inputSizeClasses[size],
      inputVariantClasses(variant, validationColor),
      className,
      rest.type === "color" && "cursor-pointer !px-0.5 !py-0"
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
      <input
        id={rest.name}
        className={inputClasses}
        aria-invalid={isInvalid}
        autoComplete={autoComplete}
        {...rest}
      />
      {isInvalid && errorMessage && (
        <p className="!text-error text-xs mt-1">{errorMessage}</p>
      )}
      {isSuccess && successMessage && (
        <p className="!text-success text-xs">{successMessage}</p>
      )}
    </div>
  );
};
