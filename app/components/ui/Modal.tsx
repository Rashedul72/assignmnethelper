"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cancel01Icon } from "hugeicons-react";
import { useTheme } from "./ThemeContext";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  icon?: React.ElementType;
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "md",
  icon: Icon,
}: ModalProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }[size];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto scrollbar-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed inset-0 backdrop-blur-md transition-opacity ${
              isDark ? "bg-black/75" : "bg-slate-900/40"
            }`}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
            className={`relative w-full ${sizeClasses} rounded-3xl overflow-hidden z-10 flex flex-col my-auto border shadow-2xl ${
              isDark
                ? "bg-[#0b0628] border-white/10 text-gray-200 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                : "bg-white border-slate-200 text-slate-800 shadow-2xl"
            }`}
          >
            {/* Header Ambient Glow */}
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 blur-2xl rounded-full pointer-events-none ${
                isDark ? "bg-purple-500/10" : "bg-purple-500/5"
              }`}
            />

            {/* Modal Header */}
            <div
              className={`p-6 border-b flex justify-between items-center relative z-10 ${
                isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-100 bg-slate-50/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                {Icon && (
                  <div
                    className={`p-2.5 rounded-xl border ${
                      isDark
                        ? "bg-purple-500/20 border-white/10 text-purple-400"
                        : "bg-purple-50 border-purple-200 text-purple-600"
                    }`}
                  >
                    <Icon size={22} />
                  </div>
                )}
                <div>
                  <h3
                    className={`text-xl font-bold tracking-tight ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {title}
                  </h3>
                  {subtitle && (
                    <p className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-xl border transition-colors ${
                  isDark
                    ? "text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border-white/5"
                    : "text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 border-slate-200"
                }`}
                aria-label="Close Modal"
              >
                <Cancel01Icon size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 overflow-y-auto max-h-[75vh] relative z-10 scrollbar-none">
              {children}
            </div>

            {/* Modal Footer */}
            {footer && (
              <div
                className={`p-6 border-t flex items-center justify-end space-x-3 relative z-10 ${
                  isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-100 bg-slate-50/50"
                }`}
              >
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
