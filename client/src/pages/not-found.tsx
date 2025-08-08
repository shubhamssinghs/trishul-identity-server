import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@components";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex items-center justify-center text-text px-6 py-12 mt-auto mb-auto">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-error">404</h1>
        <p className="text-2xl font-semibold ">Page not found</p>
        <p className="text-base text-text-muted dark:text-text-muted_dark">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate("/")} color="primary" size="md">
          Go back home
        </Button>
      </div>
    </div>
  );
};
