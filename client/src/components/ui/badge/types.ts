import type { UI_Color, UI_Size, UI_Variant } from "@styles";

export interface BadgeProps extends React.ComponentPropsWithoutRef<"span"> {
  size?: UI_Size;
  variant?: UI_Variant;
  color?: UI_Color;
  className?: string;
  children?: React.ReactNode;
  rounded?: boolean;
}
