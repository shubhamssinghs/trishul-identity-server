export interface TokenPayload {
  sub: string;
  clientId: string;
  email?: string;
  name?: string;
  roles: string[];
  scope?: string;
  iat?: number;
  exp?: number;
  aud?: string;
  iss?: string;
  jti?: string;
}
