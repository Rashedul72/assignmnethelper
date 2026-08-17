"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Globe, X, MessageSquareText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-5 sm:right-6 z-50 flex flex-col items-end">
      {/* Popover popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-72 sm:w-80 bg-[#0b0528] border border-purple-500/40 rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-white"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <FaWhatsapp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Chat on WhatsApp</h4>
                  <p className="text-[11px] text-emerald-400 font-medium">
                    ● Online &amp; Ready to Help
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
                aria-label="Close WhatsApp chat popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              Send your assignment prompt or questions. We respond within 2 minutes!
            </p>

            <div className="space-y-2">
              <a
                href="https://wa.me/8801896094070?text=Hello%20BDJHelper,%20I%20am%20an%20international%20student%20and%20I%20need%20assignment%20help."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-intl w-full py-2.5 px-3.5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-200" />
                  <span className="font-bold">International Students</span>
                </div>
                <span className="font-semibold text-purple-100">+880 1896-094070</span>
              </a>

              <a
                href="https://wa.me/8801857290212?text=Hello%20BDJHelper,%20I%20need%20assignment%20help."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-bd w-full py-2.5 px-3.5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="relative w-4 h-3 rounded-xs overflow-hidden">
                    <span className="absolute inset-0 bg-[#006A4E]" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F42A41]" />
                    </span>
                  </span>
                  <span className="font-bold">Bangladesh Students</span>
                </div>
                <span className="font-semibold text-emerald-100">+880 1857-290212</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open 24/7 WhatsApp help menu"
        className="relative group bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:p-4 rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.4)] border-2 border-white/20 transition-all flex items-center justify-center cursor-pointer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-[#06021f]" />
        </span>

        {isOpen ? (
          <X className="w-6 h-6 sm:w-7 sm:h-7" />
        ) : (
          <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7" />
        )}

        {/* Floating tooltip on hover */}
        {!isOpen && (
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#06021f] text-white text-xs font-bold py-1.5 px-3 rounded-xl whitespace-nowrap shadow-xl border border-white/15 hidden sm:flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <MessageSquareText className="w-3.5 h-3.5 text-emerald-400" />
            <span>24/7 Instant WhatsApp Help</span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
