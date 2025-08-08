import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import type { SettingsMenuProps } from "./types";
import { Button } from "../../ui";

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
  menuItems,
  className,
  onMenuClick,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "w-72 sm:w-96 bg-container dark:bg-container-dark shadow-lg overflow-hidden text-sm text-gray-800",
          className
        )
      )}
    >
      {menuItems.map((item, idx) => (
        <div
          key={idx}
          onClick={() => {
            item.onClick?.();
            onMenuClick?.();
          }}
        >
          <Button
            variant="ghost"
            color="light"
            className="flex items-center px-4 py-2 w-full focus:ring-0 hover:!bg-border dark:hover:!bg-border-dark rounded-none"
            tabIndex={0}
          >
            <div className="w-5 h-5 text-icon dark:dark:text-icon-dark mr-3">
              {item.icon}
            </div>
            <div className="flex flex-col">
              <span className="flex-1 text-left">{item.label}</span>
              {item.description && (
                <span className="flex-1 text-text-muted dark:text-text-muted_dark text-xs text-left">
                  {item.description}
                </span>
              )}
            </div>
            {item.children}
          </Button>
        </div>
      ))}
    </div>
  );
};
