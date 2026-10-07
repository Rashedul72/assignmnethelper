"use client";

import React from "react";
import { FolderOpen } from "lucide-react";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ElementType;
}

export function EmptyState({
  title = "No data available",
  description = "There are no records found matching your current parameters.",
  action,
  icon: Icon = FolderOpen,
}: EmptyStateProps) {

  return (
    <div
      className={`py-12 px-4 flex flex-col items-center justify-center text-center rounded-2xl border transition-all ${
        "bg-slate-50/50 border-slate-200/60 text-slate-600"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-3 ${
          "bg-purple-50 border-purple-200 text-purple-600"
        }`}
      >
        <Icon size={24} />
      </div>

      <h3 className="text-base font-semibold text-slate-900 ">
        {title}
      </h3>
      <p className="text-xs text-slate-500 max-w-sm mt-1">
        {description}
      </p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
