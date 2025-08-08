export interface CreateAccessTokenPayload {
  userId: string;
  clientId: string;
  token: string;
  scope: string;
  expiresAt: Date;
}

export interface FindAccessTokenPayload {
  token: string;
}

export interface DeleteAccessTokenPayload {
  token: string;
}

export interface AccessTokenModelInterface {
  create(payload: CreateAccessTokenPayload): Promise<void>;
  find(payload: FindAccessTokenPayload): Promise<any>;
  delete(payload: DeleteAccessTokenPayload): Promise<void>;
}
