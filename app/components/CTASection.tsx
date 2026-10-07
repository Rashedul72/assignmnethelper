"use client";

import { CheckCircle, Globe, Clock, RefreshCcw, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PERKS = [
  {
    icon: RefreshCcw,
    title: "3 Free Revisions",
    desc: "Included with every order to ensure total alignment with feedback.",
  },
  {
    icon: Clock,
    title: "24/7 Rapid Response",
    desc: "Always available whenever deadlines loom — day or night.",
  },
  {
    icon: CheckCircle,
    title: "Turnitin AI Report",
    desc: "Authentic similarity and AI verification with every delivery.",
  },
];

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      aria-labelledby="cta-heading"
      className="section-shell bg-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Glowing Pill */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f6eef8] border border-[#ead7ef] text-[#620273] text-xs sm:text-sm font-semibold mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="w-4 h-4" />
          <span>Get an Instant Free Quote in 2 Minutes</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          id="cta-heading"
          className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold text-[#1c1524] tracking-tight leading-tight mb-5"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Ace Your Next{" "}
          <span className="text-[#620273]">Assignment or Dissertation</span>?
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg text-[#5e5668] max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Join 1,400+ satisfied university students across the UK, Australia,
          USA, Canada, Austria, and Bangladesh. Reach out on WhatsApp today for
          immediate assistance.
        </motion.p>

        {/* Dual WhatsApp Action Buttons */}
        <motion.div
          className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* International WhatsApp Button */}
          <motion.a
            href="https://wa.me/8801896094070"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with International Students Coordinator on WhatsApp"
            className="btn-whatsapp-intl p-4 flex items-center justify-between group rounded-2xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm text-white">
                  International Students
                </div>
                <div className="text-xs text-purple-200 flex items-center gap-1">
                  <FaWhatsapp className="w-3.5 h-3.5 text-emerald-300" />
                  <span>+880 1896-094070</span>
                </div>
              </div>
            </div>
            <span className="text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
              Chat →
            </span>
          </motion.a>

          {/* Bangladesh WhatsApp Button */}
          <motion.a
            href="https://wa.me/8801857290212"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Bangladesh Coordinator on WhatsApp"
            className="btn-whatsapp-bd p-4 flex items-center justify-between group rounded-2xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <span className="relative w-10 h-7 rounded-lg overflow-hidden shrink-0 shadow-sm">
                <span className="absolute inset-0 bg-[#006A4E]" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-[#F42A41]" />
                </span>
              </span>
              <div className="text-left">
                <div className="font-bold text-sm text-white">
                  Bangladesh Students
                </div>
                <div className="text-xs text-emerald-200 flex items-center gap-1">
                  <FaWhatsapp className="w-3.5 h-3.5 text-emerald-300" />
                  <span>+880 1857-290212</span>
                </div>
              </div>
            </div>
            <span className="text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
              Chat →
            </span>
          </motion.a>
        </motion.div>

        {/* 3 Value Pillars */}
        <motion.div
          ref={ref}
          className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {PERKS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="modern-light-card p-5 flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-[#f6eef8] border border-[#ead7ef] flex items-center justify-center text-[#620273] mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-[#1c1524] mb-1">
                  {p.title}
                </div>
                <div className="text-xs text-[#5e5668] leading-relaxed">
                  {p.desc}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
