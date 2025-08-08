import type { NativeButtonProps } from "../ui/button/types";

export type AlertType = "info" | "success" | "warning" | "error" | "confirm";

export interface AlertOptions {
  type?: AlertType;
  message: string;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  duration?: number;
  autoDismiss?: boolean;
  confirmButtonProps?: Omit<NativeButtonProps, "onClick">;
  cancelButtonProps?: Omit<NativeButtonProps, "onClick">;
  closeButtonProps?: Omit<NativeButtonProps, "onClick">;
}

export type AlertProps = {
  alert: AlertOptions;
  onClose: () => void;
};
