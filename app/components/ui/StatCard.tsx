"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight01Icon } from "hugeicons-react";
import { useTheme } from "./ThemeContext";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  colorScheme?: "blue" | "purple" | "amber" | "emerald" | "pink";
  delay?: number;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp = true,
  colorScheme = "purple",
  delay = 0,
}: StatCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const darkSchemeStyles = {
    purple: {
      gradient: "from-purple-600/15 via-purple-500/5 to-transparent",
      border: "border-purple-500/20 hover:border-purple-500/40",
      iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      shadow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    },
    blue: {
      gradient: "from-blue-600/15 via-blue-500/5 to-transparent",
      border: "border-blue-500/20 hover:border-blue-500/40",
      iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      shadow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    },
    amber: {
      gradient: "from-amber-600/15 via-amber-500/5 to-transparent",
      border: "border-amber-500/20 hover:border-amber-500/40",
      iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      shadow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    },
    emerald: {
      gradient: "from-emerald-600/15 via-emerald-500/5 to-transparent",
      border: "border-emerald-500/20 hover:border-emerald-500/40",
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      shadow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    },
    pink: {
      gradient: "from-pink-600/15 via-pink-500/5 to-transparent",
      border: "border-pink-500/20 hover:border-pink-500/40",
      iconBg: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      shadow: "hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]",
    },
  }[colorScheme];

  const lightSchemeStyles = {
    purple: {
      gradient: "from-purple-50/50 via-white to-white",
      border: "border-slate-200 hover:border-purple-300",
      iconBg: "bg-purple-100 text-purple-700 border-purple-200",
      shadow: "hover:shadow-lg hover:shadow-purple-500/5",
    },
    blue: {
      gradient: "from-blue-50/50 via-white to-white",
      border: "border-slate-200 hover:border-blue-300",
      iconBg: "bg-blue-100 text-blue-700 border-blue-200",
      shadow: "hover:shadow-lg hover:shadow-blue-500/5",
    },
    amber: {
      gradient: "from-amber-50/50 via-white to-white",
      border: "border-slate-200 hover:border-amber-300",
      iconBg: "bg-amber-100 text-amber-700 border-amber-200",
      shadow: "hover:shadow-lg hover:shadow-amber-500/5",
    },
    emerald: {
      gradient: "from-emerald-50/50 via-white to-white",
      border: "border-slate-200 hover:border-emerald-300",
      iconBg: "bg-emerald-100 text-emerald-700 border-emerald-200",
      shadow: "hover:shadow-lg hover:shadow-emerald-500/5",
    },
    pink: {
      gradient: "from-pink-50/50 via-white to-white",
      border: "border-slate-200 hover:border-pink-300",
      iconBg: "bg-pink-100 text-pink-700 border-pink-200",
      shadow: "hover:shadow-lg hover:shadow-pink-500/5",
    },
  }[colorScheme];

  const schemeStyles = isDark ? darkSchemeStyles : lightSchemeStyles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`relative overflow-hidden bg-gradient-to-br ${schemeStyles.gradient} border ${
        schemeStyles.border
      } rounded-3xl p-6 transition-all duration-300 ${schemeStyles.shadow} group ${
        isDark ? "bg-black/40 backdrop-blur-xl" : "bg-white shadow-sm"
      }`}
    >
      {/* Background Icon Watermark */}
      <div
        className={`absolute -bottom-4 -right-4 transition-colors pointer-events-none ${
          isDark
            ? "text-white/[0.03] group-hover:text-white/[0.06]"
            : "text-slate-100 group-hover:text-slate-200"
        }`}
      >
        <Icon size={120} />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-2xl border ${schemeStyles.iconBg}`}>
            <Icon size={24} />
          </div>
          {trend && (
            <div
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                trendUp
                  ? isDark
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : isDark
                  ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  : "bg-rose-50 text-rose-700 border-rose-200"
              }`}
            >
              <ArrowUpRight01Icon size={12} className={trendUp ? "" : "rotate-90"} />
              <span>{trend}</span>
            </div>
          )}
        </div>

        <div>
          <h3
            className={`text-sm font-medium tracking-wide ${
              isDark ? "text-gray-400" : "text-slate-500"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-3xl font-extrabold mt-1 tracking-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
