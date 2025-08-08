import type { DropdownProps } from "../ui/dropdown/types";

export type ExportTypes = "pdf" | "csv" | "xlsx" | "json";

export interface ExportMenuProps<T> extends DropdownProps<T> {
  disabledExportTypes?: ExportTypes[];
}
