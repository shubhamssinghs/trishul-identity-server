export interface MenuItem {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
  autoCloseOnClick?: boolean;
}

export interface UserMenuProps {
  name: string;
  email: string;
  menuItems: MenuItem[];
  className?: string;
  onMenuClick?: () => void;
}
