"use client";

import { Globe, Users, CheckCircle2, TrendingUp, type LucideIcon } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type AboutCard = {
  icon: LucideIcon;
  title: string;
  metric?: string;
  description: string;
};

const ABOUT_CARDS: AboutCard[] = [
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "We currently operate in Bangladesh, UK, Australia, USA, Canada, and Austria.",
  },
  {
    icon: Users,
    title: "Expert Team",
    metric: "15+",
    description: "Dedicated academic experts across every major field.",
  },
  {
    icon: CheckCircle2,
    title: "Satisfied Clients",
    metric: "1400+",
    description: "Students who trusted us with their academic work.",
  },
  {
    icon: TrendingUp,
    title: "Success Rate",
    metric: "98%",
    description: "Assignments delivered with consistent academic excellence.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
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
      className="section-shell bg-gradient-to-b from-gray-50 to-white scroll-mt-24"
    >
      <div className="content-shell">
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">About Us</span>
          <h2
            id="about-heading"
            className="section-title text-[var(--primary)]"
          >
            Built for Students Who Demand Excellence
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Trusted by thousands of students worldwide for academic excellence.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {ABOUT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                className="group soft-card p-7 md:p-8 text-center"
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <div className="flex justify-center mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--secondary)]/10 flex items-center justify-center group-hover:bg-[var(--secondary)]/20 transition-colors">
                    <Icon className="w-7 h-7 text-[var(--secondary)]" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--primary)]">
                  {card.title}
                </h3>
                {card.metric && (
                  <div className="text-3xl md:text-4xl font-extrabold text-[var(--secondary)] mb-2 tracking-tight">
                    {card.metric}
                  </div>
                )}
                <p className="text-sm md:text-[0.95rem] text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
