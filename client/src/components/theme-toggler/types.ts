import type { KnobToggleProps } from "../ui/toggle-button/types";

export interface ThemeTogglerProps
  extends Omit<
    KnobToggleProps,
    "as" | "isActive" | "onToggleChange" | "renderKnobIcon"
  > {
  className?: string;
}
