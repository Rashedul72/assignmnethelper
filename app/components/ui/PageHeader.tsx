"use client";

import React from "react";

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

  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl border transition-all mb-6 ${
        "bg-white border-slate-200/80 text-slate-900 shadow-2xs"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2.5">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              {title}
            </h1>
            {badge && (
              <span className="text-[11px] font-semibold tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200/60 uppercase">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p
              className={`text-xs sm:text-sm ${
                "text-slate-500"
              }`}
            >
              {description}
            </p>
          )}
        </div>

        {actions && <div className="flex items-center space-x-2.5 shrink-0">{actions}</div>}
      </div>

      {children && <div className="mt-4 pt-4 border-t border-slate-100 ">{children}</div>}
    </div>
  );
}
