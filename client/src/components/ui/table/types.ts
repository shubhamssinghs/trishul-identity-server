import type { StandardizedError } from "@types";

export type TableColumn<T, K extends string = keyof T & string> = {
  header: string;
  accessor: K | string;
  className?: string;
  visible?: boolean;
  exportable?: boolean;
  sortable?: boolean;

  cell?: (
    value: K extends keyof T ? T[K] : undefined,
    row: T
  ) => React.ReactNode;

  renderValue?: (
    value: K extends keyof T ? T[K] : undefined
  ) => React.ReactNode;

  sortFn?: (
    a: K extends keyof T ? T[K] : undefined,
    b: K extends keyof T ? T[K] : undefined
  ) => number;
};

export type TablePaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export interface TableData<T> extends TablePaginationProps {
  data: T[];
}

export interface TableProps<T> {
  _data: T[] | null;
  columns: TableColumn<T>[];
  showFilters?: boolean;
  filters?: React.ReactNode;
  search?: string;
  onSearch?: (value: string) => void;
  rowKey?: (row: T) => string | number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  error?: StandardizedError | null;
  className?: string;
  showSearch?: boolean;
  showColumnHide?: boolean;
  expandOnRowClick?: boolean;
  singleExpandedRow?: boolean;
  enableRowExpand?: boolean;
  expandedContent?: (row: T) => React.ReactNode;
}

// Sorting state
export type SortState<T> = {
  column: keyof T | null;
  direction: "asc" | "desc";
};
