import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { useDebounce } from "@hooks";
import type { SearchInputProps } from "./types";

export const SearchInput = ({
  value = "",
  onChange,
  onDebouncedChange,
  delay = 500,
  wrapperClassName,
  placeholder = "Type to search...",
  disable,
}: SearchInputProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const debouncedValue = useDebounce(internalValue, delay);

  useEffect(() => {
    if (onDebouncedChange) onDebouncedChange(debouncedValue);
  }, [debouncedValue, onDebouncedChange]);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalValue(val);
    onChange?.(val);
  };

  return (
    <Input
      variant="outline"
      value={internalValue}
      onChange={handleChange}
      placeholder={placeholder}
      wrapperClassName={wrapperClassName}
      disabled={disable}
    />
  );
};
