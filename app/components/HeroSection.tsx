"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import {
  ShieldCheck,
  Award,
  Globe,
  Clock,
  CheckCircle2,
  Sparkles,
  FileText,
  Star,
  Zap,
} from "lucide-react";

const STATS = [
  { value: "15+", label: "Expert Writers", sub: "PhD & Master Level" },
  { value: "1,400+", label: "Completed Orders", sub: "100% On-Time" },
  { value: "98%", label: "Success Rate", sub: "Top Grades Guaranteed" },
  { value: "6+", label: "Global Regions", sub: "UK, US, AU, CA, AT, BD" },
];

const TRUST_PILLS = [
  { icon: ShieldCheck, text: "100% Plagiarism-Free" },
  { icon: Award, text: "Free Turnitin AI Report" },
  { icon: Clock, text: "3 Free Revisions" },
];

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="section-dark relative text-white pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-20 md:pb-28 px-4 overflow-hidden isolate"
    >
      {/* Dynamic Background Mesh Gradients */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] overflow-hidden pointer-events-none -z-10"
      >
        <div className="absolute top-[-10%] left-[15%] w-[420px] h-[420px] rounded-full bg-purple-600/25 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[380px] h-[380px] rounded-full bg-fuchsia-700/20 blur-[130px]" />
        <div className="absolute bottom-0 left-[35%] w-[320px] h-[320px] rounded-full bg-indigo-600/15 blur-[100px]" />
        {/* Subtle grid pattern for modern tech/academic touch */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="content-shell relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Main Hero Content */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Live Availability Eyebrow */}
            <motion.div
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-200 text-xs sm:text-sm font-semibold mb-6 shadow-inner"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-white font-medium">
                Accepting Orders 24/7
              </span>
              <span className="text-purple-400 font-bold">•</span>
              <span className="text-purple-200">Instant WhatsApp Quote</span>
            </motion.div>

            {/* Main Headline */}
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.12] tracking-tight max-w-2xl"
            >
              Master Your Grades With{" "}
              <span className="gradient-text-hero">Expert Academic</span>{" "}
              <span className="gradient-text-accent">Writing Help</span>
            </h1>

            {/* Value Proposition Description */}
            <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed font-normal">
              High-distinction assignment help, dissertations, research papers,
              and proposals tailored to your university guidelines. Includes{" "}
              <strong className="text-white font-semibold underline decoration-purple-400 decoration-2 underline-offset-4">
                free Turnitin AI &amp; similarity reports
              </strong>{" "}
              and 3 revisions.
            </p>

            {/* Quick Trust Badges */}
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-2.5">
              {TRUST_PILLS.map((pill) => {
                const Icon = pill.icon;
                return (
                  <span
                    key={pill.text}
                    className="pill-dark text-xs sm:text-sm text-slate-100 bg-white/[0.07] border-white/15"
                  >
                    <Icon className="w-4 h-4 text-purple-300 shrink-0" />
                    <span>{pill.text}</span>
                  </span>
                );
              })}
            </div>

            {/* WhatsApp CTA Action Cards */}
            <div className="mt-8 sm:mt-10 w-full max-w-xl">
              <div className="text-xs font-bold uppercase tracking-widest text-purple-300/90 mb-3 text-center lg:text-left flex items-center justify-center lg:justify-start gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Select Your Region to Chat Directly</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                {/* International WhatsApp Card */}
                <motion.a
                  href="https://wa.me/8801896094070"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact International Students WhatsApp"
                  className="btn-whatsapp-intl p-4 flex flex-col justify-between group rounded-2xl relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-bold text-sm text-white">
                        International
                      </span>
                    </div>
                    <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                      UK · US · AU · CA
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-purple-100 mt-1 pt-2 border-t border-white/15">
                    <span className="flex items-center gap-1.5 font-semibold text-sm text-white">
                      <FaWhatsapp className="w-4 h-4 text-emerald-300" />
                      01896094070
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform font-bold text-white">
                      Chat Now →
                    </span>
                  </div>
                </motion.a>

                {/* Bangladesh WhatsApp Card */}
                <motion.a
                  href="https://wa.me/8801857290212"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact Bangladesh Students WhatsApp"
                  className="btn-whatsapp-bd p-4 flex flex-col justify-between group rounded-2xl relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="relative w-7 h-5 rounded-md overflow-hidden shrink-0 shadow-sm">
                        <span className="absolute inset-0 bg-[#006A4E]" />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F42A41]" />
                        </span>
                      </span>
                      <span className="font-bold text-sm text-white">
                        Bangladesh
                      </span>
                    </div>
                    <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                      All Universities
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-emerald-100 mt-1 pt-2 border-t border-white/15">
                    <span className="flex items-center gap-1.5 font-semibold text-sm text-white">
                      <FaWhatsapp className="w-4 h-4 text-emerald-300" />
                      01857290212
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform font-bold text-white">
                      Chat Now →
                    </span>
                  </div>
                </motion.a>
              </div>

              {/* Instant response guarantee text */}
              <p className="mt-3 text-xs text-slate-300 text-center lg:text-left flex items-center justify-center lg:justify-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline shrink-0" />
                <span>
                  Average WhatsApp response time:{" "}
                  <strong className="text-white font-semibold">
                    Under 2 minutes
                  </strong>
                  . 100% confidential.
                </span>
              </p>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase Card */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Outer Glow Halo */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-3xl blur-2xl transform -rotate-1 pointer-events-none" />
            {/* Glass Showcase Card */}
            <div className="relative bg-[#0d0630]/90 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base sm:text-lg text-white">
                      Quality Guarantee
                    </h2>
                    <p className="text-xs text-purple-200">
                      Standard with every assignment
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-400/15 border border-amber-400/30 px-2.5 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-amber-300">
                    4.9 / 5.0
                  </span>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="mt-5 space-y-3.5">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Free Turnitin AI &amp; Similarity Report
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Verifiable 0% AI detection and &lt;10% similarity score
                      included.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Subject-Specific Specialists
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Assigned to experienced scholars in CSE, BBA, BSS, MA,
                      MSC, and Law.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-4 h-4 text-indigo-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Formatted &amp; Referenced
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      APA 7th, Harvard, IEEE, MLA, Chicago formatting +
                      citations included.
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Order Indicator Banner */}
              <div className="mt-5 p-3.5 rounded-2xl bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-400/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white">
                    14 Active Tasks in Progress
                  </span>
                </div>
                <span className="text-xs font-bold text-purple-200">
                  98.6% On-Time
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Hero Stats Ribbon */}
        <motion.div
          className="mt-14 sm:mt-18 pt-10 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-purple-500/40 rounded-2xl p-4 sm:p-5 text-center transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-100 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-purple-200/70 mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
