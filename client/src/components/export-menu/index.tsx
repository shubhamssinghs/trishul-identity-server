import { Dropdown } from "../ui";
import type { ExportMenuProps, ExportTypes } from "./types";

export const exportLabels: Record<ExportTypes, string> = {
  pdf: "Export to PDF",
  csv: "Export to CSV",
  xlsx: "Export to Excel",
  json: "Export to JSON",
};

export const ExportMenu = <T,>({
  disabledExportTypes = [],
  ...dropdownProps
}: ExportMenuProps<T>) => {
  const exportTypes: ExportTypes[] = ["pdf", "csv", "xlsx", "json"];

  const filteredOptions = exportTypes
    .filter((type) => !disabledExportTypes.includes(type))
    .map((type) => ({
      label: exportLabels[type],
      value: type,
    }));

  return <Dropdown options={filteredOptions} {...dropdownProps} />;
};
