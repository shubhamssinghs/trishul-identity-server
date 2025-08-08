export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SidebarOptionsItem {
  label: string;
  to: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  items?: SidebarOptionsItem[];
  roles: string[];
}

export interface SidebarOptions {
  group: string;
  items: SidebarOptionsItem[];
}
