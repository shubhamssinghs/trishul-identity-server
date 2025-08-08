import React from "react";

import { Breadcrumbs } from "../ui/breadcrumb";
import type { HeaderProps } from "./types";

export const Header: React.FC<HeaderProps> = ({ metaData, actions }) => {
  if (!metaData || metaData.length === 0) return null;

  const lastIndex = metaData.length - 1;
  const last = metaData[lastIndex];

  let page = last.handle ?? {};

  const keysToCheck = ["title", "icon", "description", "permissions"] as const;

  if (lastIndex > 0) {
    const prev = metaData[lastIndex - 1];
    const prevPage = prev.handle ?? {};
    for (const key of keysToCheck) {
      if (!page[key] && prevPage[key]) {
        page = { ...page, [key]: prevPage[key] };
      }
    }
  }

  const PageIcon = last.handle.icon;

  return (
    <div className="space-y-2 border-b border-border dark:border-border-dark p-3">
      <Breadcrumbs metaData={metaData} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
        <div className="flex items-start gap-2">
          {PageIcon && (
            <PageIcon className="w-5 h-5 mt-1 text-icon dark:text-icon-dark" />
          )}
          <div>
            <h1 className="text-lg font-semibold text-text dark:text-text-dark">
              {page.title}
            </h1>
            {page.description && (
              <p className="text-sm text-text-muted dark:text-text-muted_dark">
                {page.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-1 sm:flex-initial items-center space-x-2">
          {actions?.map((a, i) => (
            <React.Fragment key={i}>{a}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
