"use client";

import {
  BookOpen,
  FileText,
  Presentation,
  PenTool,
  CheckCircle,
  ClipboardList,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Service = {
  icon: LucideIcon;
  name: string;
  desc: string;
};

const SERVICES: Service[] = [
  { icon: FileText, name: "Assignments", desc: "High-quality assignment writing and completion." },
  { icon: BookOpen, name: "Research", desc: "In-depth research papers and academic research." },
  { icon: PenTool, name: "Proposals", desc: "Research, project, and grant proposals." },
  { icon: Presentation, name: "Posters", desc: "Academic posters and presentation materials." },
  { icon: FileText, name: "Essays", desc: "Essay writing across all academic levels." },
  { icon: BookOpen, name: "Dissertations", desc: "Thesis and dissertation writing support." },
  { icon: ClipboardList, name: "Case Studies", desc: "Detailed case study analysis and writing." },
  { icon: Layers, name: "Reports", desc: "Academic reports and structured documentation." },
  { icon: Presentation, name: "Presentations", desc: "PowerPoint presentations and slides." },
  { icon: PenTool, name: "Proofreading & Editing", desc: "Professional editing and proofreading services." },
];

const TRUST_FEATURES = [
  {
    title: "Plagiarism-Free",
    desc: "100% original content, every time.",
  },
  {
    title: "On-Time Delivery",
    desc: "We never miss a deadline.",
  },
  {
    title: "Free AI & Similarity Report",
    desc: "Turnitin AI and similarity report on request.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-shell scroll-mt-24 section-dark relative overflow-hidden isolate"
    >
      <div className="content-shell relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow text-white/90">Services</span>
          <h2 id="services-heading" className="section-title text-white">
            What We Do
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mt-4">
            Comprehensive academic services designed to help you succeed.
          </p>
        </motion.div>

        <motion.ul
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.li
                key={service.name}
                className="group soft-card p-6 list-none"
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-[var(--secondary)]/10 flex items-center justify-center group-hover:bg-[var(--secondary)]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[var(--secondary)]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base md:text-lg mb-1.5 text-[var(--primary)] group-hover:text-[var(--secondary)] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Trust strip */}
        <motion.div
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {TRUST_FEATURES.map((f) => (
            <motion.div
              key={f.title}
              className="soft-card p-6 flex items-center gap-4"
              whileHover={{ y: -3 }}
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--secondary)]/10 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-[var(--secondary)]" />
              </div>
              <div>
                <div className="font-semibold text-[var(--primary)]">
                  {f.title}
                </div>
                <div className="text-sm text-gray-600">{f.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
