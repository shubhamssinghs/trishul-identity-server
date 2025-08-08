import type {
  Client,
  ClientCreateInput,
  ClientDeleteParams,
  ClientQueryParams,
  ClientUpdateInput,
  Pagination,
  PaginationResponse,
  ServiceResult,
} from "@types";
import { apiServiceInstance } from "./api-service";
import { BaseService } from "./base-service";

class ClientService extends BaseService {
  private readonly base_url = "/api/v1/clients";

  list = ({
    signal,
    ...rest
  }: Pagination): Promise<ServiceResult<PaginationResponse<Client>>> => {
    return this.handle(() =>
      apiServiceInstance.get<PaginationResponse<Client>>(this.base_url, {
        params: { ...rest },
        signal,
      })
    );
  };

  get = ({
    id,
    scope,
    signal,
  }: ClientQueryParams): Promise<ServiceResult<Client>> => {
    return this.handle(() =>
      apiServiceInstance.get<Client>(`${this.base_url}/${id}`, {
        params: scope ? { scope } : undefined,
        signal,
      })
    );
  };

  create = ({
    signal,
    ...rest
  }: ClientCreateInput): Promise<ServiceResult<Client>> => {
    return this.handle(() =>
      apiServiceInstance.post<Client>(this.base_url, { ...rest }, { signal })
    );
  };

  patch = ({
    id,
    signal,
    ...rest
  }: ClientUpdateInput): Promise<ServiceResult<Client>> => {
    return this.handle(() =>
      apiServiceInstance.patch<Client>(`${this.base_url}/${id}`, rest, {
        signal,
      })
    );
  };

  delete = ({
    id,
  }: ClientDeleteParams & { signal?: AbortSignal }): Promise<
    ServiceResult<void>
  > => {
    return this.handle(() =>
      apiServiceInstance.delete(`${this.base_url}/${id}`)
    );
  };
}

export const clientServiceInstance = new ClientService();
