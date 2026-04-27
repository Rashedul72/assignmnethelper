"use client";

import dynamic from "next/dynamic";
import { Shield, Award, ShieldCheck, Globe } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// Lazy-load the WebGL canvas on the client only — keeps three.js +
// postprocessing out of the initial server bundle and avoids SSR mismatch.
const GridScan = dynamic(
  () => import("./GridScan").then((m) => m.GridScan),
  {
    ssr: false,
    loading: () => null,
  }
);

const stats = [
  { value: "15+", label: "Expert Writers" },
  { value: "1400+", label: "Satisfied Clients" },
  { value: "98%", label: "Success Rate" },
];

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative bg-[var(--primary)] text-white pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24 px-4 overflow-hidden isolate min-h-[680px] md:min-h-[760px]"
    >
      {/* Full-section interactive grid scan background.
          Skipped entirely when the user prefers reduced motion. */}
      {!prefersReducedMotion && (
        <div aria-hidden className="absolute inset-0 z-0">
          <GridScan
            sensitivity={0.55}
            lineThickness={1}
            linesColor="#2a223a"
            gridScale={0.1}
            scanColor="#c084fc"
            scanOpacity={0.45}
            enablePost
            bloomIntensity={0.55}
            chromaticAberration={0.0018}
            noiseIntensity={0.008}
            scanDirection="pingpong"
            scanDuration={2.0}
            scanDelay={1.5}
          />
        </div>
      )}

      {/* Soft brand glows on top of the grid to keep the section warm. */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-[var(--secondary)]/25 blur-[120px] pointer-events-none z-[1]"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-[24rem] h-[24rem] rounded-full bg-[var(--secondary)]/15 blur-[110px] pointer-events-none z-[1]"
      />

      {/* Vignette + centre wash so headline/CTAs stay legible against the grid. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(6,2,31,0.55) 0%, rgba(6,2,31,0.25) 55%, transparent 80%), linear-gradient(180deg, rgba(6,2,31,0.35) 0%, transparent 30%, transparent 70%, rgba(6,2,31,0.6) 100%)",
        }}
      />

      <motion.div
        className="content-shell relative z-10"
        style={{ y: prefersReducedMotion ? 0 : parallaxY }}
      >
        <motion.div
          className="flex flex-col items-center text-center gap-7 md:gap-9"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-2.5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="pill">
              <Shield className="w-4 h-4 text-[var(--secondary)]" />
              100% Confidential
            </span>
            <span className="pill">
              <Award className="w-4 h-4 text-[var(--secondary)]" />
              Expert Writers
            </span>
            <span className="pill relative overflow-hidden border border-[var(--secondary)] bg-[var(--secondary)]/85 text-white animate-pulse-glow">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span className="font-semibold">
                Free AI &amp; Similarity Report
              </span>
            </span>
          </motion.div>

          <motion.h1
            id="hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Expert <span className="gradient-text">Assignment Help</span>,
            Dissertation &amp; Research Paper Writing Service
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-white/80 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            Trusted academic partner for students in Bangladesh, UK, Australia,
            USA, Canada and Austria — with on-time delivery and free Turnitin
            reports.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center items-stretch w-full max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55 }}
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
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
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

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-6 md:gap-10 w-full max-w-xl mx-auto mt-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                className="group text-center cursor-default"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280 }}
              >
                <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                  {s.value}
                </div>
                <div className="text-xs md:text-sm text-gray-400 group-hover:text-[var(--secondary)] transition-colors duration-300">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Subtle hint label so users know the background reacts. */}
          {!prefersReducedMotion && (
            <div
              aria-hidden
              className="text-[11px] uppercase tracking-[0.22em] text-white/55 mt-2"
            >
              Scanning · move your cursor
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
