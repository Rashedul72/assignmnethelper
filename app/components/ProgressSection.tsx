"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const progressData = [
  {
    icon: Target,
    label: "On-time Delivery",
    value: 98,
    description: "Assignments delivered before the deadline",
  },
  {
    icon: ShieldCheck,
    label: "AI & Plagiarism-Free Work",
    value: 100,
    description: "Every paper passes originality scans",
  },
  {
    icon: Trophy,
    label: "Customer Satisfaction",
    value: 96,
    description: "Students who rated us 5 stars",
  },
];

const procedureSteps = [
  { label: "Book your task", icon: CalendarCheck },
  { label: "Get confirmation", icon: BadgeCheck },
  { label: "Pay 30% advance", icon: DollarSign },
  { label: "We complete the work", icon: ClipboardCheck },
  { label: "Up to 3 revisions", icon: Repeat },
  { label: "Final report (Turnitin) & full payment", icon: FileCheck },
];

export default function ProgressSection() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => setAnimate(true), 200);
      return () => clearTimeout(timeout);
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section className="py-20 px-4 bg-[var(--primary)]">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--secondary)] mb-3">
            Our Promise
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Quality You Can Rely On
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            We obsess over the details so you can focus on learning. Here is how we perform on the metrics students care about most.
          </p>
        </motion.div>

        <motion.div 
          ref={ref}
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {progressData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                className="bg-[var(--secondary)] border border-[var(--secondary)]/50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shadow-sm animate-float">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wide text-white/80">
                      {item.label}
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {item.value}%
                    </p>
                  </div>
                </div>

                <div className="progress-track mb-3">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={animate ? { width: `${item.value}%` } : { width: 0 }}
                    transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                  ></motion.div>
                </div>
                <p className="text-sm text-white/90">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Procedure of our work */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
            Procedure of Our Work
          </h3>
          <motion.ol
            className="relative flex flex-col items-center md:flex-row md:items-center gap-5 md:gap-6 lg:gap-8"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <div className="hidden md:block absolute left-16 right-16 top-1/2 h-0.5 bg-linear-to-r from-white/25 via-white/20 to-white/25 -translate-y-1/2 pointer-events-none" />
            {procedureSteps.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === procedureSteps.length - 1;
              return (
                <div key={step.label} className="flex flex-col items-center md:flex-col gap-3 md:gap-2 z-10 w-full md:w-auto">
                  <motion.li
                    className="relative bg-[var(--secondary)] border border-[var(--secondary)]/50 rounded-xl p-4 md:p-5 shadow-sm flex flex-col items-center text-center gap-3 md:gap-2 w-full max-w-xs md:max-w-none"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -4 }}
                  >
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/20 text-white flex items-center justify-center font-semibold shrink-0 shadow-sm">
                      {idx + 1}
                    </div>
                    <div className="text-sm font-semibold text-white leading-snug flex flex-col items-center">
                      <Icon className="w-5 h-5 mb-2 text-white" />
                      <span>{step.label}</span>
                    </div>
                  </motion.li>
                  {!isLast ? (
                    <ArrowRight className="hidden md:block w-5 h-5 text-white/60" />
                  ) : (
                    <CheckCircle2 className="hidden md:block w-5 h-5 text-white/60" />
                  )}
                </div>
              );
            })}
          </motion.ol>
        </motion.div>
      </div>
    </section>
  );
}
