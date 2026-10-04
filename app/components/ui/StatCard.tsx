"use client";

import React from "react";
import { useTheme } from "./ThemeContext";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  colorScheme?: "blue" | "purple" | "amber" | "emerald" | "pink";
  subtext?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp = true,
  colorScheme = "purple",
  subtext,
}: StatCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colorStyles = {
    purple: {
      iconBg: "bg-purple-50 text-purple-600 dark:bg-purple-950/70 dark:text-purple-400 border-purple-200/60 dark:border-purple-800/60",
      trendBadge: "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/60",
      accentBorder: "dark:hover:border-purple-500/30",
    },
    blue: {
      iconBg: "bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400 border-blue-200/60 dark:border-blue-800/60",
      trendBadge: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/60",
      accentBorder: "dark:hover:border-blue-500/30",
    },
    amber: {
      iconBg: "bg-amber-50 text-amber-600 dark:bg-amber-950/70 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/60",
      trendBadge: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/60",
      accentBorder: "dark:hover:border-amber-500/30",
    },
    emerald: {
      iconBg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60",
      trendBadge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/60",
      accentBorder: "dark:hover:border-emerald-500/30",
    },
    pink: {
      iconBg: "bg-rose-50 text-rose-600 dark:bg-rose-950/70 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/60",
      trendBadge: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200/60 dark:border-rose-800/60",
      accentBorder: "dark:hover:border-rose-500/30",
    },
  }[colorScheme];

  return (
    <div
      className={`p-5 rounded-2xl border transition-all relative overflow-hidden ${
        isDark
          ? `bg-[#0b0826]/80 border-white/[0.08] text-slate-100 shadow-sm ${colorStyles.accentBorder}`
          : "bg-white border-slate-200/80 text-slate-900 shadow-2xs hover:border-slate-300"
      }`}
    >
      <div className="flex items-center justify-between gap-3 relative z-10">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div
          className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${colorStyles.iconBg}`}
        >
          <Icon size={18} />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2 relative z-10">
        <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-mono">
          {value}
        </span>

        {trend && (
          <span
            className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${colorStyles.trendBadge}`}
          >
            {trendUp ? (
              <ArrowUpRight size={12} className="mr-0.5 shrink-0" />
            ) : (
              <ArrowDownRight size={12} className="mr-0.5 shrink-0" />
            )}
            <span className="truncate max-w-[130px]">{trend}</span>
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 relative z-10">
          {subtext}
        </p>
      )}
    </div>
  );
}
