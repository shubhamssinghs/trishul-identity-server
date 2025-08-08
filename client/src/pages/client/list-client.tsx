import { useMemo } from "react";
import { ClientListContent } from "./components";
import { useHeaderActions } from "@hooks";
import { Button } from "@components";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export const ClientList = () => {
  useHeaderActions(
    useMemo(
      () => [
        <Button
          as="link"
          to={"clients/add"}
          className="flex items-center gap-1 w-full justify-center md:w-auto"
        >
          <PlusCircleIcon className="w-5 h-5 stroke-2" /> Add New Client
        </Button>,
      ],
      []
    )
  );

  return (
    <div className="inline-flex gap-4 w-full">
      <ClientListContent />
      <div className="border-l border-border dark:border-border-dark px-4 max-w-[25%] hidden md:flex md:flex-col gap-2">
        <h1 className="text-xl font-semibold">Client Management</h1>
        <p className="text-text dark:text-text-dark">
          Manage your clients and their details here. <br />
          You can add new clients, update their details, manage their redirect
          URIs, assign scopes and permissions, rotate client secrets, and
          configure advanced settings like token lifetimes or proof of
          possession.
        </p>
      </div>
    </div>
  );
};
