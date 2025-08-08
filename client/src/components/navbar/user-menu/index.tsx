import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import type { UserMenuProps } from "./types";
import { Avatar } from "../../avatar";

export const UserMenu: React.FC<UserMenuProps> = ({
  name,
  email,
  menuItems,
  className,
  onMenuClick,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "w-80 bg-container dark:bg-container-dark shadow-lg overflow-hidden text-sm text-gray-800",
          className
        )
      )}
    >
      <div className="flex items-center p-4 gap-3">
        <Avatar name={name} size={40} />
        <div>
          <div className="font-medium text-text dark:text-text-dark">
            {name}
          </div>
          <div className="text-text-muted dark:text-text-muted_dark text-xs">
            {email}
          </div>
        </div>
      </div>

      <div className="border-t">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              item.onClick?.();
              const shouldAutoClose = item.autoCloseOnClick !== false;
              if (shouldAutoClose) {
                onMenuClick?.();
              }
            }}
          >
            <div
              role="button"
              className="flex items-center justify-between px-4 py-2 hover:bg-menu_hover dark:hover:bg-menu_hover-dark cursor-pointer w-full"
              tabIndex={0}
            >
              <div className="flex items-center">
                <div className="w-5 h-5 text-icon dark:dark:text-icon-dark mr-3">
                  {item.icon}
                </div>
                <span className="flex-1">{item.label}</span>
              </div>
              {item.children}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
