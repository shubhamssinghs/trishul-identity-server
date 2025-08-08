import React, { Children, isValidElement } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import type { ButtonProps } from "../button/types";
import type { ButtonGroupProps } from "./types";

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ children, className }, ref) => {
    const buttons = Children.toArray(children).filter(isValidElement);

    return (
      <div className={twMerge("inline-flex", className)} ref={ref}>
        {buttons.map((child, index) => {
          if (!isValidElement<ButtonProps>(child)) return null;

          const isFirst = index === 0;
          const isLast = index === buttons.length - 1;

          const rounded = clsx({
            "rounded-none border-l-0 border-r-0": !isFirst && !isLast,
            "rounded-l-box rounded-r-none": isFirst,
            "rounded-r-box rounded-l-none": isLast,
          });

          return React.cloneElement(child, {
            className: twMerge(child.props.className, rounded),
          });
        })}
      </div>
    );
  }
);
