import type { Props as SelectBaseProps } from "react-select";
import {
  type GroupBase,
  type SingleValue,
  type MultiValue,
  type ActionMeta,
} from "react-select";
import { type UI_Size, type UI_Color, type UI_Variant } from "@styles";

export interface SelectOption {
  label: string;
  value: string | number;
  [key: string]: unknown;
}

export type OnSelectChange = (
  value: SingleValue<SelectOption> | MultiValue<SelectOption>,
  meta: ActionMeta<SelectOption>
) => void;

export interface CommonProps {
  label?: string;
  isInvalid?: boolean;
  isSuccess?: boolean;
  errorMessage?: string;
  successMessage?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  className?: string;
  size?: UI_Size;
  color?: UI_Color;
  variant?: UI_Variant;
  isMulti?: boolean;
  placeholder?: string;
  onChange?: OnSelectChange;
  value?: SingleValue<SelectOption> | MultiValue<SelectOption>;
}

export interface SyncProps
  extends CommonProps,
    Omit<
      SelectBaseProps<SelectOption, boolean, GroupBase<SelectOption>>,
      "className" | "classNames" | "options" | "onChange" | "placeholder"
    > {
  async?: false;
  options: SelectOption[];
}

export interface AsyncProps<T extends object = Record<string, unknown>>
  extends CommonProps,
    Omit<
      SelectBaseProps<SelectOption, boolean, GroupBase<SelectOption>>,
      "className" | "classNames" | "options" | "onChange" | "placeholder"
    > {
  async: true;
  url: string;
  valueKey?: keyof T;
  labelKey?: keyof T;
}

export type SelectProps<T extends object = Record<string, unknown>> =
  | SyncProps
  | AsyncProps<T>;
