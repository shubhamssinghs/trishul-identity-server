export interface CreateUserProviderPayload {
  userId: string;
  provider: string;
  providerUserId: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
}

export interface FindUserProviderPayload {
  userId: string;
  provider: string;
}

export interface FindUserProviderByProviderUserPayload {
  provider: string;
  providerUserId: string;
}

export interface UserProviderModelInterface {
  create(payload: CreateUserProviderPayload): Promise<void>;
  find(payload: FindUserProviderPayload): Promise<any>;
  findByProviderUser(
    payload: FindUserProviderByProviderUserPayload
  ): Promise<any>;
}
