"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const fields = [
  { code: "CSE", name: "Computer Science and Engineering" },
  { code: "BBA", name: "Bachelor of Business Administration" },
  { code: "BSE", name: "Bachelor of Science in Engineering" },
  { code: "MSC", name: "Master of Science" },
  { code: "BA", name: "Bachelor of Arts" },
  { code: "MA", name: "Master of Arts" },
  { code: "BSS", name: "Bachelor of Social Science" },
  { code: "MSS", name: "Master of Social Science" },
];

const tickerItems = [...fields, ...fields];

export default function FieldsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="fields" className="py-20 px-4 scroll-mt-20 bg-[var(--primary)]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Fields We Cover</h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            We provide specialized assistance across the following academic majors and fields
          </p>
        </motion.div>

        {/* Moving ticker of subjects */}
        <div className="subject-marquee-container border-y border-white/20 py-3 mb-10 bg-white/10">
          <div className="subject-marquee-track gap-8 text-sm font-medium text-white/90">
            {tickerItems.map((field, index) => (
              <span key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--secondary)]" />
                {field.code} &mdash; {field.name}
              </span>
            ))}
          </div>
        </div>
        
        <motion.div 
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {fields.map((field, index) => (
            <motion.div 
              key={index}
              className="group bg-[var(--secondary)] border-2 border-[var(--secondary)]/50 rounded-xl p-6 hover:border-white/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                {field.code}
              </div>
              <div className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors">
                {field.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
