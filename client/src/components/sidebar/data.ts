import type { SidebarOptions } from "./types";

import { ChartBarSquareIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export const sidebarOptions: SidebarOptions[] = [
  {
    group: "General",
    items: [
      {
        label: "Dashboard",
        to: "/",
        icon: ChartBarSquareIcon,
        roles: ["superadmin", "admin"],
      },
      {
        label: "Clients",
        to: "/clients",
        icon: UserGroupIcon,
        roles: ["superadmin", "admin"],
      },
    ],
  },
];
