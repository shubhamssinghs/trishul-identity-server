/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import type { TabProps } from "./types";
import { Button, ButtonGroup } from "../ui";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const Tab: React.FC<TabProps> = ({
  layout = "horizontal",
  tabs,
  data,
  className,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const isVertical = layout === "vertical";
  const activeComponent = tabs[activeTab].component;

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  useEffect(() => {
    const updateIndicator = () => {
      if (ref.current && spanRef.current) {
        const parent = ref.current;
        const child = parent.childNodes[activeTab] as HTMLElement;

        if (child) {
          if (isVertical) {
            const { offsetTop, offsetHeight } = child;
            spanRef.current.style.top = `${offsetTop}px`;
            spanRef.current.style.height = `${offsetHeight}px`;
            spanRef.current.style.left = "0";
            spanRef.current.style.width = "3px";
          } else {
            const { offsetLeft, offsetWidth } = child;
            spanRef.current.style.left = `${offsetLeft}px`;
            spanRef.current.style.width = `${offsetWidth}px`;
            spanRef.current.style.top = "auto";
            spanRef.current.style.height = "2.5px";
          }
        }
      }
    };

    updateIndicator();

    window.addEventListener("resize", updateIndicator);

    const resizeObserver = new ResizeObserver(() => {
      updateIndicator();
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      window.removeEventListener("resize", updateIndicator);
      resizeObserver.disconnect();
    };
  }, [activeTab, layout]);

  return (
    <div
      role="tab"
      className={twMerge(clsx(`flex`, isVertical ? "flex-row" : "flex-col"))}
    >
      <ButtonGroup
        className={twMerge(
          clsx(
            `relative`,
            isVertical
              ? "flex-col border-r border-border dark:border-border-dark"
              : "w-full border-b border-border dark:border-border-dark",
            `overflow-x-auto`
          ),
          className
        )}
        ref={ref}
      >
        {tabs.map((tab, index) => (
          <Button
            key={tab.label + index}
            onClick={() => handleTabChange(index)}
            className={`
              ${isVertical ? "w-full justify-start" : "flex-1 justify-center"}
              !rounded-none
              transition-all duration-300 outline-none
              focus:!ring-0 focus:!ring-offset-0
              ${activeTab === index && "text-primary"}
            `}
            variant="ghost"
          >
            <div
              className={`flex items-center gap-2 text-center ${
                isVertical ? "w-full justify-start" : "w-full justify-center"
              }`}
            >
              {tab?.icon}
              {tab.label && (
                <span className={`${activeTab === index && "text-primary"}`}>
                  {tab.label}
                </span>
              )}
            </div>
          </Button>
        ))}
        <span
          ref={spanRef}
          className={`
            absolute bg-primary transition-all duration-300
            ${isVertical ? "left-0 w-[3px]" : "bottom-0 h-[2.5px]"}
          `}
        />
      </ButtonGroup>

      <div className="flex-1 py-2 px-2">
        {typeof activeComponent === "function"
          ? React.createElement(activeComponent, { data })
          : null}
      </div>
    </div>
  );
};
