import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import { sidebarOptions } from "./data";
import type { SidebarProps } from "./types";
import { useBreakpoint } from "@hooks";

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();

  return (
    <>
      {isOpen && (
        <div
          className="block sm:hidden fixed inset-0 bg-black/40 z-30"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          "z-50 fixed top-0 left-0 w-64 transform transition-transform duration-300 ease-in-out bg-container dark:bg-container-dark overflow-y-auto border-r border-border dark:border-border-dark",
          "h-full sm:h-[calc(100vh-55px)] sm:mt-[57px]",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        <div className="p-2">
          {sidebarOptions.map((section) => (
            <div key={section.group} className="mb-4">
              <div className="text-xs text-text-muted  uppercase px-4 py-2">
                {section.group}
              </div>
              <ul>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <button
                        onClick={() => {
                          navigate(item.to);
                          if (breakpoint === "base") {
                            onClose();
                          }
                        }}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer w-full"
                        tabIndex={0}
                      >
                        {Icon && (
                          <Icon className="w-5 h-5 text-icon dark:text-icon-dark" />
                        )}
                        <span className="text-sm text-text dark:text-text-dark">
                          {item.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};
