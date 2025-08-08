import type { UI_Color, UI_Size, UI_Variant } from "./_styles";

export const toggleKnobSizes: Record<
  UI_Size,
  { wrapper: string; knob: string; translate: string }
> = {
  xs: { wrapper: "w-10 h-5", knob: "w-3 h-3", translate: "translate-x-5" },
  sm: { wrapper: "w-11 h-6", knob: "w-4 h-4", translate: "translate-x-5" },
  md: { wrapper: "w-12 h-7", knob: "w-5 h-5", translate: "translate-x-5" },
  lg: { wrapper: "w-14 h-8", knob: "w-6 h-6", translate: "translate-x-6" },
  xl: { wrapper: "w-16 h-9", knob: "w-7 h-7", translate: "translate-x-7" },
  xxs: {
    wrapper: "w-8 h-4",
    knob: "w-2.5 h-2.5",
    translate: "translate-x-[0.9rem]",
  },
};

export const toggleFallbackBg: Record<UI_Color, Record<UI_Variant, string>> = {
  primary: {
    solid: "bg-primary",
    outline: "border-2 border-primary bg-transparent",
    ghost: "bg-primary/10",
  },
  secondary: {
    solid: "bg-secondary",
    outline: "border-2 border-secondary bg-transparent",
    ghost: "bg-secondary/10",
  },
  accent: {
    solid: "bg-accent",
    outline: "border-2 border-accent bg-transparent",
    ghost: "bg-accent/10",
  },
  neutral: {
    solid: "bg-neutral",
    outline: "border-2 border-neutral bg-transparent",
    ghost: "bg-neutral/10",
  },
  success: {
    solid: "bg-success",
    outline: "border-2 border-success bg-transparent",
    ghost: "bg-success/10",
  },
  warning: {
    solid: "bg-warning",
    outline: "border-2 border-warning bg-transparent",
    ghost: "bg-warning/10",
  },
  error: {
    solid: "bg-error",
    outline: "border-2 border-error bg-transparent",
    ghost: "bg-error/10",
  },
  light: {
    solid: "bg-menu_hover",
    outline: "border border-border bg-transparent",
    ghost: "bg-border/10",
  },
};
