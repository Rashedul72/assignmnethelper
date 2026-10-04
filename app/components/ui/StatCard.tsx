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
      iconBg: "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 border-purple-200/50 dark:border-purple-800/50",
    },
    blue: {
      iconBg: "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/50",
    },
    amber: {
      iconBg: "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/50",
    },
    emerald: {
      iconBg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/50",
    },
    pink: {
      iconBg: "bg-pink-50 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400 border-pink-200/50 dark:border-pink-800/50",
    },
  }[colorScheme];

  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        isDark
          ? "bg-[#0b0826]/70 border-white/[0.08] text-slate-100 shadow-2xs hover:border-white/20"
          : "bg-white border-slate-200/80 text-slate-900 shadow-2xs hover:border-slate-300"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div
          className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${colorStyles.iconBg}`}
        >
          <Icon size={18} />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {value}
        </span>

        {trend && (
          <span
            className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border ${
              trendUp
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60"
                : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/60"
            }`}
          >
            {trendUp ? (
              <ArrowUpRight size={12} className="mr-0.5" />
            ) : (
              <ArrowDownRight size={12} className="mr-0.5" />
            )}
            {trend}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
          {subtext}
        </p>
      )}
    </div>
  );
}
