export interface StandardizedError {
  status: number;
  error: string;
  errorTrace?: unknown;
  response?: unknown;
}
