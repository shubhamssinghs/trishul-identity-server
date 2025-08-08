import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";

import { useClickOutside } from "@hooks";
import { Button } from "../ui";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { DrawerProps } from "./types";

export const Drawer: React.FC<DrawerProps> = ({
  position = "right",
  body,
  bodyClassName,
  isOpenByDefault = false,
  title,
  isCloseable = true,
  renderLink,
  onOpen,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);
  const [isClosing, setIsClosing] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleDrawer = () => {
    if (isOpen) {
      setIsClosing(true);
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
        onClose?.();
      }, 200);
    } else {
      setIsOpen(true);
      setIsClosing(false);
      onOpen?.();
    }
  };

  const ref = useClickOutside<HTMLDivElement>({
    handler: toggleDrawer,
    enabled: isOpen,
  });

  const getPosition = {
    top: `w-full h-full md:h-2/5 bg-white left-0 top-0 ${
      !isClosing ? "animate-fade-in-down" : "animate-fade-out-up"
    }`,
    left: `h-full w-full md:w-full bg-white left-0 top-0 ${
      !isClosing ? "animate-fade-in-left" : "animate-fade-out-left"
    }`,
    bottom: `w-full h-full md:h-2/5 bg-white left-0 bottom-0 ${
      !isClosing ? "animate-fade-in-up" : "animate-fade-out-down"
    }`,
    right: `h-full w-full md:w-2/5 bg-white top-0 right-0 ${
      !isClosing ? "animate-fade-in-right" : "animate-fade-out-right"
    }`,
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {renderLink?.({ toggle: toggleDrawer, isOpen })}
      {isOpen && (
        <div className="z-50 h-screen w-screen fixed top-0 left-0 bg-backdrop dark:bg-backdrop-dark overflow-hidden">
          <div
            ref={ref}
            className={twMerge(
              clsx(
                "absolute bg-container dark:bg-container-dark text-text dark:text-text-dark shadow-lg overflow-auto",
                getPosition[position],
                bodyClassName
              )
            )}
          >
            <div className="py-2 px-4 flex justify-between items-center bg-container dark:bg-container-dark border-b border-border dark:border-border-dark sticky top-0 z-[1]">
              {title && <h1 className="text-md font-semibold">{title}</h1>}
              {isCloseable && (
                <Button variant={"ghost"} onClick={toggleDrawer}>
                  <XMarkIcon className="w-4 h-4 text-inherit" />
                </Button>
              )}
            </div>
            <section className="flex flex-col px-4 py-6 z-0">{body}</section>
          </div>
        </div>
      )}
    </>
  );
};
