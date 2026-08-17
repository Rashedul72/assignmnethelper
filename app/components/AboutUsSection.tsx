"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Globe,
  Users,
  CheckCircle2,
  TrendingUp,
  Shield,
  FileCheck,
  Headphones,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type AboutPillar = {
  icon: LucideIcon;
  title: string;
  metric?: string;
  description: string;
  badge: string;
};

const PILLARS: AboutPillar[] = [
  {
    icon: Globe,
    title: "Global Reach",
    metric: "6 Countries",
    description:
      "Actively serving university and college students across Bangladesh, UK, Australia, USA, Canada, and Austria.",
    badge: "Worldwide Operations",
  },
  {
    icon: Users,
    title: "Expert Scholar Team",
    metric: "15+ Specialists",
    description:
      "Dedicated subject specialists holding Master's and PhD degrees in computer science, business, social sciences, and engineering.",
    badge: "Verified Academics",
  },
  {
    icon: CheckCircle2,
    title: "Proven Track Record",
    metric: "1,400+ Students",
    description:
      "Successfully submitted assignments, dissertations, and research papers with exceptional satisfaction scores.",
    badge: "Verified Success",
  },
  {
    icon: TrendingUp,
    title: "High Distinction Rate",
    metric: "98% Success",
    description:
      "Every paper is structured, formatted, and referenced to meet strict institutional marking rubrics and high grades.",
    badge: "A & B Grade Target",
  },
];

const ADVANTAGES = [
  {
    icon: Shield,
    title: "100% Strict Confidentiality",
    desc: "Your identity, institution, and assignment details are strictly protected and never shared.",
  },
  {
    icon: FileCheck,
    title: "Turnitin AI & Similarity Check",
    desc: "Every submission includes an authentic Turnitin similarity & AI detection report upon request.",
  },
  {
    icon: Headphones,
    title: "24/7 Direct WhatsApp Communication",
    desc: "Speak directly with our academic coordinators any time, day or night, for rapid updates.",
  },
  {
    icon: Sparkles,
    title: "3 Included Iterations",
    desc: "Up to 3 revisions free of charge to incorporate your professor's feedback accurately.",
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

export default function AboutUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-shell bg-gradient-to-b from-slate-50 via-white to-slate-50 scroll-mt-24 overflow-hidden"
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
            <Sparkles className="w-3.5 h-3.5" />
            About BDJHelper
          </span>
          <h2
            id="about-heading"
            className="section-title text-[#06021f]"
          >
            Built for Students Who Demand Academic Excellence
          </h2>
          <p className="section-subtitle text-slate-700 mt-4">
            We bridge the gap between complex academic challenges and top-tier
            results with verified domain experts, on-time delivery, and 100%
            original writing.
          </p>
        </motion.div>

        {/* 4 Pillars Grid */}
        <motion.div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                className="modern-light-card p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -6 }}
              >
                {/* Top decorative accent */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200/80 flex items-center justify-center text-[#620273] group-hover:bg-[#620273] group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#06021f] mb-2 tracking-tight group-hover:text-[#620273] transition-colors">
                    {pillar.title}
                  </h3>

                  {pillar.metric && (
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#620273] mb-3 tracking-tight">
                      {pillar.metric}
                    </div>
                  )}

                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* The BDJHelper Standard Strip */}
        <motion.div
          className="mt-14 sm:mt-16 bg-[#06021f] text-white rounded-3xl p-7 sm:p-10 border border-purple-500/20 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Subtle glow background */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-400/30 inline-block mb-3">
                Why Students Prefer Us
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Academic Integrity &amp; Guaranteed Precision
              </h3>
              <p className="text-sm sm:text-base text-slate-300 mt-2">
                We do not compromise on research depth or formatting accuracy.
                Every paper undergoes a rigorous multi-stage quality assurance
                check before handover.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {ADVANTAGES.map((adv) => {
                const Icon = adv.icon;
                return (
                  <div
                    key={adv.title}
                    className="bg-white/[0.05] border border-white/10 rounded-2xl p-5 hover:bg-white/[0.08] hover:border-purple-400/40 transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-3.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-white mb-1.5">
                      {adv.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {adv.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
