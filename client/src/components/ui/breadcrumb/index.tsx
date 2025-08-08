import { Link } from "react-router-dom";

import type { BreadcrumbsProps } from "./types";

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ metaData }) => {
  if (!metaData?.length) return null;

  const breadcrumbItems = metaData.filter((item) => item.label !== null);

  return (
    <nav className="text-sm">
      <ol className="flex flex-wrap items-center">
        {breadcrumbItems.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            {index > 0 && <span className="mx-2 text-muted-foreground">/</span>}
            {index === breadcrumbItems.length - 1 ? (
              <span className="font-normal text-muted-foreground dark:text-muted-foreground-dark">
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="hover:underline text-blue-600 dark:text-primary"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
