import type { ServiceResult } from "../types";
import { apiServiceInstance } from "./api-service";
import { BaseService } from "./base-service";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export class AuthService extends BaseService {
  login(payload?: LoginPayload): Promise<ServiceResult<LoginResponse>> {
    return this.handle(() =>
      apiServiceInstance.post<LoginResponse>("api/v1/auth/login", payload, {
        skipAuthRefresh: true,
      })
    );
  }
}

export const authServiceInstance = new AuthService();
