import { type LinkProps } from "react-router-dom";
import type { UI_Color, UI_Size, UI_Variant } from "@styles";

export type ButtonType = "button" | "link" | "anchor";

export interface BaseButtonProps {
  size?: UI_Size;
  variant?: UI_Variant;
  color?: UI_Color;
  className?: string;
  as?: ButtonType;
  children?: React.ReactNode;
  disabled?: boolean;
}

export type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

export type RouterLinkProps = BaseButtonProps &
  Omit<LinkProps, "className"> & {
    as: "link";
  };

export type AnchorProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "anchor";
  };

export type ButtonProps = NativeButtonProps | RouterLinkProps | AnchorProps;
