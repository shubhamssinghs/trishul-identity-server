import React from "react";
import type { ScreenLoaderProps } from "./types";
import type { UI_Color, UI_Size } from "@styles";

const SIZE_CLASSES: Record<UI_Size, string> = {
  xxs: "w-4 h-4",
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

const COLOR_CLASSES: Record<UI_Color, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  neutral: "text-neutral",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  light: "text-light",
};

export const ScreenLoader: React.FC<ScreenLoaderProps> = ({
  hideLabel = false,
  size = "md",
  color = "primary",
}) => {
  const sizeClass = SIZE_CLASSES[size];
  const colorClass = COLOR_CLASSES[color];

  return (
    <div className="flex items-center justify-center">
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex flex-col justify-center items-center space-y-1 max-w-64">
          <img
            src="/loader.svg"
            alt="Loading…"
            className={`object-contain ${sizeClass} ${colorClass} fill-current`}
          />
          {!hideLabel && (
            <span
              className={`
                font-semibold text-lg 
                ${
                  color !== "light"
                    ? colorClass
                    : "text-gray-200 dark:text-gray-700"
                }
              `}
            >
              Loading...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
