"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const testimonials = [
  {
    name: "Mir",
    text: "Excellent service provided with a high level of professionalism and a friendly approach. The team has strong knowledge across all core areas of IT projects and demonstrates great expertise. Most importantly they are always available when needed and ensure the best possible service at all times.",
    rating: 5,
  },
  {
    name: "Suneha",
    text: "The in-depth research and delightful insights are only possible with your work.",
    rating: 5,
  },
  {
    name: "Tithi",
    text: "Grateful for completing all the work on time.",
    rating: 5,
  },
  {
    name: "Himu",
    text: "Thank you for doing the work flawlessly.",
    rating: 5,
  },
  {
    name: "Saleha",
    text: "I am truly happy with the quality and sincerity of your work. Everything was delivered on time and very well organized. Throughout the entire process, I felt fully supported and always received a prompt response. I sincerely appreciate your dedication, patience, and genuine support.",
    rating: 5,
  },
  {
    name: "Woishi",
    text: "I’m truly satisfied with your  work delivered right on time.Exceptional quality satisfied with your work.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Auto-scroll carousel - infinite loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        // When we reach the end, reset to 0 after a brief moment
        if (next >= testimonials.length) {
          // Wait for animation to complete, then reset instantly
          setTimeout(() => {
            setIsTransitioning(false);
            setCurrentIndex(0);
            // Re-enable transitions after reset
            setTimeout(() => setIsTransitioning(true), 50);
          }, 600);
          return next;
        }
        return next;
      });
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-24 px-4 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-[#21616A] tracking-tight">
            Client Testimonials
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
            Trusted by students and professionals worldwide
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div ref={ref} className="relative">
          <div className="overflow-hidden px-2 sm:px-4">
            <motion.div
              className="flex gap-4 sm:gap-6 md:gap-8"
              animate={{
                x: `-${currentIndex * (100 / 3)}%`,
              }}
              transition={
                isTransitioning
                  ? {
                      type: "tween",
                      ease: "easeInOut",
                      duration: 0.6,
                    }
                  : { duration: 0 }
              }
            >
              {[...testimonials, ...testimonials].map((testimonial: typeof testimonials[0], index: number) => (
                <div
                  key={`${testimonial.name}-${index}`}
                  className="shrink-0 w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1.33rem)]"
                >
                  <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100/80 p-6 sm:p-8 md:p-10 h-[400px] sm:h-[420px] md:h-[480px] flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2E9CA0] via-[#21616A] to-[#2E9CA0]"></div>
                    
                    {/* Quote Icon - subtle */}
                    <div className="absolute top-6 sm:top-8 right-6 sm:right-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-[#21616A]" />
                    </div>
                    
                    {/* Stars */}
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-4 sm:mb-6 z-10">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <div className="flex-1 flex items-center z-10">
                      <p className="text-gray-700 text-sm sm:text-[15px] md:text-base leading-[1.7] sm:leading-[1.8] font-normal text-left w-full">
                        {testimonial.text}
                      </p>
                    </div>

                    {/* Name at Bottom */}
                    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200/60 z-10">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#2E9CA0] to-[#21616A] flex items-center justify-center text-white font-semibold text-xs sm:text-sm shadow-md">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm sm:text-base text-[#21616A] tracking-tight">
                            {testimonial.name}
                          </div>
                          <div className="text-[10px] sm:text-xs text-gray-500 font-normal mt-0.5">
                            Verified Client
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Founders section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-3xl font-bold text-[#21616A] text-center mb-8">
            Founders
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div 
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -3 }}
            >
              <div className="text-xs font-semibold text-[#2E9CA0] mb-2 uppercase tracking-wide">
                CEO
              </div>
              <div className="font-semibold text-lg text-[#21616A] mb-1">
                MD Rashedul Islam Junayed
              </div>
              <div className="text-sm text-gray-700 mb-2">
                Bachelor of Computer Science (Hons) – Mobile Computing and Networking
              </div>
              <div className="text-sm text-gray-500">
                UCSI University, Kuala Lumpur.
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -3 }}
            >
              <div className="text-xs font-semibold text-[#2E9CA0] mb-2 uppercase tracking-wide">
                Managing Director
              </div>
              <div className="font-semibold text-lg text-[#21616A] mb-1">
                Fahad Rahul
              </div>
              <div className="text-sm text-gray-700 mb-2">
                BSc in Environmental Science and Disaster Management
              </div>
              <div className="text-sm text-gray-500">
                Gopalganj Science and Technology University, Gopalganj 8105, Bangladesh.
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.02, y: -3 }}
            >
              <div className="text-xs font-semibold text-[#2E9CA0] mb-2 uppercase tracking-wide">
                Marketing & Technical Officer
              </div>
              <div className="font-semibold text-lg text-[#21616A] mb-1">
                Irfatul Islam
              </div>
              <div className="text-sm text-gray-700 mb-2">
                BSc in Multimedia & Gaming Technology
              </div>
              <div className="text-sm text-gray-500">
                Asia Pacific University of Technology and Innovation, Kuala Lumpur.
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
