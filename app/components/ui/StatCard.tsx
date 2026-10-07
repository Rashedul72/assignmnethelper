"use client";

import React from "react";
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

  const colorStyles = {
    purple: {
      iconBg: "bg-purple-50 text-purple-600 border-purple-200/60 ",
      trendBadge: "bg-purple-50 text-purple-700 border-purple-200/60 ",
      accentBorder: "",
    },
    blue: {
      iconBg: "bg-blue-50 text-blue-600 border-blue-200/60 ",
      trendBadge: "bg-blue-50 text-blue-700 border-blue-200/60 ",
      accentBorder: "",
    },
    amber: {
      iconBg: "bg-amber-50 text-amber-600 border-amber-200/60 ",
      trendBadge: "bg-amber-50 text-amber-700 border-amber-200/60 ",
      accentBorder: "",
    },
    emerald: {
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/60 ",
      trendBadge: "bg-emerald-50 text-emerald-700 border-emerald-200/60 ",
      accentBorder: "",
    },
    pink: {
      iconBg: "bg-rose-50 text-rose-600 border-rose-200/60 ",
      trendBadge: "bg-rose-50 text-rose-700 border-rose-200/60 ",
      accentBorder: "",
    },
  }[colorScheme];

  return (
    <div
      className={`p-5 rounded-2xl border transition-all relative overflow-hidden ${
        "bg-white border-slate-200/80 text-slate-900 shadow-2xs hover:border-slate-300"
      }`}
    >
      <div className="flex items-center justify-between gap-3 relative z-10">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ">
          {title}
        </span>
        <div
          className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${colorStyles.iconBg}`}
        >
          <Icon size={18} />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2 relative z-10">
        <span className="text-2xl font-black tracking-tight text-slate-900 font-mono">
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
        <p className="mt-1.5 text-xs text-slate-500 relative z-10">
          {subtext}
        </p>
      )}
    </div>
  );
}
