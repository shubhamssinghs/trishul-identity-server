import { createBrowserRouter } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";

import { AuthLayout, MainLayout, ProtectedLayout } from "@layout";
import {
  Dashboard,
  Login,
  NotFound,
  AddClient,
  ClientList,
  ManageClient,
} from "@pages";
import { ErrorBoundary } from "@components";
import {
  PencilSquareIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        element: <MainLayout />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            index: true,
            element: <Dashboard />,
            handle: {
              breadcrumb: "Dashboard",
              title: "Super Admin Dashboard",
              icon: HomeIcon,
              description: "Manage your account preferences",
              permissions: ["admin"],
            },
          },
          {
            path: "clients",
            handle: {
              breadcrumb: "Clients",
              title: "Client Management",
              icon: UserGroupIcon,
              description: "Manage your clients here",
              permissions: ["admin"],
            },
            children: [
              {
                index: true,
                element: <ClientList />,
              },
              {
                path: "manage/:id",
                element: <ManageClient />,
                handle: {
                  breadcrumb: "Manage Client",
                  title: "Manage Client",
                  icon: UserIcon,
                  description:
                    "Access and manage client-related data including users, directories, integrations, and security settings.",
                  permissions: ["admin"],
                },
              },
              {
                path: "add",
                element: <AddClient />,
                handle: {
                  breadcrumb: "Add Client",
                  title: "Add New Client",
                  icon: PencilSquareIcon,
                  description: "Fill in the details to add a new client",
                  permissions: ["admin"],
                },
              },
            ],
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);
