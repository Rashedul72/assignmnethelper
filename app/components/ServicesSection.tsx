"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import {
  FileText,
  BookOpen,
  PenTool,
  Presentation,
  ClipboardList,
  Layers,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  type LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  name: string;
  category: "all" | "writing" | "research" | "editing";
  desc: string;
  features: string[];
};

const CATEGORIES = [
  { id: "all", label: "All Academic Services" },
  { id: "writing", label: "Assignments & Essays" },
  { id: "research", label: "Dissertations & Theses" },
  { id: "editing", label: "Editing & Reports" },
];

const SERVICES: Service[] = [
  {
    icon: FileText,
    name: "Assignment Writing",
    category: "writing",
    desc: "End-to-end coursework and assignment completion across all university departments and difficulty levels.",
    features: ["Custom written from scratch", "Rubric & guideline matched", "Free Turnitin AI scan"],
  },
  {
    icon: BookOpen,
    name: "Research Papers",
    category: "research",
    desc: "Rigorous empirical and theoretical academic research papers with peer-reviewed journal citations.",
    features: ["Scopus & IEEE references", "Methodology & findings", "Statistical data analysis"],
  },
  {
    icon: GraduationCap,
    name: "Dissertations & Theses",
    category: "research",
    desc: "Comprehensive dissertation assistance from proposal defense and literature review to final discussion.",
    features: ["Chapter-by-chapter delivery", "PhD & Master specialists", "3 Revision rounds"],
  },
  {
    icon: PenTool,
    name: "Research Proposals",
    category: "research",
    desc: "Winning academic research proposals, grant applications, and project concept documentation.",
    features: ["Clear problem statements", "Literature foundation", "Feasibility frameworks"],
  },
  {
    icon: FileText,
    name: "Essay Writing",
    category: "writing",
    desc: "Structured argumentative, analytical, descriptive, and critical essays tailored to university criteria.",
    features: ["Compelling thesis statements", "Proper referencing (APA/MLA)", "0% Plagiarism guarantee"],
  },
  {
    icon: Presentation,
    name: "Poster & Presentations",
    category: "writing",
    desc: "High-impact academic posters, PowerPoint slide decks with comprehensive speaker notes and infographics.",
    features: ["Visual poster design (PDF/PPT)", "Speaker script included", "Modern infographics"],
  },
  {
    icon: ClipboardList,
    name: "Case Studies Analysis",
    category: "editing",
    desc: "In-depth corporate, legal, medical, and social case studies with SWOT, PESTLE, and frameworks.",
    features: ["Real-world data synthesis", "Strategic recommendations", "Executive summaries"],
  },
  {
    icon: Layers,
    name: "Technical & Lab Reports",
    category: "editing",
    desc: "Structured lab reports, engineering documentation, software design specs, and experimental analyses.",
    features: ["Mathematical calculations", "Diagrams & architecture", "Code documentation"],
  },
  {
    icon: PenTool,
    name: "Proofreading & Editing",
    category: "editing",
    desc: "Meticulous grammar polishing, flow enhancement, vocabulary elevation, and citation verification.",
    features: ["Tracked changes file", "Style guide compliance", "Turnitin check included"],
  },
];

const TRUST_FEATURES = [
  {
    icon: ShieldCheck,
    title: "100% Plagiarism-Free",
    desc: "Every sentence drafted uniquely with authentic academic integrity.",
  },
  {
    icon: Clock,
    title: "24/7 Deadline Guarantee",
    desc: "Urgent turnaround options available — never submit late.",
  },
  {
    icon: CheckCircle2,
    title: "3 Free Revisions Included",
    desc: "We refine and update until you are completely satisfied.",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredServices = SERVICES.filter((service) =>
    activeCategory === "all" ? true : service.category === activeCategory
  );

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-shell scroll-mt-24 section-dark relative overflow-hidden isolate"
    >
      {/* Background radial glows */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-0 w-[35rem] h-[35rem] rounded-full bg-purple-600/15 blur-[140px] pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-0 w-[30rem] h-[30rem] rounded-full bg-indigo-600/15 blur-[130px] pointer-events-none -z-10"
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
            Comprehensive Solutions
          </span>
          <h2 id="services-heading" className="section-title text-white">
            End-to-End Academic Writing Services
          </h2>
          <p className="section-subtitle text-slate-200 mt-4">
            Custom-tailored academic writing, research support, and proofreading
            crafted to the highest international standards.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-[0_4px_20px_rgba(147,51,234,0.4)] border border-purple-400/40"
                  : "bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.name}
                className="modern-dark-card p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                {/* Top glow accent */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-fuchsia-600 group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg text-white group-hover:text-purple-200 transition-colors">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-5">
                    {service.desc}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/10">
                    {service.features.map((feat) => (
                      <div
                        key={feat}
                        className="flex items-center gap-2 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Order Button */}
                <a
                  href={`https://wa.me/8801896094070?text=Hello%20BDJHelper,%20I%20would%20like%20to%20inquire%20about%20your%20${encodeURIComponent(
                    service.name
                  )}%20service.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Order ${service.name} on WhatsApp`}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.07] hover:bg-gradient-to-r hover:from-purple-600 hover:to-fuchsia-600 border border-white/10 hover:border-purple-400/40 text-xs sm:text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <FaWhatsapp className="w-4 h-4 text-emerald-400" />
                  <span>Order {service.name}</span>
                </a>
              </motion.article>
            );
          })}
        </motion.div>

        {/* 3 Trust Strip Guarantees */}
        <motion.div
          className="mt-14 sm:mt-16 grid sm:grid-cols-3 gap-5 md:gap-6"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {TRUST_FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 sm:p-6 flex items-start gap-4 hover:bg-white/[0.07] transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0 text-purple-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base mb-1">
                    {f.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
