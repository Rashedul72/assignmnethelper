"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Target,
  ShieldCheck,
  Trophy,
  ArrowRight,
  FileSpreadsheet,
  BadgePercent,
  CreditCard,
  PenTool,
  FileCheck2,
  CheckCircle2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type Metric = {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix: string;
  description: string;
  color: string;
  badge: string;
};

type Step = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge: string;
};

const METRICS: Metric[] = [
  {
    icon: Target,
    label: "On-Time Delivery",
    value: 98,
    suffix: "%",
    description: "Strict adherence to deadlines so you always submit ahead of schedule.",
    color: "from-purple-600 to-indigo-600",
    badge: "Never Miss a Deadline",
  },
  {
    icon: ShieldCheck,
    label: "AI & Plagiarism-Free",
    value: 100,
    suffix: "%",
    description: "Every submission includes an authentic Turnitin similarity & AI scan.",
    color: "from-emerald-500 to-teal-600",
    badge: "100% Original Work",
  },
  {
    icon: Trophy,
    label: "Student Satisfaction",
    value: 96,
    suffix: "%",
    description: "Rated 5 stars by university students across 6 international regions.",
    color: "from-amber-500 to-orange-600",
    badge: "Top Grades Target",
  },
];

const STEPS: Step[] = [
  {
    number: "01",
    title: "Send Assignment Details",
    description: "Share your assignment prompt, rubrics, formatting guidelines, and deadline on WhatsApp.",
    icon: FileSpreadsheet,
    badge: "Step 1",
  },
  {
    number: "02",
    title: "Instant Quote & Writer Match",
    description: "We review your requirements and assign a subject specialist with a clear, transparent quote.",
    icon: BadgePercent,
    badge: "Step 2",
  },
  {
    number: "03",
    title: "30% Advance Payment",
    description: "Confirm your order with a small 30% advance via bKash, Bank Transfer, or Taptap.",
    icon: CreditCard,
    badge: "Step 3",
  },
  {
    number: "04",
    title: "Expert Writing & Research",
    description: "Your designated scholar drafts, codes, and formats the paper from scratch with proper citations.",
    icon: PenTool,
    badge: "Step 4",
  },
  {
    number: "05",
    title: "Turnitin AI & Similarity Check",
    description: "Our quality team verifies originality, generates Turnitin reports, and verifies instructions.",
    icon: FileCheck2,
    badge: "Step 5",
  },
  {
    number: "06",
    title: "Final Delivery & 3 Revisions",
    description: "Receive your completed assignment. We offer up to 3 revisions to ensure 100% satisfaction.",
    icon: CheckCircle2,
    badge: "Step 6",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
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
      id="how-it-works"
      aria-labelledby="progress-heading"
      className="section-shell bg-slate-50 scroll-mt-24 relative overflow-hidden"
    >
      <div className="content-shell">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow section-eyebrow-light">
            <Sparkles className="w-3.5 h-3.5 text-[#620273]" />
            Performance &amp; Process
          </span>
          <h2
            id="progress-heading"
            className="section-title text-[#06021f]"
          >
            Quality Benchmarks &amp; Simple 6-Step Process
          </h2>
          <p className="section-subtitle text-slate-700 mt-4">
            We hold ourselves to the highest academic standards. Here is how we
            consistently deliver outstanding results for students worldwide.
          </p>
        </motion.div>

        {/* 3 Metric Cards with Animated Progress Trackers */}
        <motion.div
          ref={ref}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {METRICS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.label}
                className="modern-light-card p-6 sm:p-7 flex flex-col justify-between group"
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-[#620273] group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-800">
                    {item.label}
                  </h3>

                  <div className="flex items-baseline gap-1 my-2">
                    <span className="text-4xl font-extrabold text-[#06021f] tracking-tight">
                      {item.value}
                    </span>
                    <span className="text-2xl font-bold text-[#620273]">
                      {item.suffix}
                    </span>
                  </div>

                  {/* High contrast animated progress track */}
                  <div
                    className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/80 mb-3"
                    role="progressbar"
                    aria-label={item.label}
                    aria-valuenow={item.value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                      initial={{ width: 0 }}
                      animate={animate ? { width: `${item.value}%` } : { width: 0 }}
                      transition={{
                        duration: 1.4,
                        delay: index * 0.15,
                        ease: "easeOut",
                      }}
                    />
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* 6-Step Workflow Timeline */}
        <div className="mt-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#620273] bg-purple-100 px-3 py-1 rounded-full inline-block mb-2">
              Step-by-Step Execution
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#06021f] tracking-tight">
              How We Work With You
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              From your initial WhatsApp message to final assignment handover —
              smooth, transparent, and stress-free.
            </p>
          </div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  className="modern-light-card p-6 flex flex-col justify-between group relative overflow-hidden bg-white"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#06021f] text-white flex items-center justify-center font-bold text-sm shadow-md">
                        {step.number}
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center text-[#620273]">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-[#06021f] mb-2 group-hover:text-[#620273] transition-colors">
                      {step.title}
                    </h4>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-700">
                    <span>{step.badge}</span>
                    {idx < STEPS.length - 1 ? (
                      <span className="text-slate-400 flex items-center gap-1">
                        Next step <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="text-emerald-600 flex items-center gap-1">
                        Complete <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
