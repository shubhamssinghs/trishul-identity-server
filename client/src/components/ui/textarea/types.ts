import type { UI_Color, UI_Size, UI_Variant } from "@styles";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  size?: UI_Size;
  variant?: UI_Variant;
  color?: UI_Color;
  isInvalid?: boolean;
  isSuccess?: boolean;
  errorMessage?: string;
  successMessage?: string;
  className?: string;
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  rows?: number;
}
