import type { Client } from "@types";

interface ClientApplicationProps {
  data?: Client;
}

export const ClientApplication: React.FC<ClientApplicationProps> = ({
  data,
}) => {
  return (
    <div className="inline-flex gap-4 w-full p-4">
      <div className="flex flex-col flex-1 justify-start">
        <div className="flex flex-col items-center justify-center space-y-1"></div>
      </div>
      <div className="border-l border-border dark:border-border-dark px-4 max-w-[25%] hidden md:flex md:flex-col gap-2">
        <h1 className="text-xl font-semibold">Client Application</h1>
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
