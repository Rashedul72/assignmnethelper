"use client";

import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#21616A] to-[#1a4a52] text-white">
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
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="btn-primary group">
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
        </motion.div>

        <motion.div 
          ref={ref}
          className="grid md:grid-cols-3 gap-6 text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div 
            className="flex items-start gap-3"
            whileHover={{ scale: 1.05, x: 5 }}
          >
            <CheckCircle className="w-6 h-6 text-[#2E9CA0] flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold mb-1">Free Revisions</div>
              <div className="text-sm text-gray-400">Unlimited revisions until satisfied</div>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-start gap-3"
            whileHover={{ scale: 1.05, x: 5 }}
          >
            <CheckCircle className="w-6 h-6 text-[#2E9CA0] flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold mb-1">24/7 Support</div>
              <div className="text-sm text-gray-400">Always here when you need us</div>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-start gap-3"
            whileHover={{ scale: 1.05, x: 5 }}
          >
            <CheckCircle className="w-6 h-6 text-[#2E9CA0] flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold mb-1">Secure Payment</div>
              <div className="text-sm text-gray-400">Safe and encrypted transactions</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
