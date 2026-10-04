"use client";

import React from "react";
import { useTheme } from "./ThemeContext";

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  badge,
  actions,
  children,
}: PageHeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl border transition-all mb-6 ${
        isDark
          ? "bg-[#0b0826]/70 border-white/[0.08] text-slate-100 shadow-sm"
          : "bg-white border-slate-200/80 text-slate-900 shadow-2xs"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {title}
            </h1>
            {badge && (
              <span className="text-[11px] font-semibold tracking-wider text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-200/60 dark:border-purple-800/60 uppercase">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p
              className={`text-xs sm:text-sm ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {description}
            </p>
          )}
        </div>

        {actions && <div className="flex items-center space-x-2.5 shrink-0">{actions}</div>}
      </div>

      {children && <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/[0.06]">{children}</div>}
    </div>
  );
}
