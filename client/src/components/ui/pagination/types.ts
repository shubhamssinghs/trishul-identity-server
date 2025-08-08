export interface PaginationProps {
  total: number;
  limit: number;
  offset: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onChange: (params: { offset: number }) => void;
}
