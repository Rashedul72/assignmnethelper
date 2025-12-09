"use client";

import { BookOpen, FileText, Presentation, PenTool, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  { icon: FileText, name: "Assignments", desc: "High-quality assignment writing and completion" },
  { icon: BookOpen, name: "Research", desc: "In-depth research papers and academic research" },
  { icon: PenTool, name: "Proposals", desc: "Research proposals, project proposals, and grant proposals" },
  { icon: Presentation, name: "Posters", desc: "Academic posters and presentation materials" },
  { icon: FileText, name: "Essays", desc: "Essay writing across all academic levels" },
  { icon: BookOpen, name: "Dissertations", desc: "Thesis and dissertation writing support" },
  { icon: FileText, name: "Case Studies", desc: "Detailed case study analysis and writing" },
  { icon: FileText, name: "Reports", desc: "Academic reports and documentation" },
  { icon: Presentation, name: "Presentations", desc: "PowerPoint presentations and slides" },
  { icon: PenTool, name: "Proofreading & Editing", desc: "Professional editing and proofreading services" },
];

export default function ServicesSection() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#21616A]">What We Do</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive academic services designed to help you succeed
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div 
                key={index}
                className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#2E9CA0]/30"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-[#2E9CA0]/10 flex items-center justify-center group-hover:bg-[#2E9CA0]/20 transition-colors animate-float">
                      <Icon className="w-7 h-7 text-[#2E9CA0]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 text-[#21616A] group-hover:text-[#2E9CA0] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Features */}
        <motion.div 
          className="mt-16 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div 
            className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <CheckCircle className="w-6 h-6 text-[#2E9CA0] flex-shrink-0" />
            <div>
              <div className="font-semibold text-[#21616A]">Plagiarism-Free</div>
              <div className="text-sm text-gray-600">100% Original Content</div>
            </div>
          </motion.div>
          <motion.div 
            className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <CheckCircle className="w-6 h-6 text-[#2E9CA0] flex-shrink-0" />
            <div>
              <div className="font-semibold text-[#21616A]">On-Time Delivery</div>
              <div className="text-sm text-gray-600">Never Miss a Deadline</div>
            </div>
          </motion.div>
          <motion.div 
            className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <CheckCircle className="w-6 h-6 text-[#2E9CA0] flex-shrink-0" />
            <div>
              <div className="font-semibold text-[#21616A]">Free AI & Similarity Report</div>
              <div className="text-sm text-gray-600">Turnitin AI and similarity report included on request</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
