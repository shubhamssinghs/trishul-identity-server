import { useMatches, type UIMatch } from "react-router-dom";
import type { RouteMetadata, RouteHandle, BreadcrumbFunction } from "../types";

export const useRouteMetadata = (): RouteMetadata[] => {
  const matches = useMatches();
  return matches
    .filter(
      (match): match is UIMatch<unknown, RouteHandle> =>
        typeof match.handle === "object" && match.handle !== null
    )
    .map((match) => {
      const { handle, params, pathname } = match;
      const label =
        typeof handle.breadcrumb === "function"
          ? (handle.breadcrumb as BreadcrumbFunction)({
              params: Object.fromEntries(
                Object.entries(params).map(([k, v]) => [k, v ?? ""])
              ),
              pathname,
            })
          : handle.breadcrumb ?? null;

      return {
        path: pathname,
        handle,
        label,
      };
    });
};
