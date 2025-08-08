import { JwtPayload } from "jsonwebtoken";

export interface AuthServiceTokenPayload extends JwtPayload {
  id?: string;
  sub?: string;
  email?: string;
}

export interface CreateAuthorizationCodePayload {
  code: string;
  userId: string;
  clientId: string;
  redirectUri: string;
  scope: string;
  expiresAt: Date;
}

export interface FindValidAuthorizationCodePayload {
  code: string;
}

export interface MarkAuthorizationCodeUsedPayload {
  id: string;
}

export interface AuthorizationCodeModelInterface {
  create(payload: CreateAuthorizationCodePayload): Promise<void>;
  findValid(payload: FindValidAuthorizationCodePayload): Promise<any>;
  markUsed(payload: MarkAuthorizationCodeUsedPayload): Promise<void>;
}
