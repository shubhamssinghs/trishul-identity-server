import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import {
  ExclamationTriangleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

import { Button } from "../ui/button";

export const ErrorBoundary = () => {
  const error = useRouteError();

  const handleReload = () => {
    window.location.reload();
  };

  const status = isRouteErrorResponse(error) ? error.status : 500;
  const title = isRouteErrorResponse(error)
    ? error.statusText || "Page Error"
    : "Unexpected Error";
  const message = isRouteErrorResponse(error)
    ? error.data?.message || "Something went wrong while loading the page."
    : (error as Error)?.message || "An unexpected error occurred.";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white dark:bg-container-dark text-text dark:text-text-dark">
      <ExclamationTriangleIcon className="w-12 h-12 stroke-red-500 text-red-500 dark:text-red-400 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Error {status}</h1>
      <h2 className="text-lg font-medium">{title}</h2>
      <code className="bg-container dark:bg-container-dark !text-error font-mono px-1.5 py-0.5 rounded text-sm inline-flex max-h-96 overflow-y-auto my-2 ">
        {message}
      </code>

      <Button
        onClick={handleReload}
        className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        <ArrowPathIcon className="w-5 h-5 stroke-white" />
        Reload Page
      </Button>
    </div>
  );
};
