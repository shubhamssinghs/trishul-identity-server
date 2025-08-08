import type { AbortParam } from "./abort.type";

export type Pagination = AbortParam & {
  limit: number;
  offset: number;
};

export type PaginationResponse<T> = Pagination & {
  data: T[];
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
