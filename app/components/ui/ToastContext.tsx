"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckmarkCircle02Icon,
  AlertCircleIcon,
  InformationCircleIcon,
  CancelCircleIcon,
  Cancel01Icon,
} from "hugeicons-react";
import { useTheme } from "./ThemeContext";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, title?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "success", title?: string) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, title, message }]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col space-y-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon =
            toast.type === "success"
              ? CheckmarkCircle02Icon
              : toast.type === "error"
              ? CancelCircleIcon
              : toast.type === "warning"
              ? AlertCircleIcon
              : InformationCircleIcon;

          const darkColorClasses =
            toast.type === "success"
              ? "bg-[#0b1c1e]/95 border-emerald-500/40 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              : toast.type === "error"
              ? "bg-[#230914]/95 border-rose-500/40 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.2)]"
              : toast.type === "warning"
              ? "bg-[#251806]/95 border-amber-500/40 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              : "bg-[#0b1528]/95 border-blue-500/40 text-blue-200 shadow-[0_0_20px_rgba(59,130,246,0.2)]";

          const lightColorClasses =
            toast.type === "success"
              ? "bg-white border-emerald-300 text-emerald-900 shadow-xl shadow-emerald-500/10"
              : toast.type === "error"
              ? "bg-white border-rose-300 text-rose-900 shadow-xl shadow-rose-500/10"
              : toast.type === "warning"
              ? "bg-white border-amber-300 text-amber-900 shadow-xl shadow-amber-500/10"
              : "bg-white border-blue-300 text-blue-900 shadow-xl shadow-blue-500/10";

          const iconColor =
            toast.type === "success"
              ? "text-emerald-500"
              : toast.type === "error"
              ? "text-rose-500"
              : toast.type === "warning"
              ? "text-amber-500"
              : "text-blue-500";

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto border backdrop-blur-xl p-4 rounded-2xl flex items-start space-x-3 relative overflow-hidden ${
                isDark ? darkColorClasses : lightColorClasses
              }`}
            >
              <div
                className={`p-1.5 rounded-xl shrink-0 ${iconColor} ${
                  isDark ? "bg-white/5 border border-white/10" : "bg-slate-100 border border-slate-200"
                }`}
              >
                <Icon size={20} />
              </div>
              <div className="flex-1 pr-6">
                {toast.title && (
                  <h4
                    className={`font-semibold text-sm mb-0.5 ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {toast.title}
                  </h4>
                )}
                <p className="text-sm font-medium opacity-90 leading-snug">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className={`absolute top-3.5 right-3.5 p-1 rounded-lg transition-colors ${
                  isDark
                    ? "text-gray-400 hover:text-white hover:bg-white/10"
                    : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Cancel01Icon size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
