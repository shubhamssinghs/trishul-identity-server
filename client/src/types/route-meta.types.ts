export type BreadcrumbFunction = (args: {
  params: Record<string, string>;
  pathname: string;
}) => string;

export interface PageMeta {
  title?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description?: string;
  permissions?: string[];
  [key: string]: unknown;
}

export interface RouteHandle extends PageMeta {
  breadcrumb?: string | BreadcrumbFunction;
  [key: string]: unknown;
}

export interface RouteMetadata {
  path: string;
  handle: RouteHandle;
  label: string | null;
}
