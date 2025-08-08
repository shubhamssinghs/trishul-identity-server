/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DropdownRenderArgs {
  toggle: () => void;
  isOpen: boolean;
}

export interface OptionType {
  label: string;
  value: any;
}

export interface DropdownProps<T> {
  label?: string;
  options?: OptionType[] | T[];
  onSelect?: (value: T) => void;
  disable?: boolean;
  className?: string;
  buttonSize?: "xs" | "sm" | "md" | "lg" | "xl";
  buttonVariant?: "solid" | "outline" | "ghost";
  buttonColor?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "success"
    | "warning"
    | "error"
    | "light";
  renderLabel?: (args: DropdownRenderArgs) => React.ReactNode;
  renderBody?: (args: DropdownRenderArgs) => React.ReactNode;
  bodyClassName?: string;
  drawerOnMobile?: boolean;
  placement?: "top" | "left" | "right" | "bottom";
}
