export interface CreateRefreshTokenPayload {
  userId: string;
  clientId: string;
  token: string;
  scope: string;
  expiresAt: Date;
}

export interface FindValidRefreshTokenPayload {
  token: string;
}

export interface MarkRefreshTokenUsedPayload {
  id: string;
}

export interface RefreshTokenModelInterface {
  create(payload: CreateRefreshTokenPayload): Promise<void>;
  findValid(payload: FindValidRefreshTokenPayload): Promise<any>;
  markUsed(payload: MarkRefreshTokenUsedPayload): Promise<void>;
}
