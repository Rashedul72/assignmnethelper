"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto sidebar-scrollbar">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full ${sizeClasses} rounded-2xl overflow-hidden z-10 flex flex-col my-auto border shadow-xl ${
              "bg-white border-slate-200 text-slate-800"
            }`}
          >
            {/* Modal Header */}
            <div
              className={`px-6 py-4 border-b flex justify-between items-center relative z-10 ${
                "border-slate-200/80"
              }`}
            >
              <div className="flex items-center space-x-3">
                {Icon && (
                  <div
                    className={`p-2 rounded-xl border ${
                      "bg-purple-50 border-purple-200 text-purple-600"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                )}
                <div>
                  <h3
                    className={`text-base font-bold tracking-tight ${
                      "text-slate-900"
                    }`}
                  >
                    {title}
                  </h3>
                  {subtitle && (
                    <p
                      className={`text-xs mt-0.5 ${
                        "text-slate-500"
                      }`}
                    >
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[75vh] sidebar-scrollbar space-y-4">
              {children}
            </div>

            {/* Modal Footer */}
            {footer && (
              <div
                className={`px-6 py-3.5 border-t flex items-center justify-end space-x-3 ${
                  "border-slate-200/80 bg-slate-50/50"
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
