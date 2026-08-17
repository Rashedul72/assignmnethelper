"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  Code,
  Briefcase,
  Cpu,
  GraduationCap,
  BookMarked,
  Layers,
  Users2,
  ScrollText,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type Field = {
  code: string;
  name: string;
  category: string;
  icon: LucideIcon;
  tags: string[];
};

const FIELDS: Field[] = [
  {
    code: "CSE",
    name: "Computer Science & Engineering",
    category: "Technology",
    icon: Code,
    tags: ["Algorithms & DSA", "Python / Java / C++", "Machine Learning & AI", "Web & Databases"],
  },
  {
    code: "BBA",
    name: "Bachelor of Business Administration",
    category: "Business & Management",
    icon: Briefcase,
    tags: ["Corporate Finance", "Strategic Marketing", "Accounting & Audit", "Supply Chain"],
  },
  {
    code: "BSE",
    name: "Bachelor of Science in Engineering",
    category: "Engineering",
    icon: Cpu,
    tags: ["Electrical & Electronics", "Civil & Structural", "Mechanical Design", "Matlab & CAD"],
  },
  {
    code: "MSC",
    name: "Master of Science",
    category: "Postgraduate STEM",
    icon: GraduationCap,
    tags: ["Data Science", "Empirical Research", "Statistical Analysis", "Thesis Modeling"],
  },
  {
    code: "BA",
    name: "Bachelor of Arts",
    category: "Humanities",
    icon: BookMarked,
    tags: ["English Literature", "History & Philosophy", "Linguistics", "Critical Analysis"],
  },
  {
    code: "MA",
    name: "Master of Arts",
    category: "Postgraduate Arts",
    icon: ScrollText,
    tags: ["Advanced Semiotics", "Cultural Studies", "Dissertation Writing", "Theoretical Essays"],
  },
  {
    code: "BSS",
    name: "Bachelor of Social Science",
    category: "Social Sciences",
    icon: Users2,
    tags: ["Economics & Policy", "Sociology", "International Relations", "Public Administration"],
  },
  {
    code: "MSS",
    name: "Master of Social Science",
    category: "Advanced Social Sciences",
    icon: Layers,
    tags: ["Development Studies", "Qualitative Research", "Policy Briefs", "Master's Thesis"],
  },
];

const TICKER_ITEMS = [...FIELDS, ...FIELDS];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export default function FieldsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="fields"
      aria-labelledby="fields-heading"
      className="section-shell scroll-mt-24 section-dark relative overflow-hidden isolate"
    >
      {/* Background glow flares */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-purple-600/15 blur-[150px] pointer-events-none -z-10"
      />

      <div className="content-shell relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow section-eyebrow-dark">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            Academic Disciplines
          </span>
          <h2 id="fields-heading" className="section-title text-white">
            Specialized Coverage Across All Major Fields
          </h2>
          <p className="section-subtitle text-slate-200 mt-4">
            From technical programming and engineering assignments to comprehensive
            business case studies and postgraduate theses, we match you with verified domain experts.
          </p>
        </motion.div>

        {/* Dynamic Infinite Marquee Ribbon */}
        <div className="subject-marquee-container border-y border-white/10 py-3.5 mb-12 bg-white/[0.03] backdrop-blur-md">
          <div className="subject-marquee-track gap-10 text-xs sm:text-sm font-semibold text-slate-200">
            {TICKER_ITEMS.map((field, index) => (
              <span
                key={`${field.code}-${index}`}
                className="flex items-center gap-3 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 whitespace-nowrap"
              >
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-white font-bold tracking-wide">
                  {field.code}
                </span>
                <span className="text-purple-300">•</span>
                <span className="text-slate-200">{field.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* 8 Disciplines Grid */}
        <motion.div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {FIELDS.map((field) => {
            const Icon = field.icon;
            return (
              <motion.article
                key={field.code}
                className="modern-dark-card p-6 flex flex-col justify-between group relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -6 }}
              >
                {/* Subtle top glowing line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-fuchsia-600 group-hover:text-white transition-all duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-extrabold text-white tracking-tight bg-white/[0.08] px-3 py-1 rounded-xl border border-white/15">
                      {field.code}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300 block mb-1">
                    {field.category}
                  </span>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-purple-200 transition-colors leading-snug">
                    {field.name}
                  </h3>

                  {/* Subtopics Pill Cloud */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {field.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] text-slate-300 bg-white/[0.05] border border-white/10 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Order Button */}
                <a
                  href={`https://wa.me/8801896094070?text=Hello%20BDJHelper,%20I%20need%20help%20with%20my%20${field.code}%20assignment.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Get help for ${field.code} assignment on WhatsApp`}
                  className="w-full py-2.5 px-3 rounded-xl bg-white/[0.06] hover:bg-gradient-to-r hover:from-purple-600 hover:to-fuchsia-600 border border-white/10 hover:border-purple-400/40 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Get {field.code} Help</span>
                </a>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
