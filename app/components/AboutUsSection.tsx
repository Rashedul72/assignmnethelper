"use client";

import { Globe, Users, CheckCircle2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#21616A]">About Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by thousands of students worldwide for academic excellence
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#2E9CA0]/30 text-center"
            variants={itemVariants}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#2E9CA0]/10 flex items-center justify-center group-hover:bg-[#2E9CA0]/20 transition-colors animate-float">
                <Globe className="w-8 h-8 text-[#2E9CA0]" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#21616A]">Global Reach</h3>
            <p className="text-gray-600 leading-relaxed">
              We currently operate in Bangladesh, UK, Australia, USA, Canada, and Austria.
            </p>
          </motion.div>

          <motion.div 
            className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#2E9CA0]/30 text-center"
            variants={itemVariants}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#2E9CA0]/10 flex items-center justify-center group-hover:bg-[#2E9CA0]/20 transition-colors animate-float">
                <Users className="w-8 h-8 text-[#2E9CA0]" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#21616A]">Expert Team</h3>
            <div className="text-4xl font-bold text-[#2E9CA0] mb-2">15+</div>
            <p className="text-gray-600">Dedicated Academic Experts</p>
          </motion.div>

          <motion.div 
            className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#2E9CA0]/30 text-center"
            variants={itemVariants}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#2E9CA0]/10 flex items-center justify-center group-hover:bg-[#2E9CA0]/20 transition-colors animate-float">
                <CheckCircle2 className="w-8 h-8 text-[#2E9CA0]" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#21616A]">Satisfied Clients</h3>
            <div className="text-4xl font-bold text-[#2E9CA0] mb-2">1400+</div>
            <p className="text-gray-600">Satisfied Clients</p>
          </motion.div>

          <motion.div 
            className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#2E9CA0]/30 text-center"
            variants={itemVariants}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#2E9CA0]/10 flex items-center justify-center group-hover:bg-[#2E9CA0]/20 transition-colors animate-float">
                <TrendingUp className="w-8 h-8 text-[#2E9CA0]" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#21616A]">Success Rate</h3>
            <div className="text-4xl font-bold text-[#2E9CA0] mb-2">98%</div>
            <p className="text-gray-600">Assignment Success</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
