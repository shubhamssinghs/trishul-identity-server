/* eslint-disable @typescript-eslint/no-explicit-any */
export type ValidationRule = {
  required?: boolean | string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  match?: string;
  email?: boolean;
  number?: boolean;
  validate?: (value: any, values?: Record<string, any>) => string | null;
  name?: string;
};

export type ValidationSchema = Record<string, ValidationRule>;
