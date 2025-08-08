import { tokenServiceInstance } from "@services";

export function useAuth() {
  return {
    isAuthenticated: !tokenServiceInstance.isAccessTokenExpired,
  };
}
