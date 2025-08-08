/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

import { Button } from "../button";
import type { DropdownProps } from "./types";

export const Dropdown = <T,>({
  label = "Select",
  options,
  onSelect,
  disable,
  className,
  buttonSize = "sm",
  buttonVariant = "outline",
  buttonColor = "light",
  renderLabel,
  renderBody,
  bodyClassName,
  drawerOnMobile = false,
  placement = "right",
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => !disable && setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPlacementClasses = () => {
    const base =
      "z-10 rounded-lg bg-container dark:bg-container-dark border border-border dark:border-border-dark shadow-lg overflow-hidden";

    const absolutePlacement = {
      top: `absolute top-full left-0 ${renderLabel ? "mt-9" : "mt-10"}`,
      bottom: `absolute bottom-full left-0 ${renderLabel ? "mb-9" : "mb-10"}`,
      left: `absolute left-0 top-0 ${renderLabel ? "mt-9" : "mt-10"}`,
      right: `absolute right-0 top-0 ${renderLabel ? "mt-9" : "mt-10"}`,
    }[placement];

    const mobileDrawer = {
      top: "fixed top-0 left-0 right-0 h-[50%]",
      bottom: "fixed bottom-0 left-0 right-0 h-[50%]",
      left: "fixed top-0 left-0 h-full w-3/4",
      right: "fixed top-0 right-0 h-full w-3/4",
    }[placement];

    return twMerge(
      base,
      drawerOnMobile
        ? `lg:${absolutePlacement} ${mobileDrawer}`
        : `${absolutePlacement}`,
      bodyClassName
    );
  };

  return (
    <div
      ref={dropdownRef}
      className={twMerge("relative inline-block text-left", className)}
    >
      {renderLabel ? (
        renderLabel({ toggle: toggleDropdown, isOpen })
      ) : (
        <Button
          onClick={toggleDropdown}
          size={buttonSize}
          variant={buttonVariant}
          color={buttonColor}
          className="flex items-center justify-between gap-1 w-full"
          disabled={disable}
        >
          <>
            {label}
            {isOpen ? (
              <ChevronUpIcon className="w-4 h-4" />
            ) : (
              <ChevronDownIcon className="w-4 h-4" />
            )}
          </>
        </Button>
      )}
      {isOpen && (
        <div className={getPlacementClasses()}>
          {renderBody ? (
            renderBody({ toggle: toggleDropdown, isOpen })
          ) : (
            <ul className="py-1 text-sm text-base-content w-max">
              {options?.map((item, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    color="light"
                    onClick={() => {
                      onSelect?.(item as T);
                      setIsOpen(false);
                    }}
                    className="w-full text-sm px-4 py-2 text-left text-text dark:text-text-dark  bg-inherit focus:ring-0 hover:!bg-border dark:hover:!bg-border-dark rounded-none font-normal"
                  >
                    {typeof item === "object" &&
                    item !== null &&
                    "label" in item
                      ? (item as any).label
                      : String(item)}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
