"use client";

import Image from "next/image";
import {
  GraduationCap,
  ArrowRight,
  Shield,
  Clock,
  Award,
  ShieldCheck,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative bg-[#21616A] text-white pt-32 pb-0 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-12">
          {/* Left: Text content - animates from left */}
          <motion.div 
            className="flex-1 text-center md:text-left pb-16 md:pb-24"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Trust Badges */}
            <motion.div 
              className="flex flex-wrap justify-center md:justify-start gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Shield className="w-4 h-4 text-[#2E9CA0]" />
                <span className="text-sm font-medium">100% Confidential</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Award className="w-4 h-4 text-[#2E9CA0]" />
                <span className="text-sm font-medium">Expert Writers</span>
              </motion.div>
              <motion.div 
                className="relative flex items-center gap-2 px-4 py-2 rounded-full border border-[#2E9CA0] bg-[#2E9CA0]/80 text-white shadow-[0_0_24px_rgba(46,156,160,0.6)]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 rounded-full bg-[#2E9CA0]/40 blur-md animate-pulse" />
                <ShieldCheck className="w-4 h-4 text-white relative z-10" />
                <span className="text-sm font-semibold relative z-10">Free AI &amp; Similarity Report</span>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex md:justify-start justify-center mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[#2E9CA0] blur-2xl opacity-30 rounded-full"></div>
                <GraduationCap className="w-20 h-20 relative z-10 text-[#2E9CA0] animate-float" />
              </div>
            </motion.div>

            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your Trusted Academic Partner
            </motion.h1>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href="https://wa.me/8801896094070"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-white! flex items-center gap-2"
              >
                <FaWhatsapp className="w-5 h-5 text-white" />
                WhatsApp: 01896094070
              </a>
              <a
                href="https://wa.me/8801857290212"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-white! flex items-center gap-2"
              >
                <FaWhatsapp className="w-5 h-5 text-white" />
                WhatsApp: 01857290212
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 mt-16 max-w-2xl md:max-w-md md:mx-0 mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">15+</div>
                <div className="text-sm text-gray-400">Expert Writers</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">1400+</div>
                <div className="text-sm text-gray-400">Satisfied Clients</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">98%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Hero image - animates from right */}
          <motion.div 
            className="flex-1 w-full md:w-auto flex items-end justify-center md:justify-end"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-xl h-80 md:h-[450px]">
              <Image
                src="/hero.png"
                alt="Students studying with StudyBeee"
                fill
                priority
                className="object-contain object-bottom drop-shadow-2xl md:scale-[1.25] lg:scale-[1.45] md:origin-bottom"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
