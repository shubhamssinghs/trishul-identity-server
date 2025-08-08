/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ValidationSchema } from "@types";

export interface FormInputProps<T = any> {
  name: string;
  value?: T;
  onChange?: (value: T) => void;
  onBlur?: React.FocusEventHandler<any>;
  error?: string;
  isInvalid?: boolean;
  [key: string]: any;
}

type ValidateOn = "submit" | "change" | "blur" | "keyup" | "keydown";

export type FormValues = Record<string, any>;

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  initialValues: FormValues;
  schema: ValidationSchema;
  validateOn?: ValidateOn;
  onSubmit: (values: FormValues) => void;
  children?: React.ReactElement[];
}
