/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import type { ServiceResult, StandardizedError } from "../types";
import { parseToStandardError } from "@utils";

export function useAsyncService<T, P = void>(
  fn: (params: P) => Promise<ServiceResult<T>>,
  runOnMount = true,
  defaultParams?: P
) {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<StandardizedError | null>(null);
  const [params, setParams] = useState<P | undefined>(
    defaultParams ? { ...defaultParams } : undefined
  );

  const fnRef = useRef(fn);
  const hasFetchedOnce = useRef(false);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const fetch = async (p?: P) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);
    try {
      const result = await fnRef.current(p!);
      if (result.error) throw result.error;
      setResponse(result.response ?? null);
      return result;
    } catch (err: unknown) {
      if (
        (err as any)?.name === "CanceledError" ||
        (err as any)?.name === "AbortError"
      ) {
        return;
      }
      const standardizedError: StandardizedError = parseToStandardError(err);
      setError(standardizedError);
      throw standardizedError;
    } finally {
      setIsLoading(false);
    }
  };

  const execute = async (
    nextParams?: Partial<P> | ((prevParams: P | undefined) => Partial<P>),
    showToast?: boolean
  ) => {
    const resolvedPartial =
      typeof nextParams === "function" ? nextParams(params) : nextParams ?? {};

    const mergedParams = {
      ...params,
      ...resolvedPartial,
    } as P;

    setParams(mergedParams);

    if (showToast) {
      await toast.promise(fetch(mergedParams), {
        loading: "Loading, please wait...",
        success: "Data fetched successfully.",
        error: (err: StandardizedError) => err?.error ?? "Something went wrong",
      });
    } else {
      await fetch(mergedParams);
    }
  };

  const reset = () => {
    setResponse(null);
    setError(null);
    setIsLoading(false);
    hasFetchedOnce.current = false;
  };

  useEffect(() => {
    if (runOnMount && !hasFetchedOnce.current) {
      hasFetchedOnce.current = true;
      execute(defaultParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading, response, error, execute, reset, params };
}
