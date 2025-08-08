import {
  Badge,
  Button,
  ButtonGroup,
  Table,
  type TableColumn,
} from "@components";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import type { Client, Directory } from "@types";

interface ClientDirectoriesProps {
  data?: Client;
}

export const ClientDirectories: React.FC<ClientDirectoriesProps> = ({
  data,
}) => {
  const directories = data?.directories;

  const columns: TableColumn<Directory>[] = [
    {
      header: "Name",
      accessor: "name",
      sortable: true,
    },
    {
      header: "Description",
      accessor: "description",
      sortable: true,
    },
    {
      header: "Default",
      accessor: "is_default",
      sortable: true,
      cell: (_value, row) => (
        <Badge
          children={row.is_default ? "Yes" : "No"}
          size="xxs"
          rounded={false}
          color={row.is_default ? "primary" : "neutral"}
          data-tooltip-content={`This is ${
            !row.is_default ? "not" : ""
          } default directory`}
        />
      ),
    },
    {
      header: "Status",
      accessor: "is_active",
      sortable: true,
      cell: (_value, row) => (
        <Badge
          children={row.is_active ? "Active" : "Inactive"}
          size="xxs"
          rounded={false}
          color={row.is_active ? "success" : "light"}
          data-tooltip-content={`This directory is ${
            row.is_active ? "active" : "inactive"
          }`}
        />
      ),
    },
    {
      header: "Action",
      accessor: "actions",
      cell: (_value, row) => (
        <div className="flex gap-2">
          <ButtonGroup>
            <Button
              size="xxs"
              color="light"
              data-tooltip-content="View directory"
              onClick={() => console.log(row)}
            >
              <EyeIcon className="w-4 h-4" />
            </Button>
            <Button
              size="xxs"
              color="light"
              data-tooltip-content="Edit directory"
              onClick={() => console.log(row)}
            >
              <PencilSquareIcon className="w-4 h-4" />
            </Button>
            {!row.is_default && (
              <Button
                size="xxs"
                color="light"
                data-tooltip-content="Delete directory"
                onClick={() => console.log(row)}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            )}
          </ButtonGroup>
        </div>
      ),
    },
  ];

  return (
    <div className="inline-flex gap-4 w-full p-4">
      <Table
        className="flex-1"
        columns={columns}
        _data={directories || []}
        showFilters
        enableRowExpand
        expandedContent={(row) => (
          <div className="text-sm flex flex-col gap-1">
            <p>Directory name: {row.name}</p>
            <p>Directory description: {row.description}</p>
            <div className="flex justify-between items-center gap-2">
              <p>Total Groups: {row?.groups?.length || 0}</p>
              <Button size="xxs" className="w-max">
                Manage Groups
              </Button>
            </div>
          </div>
        )}
      />
      <div className="border-l border-border dark:border-border-dark px-4 max-w-[25%] hidden md:flex md:flex-col gap-2">
        <h1 className="text-xl font-semibold">Client Directories</h1>
        <p className="text-text dark:text-text-dark">
          View and manage the directories associated with the client{" "}
          {data?.name}.
          <br /> <br />
          Use this section to verify and administer directories — such as
          identifying the default directory, enabling or disabling specific
          directories, and reviewing associated metadata. This helps ensure each
          directory aligns with your client's organizational structure and
          access policies.
        </p>
      </div>
    </div>
  );
};
