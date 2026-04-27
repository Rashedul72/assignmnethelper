"use client";

import dynamic from "next/dynamic";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

// Lazy-load the WebGL aurora on the client only — keeps `ogl` out of the
// initial server bundle and avoids any SSR mismatch.
const SoftAurora = dynamic(() => import("./SoftAurora"), {
  ssr: false,
  loading: () => null,
});

type Field = { code: string; name: string };

const FIELDS: Field[] = [
  { code: "CSE", name: "Computer Science and Engineering" },
  { code: "BBA", name: "Bachelor of Business Administration" },
  { code: "BSE", name: "Bachelor of Science in Engineering" },
  { code: "MSC", name: "Master of Science" },
  { code: "BA", name: "Bachelor of Arts" },
  { code: "MA", name: "Master of Arts" },
  { code: "BSS", name: "Bachelor of Social Science" },
  { code: "MSS", name: "Master of Social Science" },
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
  hidden: { opacity: 0, scale: 0.85, y: 16 },
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
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="fields"
      aria-labelledby="fields-heading"
      className="section-shell scroll-mt-24 bg-[var(--primary)] relative overflow-hidden isolate"
    >
      {/* Animated aurora background — sits behind everything else.
          Skipped entirely when the user prefers reduced motion. */}
      {!prefersReducedMotion && (
        <div aria-hidden className="absolute inset-0 z-0">
          <SoftAurora
            speed={0.6}
            scale={1.5}
            brightness={1.0}
            color1="#c084fc"
            color2="#e100ff"
            noiseFrequency={2.5}
            noiseAmplitude={1.0}
            bandHeight={0.5}
            bandSpread={1.0}
            octaveDecay={0.1}
            layerOffset={0}
            colorSpeed={1.0}
            enableMouseInteraction
            mouseInfluence={0.25}
          />
        </div>
      )}

      {/* Soft brand glow on top of the aurora to keep the section warm. */}
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-[var(--secondary)]/15 blur-[140px] pointer-events-none z-[1]"
      />

      <div className="content-shell relative z-10">
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Disciplines</span>
          <h2 id="fields-heading" className="section-title text-white">
            Fields We Cover
          </h2>
          <p className="text-base md:text-lg text-gray-200/90 max-w-2xl mx-auto mt-4">
            Specialized assistance across every major academic field.
          </p>
        </motion.div>

        {/* Marquee */}
        <div className="subject-marquee-container border-y border-white/15 py-3 mb-10 bg-white/5">
          <div className="subject-marquee-track gap-8 text-sm font-medium text-white/90">
            {TICKER_ITEMS.map((field, index) => (
              <span
                key={`${field.code}-${index}`}
                className="flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[var(--secondary)]" />
                {field.code} &mdash; {field.name}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {FIELDS.map((field) => (
            <motion.article
              key={field.code}
              className="group bg-[var(--secondary)] border border-white/10 rounded-2xl p-6 hover:border-white/40 hover:shadow-[0_18px_40px_rgba(98,2,115,0.45)] transition-all duration-300 cursor-default"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl font-extrabold text-white mb-3 tracking-tight">
                {field.code}
              </div>
              <p className="text-white/85 text-sm leading-relaxed group-hover:text-white transition-colors">
                {field.name}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
