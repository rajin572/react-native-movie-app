import { useCallback, useEffect, useState } from "react";

interface UseFetchInfiniteOptions {
  initialPage?: number;
  autoFetch?: boolean;
}

const useFetchInfinite = <T>(
  fetchFunction: (page: number) => Promise<T[]>,
  options: UseFetchInfiniteOptions = {},
) => {
  const { initialPage = 1, autoFetch = true } = options;

  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(
    async (currentPage: number, append = false) => {
      if (loading) return;

      try {
        setLoading(true);
        setError(null);

        const result = await fetchFunction(currentPage);

        setData((prev) => (append ? [...prev, ...result] : result));
        setHasMore(result.length > 0);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred"),
        );
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    [fetchFunction, loading],
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage, true);
    }
  }, [loading, hasMore, page, fetchData]);

  const reset = () => {
    setData([]);
    setError(null);
    setLoading(false);
    setInitialLoading(true);
    setPage(initialPage);
    setHasMore(true);
  };

  const refetch = () => {
    setPage(initialPage);
    fetchData(initialPage, false);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData(initialPage);
    }
  }, []);

  return {
    data,
    loading,
    initialLoading,
    error,
    hasMore,
    page,
    loadMore,
    refetch,
    reset,
  };
};

export default useFetchInfinite;
