export class TokenService {
  private accessTokenKey = "access_token";
  private refreshTokenKey = "refresh_token";

  private memoryStorage: Record<string, string | null> = {};
  private useMemoryFallback: boolean;

  constructor(useMemoryFallback = false) {
    this.useMemoryFallback = useMemoryFallback;
  }

  private get storage(): Storage | Record<string, string | null> {
    if (this.useMemoryFallback || typeof window === "undefined") {
      return this.memoryStorage;
    }
    return localStorage;
  }

  private setItem(key: string, value: string) {
    if ("setItem" in this.storage) {
      (this.storage as Storage).setItem(key, value);
    } else {
      this.storage[key] = value;
    }
  }

  private getItem(key: string): string | null {
    if ("getItem" in this.storage) {
      return (this.storage as Storage).getItem(key);
    }
    return this.storage[key] ?? null;
  }

  private removeItem(key: string) {
    if ("removeItem" in this.storage) {
      (this.storage as Storage).removeItem(key);
    } else {
      this.storage[key] = null;
    }
  }

  set accessToken(token: string) {
    this.setItem(this.accessTokenKey, token);
  }

  get accessToken(): string | null {
    return this.getItem(this.accessTokenKey);
  }

  removeAccessToken() {
    this.removeItem(this.accessTokenKey);
  }

  set refreshToken(token: string) {
    this.setItem(this.refreshTokenKey, token);
  }

  get refreshToken(): string | null {
    return this.getItem(this.refreshTokenKey);
  }

  removeRefreshToken() {
    this.removeItem(this.refreshTokenKey);
  }

  clearAll() {
    this.removeAccessToken();
    this.removeRefreshToken();
  }

  isExpired(token: string | null): boolean {
    if (!token) return true;
    try {
      const [, payloadBase64] = token.split(".");
      const payload = JSON.parse(atob(payloadBase64));
      if (!payload.exp) return true;

      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch {
      return true;
    }
  }

  get isAccessTokenExpired(): boolean {
    return this.isExpired(this.accessToken);
  }

  get isRefreshTokenExpired(): boolean {
    return this.isExpired(this.refreshToken);
  }
}

export const tokenServiceInstance = new TokenService();
