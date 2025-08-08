/* eslint-disable @typescript-eslint/no-explicit-any */
export type TabLayout = "vertical" | "horizontal";

export type TabData = {
  label: string;
  icon?: React.ReactNode;
  component: React.ComponentType<{ data: any }>;
};

export interface TabProps {
  layout?: TabLayout;
  tabs: TabData[];
  data?: unknown;
  className?: string;
}
