import type { UI_Color, UI_Size, UI_Variant } from "@styles";

import type { ButtonHTMLAttributes } from "react";

export type ConflictingKeys =
  | "color"
  | "size"
  | "disabled"
  | "onChange"
  | "className"
  | "children";

export type BackgroundColorProps = {
  active?: string;
  inactive?: string;
};

export interface CommonProps {
  isActive: boolean;
  onToggleChange: (active: boolean) => void;
  size?: UI_Size;
  variant?: UI_Variant;
  color?: UI_Color;
  backgroundColor?: BackgroundColorProps;
  className?: string;
  disabled?: boolean;
}

export type SafeButtonDOMProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  ConflictingKeys | keyof CommonProps | "renderKnobIcon"
>;

export interface KnobToggleProps extends CommonProps, SafeButtonDOMProps {
  as: "knob";
  renderKnobIcon?: (isActive: boolean) => React.ReactNode;
}

export interface ButtonToggleProps extends CommonProps, SafeButtonDOMProps {
  as: "button";
  children?: React.ReactNode;
}

export type ToggleButtonProps = KnobToggleProps | ButtonToggleProps;
