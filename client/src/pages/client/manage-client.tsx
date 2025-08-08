/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Squares2X2Icon,
  RectangleStackIcon,
  KeyIcon,
  FolderIcon,
  ClockIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

import { ErrorComponent, Tab } from "@components";
import { useNavigate, useParams } from "react-router-dom";
import { clientServiceInstance } from "@services";
import { useAsyncService } from "@hooks";
import { useEffect } from "react";
import {
  ClientDirectories,
  ClientOverview,
  ClientOverviewSkeleton,
} from "./components";

const ClientApplications = ({ data }: { data: any }) => (
  <div>Client Applications - {data?.name}</div>
);

const ClientRoles = ({ data }: { data: any }) => (
  <div>Client Roles - {data?.name}</div>
);
const ClientTokens = ({ data }: { data: any }) => (
  <div>Client Tokens - {data?.name}</div>
);
const ClientAuditLogs = ({ data }: { data: any }) => (
  <div>Client Audit Logs - {data?.name}</div>
);

const tabOptionsForManageClient = [
  {
    label: "Overview",
    icon: <Squares2X2Icon className="w-5 h-5" />,
    component: ClientOverview,
  },
  {
    label: "Applications",
    icon: <AdjustmentsHorizontalIcon className="w-5 h-5" />,
    component: ClientApplications,
  },
  {
    label: "Directories",
    icon: <FolderIcon className="w-5 h-5" />,
    component: ClientDirectories,
  },
  {
    label: "Roles",
    icon: <RectangleStackIcon className="w-5 h-5" />,
    component: ClientRoles,
  },
  {
    label: "Tokens",
    icon: <KeyIcon className="w-5 h-5" />,
    component: ClientTokens,
  },
  {
    label: "Audit Logs",
    icon: <ClockIcon className="w-5 h-5" />,
    component: ClientAuditLogs,
  },
];

export const ManageClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { error, response, isLoading } = useAsyncService(
    clientServiceInstance.get,
    true,
    {
      id: id!,
      scope: "withCreator,withDirectoryGroups",
    }
  );

  useEffect(() => {
    if (!id) {
      navigate(-1);
    }
  }, [id]);

  if (error) return <ErrorComponent error={error} className="flex-1" />;

  if (isLoading) return <ClientOverviewSkeleton className="flex-1" />;

  return (
    <div className="-m-4">
      <Tab tabs={tabOptionsForManageClient} data={response} />
    </div>
  );
};
