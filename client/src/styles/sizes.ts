import type { UI_Size } from "./_styles";

export const sizeClasses: Record<UI_Size, string> = {
  xxs: "text-xs px-1 py-1",
  xs: "text-xs px-2 py-1",
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-2.5",
  xl: "text-xl px-6 py-3",
};

export const badgeSizeClasses: Record<UI_Size, string> = {
  xxs: "text-xs px-1.5 py-0.5",
  xs: "text-xs px-2 py-0.5",
  sm: "text-sm px-2.5 py-0.5",
  md: "text-base px-3 py-1",
  lg: "text-lg px-3.5 py-1.5",
  xl: "text-xl px-4 py-2",
};

export const inputSizeClasses: Record<UI_Size, string> = {
  xxs: "text-xs px-2 py-1",
  xs: "text-xs px-3 py-1.5",
  sm: "text-sm px-4 py-2",
  md: "text-base px-4 py-2.5",
  lg: "text-lg px-4 py-3",
  xl: "text-xl px-5 py-4",
};
