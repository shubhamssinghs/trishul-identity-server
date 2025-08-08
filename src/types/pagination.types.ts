export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginationResponse<T> extends PaginationParams {
  data: T[];
  total: number;
  totalPages: number;
}
