/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ServiceResult } from "../types";

export abstract class BaseService {
  protected async handle<T>(fn: () => Promise<T>): Promise<ServiceResult<T>> {
    const result: ServiceResult<T> = {
      isLoading: true,
      response: null,
      error: null,
    };

    try {
      result.response = await fn();
    } catch (error: any) {
      result.error = error;
      result.response = error?.response?.data ?? null;
    } finally {
      result.isLoading = false;
    }

    return result;
  }
}
