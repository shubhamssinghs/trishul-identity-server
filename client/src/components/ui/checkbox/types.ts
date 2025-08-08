import type { UI_Color, UI_Size, UI_Variant } from "@styles";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: UI_Size;
  color?: UI_Color;
  variant?: UI_Variant;
  isInvalid?: boolean;
  isSuccess?: boolean;
  errorMessage?: string;
  successMessage?: string;
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  className?: string;
}
