"use client";

import { CheckCircle, Globe } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 px-4 bg-[var(--primary)] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Excel in Your Studies?
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join thousands of successful students who trust us with their academic assignments. 
          Get started today and experience the difference.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-stretch w-full max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="https://wa.me/8801896094070"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group text-white flex items-center gap-3 flex-1 min-w-0 !shadow-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative z-10 flex flex-col items-start gap-1 min-w-0 flex-1">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Globe className="w-6 h-6 text-white shrink-0" />
                </motion.div>
                <span className="font-semibold text-white text-lg whitespace-nowrap">International Students</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <FaWhatsapp className="w-6 h-6 text-white/90 shrink-0" />
                <span className="text-lg text-white/90">01896094070</span>
              </div>
            </div>
          </motion.a>
          <motion.a
            href="https://wa.me/8801857290212"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group text-white flex items-center gap-3 flex-1 min-w-0 !shadow-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative z-10 flex flex-col items-start gap-1 min-w-0 flex-1">
              <div className="flex items-center gap-2 whitespace-nowrap">
                {/* Bangladesh Flag */}
                <div className="relative w-6 h-5 rounded-sm overflow-hidden shadow-sm shrink-0">
                  <div className="absolute inset-0 bg-[#006A4E]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#F42A41]"></div>
                  </div>
                </div>
                <span className="font-semibold text-white text-lg whitespace-nowrap">Bangladesh Students</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <FaWhatsapp className="w-6 h-6 text-white/90 shrink-0" />
                <span className="text-lg text-white/90">01857290212</span>
              </div>
            </div>
          </motion.a>
        </motion.div>

        <motion.div 
          ref={ref}
          className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div 
            className="flex flex-col items-center text-center gap-3"
            whileHover={{ scale: 1.05, y: -3 }}
          >
            <CheckCircle className="w-6 h-6 text-[var(--secondary)] shrink-0" />
            <div className="text-center">
              <div className="font-semibold mb-1">Three Revisions</div>
              <div className="text-sm text-gray-400">Up to three revisions included</div>
            </div>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center text-center gap-3"
            whileHover={{ scale: 1.05, y: -3 }}
          >
            <CheckCircle className="w-6 h-6 text-[var(--secondary)] shrink-0" />
            <div className="text-center">
              <div className="font-semibold mb-1">24/7 Support</div>
              <div className="text-sm text-gray-400">Always here when you need us</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

