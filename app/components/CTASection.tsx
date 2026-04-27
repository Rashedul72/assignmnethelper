"use client";

import { CheckCircle, Globe, Clock, RefreshCcw } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const PERKS = [
  {
    icon: RefreshCcw,
    title: "Three Revisions",
    desc: "Up to three revisions included with every order.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Always here when you need us — day or night.",
  },
  {
    icon: CheckCircle,
    title: "Plagiarism-Free",
    desc: "Free Turnitin AI & similarity report on request.",
  },
];

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="cta-heading"
      className="section-shell bg-[var(--primary)] text-white relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-[var(--secondary)]/20 blur-[140px] pointer-events-none"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          id="cta-heading"
          className="section-title mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Excel in Your Studies?
        </motion.h2>

        <motion.p
          className="text-base md:text-lg text-gray-300 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join thousands of successful students who trust BDJHelper with their
          academic work. Reach out on WhatsApp to get started today.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center items-stretch w-full max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="https://wa.me/8801896094070"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp for international students"
            className="btn-primary group flex-1 min-w-0 !shadow-none"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="flex flex-col items-start gap-1 min-w-0 flex-1">
              <span className="flex items-center gap-2 whitespace-nowrap">
                <motion.span
                  animate={
                    prefersReducedMotion ? undefined : { rotate: [0, 360] }
                  }
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="inline-flex"
                >
                  <Globe className="w-5 h-5 text-white shrink-0" />
                </motion.span>
                <span className="font-semibold text-base">
                  International Students
                </span>
              </span>
              <span className="flex items-center gap-2 whitespace-nowrap text-white/90">
                <FaWhatsapp className="w-5 h-5 shrink-0" />
                <span className="text-sm md:text-base">01896094070</span>
              </span>
            </span>
          </motion.a>

          <motion.a
            href="https://wa.me/8801857290212"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp for Bangladesh students"
            className="btn-primary group flex-1 min-w-0 !shadow-none"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="flex flex-col items-start gap-1 min-w-0 flex-1">
              <span className="flex items-center gap-2 whitespace-nowrap">
                <span
                  aria-hidden
                  className="relative w-5 h-4 rounded-sm overflow-hidden shadow-sm shrink-0"
                >
                  <span className="absolute inset-0 bg-[#006A4E]" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-[#F42A41]" />
                  </span>
                </span>
                <span className="font-semibold text-base">
                  Bangladesh Students
                </span>
              </span>
              <span className="flex items-center gap-2 whitespace-nowrap text-white/90">
                <FaWhatsapp className="w-5 h-5 shrink-0" />
                <span className="text-sm md:text-base">01857290212</span>
              </span>
            </span>
          </motion.a>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {PERKS.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                className="glass-card p-5 flex flex-col items-center gap-2 text-center"
                whileHover={{ y: -3 }}
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--secondary)]/30 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="font-semibold text-white">{p.title}</div>
                <div className="text-sm text-gray-300">{p.desc}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
