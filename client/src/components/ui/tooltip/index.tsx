import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { TooltipPosition, TooltipState } from "./types";

export const Tooltip: React.FC = () => {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    content: "",
    position: "top",
    coords: { top: 0, left: 0 },
  });

  useEffect(() => {
    const isMobileOrTablet = window.innerWidth < 1024; // adjust breakpoint if needed
    if (isMobileOrTablet) return;

    const showTooltip = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;

      while (
        target &&
        !target.dataset.tooltipContent &&
        target !== document.body
      ) {
        target = target.parentElement;
      }

      if (!target) return;

      const content = target.dataset.tooltipContent;
      const position =
        (target.dataset.tooltipPosition as TooltipPosition) || "top";

      if (content) {
        const rect = target.getBoundingClientRect();
        let coords = { top: 0, left: 0 };

        switch (position) {
          case "top":
            coords = {
              top: rect.top + window.scrollY,
              left: rect.left + rect.width / 2 + window.scrollX,
            };
            break;
          case "bottom":
            coords = {
              top: rect.bottom + window.scrollY,
              left: rect.left + rect.width / 2 + window.scrollX,
            };
            break;
          case "left":
            coords = {
              top: rect.top + rect.height / 2 + window.scrollY,
              left: rect.left + window.scrollX,
            };
            break;
          case "right":
            coords = {
              top: rect.top + rect.height / 2 + window.scrollY,
              left: rect.right + window.scrollX,
            };
            break;
        }

        setTooltip({
          visible: true,
          content,
          position,
          coords,
        });
      }
    };

    const hideTooltip = () => {
      setTooltip((prev) => ({ ...prev, visible: false }));
    };

    document.addEventListener("mouseover", showTooltip);
    document.addEventListener("mouseout", hideTooltip);

    return () => {
      document.removeEventListener("mouseover", showTooltip);
      document.removeEventListener("mouseout", hideTooltip);
    };
  }, []);

  if (!tooltip.visible) return null;

  const { position, coords } = tooltip;

  const baseStyles: React.CSSProperties = {
    position: "absolute",
    zIndex: 9999,
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    transition: "opacity 0.2s ease, transform 0.2s ease",
  };

  let top = coords.top;
  let left = coords.left;
  let translate = "";

  switch (position) {
    case "top":
      top -= 36;
      translate = "translate(-50%, 0)";
      break;
    case "bottom":
      top += 8;
      translate = "translate(-50%, 0)";
      break;
    case "left":
      left -= 12;
      translate = "translate(-100%, -50%)";
      break;
    case "right":
      left += 12;
      translate = "translate(0, -50%)";
      break;
  }

  const tooltipStyles: React.CSSProperties = {
    ...baseStyles,
    top,
    left,
    transform: translate,
  };

  const arrowBase = `absolute w-2 h-2 bg-black rotate-45`;
  const arrowPosition = {
    top: "bottom-[-4px] left-1/2 -translate-x-1/2",
    bottom: "top-[-4px] left-1/2 -translate-x-1/2",
    left: "right-[-4px] top-1/2 -translate-y-1/2",
    right: "left-[-4px] top-1/2 -translate-y-1/2",
  };

  return createPortal(
    <div style={tooltipStyles} className="animate-fade-in">
      <div className="relative bg-black text-white text-xs px-2 py-1 rounded shadow break-words text-center">
        {tooltip.content}
        <div className={`${arrowBase} ${arrowPosition[position]}`} />
      </div>
    </div>,
    document.body
  );
};
