export interface SaveConsentPayload {
  userId: string;
  clientId: string;
  scope: string;
}

export interface FindConsentPayload {
  userId: string;
  clientId: string;
}

export interface ConsentModelInterface {
  saveConsent(payload: SaveConsentPayload): Promise<void>;
  findConsent(payload: FindConsentPayload): Promise<any>;
}
