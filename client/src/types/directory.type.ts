import type { Group } from "./group.type";

export type Directory = {
  id: string;
  client_id?: string;
  name: string;
  description: string;
  is_default?: boolean;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;

  groups?: Group[];
};
