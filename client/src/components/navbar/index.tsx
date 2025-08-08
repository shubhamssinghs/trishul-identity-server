import {
  Cog6ToothIcon,
  UserCircleIcon,
  PaintBrushIcon,
  ArrowRightStartOnRectangleIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";

import { Button } from "../ui/button";
import { Dropdown } from "../ui/dropdown";
import { useAlert } from "../../hooks";
import { ThemeToggler } from "../theme-toggler";
import type { NavbarProps } from "./types";
import { Avatar } from "../avatar";
import { UserMenu } from "./user-menu";
import { SettingsMenu } from "./setting-menu";
import { tokenServiceInstance } from "@services";

export const Navbar = ({ isSidebarOpen, onToggle }: NavbarProps) => {
  const { _alert } = useAlert();

  const handleLogout = () => {
    _alert({
      type: "confirm",
      title: "Are you sure you want to logout?",
      message: "You will need to log in again to access your dashboard.",
      confirmText: "Logout",
      cancelText: "Cancel",
      onConfirm: () => {
        tokenServiceInstance.clearAll();
        window.location.href = "/login";
      },
    });
  };

  return (
    <nav className="sticky top-0 w-full bg-container dark:bg-container-dark px-4 py-3 flex items-center justify-between  border-b-[0.4px] z-50">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          onClick={onToggle}
          className="inline-flex items-center justify-center text-xl cursor-pointer p-1"
        >
          {isSidebarOpen ? (
            <svg
              fill="none"
              viewBox="0 0 16 16"
              role="presentation"
              className="overflow-x-hidden overflow-y-hidden text-current pointer-events-none w-4 h-4 align-bottom"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M2 2.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h2v-11zm3.5 0v11H14a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm7.97 4.47 2.5-2.5 1.06 1.06L9.56 8l1.97 1.97-1.06 1.06-2.5-2.5a.75.75 0 0 1 0-1.06"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              fill="none"
              viewBox="0 0 16 16"
              role="presentation"
              className="overflow-x-hidden overflow-y-hidden text-current pointer-events-none w-4 h-4 align-bottom"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14 2.5a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5h-2v-11zm-3.5 0v11H2a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5zM16 3a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM8.03 7.47l-2.5-2.5-1.06 1.06L6.44 8 4.47 9.97l1.06 1.06 2.5-2.5a.75.75 0 0 0 0-1.06"
                clipRule="evenodd"
              />
            </svg>
          )}
        </Button>
        <Button
          size="xs"
          variant="ghost"
          className="p-1 flex items-center justify-center gap-1"
        >
          <img
            src="/trishul.png"
            alt="Logo"
            className="w-6 h-6 object-contain "
          />
          <span className="font-bold text-sm tracking-wide">Trishul</span>
        </Button>
      </div>

      <div className="space-x-3 flex items-center">
        <Dropdown
          bodyClassName="w-68"
          renderLabel={({ toggle }) => (
            <Button
              size="xs"
              variant="ghost"
              className="p-1 flex gap-1"
              onClick={toggle}
            >
              <Cog6ToothIcon className="w-5 h-5 inline-block" />
            </Button>
          )}
          renderBody={({ toggle }) => (
            <SettingsMenu
              onMenuClick={toggle}
              menuItems={[
                {
                  label: "General Settings",
                  description:
                    "Manage language, time zone, and other personal preferences",
                  icon: <Cog6ToothIcon className="w-5 h-5" />,
                },
                {
                  label: "Notification settings",
                  description:
                    "Manage email and in-product notifications from Jira",
                  icon: <BellAlertIcon className="w-5 h-5" />,
                },
              ]}
            />
          )}
        />

        <Dropdown
          renderLabel={({ toggle }) => (
            <Button
              size="xs"
              variant="ghost"
              className="p-0 flex rounded-full"
              onClick={toggle}
            >
              <Avatar name="shubham.singh" className="bg-primary" />
            </Button>
          )}
          renderBody={({ toggle }) => (
            <UserMenu
              onMenuClick={toggle}
              name="shubham.singh"
              email="shubham.singh@programming.com"
              menuItems={[
                {
                  label: "Profile",
                  icon: <UserCircleIcon className="w-5 h-5" />,
                },
                {
                  label: "Account settings",
                  icon: <Cog6ToothIcon className="w-5 h-5" />,
                },
                {
                  label: "Theme",
                  icon: <PaintBrushIcon className="w-5 h-5" />,
                  children: <ThemeToggler />,
                  autoCloseOnClick: false,
                },
                {
                  label: "Log out",
                  icon: <ArrowRightStartOnRectangleIcon className="w-5 h-5" />,
                  onClick: () => {
                    handleLogout();
                  },
                },
              ]}
            />
          )}
        />
      </div>
    </nav>
  );
};
