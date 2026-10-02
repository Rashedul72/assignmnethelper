"use client";

import React from "react";
import { useTheme } from "./ThemeContext";

export type BadgeVariant =
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "purple"
  | "pink"
  | "cyan"
  | "neutral";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({ children, variant = "neutral", size = "sm", dot = true }: BadgeProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const darkStyles = {
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
    danger: "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]",
    pink: "bg-pink-500/10 text-pink-400 border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.1)]",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]",
    neutral: "bg-white/5 text-gray-300 border-white/10",
  }[variant];

  const lightStyles = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    danger: "bg-rose-50 text-rose-700 border-rose-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    pink: "bg-pink-50 text-pink-700 border-pink-200",
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
  }[variant];

  const dotColors = {
    success: "bg-emerald-500",
    danger: "bg-rose-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    cyan: "bg-cyan-500",
    neutral: "bg-slate-400",
  }[variant];

  const variantStyles = isDark ? darkStyles : lightStyles;
  const sizeStyles = size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center space-x-1.5 font-semibold border rounded-full ${variantStyles} ${sizeStyles}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors} animate-pulse`} />}
      <span>{children}</span>
    </span>
  );
}
