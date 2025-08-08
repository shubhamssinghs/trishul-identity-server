import type React from "react";
import { Button } from "../ui/button";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import type { ErrorPage } from "./types";
import { twMerge } from "tailwind-merge";

export const ErrorComponent: React.FC<ErrorPage> = ({
  error,
  showReloadBtn = true,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center px-4 py-12 text-text dark:text-text-dark h-full mt-auto mb-auto",
        className
      )}
    >
      <div className="text-center max-w-md">
        <div className="flex justify-center">
          <ExclamationTriangleIcon className="w-16 h-16 text-error" />
        </div>

        <h1 className="text-lg break-words mt-2">
          Error Code : <span className="!text-error">{error?.status}</span>
        </h1>

        <p className="mt-1 ">
          Error :{" "}
          <strong className="!text-error">
            {import.meta.env.DEV ? error?.error : "Something went wrong."}
          </strong>
        </p>

        {import.meta.env.DEV && (
          <code className="bg-container dark:bg-container-dark !text-error font-mono px-1.5 py-0.5 rounded text-sm inline-flex max-h-96 overflow-y-auto my-2">
            {error?.errorTrace as never}
          </code>
        )}

        {showReloadBtn && (
          <Button
            onClick={() => window.location.reload()}
            color="primary"
            size="md"
            className="mt-3"
          >
            Try Reloading
          </Button>
        )}
      </div>
    </div>
  );
};
