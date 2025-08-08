/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, Fragment } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

import type { SortState, TableProps } from "./types";
import {
  Select,
  type SelectOption,
  SearchInput,
  ErrorComponent,
  Badge,
} from "@components";
import { twMerge } from "tailwind-merge";

export const Table = <T extends object>({
  _data,
  columns,
  showFilters = false,
  filters,
  rowKey,
  search,
  onSearch,
  isLoading = false,
  error,
  className,
  showSearch = true,
  showColumnHide = true,
  enableRowExpand,
  expandedContent,
  expandOnRowClick = false,
  singleExpandedRow = false,
}: TableProps<T>) => {
  const [sort, setSort] = useState<SortState<T>>({
    column: null,
    direction: "asc",
  });

  const [expandedRowId, setExpandedRowId] = useState<string | number | null>(
    null
  );
  const [expandedRows, setExpandedRows] = useState<
    Record<string | number, boolean>
  >({});

  const isRowExpanded = (rowId: string | number) =>
    singleExpandedRow ? expandedRowId === rowId : !!expandedRows[rowId];

  const toggleRowExpansion = (rowId: string | number) => {
    if (singleExpandedRow) {
      setExpandedRowId((prev) => (prev === rowId ? null : rowId));
    } else {
      setExpandedRows((prev) => ({
        ...prev,
        [rowId]: !prev[rowId],
      }));
    }
  };

  const [visibleColumns, setVisibleColumns] = useState<Set<keyof T>>(
    new Set(
      columns
        .map((c) => (c.visible !== false ? c.accessor : null))
        .filter(Boolean) as (keyof T)[]
    )
  );

  const filteredData = useMemo(() => _data ?? [], [_data]);

  const sortedData = useMemo(() => {
    if (!sort.column) return filteredData;

    const column = columns.find((c) => c.accessor === sort.column);
    if (!column) return filteredData;

    const sortFn =
      column.sortFn ||
      ((a: unknown, b: unknown) =>
        sort.direction === "asc"
          ? String(a).localeCompare(String(b))
          : String(b).localeCompare(String(a)));

    return [...filteredData].sort((a, b) =>
      sortFn(
        (a as any)[sort.column as keyof T],
        (b as any)[sort.column as keyof T]
      )
    );
  }, [filteredData, sort, columns]);

  if ((error || !_data) && !isLoading) {
    return <ErrorComponent error={error} />;
  }

  const toggleSort = (accessor: keyof T) => {
    setSort((prev) => {
      if (prev.column === accessor) {
        return {
          column: accessor,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { column: accessor, direction: "asc" };
    });
  };

  const TableFilter = () => {
    if (!sortedData.length) return null;

    const columnOptions: SelectOption[] = columns.map((col) => ({
      label: col.header,
      value: col.accessor as string,
    }));

    const hiddenColumnValues = columns
      .filter((col) => !visibleColumns.has(col.accessor as keyof T))
      .map((col) => String(col.accessor));

    const handleColumnVisibilityChange = (selected: SelectOption[] | null) => {
      const selectedValues = new Set(
        selected?.map((opt) => opt.value as keyof T) ?? []
      );

      const newVisible = new Set<keyof T>();
      columns.forEach((col) => {
        if (!selectedValues.has(col.accessor as keyof T)) {
          newVisible.add(col.accessor as keyof T);
        }
      });

      setVisibleColumns(newVisible);
    };

    return (
      <section className="flex flex-col md:flex-row gap-2 items-center justify-end">
        {filters}
        {showSearch && (
          <SearchInput
            value={search}
            disable={isLoading}
            onDebouncedChange={onSearch}
            wrapperClassName="flex-1 w-full md:w-auto md:flex-none md:focus-within:flex-1 sm:focus-within:px-6 transition-all duration-300"
          />
        )}
        {showColumnHide && (
          <Select
            isMulti
            isClearable={false}
            isDisabled={isLoading}
            options={columnOptions}
            value={columnOptions.filter((opt) =>
              hiddenColumnValues.includes(opt.value.toString())
            )}
            onChange={(value) =>
              handleColumnVisibilityChange(value as SelectOption[] | null)
            }
            placeholder="Select columns to hide"
            wrapperClassName="max-w-auto flex-1 w-full md:w-auto md:flex-none"
          />
        )}
      </section>
    );
  };

  return (
    <div className={twMerge("space-y-4", className)}>
      {showFilters && <TableFilter />}

      <div className="overflow-auto border rounded-box">
        <table className="min-w-full text-left">
          <thead className="bg-menu_hover dark:bg-menu_hover-dark">
            <tr>
              {enableRowExpand && <th className="w-6 px-3 py-1" />}
              {columns.map(
                (col) =>
                  visibleColumns.has(col.accessor as keyof T) && (
                    <th
                      key={col.header}
                      className={clsx(
                        "px-3 py-1 font-semibold select-none",
                        col.sortable && "hover:underline cursor-pointer"
                      )}
                      onClick={() =>
                        col.sortable && toggleSort(col.accessor as keyof T)
                      }
                    >
                      <div className="flex items-center gap-1">
                        {col.header}
                        {sort.column === col.accessor && (
                          <span>
                            {sort.direction === "asc" ? (
                              <ChevronUpIcon className="w-4 h-4" />
                            ) : (
                              <ChevronDownIcon className="w-4 h-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  )
              )}
            </tr>
          </thead>

          <tbody>
            {sortedData.map((row, rowIndex) => {
              const rowId = rowKey?.(row) ?? rowIndex;
              const expanded = isRowExpanded(rowId);

              return (
                <Fragment key={rowId}>
                  <tr
                    className={clsx(
                      "border-b border-border dark:border-border-dark",
                      "hover:bg-menu_hover/50 dark:hover:bg-menu_hover-dark/50",
                      rowIndex % 2 === 0 && "bg-muted dark:bg-muted-dark",
                      expandOnRowClick && "cursor-pointer"
                    )}
                    onClick={() =>
                      expandOnRowClick ? toggleRowExpansion(rowId) : undefined
                    }
                  >
                    {enableRowExpand && (
                      <td className="px-3 py-2">
                        <Badge
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRowExpansion(rowId);
                          }}
                          className="cursor-pointer w-5 h-5 p-0 flex justify-center items-center"
                          data-tooltip-content="Expand row"
                          color="light"
                          rounded={false}
                        >
                          {expanded ? (
                            <MinusIcon className="w-3 h-3 text-text dark:text-text-dark" />
                          ) : (
                            <PlusIcon className="w-3 h-3 text-text dark:text-text-dark" />
                          )}
                        </Badge>
                      </td>
                    )}

                    {columns.map(
                      (col) =>
                        visibleColumns.has(col.accessor as keyof T) && (
                          <td
                            key={col.accessor as string}
                            className="px-3 py-2 text-sm truncate whitespace-nowrap overflow-hidden min-w-[140px] max-w-[240px]"
                          >
                            {(() => {
                              const accessor = col.accessor;
                              const isRealColumn = accessor in row;
                              const value = isRealColumn
                                ? row[accessor as keyof T]
                                : undefined;

                              return col.cell
                                ? col.cell(value as any, row)
                                : col.renderValue
                                ? col.renderValue(value as any)
                                : value != null
                                ? String(value)
                                : "";
                            })()}
                          </td>
                        )
                    )}
                  </tr>

                  {enableRowExpand && expanded && (
                    <tr className={clsx("bg-muted/30 dark:bg-muted-dark/30")}>
                      <td
                        colSpan={columns.length + 1}
                        className="px-6 py-4  bg-gray-100 dark:bg-menu_hover-dark"
                      >
                        {expandedContent?.(row)}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}

            {!sortedData.length && (
              <tr>
                <td colSpan={columns.length + 1} className="p-4 text-center">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
