"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone. Please confirm if you want to proceed.",
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {

  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      btn: "bg-rose-600 hover:bg-rose-700 text-white shadow-xs",
      iconBg: "bg-rose-50 text-rose-600 border-rose-200 ",
    },
    warning: {
      btn: "bg-amber-600 hover:bg-amber-700 text-white shadow-xs",
      iconBg: "bg-amber-50 text-amber-600 border-amber-200 ",
    },
    info: {
      btn: "bg-purple-600 hover:bg-purple-700 text-white shadow-xs",
      iconBg: "bg-purple-50 text-purple-600 border-purple-200 ",
    },
  }[variant];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className={`relative w-full max-w-md p-6 rounded-2xl border shadow-xl z-10 ${
            "bg-white border-slate-200 text-slate-900"
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${variantStyles.iconBg}`}>
              <AlertTriangle size={20} />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {message}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-6 flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5 ${variantStyles.btn}`}
            >
              {isLoading && (
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1" />
              )}
              <span>{confirmText}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
