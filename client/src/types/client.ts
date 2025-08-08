import type { AbortParam } from "./abort.type";
import type { Directory } from "./directory.type";
import type { User } from "./user";

export type Client = {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  theme_color?: string;
  support_email: string;
  created_by?: string;
  is_active?: boolean;
  creator?: User;
  created_at?: Date;
  updated_at?: Date;

  directories?: Directory[];
};

export type ClientQueryParams = AbortParam & {
  id: string;
  scope?: string;
};

export type ClientCreateInput = AbortParam &
  Omit<Client, "id" | "created_by" | "is_active" | "created_at" | "updated_at">;

export type ClientUpdateInput = Partial<ClientCreateInput> &
  AbortParam & {
    id: string;
  };

export type ClientDeleteParams = Pick<Client, "id"> & AbortParam;
