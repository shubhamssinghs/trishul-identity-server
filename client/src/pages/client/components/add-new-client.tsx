import { Button } from "@components";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export const AddNewClient = () => {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center p-4 ">
      <PlusCircleIcon className="w-20 h-20 text-text-muted dark:text-text-muted_dark" />

      <h1 className="text-xl font-semibold text-text-muted dark:text-text-muted_dark mt-2">
        Get start by adding your first client.
      </h1>

      <Button className="mt-4">Add New Client</Button>
    </div>
  );
};
