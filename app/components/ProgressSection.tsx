"use client";

import { useEffect, useState } from "react";
import { Target, ShieldCheck, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const progressData = [
  {
    icon: Target,
    label: "On-time Delivery",
    value: 98,
    description: "Assignments delivered before the deadline",
  },
  {
    icon: ShieldCheck,
    label: "Plagiarism-Free Work",
    value: 100,
    description: "Every paper passes originality scans",
  },
  {
    icon: Trophy,
    label: "Customer Satisfaction",
    value: 96,
    description: "Students who rated us 5 stars",
  },
];

export default function ProgressSection() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => setAnimate(true), 200);
      return () => clearTimeout(timeout);
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[#2E9CA0] mb-3">
            Our Promise
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#21616A]">
            Quality You Can Rely On
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We obsess over the details so you can focus on learning. Here is how we perform on the metrics students care about most.
          </p>
        </motion.div>

        <motion.div 
          ref={ref}
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {progressData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm animate-float">
                    <Icon className="w-7 h-7 text-[#2E9CA0]" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wide text-gray-500">
                      {item.label}
                    </p>
                    <p className="text-3xl font-bold text-[#21616A]">
                      {item.value}%
                    </p>
                  </div>
                </div>

                <div className="progress-track mb-3">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={animate ? { width: `${item.value}%` } : { width: 0 }}
                    transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                  ></motion.div>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
