export type ServiceResult<T> = {
  isLoading: boolean;
  response: T | null;
  error: Error | null;
};
