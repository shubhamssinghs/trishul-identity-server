import React from "react";
import { Button } from "@components";
import type { Client } from "@types";

export const ClientCard: React.FC<Client> = ({
  id,
  name,
  support_email,
  description,
  theme_color,
  logo_url,
}) => {
  if (!name) return null;

  return (
    <div
      className={`border border-border dark:border-border-dark rounded-lg p-4 flex gap-3 `}
    >
      {logo_url && (
        <div>
          <img
            src={logo_url}
            alt={`${name}-logo`}
            className="w-10 h-10 object-contain"
          />
        </div>
      )}
      <div className="flex flex-col flex-1">
        <h1 className="text-lg font-semibold text-text dark:text-text-dark">
          {name}
        </h1>
        {description && (
          <span className="text-text dark:text-text-dark text-sm">
            {description}
          </span>
        )}
        {support_email && (
          <a
            href={`mailto:${support_email}`}
            className="text-sm text-blue-600 hover:underline"
          >
            {support_email}
          </a>
        )}
        <Button
          as="link"
          to={`manage/${id}`}
          className={`mt-2 text-white w-max ml-auto ${
            theme_color ? `!bg-[${theme_color}]` : "bg-primary"
          } focus:outline-none focus:ring-2 hover:opacity-80 shadow-sm`}
          style={{
            backgroundColor: theme_color || "inherit",
          }}
        >
          Manage
        </Button>
      </div>
    </div>
  );
};
