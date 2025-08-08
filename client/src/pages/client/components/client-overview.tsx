import { Avatar } from "@components";
import type { Client } from "@types";
import { DateUtils } from "@utils";

interface ClientOverviewProps {
  data?: Client;
}

export const ClientOverview: React.FC<ClientOverviewProps> = ({ data }) => {
  return (
    <div className="inline-flex gap-4 w-full p-4">
      <div className="flex flex-col flex-1 justify-start">
        <div className="flex flex-col items-center justify-center space-y-1">
          <Avatar
            rounded={false}
            size={48}
            name={"client_logo"}
            imageUrl={data?.logo_url}
            className="bg-transparent"
          />
          <h1 className="font-semibold text-lg text-text dark:text-text-dark text-center">
            {data?.name}
          </h1>
          <p className="text-text-muted dark:text-text-muted_dark text-center">
            {data?.description}
          </p>
        </div>
        <div className="w-full mt-6 flex flex-col ">
          <div className="inline-flex space-x-3 items-center justify-between border-b border-border dark:border-border-dark py-2">
            <p>Theme Color: </p>
            <div className="inline-flex gap-2">
              <span className="font-semibold">{data?.theme_color}</span>
              <div
                data-tooltip-content={`Theme color (${data?.theme_color})`}
                className="w-6 h-6 md:h-auto md:w-28 p-2 md:rounded-md"
                style={{ backgroundColor: data?.theme_color }}
              />
            </div>
          </div>
          <p className="inline-flex items-center justify-between border-b border-border dark:border-border-dark py-2">
            Support email:{" "}
            <span className="font-semibold">{data?.support_email}</span>
          </p>
          <p className="inline-flex items-center justify-between border-b border-border dark:border-border-dark py-2">
            Status:{" "}
            <span
              className={`inline-flex items-center font-semibold pl-3 gap-2 rounded-l-md text-text bg-gradient-to-r to-transparent py-1`}
            >
              {data?.is_active ? "Active" : "Inactive"}
            </span>
          </p>
          <p className="inline-flex items-center justify-between border-b border-border dark:border-border-dark py-2">
            Created On:{" "}
            <span className="font-semibold">
              {data?.created_at
                ? DateUtils.formatDateTime(data.created_at)
                : "N/A"}
            </span>
          </p>
          <p className="inline-flex items-center justify-between border-b border-border dark:border-border-dark py-2">
            Last Updated On:{" "}
            <span className="font-semibold">
              {data?.updated_at
                ? DateUtils.formatDateTime(data.updated_at)
                : "N/A"}
            </span>
          </p>

          {data?.creator && (
            <div className="inline-flex items-center justify-between border-b border-border dark:border-border-dark py-2 text-text dark:text-text-dark">
              Created by:{" "}
              <span
                className="font-semibold inline-flex gap-2 items-center"
                data-tooltip-content="Click to view user"
              >
                <a className="font-semibold hover:underline cursor-pointer">
                  {data?.creator.name}
                </a>
                <Avatar
                  size={20}
                  name={data?.creator?.name}
                  imageUrl={data?.creator?.avatar_url}
                />
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="border-l border-border dark:border-border-dark px-4 max-w-[25%] hidden md:flex md:flex-col gap-2">
        <h1 className="text-xl font-semibold">Client Overview</h1>
        <p className="text-text dark:text-text-dark">
          Manage and understand the details of your client application{" "}
          {data?.name} at a glance. <br /> <br /> This overview provides key
          metadata such as the client's name, branding, support contact, and
          description. You can also track when the client was created or last
          updated, and by whom.
          <br /> <br />
          Use this section to verify that the client's identity, purpose, and
          configuration align with your expectations before performing actions
          like assigning roles, linking directories, or adjusting token
          policies.
        </p>
      </div>
    </div>
  );
};
