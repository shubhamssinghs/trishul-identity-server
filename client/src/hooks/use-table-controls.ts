import { useCallback, useState } from "react";
import type { PaginationResponse, PaginationParams } from "../types";

export function usePaginatedData<T>(
  fetchFn: (pagination: PaginationParams) => Promise<PaginationResponse<T>>
) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchFn({ page, pageSize });
      setData(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("Unknown error occurred."));
      }
    } finally {
      setLoading(false);
    }
  }, [fetchFn, page, pageSize]);

  return {
    data,
    loading,
    error,
    page,
    pageSize,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    setPage,
    setPageSize,
    refetch: fetchData,
  };
}
