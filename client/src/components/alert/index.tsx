import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { JSX } from "react";
import ReactDOM from "react-dom";
import { twMerge } from "tailwind-merge";

import { Button } from "@components";
import type { AlertProps } from "./types";
import { useClickOutside } from "@hooks";

const iconMap: Record<string, JSX.Element> = {
  info: (
    <InformationCircleIcon className="w-5 h-5 text-blue-500 dark:text-blue-300" />
  ),
  success: (
    <CheckCircleIcon className="w-5 h-5 text-green-500 dark:text-green-300" />
  ),
  warning: (
    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500 dark:text-yellow-300" />
  ),
  error: (
    <ExclamationCircleIcon className="w-5 h-5 text-red-500 dark:text-red-300" />
  ),
  confirm: (
    <ExclamationTriangleIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
  ),
};

const styleMap: Record<string, string> = {
  info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  warning:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  confirm:
    "bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-white",
};

export const AlertContainer: React.FC<AlertProps> = ({ alert, onClose }) => {
  const {
    type = "info",
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmButtonProps,
    cancelButtonProps,
    closeButtonProps,
  } = alert;

  const ref = useClickOutside<HTMLDivElement>({
    handler: onClose,
    enabled: true,
  });

  const content = (
    <div className="fixed top-0 left-0 z-50 h-screen w-screen flex justify-center items-center bg-backdrop dark:bg-backdrop-dark">
      <div
        ref={ref}
        className={clsx(
          "rounded-lg p-4 shadow-lg flex flex-col gap-3 w-full max-w-md transition-all mx-4",
          styleMap[type]
        )}
      >
        <div className="flex gap-3">
          <div className="shrink-0">{iconMap[type]}</div>
          <div className="flex-grow">
            {title && <div className="font-semibold text-sm">{title}</div>}
            <p className="text-sm mt-1">{message}</p>
          </div>
          {type !== "confirm" && (
            <Button
              {...closeButtonProps}
              variant={closeButtonProps?.variant ?? "ghost"}
              className={twMerge("shrink-0", closeButtonProps?.className)}
              onClick={onClose}
            >
              <XMarkIcon className="w-4 h-4 text-inherit" />
            </Button>
          )}
        </div>

        {type === "confirm" && (
          <div className="flex justify-end gap-2 mt-2">
            <Button
              {...cancelButtonProps}
              color={cancelButtonProps?.color ?? "light"}
              className={twMerge(
                "px-3 py-1 rounded dark:text-white hover:opacity-90",
                cancelButtonProps?.className
              )}
              onClick={() => {
                onCancel?.();
                onClose();
              }}
            >
              {cancelText}
            </Button>
            <Button
              {...confirmButtonProps}
              className={twMerge(
                "px-3 py-1 rounded hover:opacity-90",
                confirmButtonProps?.className
              )}
              onClick={() => {
                onConfirm?.();
                onClose();
              }}
            >
              {confirmText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const target = document.getElementById("alert-root") || document.body;
  return ReactDOM.createPortal(content, target);
};
