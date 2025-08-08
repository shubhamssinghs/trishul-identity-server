import React, { useState } from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import type { AlertBoxProps, Variant } from "./types";

const variantStyles: Record<Variant, string> = {
  success: "bg-success/10 text-success border-success/30",
  error: "bg-error/10 text-error border-error/30",
  warning: "bg-warning/10 text-yellow-700 dark:text-warning border-warning/30",
  info: "bg-info/10 text-info border-info/30",
};

const variantIcons: Record<Variant, React.ReactNode> = {
  success: <CheckCircleIcon className="w-5 h-5 text-success" />,
  error: <XCircleIcon className="w-5 h-5 text-error" />,
  warning: (
    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-700 dark:text-warning" />
  ),
  info: <InformationCircleIcon className="w-5 h-5 text-info" />,
};

export const AlertBox: React.FC<AlertBoxProps> = ({
  variant = "info",
  title,
  message,
  showClose = false,
  className = "",
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible || !message) return null;

  return (
    <div
      className={`relative flex items-start gap-2 p-4 border rounded-md ${variantStyles[variant]} ${className}`}
    >
      <div className="shrink-0">{variantIcons[variant]}</div>

      <div className="flex-1">
        {title && <div className="font-semibold mb-0.5">{title}</div>}
        <div className="text-sm">{message}</div>
      </div>

      {showClose && (
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-inherit hover:opacity-80"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
