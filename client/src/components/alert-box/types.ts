export type Variant = "success" | "error" | "warning" | "info";

export interface AlertBoxProps {
  variant?: Variant;
  title?: string;
  message?: string;
  showClose?: boolean;
  className?: string;
}
