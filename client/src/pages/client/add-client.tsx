import toast from "react-hot-toast";
import { AddOrEditClientForm } from "./components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddClient = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = (values: Record<string, unknown>) => {
    setIsLoading(true);
    const fakeRequest = new Promise((resolve) => {
      setTimeout(() => {
        console.log(values);
        navigate("/clients/manage/dadad-asda-sd-ad-a-da-da-da-dadad");
        resolve(true);
        setIsLoading(false);
      }, 5000);
    });

    toast.promise(fakeRequest, {
      loading: "Adding client...",
      success: "Client added successfully!",
      error: "Failed to add client. Please try again.",
    });
  };

  return (
    <div className="inline-flex gap-4 w-full">
      <div className="flex-1">
        <AddOrEditClientForm onSubmit={onSubmit} isLoading={isLoading} />
      </div>

      <div className="border-l border-border dark:border-border-dark px-4 max-w-[25%] hidden md:flex md:flex-col gap-2">
        <h1 className="text-xl font-semibold">Add New Client</h1>
        <p className="text-text dark:text-text-dark">
          Fill out the form to register a new client with your identity server.
          <br />
          You'll be able to specify client details like name, redirect URIs, and
          configure scopes, permissions, and security options.
        </p>
      </div>
    </div>
  );
};
