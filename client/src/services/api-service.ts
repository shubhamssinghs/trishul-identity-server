import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosError,
} from "axios";
import { TokenService } from "./token-service";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
}

export class ApiService {
  private axiosInstance: AxiosInstance;
  private tokenService: TokenService;
  private refreshEndpoint: string;

  constructor(
    baseURL: string,
    tokenService: TokenService,
    refreshEndpoint = "/auth/refresh"
  ) {
    this.tokenService = tokenService;
    this.refreshEndpoint = refreshEndpoint;

    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.tokenService.accessToken;
        if (token) {
          if (typeof config.headers?.set === "function") {
            config.headers.set("Authorization", `Bearer ${token}`);
          } else if (config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (originalRequest?.skipAuthRefresh) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const refreshToken = this.tokenService.refreshToken;
          if (!refreshToken || this.tokenService.isRefreshTokenExpired) {
            this.tokenService.clearAll();
            window.location.href = "/login";
            return Promise.reject(error);
          }

          try {
            const res = await axios.post(
              `${this.axiosInstance.defaults.baseURL}${this.refreshEndpoint}`,
              { refreshToken }
            );

            const { accessToken, refreshToken: newRefresh } = res.data;
            this.tokenService.accessToken = accessToken;
            this.tokenService.refreshToken = newRefresh;

            if (
              originalRequest.headers &&
              typeof originalRequest.headers.set === "function"
            ) {
              originalRequest.headers.set(
                "Authorization",
                `Bearer ${accessToken}`
              );
            } else {
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${accessToken}`,
              };
            }

            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            this.tokenService.clearAll();
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}

const tokenService = new TokenService();
export const apiServiceInstance = new ApiService("", tokenService);
