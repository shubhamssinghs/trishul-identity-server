import SelectBase from "react-select";
import AsyncSelect from "react-select/async";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import {
  inputVariantClasses,
  selectVariantClasses,
  type UI_Color,
  type UI_Size,
} from "@styles";
import type { SelectOption, SelectProps } from "./types";

const selectSizeClasses: Record<UI_Size, string> = {
  xxs: "text-xs px-2 py-1",
  xs: "text-xs px-3 py-1.5",
  sm: "text-sm px-3 py-2",
  md: "text-base px-4 py-2.5",
  lg: "text-lg px-4 py-3",
  xl: "text-xl px-5 py-3.5",
};

export const Select = <T extends Record<string, unknown> = SelectOption>(
  props: SelectProps<T>
) => {
  const {
    label,
    isInvalid,
    isSuccess,
    errorMessage,
    successMessage,
    wrapperClassName,
    labelClassName,
    className,
    size = "sm",
    variant = "outline",
    color = "light",
    isMulti = false,
    placeholder = "Select an option",
    onChange,
    value,
    ...rest
  } = props;

  const validationColor: UI_Color = isInvalid
    ? "error"
    : isSuccess
    ? "success"
    : color;

  const selectClass = twMerge(
    clsx(
      "w-full rounded-box border-none shadow-none bg-transparent outline-none focus:outline-none !p-0 !m-0",
      selectSizeClasses[size],
      inputVariantClasses(variant, validationColor),
      className
    )
  );

  const variantStyles = selectVariantClasses(variant, validationColor);

  const selectClassNames = {
    control: () => variantStyles.control,
    placeholder: () => variantStyles.placeholder,
    singleValue: () => variantStyles.singleValue,
    multiValue: () => variantStyles.multiValue,
    option: () => variantStyles.option,
    menu: () => variantStyles.menu,
  };

  const SelectComponent = props.async ? AsyncSelect : SelectBase;

  const loadOptions = async (inputValue: string) => {
    if (!props.async || !props.url) return [];

    try {
      const res = await fetch(`${props.url}?search=${inputValue}`);
      const data: T[] = await res.json();

      return data.map((item) => ({
        value: item[props.valueKey ?? "id"] as string | number,
        label: item[props.labelKey ?? "name"] as string,
        original: item,
      }));
    } catch (err) {
      console.error("Failed to load options", err);
      return [];
    }
  };

  return (
    <div className={twMerge(wrapperClassName)}>
      {label && (
        <label className={twMerge("text-sm font-medium mb-1", labelClassName)}>
          {label}
        </label>
      )}

      <SelectComponent
        isMulti={isMulti}
        classNamePrefix="custom-select"
        className={selectClass}
        classNames={selectClassNames}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...(props.async
          ? {
              loadOptions,
              cacheOptions: true,
              defaultOptions: true,
            }
          : {
              options: props.options,
            })}
        {...rest}
      />

      {isInvalid && errorMessage && (
        <p className="!text-error text-xs mt-1">{errorMessage}</p>
      )}
      {isSuccess && successMessage && (
        <p className="!text-success text-xs mt-1">{successMessage}</p>
      )}
    </div>
  );
};
