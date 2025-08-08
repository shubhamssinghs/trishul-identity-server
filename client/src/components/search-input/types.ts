export interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onDebouncedChange?: (value: string) => void;
  delay?: number;
  wrapperClassName?: string;
  placeholder?: string;
  disable?: boolean;
}
