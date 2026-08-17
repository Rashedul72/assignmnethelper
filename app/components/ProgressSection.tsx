"use client";

import { useEffect, useRef, useState } from "react";
import {
  Target,
  ShieldCheck,
  Trophy,
  ArrowRight,
  CalendarCheck,
  BadgeCheck,
  DollarSign,
  ClipboardCheck,
  Repeat,
  FileCheck,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

type Metric = {
  icon: LucideIcon;
  label: string;
  value: number;
  description: string;
};

type Step = { label: string; icon: LucideIcon };

const METRICS: Metric[] = [
  {
    icon: Target,
    label: "On-time Delivery",
    value: 98,
    description: "Assignments delivered before the deadline.",
  },
  {
    icon: ShieldCheck,
    label: "AI & Plagiarism-Free",
    value: 100,
    description: "Every paper passes originality scans.",
  },
  {
    icon: Trophy,
    label: "Customer Satisfaction",
    value: 96,
    description: "Students who rated us 5 stars.",
  },
];

const STEPS: Step[] = [
  { label: "Book your task", icon: CalendarCheck },
  { label: "Get confirmation", icon: BadgeCheck },
  { label: "Pay 30% advance", icon: DollarSign },
  { label: "We complete the work", icon: ClipboardCheck },
  { label: "Up to 3 revisions", icon: Repeat },
  { label: "Final report & full payment", icon: FileCheck },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ProgressSection() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timeout);
  }, [isInView]);

  return (
    <section
      aria-labelledby="progress-heading"
      className="section-shell bg-white relative overflow-hidden isolate"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Our Promise</span>
          <h2
            id="progress-heading"
            className="section-title text-[var(--primary)]"
          >
            Quality You Can Rely On
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto mt-4">
            We obsess over the details so you can focus on learning. Here is how
            we perform on the metrics students care about most.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid gap-5 md:gap-6 sm:grid-cols-2 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {METRICS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.label}
                className="bg-[var(--secondary)] border border-white/10 rounded-2xl p-6 md:p-7 shadow-[0_18px_40px_rgba(98,2,115,0.25)] transition-shadow"
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/80">
                      {item.label}
                    </p>
                    <p className="text-3xl font-extrabold text-white tracking-tight">
                      {item.value}%
                    </p>
                  </div>
                </div>

                <div
                  className="progress-track mb-3"
                  role="progressbar"
                  aria-label={item.label}
                  aria-valuenow={item.value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={animate ? { width: `${item.value}%` } : { width: 0 }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.2,
                      ease: "easeOut",
                    }}
                  />
                </div>
                <p className="text-sm text-white/85">{item.description}</p>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Procedure */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary)] text-center mb-8 md:mb-10">
            How It Works
          </h3>

          <motion.ol
            className="relative grid gap-4 sm:grid-cols-2 md:flex md:flex-row md:items-center md:gap-3"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === STEPS.length - 1;
              return (
                <li
                  key={step.label}
                  className="flex flex-col items-center md:flex-1 md:flex-row md:items-stretch md:gap-3"
                >
                  <motion.div
                    className="relative bg-[var(--secondary)] border border-white/10 rounded-xl p-4 md:p-5 shadow-[0_12px_28px_rgba(98,2,115,0.25)] flex flex-col items-center text-center gap-2 w-full"
                    variants={itemVariants}
                    whileHover={{ y: -3 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/15 text-white flex items-center justify-center font-semibold text-sm">
                      {idx + 1}
                    </div>
                    <Icon className="w-5 h-5 text-white" />
                    <span className="text-sm font-semibold text-white leading-snug">
                      {step.label}
                    </span>
                  </motion.div>

                  {!isLast ? (
                    <ArrowRight
                      aria-hidden
                      className="hidden md:block self-center w-5 h-5 text-slate-400 shrink-0"
                    />
                  ) : (
                    <CheckCircle2
                      aria-hidden
                      className="hidden md:block self-center w-5 h-5 text-[var(--secondary)]/70 shrink-0"
                    />
                  )}
                </li>
              );
            })}
          </motion.ol>
        </motion.div>
      </div>
    </section>
  );
}
