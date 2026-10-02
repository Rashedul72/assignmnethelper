"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search01Icon,
  FilterIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Sorting01Icon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  FileNotFoundIcon,
  Cancel01Icon,
} from "hugeicons-react";
import { useTheme } from "./ThemeContext";

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
  emptySubtitle = "There are no entries matching your current parameters.",
  actionButton,
  onRowClick,
}: DataTableProps<T>) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
          return searchKeys.some((k) => String(row[k] || "").toLowerCase().includes(term));
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
    <div className="space-y-4">
      {/* Top Toolbar */}
      {(searchable || (filters && filters.length > 0) || actionButton) && (
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            {searchable && (
              <div className="relative flex-1 min-w-[240px]">
                <Search01Icon
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${
                    isDark ? "text-gray-400" : "text-slate-400"
                  }`}
                  size={18}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={searchPlaceholder}
                  className={`w-full border rounded-2xl py-2.5 pl-10 pr-9 text-sm transition-all ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500"
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-600 shadow-sm"
                  }`}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                      isDark ? "text-gray-400 hover:text-white" : "text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    <Cancel01Icon size={14} />
                  </button>
                )}
              </div>
            )}

            {filters &&
              filters.map((filter) => (
                <div key={filter.key} className="relative min-w-[140px]">
                  <select
                    value={filter.value}
                    onChange={(e) => {
                      filter.onChange(e.target.value);
                      setCurrentPage(1);
                    }}
                    className={`w-full border rounded-2xl py-2.5 pl-4 pr-8 text-sm appearance-none font-medium ${
                      isDark
                        ? "bg-white/5 border-white/10 text-gray-200 focus:border-purple-500"
                        : "bg-white border-slate-200 text-slate-700 focus:border-purple-600 shadow-sm"
                    }`}
                  >
                    {filter.options.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        className={isDark ? "bg-[#0b0628] text-white" : "bg-white text-slate-900"}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <FilterIcon
                    size={14}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                      isDark ? "text-gray-400" : "text-slate-400"
                    }`}
                  />
                </div>
              ))}
          </div>

          {actionButton && <div className="shrink-0">{actionButton}</div>}
        </div>
      )}

      {/* Main Table Container */}
      <div
        className={`border rounded-3xl overflow-hidden transition-all ${
          isDark
            ? "bg-black/30 border-white/10 shadow-2xl backdrop-blur-xl"
            : "bg-white border-slate-200 shadow-sm"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className={`border-b text-xs font-semibold uppercase tracking-wider ${
                  isDark
                    ? "border-white/10 bg-white/[0.03] text-gray-400"
                    : "border-slate-200 bg-slate-50 text-slate-500"
                }`}
              >
                {columns.map((col) => {
                  const isSorted = sortColumn === col.key;
                  return (
                    <th
                      key={col.key}
                      style={{ width: col.width }}
                      className={`p-4 ${
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                          ? "text-center"
                          : "text-left"
                      }`}
                    >
                      {col.sortable ? (
                        <button
                          onClick={() => handleSort(col.key)}
                          className={`inline-flex items-center space-x-1.5 transition-colors group ${
                            isDark ? "hover:text-white" : "hover:text-slate-900"
                          }`}
                        >
                          <span>{col.header}</span>
                          {isSorted ? (
                            sortDirection === "asc" ? (
                              <ArrowUp01Icon size={14} className="text-purple-500" />
                            ) : (
                              <ArrowDown01Icon size={14} className="text-purple-500" />
                            )
                          ) : (
                            <Sorting01Icon
                              size={14}
                              className="opacity-0 group-hover:opacity-100 text-gray-400 transition-opacity"
                            />
                          )}
                        </button>
                      ) : (
                        <span>{col.header}</span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? "divide-white/5" : "divide-slate-100"}`}>
              {loading ? (
                // Loading Skeleton Rows
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    {columns.map((col, cIdx) => (
                      <td key={cIdx} className="p-4">
                        <div
                          className={`h-4 rounded-lg w-3/4 ${
                            isDark ? "bg-white/10" : "bg-slate-200"
                          }`}
                        />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginatedData.length === 0 ? (
                // Empty State
                <tr>
                  <td colSpan={columns.length} className="p-12 text-center">
                    <div
                      className={`w-16 h-16 rounded-2xl border flex items-center justify-center mx-auto mb-4 ${
                        isDark
                          ? "bg-white/5 border-white/10 text-gray-500"
                          : "bg-slate-50 border-slate-200 text-slate-400"
                      }`}
                    >
                      <FileNotFoundIcon size={28} />
                    </div>
                    <h3
                      className={`text-lg font-bold mb-1 ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {emptyTitle}
                    </h3>
                    <p
                      className={`text-sm max-w-sm mx-auto ${
                        isDark ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      {emptySubtitle}
                    </p>
                  </td>
                </tr>
              ) : (
                // Data Rows
                paginatedData.map((row, index) => (
                  <motion.tr
                    key={row.id || index}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.2 }}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`border-b transition-colors ${
                      isDark
                        ? "border-white/5 hover:bg-white/[0.04] text-gray-200"
                        : "border-slate-100 hover:bg-slate-50/80 text-slate-800"
                    } ${onRowClick ? "cursor-pointer" : ""}`}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`p-4 text-sm ${
                          col.align === "right"
                            ? "text-right"
                            : col.align === "center"
                            ? "text-center"
                            : "text-left"
                        }`}
                      >
                        {col.render
                          ? col.render(row, (currentPage - 1) * pageSize + index)
                          : row[col.key] ?? "—"}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        {pagination && !loading && filteredData.length > 0 && (
          <div
            className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-sm ${
              isDark
                ? "border-white/10 bg-white/[0.02] text-gray-400"
                : "border-slate-200 bg-slate-50/50 text-slate-600"
            }`}
          >
            <div>
              Showing{" "}
              <span className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                {(currentPage - 1) * pageSize + 1}
              </span>{" "}
              to{" "}
              <span className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                {Math.min(currentPage * pageSize, filteredData.length)}
              </span>{" "}
              of{" "}
              <span className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                {filteredData.length}
              </span>{" "}
              entries
            </div>

            <div className="flex items-center space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={`p-2 rounded-xl border disabled:opacity-40 disabled:pointer-events-none transition-all ${
                  isDark
                    ? "bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm"
                }`}
                aria-label="Previous Page"
              >
                <ArrowLeft01Icon size={16} />
              </button>

              <span
                className={`px-3 py-1 border rounded-xl text-xs font-semibold ${
                  isDark
                    ? "bg-white/5 border-white/10 text-white"
                    : "bg-white border-slate-200 text-slate-800 shadow-sm"
                }`}
              >
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className={`p-2 rounded-xl border disabled:opacity-40 disabled:pointer-events-none transition-all ${
                  isDark
                    ? "bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm"
                }`}
                aria-label="Next Page"
              >
                <ArrowRight01Icon size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
