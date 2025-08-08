// utils/parseError.ts
import { isAxiosError } from "axios";
import type { AxiosError } from "axios";
import type { StandardizedError } from "@types";

export function parseToStandardError(err: unknown): StandardizedError {
  const fallback: StandardizedError = {
    status: 500,
    error: "An unknown error occurred.",
  };

  if (isAxiosError(err)) {
    const axiosError = err as AxiosError<{ message?: string; error?: string }>;
    return {
      status: axiosError.response?.status ?? 500,
      error:
        axiosError.response?.data?.message ??
        axiosError.response?.data?.error ??
        axiosError.message ??
        "Axios error",
      errorTrace: axiosError.stack,
      response: axiosError.response,
    };
  }

  if (err instanceof Error) {
    return {
      status: 500,
      error: err.message,
      errorTrace: err.stack,
    };
  }

  return fallback;
}
