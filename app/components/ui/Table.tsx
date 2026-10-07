"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { EmptyState } from "./EmptyState";

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  width?: string;
}

export interface FilterOption {
  key: string;
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  filters?: FilterOption[];
  pagination?: boolean;
  pageSize?: number;
  emptyTitle?: string;
  emptySubtitle?: string;
  actionButton?: React.ReactNode;
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  searchable = true,
  searchPlaceholder = "Search records...",
  searchKeys,
  filters,
  pagination = true,
  pageSize = 8,
  emptyTitle = "No records found",
  emptySubtitle = "There are no entries matching your parameters.",
  actionButton,
  onRowClick,
}: DataTableProps<T>) {

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Search filtering
  const filteredData = useMemo(() => {
    let result = [...data];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((row) => {
        if (searchKeys && searchKeys.length > 0) {
          return searchKeys.some((k) =>
            String(row[k] || "").toLowerCase().includes(term)
          );
        }
        return Object.values(row).some((val) =>
          String(val || "").toLowerCase().includes(term)
        );
      });
    }

    // Sorting
    if (sortColumn) {
      result.sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];

        if (valA === valB) return 0;
        if (valA == null) return 1;
        if (valB == null) return -1;

        if (typeof valA === "string") {
          return sortDirection === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }

        return sortDirection === "asc" ? (valA < valB ? -1 : 1) : valA < valB ? 1 : -1;
      });
    }

    return result;
  }, [data, searchTerm, searchKeys, sortColumn, sortDirection]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData;
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize, pagination]);

  const handleSort = (key: string) => {
    if (sortColumn === key) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        setSortColumn(null);
        setSortDirection("asc");
      }
    } else {
      setSortColumn(key);
      setSortDirection("asc");
    }
  };

  return (
    <div className="space-y-3">
      {/* Top Toolbar */}
      {(searchable || (filters && filters.length > 0) || actionButton) && (
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2.5">
            {searchable && (
              <div className="relative flex-1 min-w-[220px]">
                <Search
                  className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                    "text-slate-400"
                  }`}
                  size={16}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={searchPlaceholder}
                  className={`w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm border transition-all ${
                    "bg-white border-slate-200/80 text-slate-900 placeholder:text-slate-400 focus:border-purple-500 shadow-2xs"
                  }`}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 "
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            )}

            {/* Filter Dropdowns */}
            {filters &&
              filters.map((filter) => (
                <div key={filter.key} className="flex items-center space-x-1.5">
                  <SlidersHorizontal size={14} className="text-slate-400 hidden sm:inline" />
                  <select
                    value={filter.value}
                    onChange={(e) => {
                      filter.onChange(e.target.value);
                      setCurrentPage(1);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition-colors ${
                      "bg-white border-slate-200 text-slate-700 shadow-2xs"
                    }`}
                  >
                    {filter.options.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        className="bg-white text-slate-900 "
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
          </div>

          {actionButton && <div className="shrink-0">{actionButton}</div>}
        </div>
      )}

      {/* Main Table Container */}
      <div
        className={`rounded-2xl border overflow-hidden transition-all ${
          "bg-white border-slate-200/80 shadow-2xs"
        }`}
      >
        <div className="overflow-x-auto sidebar-scrollbar">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            {/* Table Header */}
            <thead>
              <tr
                className={`border-b ${
                  "border-slate-100 bg-slate-50/70 text-slate-500"
                }`}
              >
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{ width: col.width }}
                    className={`px-4 py-3 font-semibold text-[11px] uppercase tracking-wider ${
                      col.align === "center"
                        ? "text-center"
                        : col.align === "right"
                        ? "text-right"
                        : "text-left"
                    } ${col.sortable ? "cursor-pointer select-none" : ""}`}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <div
                      className={`inline-flex items-center space-x-1.5 ${
                        col.align === "center"
                          ? "justify-center"
                          : col.align === "right"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="text-slate-400">
                          {sortColumn === col.key ? (
                            sortDirection === "asc" ? (
                              <ArrowUp size={12} className="text-purple-500" />
                            ) : (
                              <ArrowDown size={12} className="text-purple-500" />
                            )
                          ) : (
                            <ArrowUpDown size={12} />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 ">
              {loading ? (
                // Skeleton Rows
                Array.from({ length: pageSize > 5 ? 5 : pageSize }).map((_, idx) => (
                  <tr key={idx} className="h-12">
                    {columns.map((col, cIdx) => (
                      <td key={cIdx} className="px-4 py-3">
                        <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="p-0">
                    <EmptyState
                      title={emptyTitle}
                      description={emptySubtitle}
                    />
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rIdx) => (
                  <tr
                    key={row.id || rIdx}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`h-12 transition-colors ${
                      onRowClick ? "cursor-pointer" : ""
                    } ${
                      "hover:bg-slate-50/80 text-slate-800"
                    }`}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 py-3 align-middle ${
                          col.align === "center"
                            ? "text-center"
                            : col.align === "right"
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        {col.render ? col.render(row, rIdx) : row[col.key] ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        {pagination && filteredData.length > 0 && !loading && (
          <div
            className={`px-4 py-3 border-t flex items-center justify-between text-xs ${
              "border-slate-100 bg-slate-50/50 text-slate-500"
            }`}
          >
            <div>
              Showing{" "}
              <span className="font-semibold text-slate-900 ">
                {(currentPage - 1) * pageSize + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-slate-900 ">
                {Math.min(currentPage * pageSize, filteredData.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900 ">
                {filteredData.length}
              </span>{" "}
              records
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>

              <span className="px-2 font-medium">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
