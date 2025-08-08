export interface MenuItem {
  label: string;
  description?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
}

export interface SettingsMenuProps {
  menuItems: MenuItem[];
  className?: string;
  onMenuClick?: () => void;
}
