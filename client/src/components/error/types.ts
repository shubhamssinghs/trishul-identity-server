import type { StandardizedError } from "@types";

export interface ErrorPage {
  error?: StandardizedError | null;
  showReloadBtn?: boolean;
  className?: string;
  [key: string]: unknown;
}
