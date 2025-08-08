export type DrawerPosition = "top" | "left" | "bottom" | "right";

export interface DrawerRenderArgs {
  toggle: () => void;
  isOpen: boolean;
}

export interface DrawerProps {
  position?: DrawerPosition;
  body: React.ReactNode;
  bodyClassName?: string;
  isOpenByDefault?: boolean;
  title?: string;
  isCloseable?: boolean;
  renderLink?: (args: DrawerRenderArgs) => React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}
