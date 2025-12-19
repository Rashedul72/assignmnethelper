"use client";

import Image from "next/image";
import {
  GraduationCap,
  ArrowRight,
  Shield,
  Clock,
  Award,
  ShieldCheck,
  Sparkles,
  Star,
  Globe,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const generatedParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(generatedParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      className="relative bg-[var(--primary)] text-white pt-28 pb-0 px-4 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-[var(--secondary)]/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, -10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Icons */}
      <motion.div
        className="absolute top-20 left-10 opacity-20 pointer-events-none"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Star className="w-8 h-8 text-[var(--secondary)]" />
      </motion.div>

      <motion.div
        className="absolute top-40 right-20 opacity-15 pointer-events-none"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles className="w-6 h-6 text-[var(--secondary)]" />
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        style={{ y: parallaxY }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-end gap-12">
          {/* Left: Text content - animates from left */}
          <motion.div
            className="flex-1 text-center md:text-left pb-16 md:pb-24"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Trust Badges */}
            <motion.div
              className="flex flex-wrap justify-center md:justify-start gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="group relative flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 cursor-pointer overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Shield className="w-4 h-4 text-[var(--secondary)] relative z-10" />
                </motion.div>
                <span className="text-sm font-medium relative z-10">100% Confidential</span>
              </motion.div>

              <motion.div
                className="group relative flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 cursor-pointer overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Award className="w-4 h-4 text-[var(--secondary)] relative z-10" />
                </motion.div>
                <span className="text-sm font-medium relative z-10">Expert Writers</span>
              </motion.div>

              <motion.div
                className="group relative flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--secondary)] bg-[var(--secondary)]/80 text-white cursor-pointer overflow-hidden shadow-none"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 rounded-full bg-[var(--secondary)]/40 blur-md animate-pulse" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-[var(--secondary)]/60"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ShieldCheck className="w-4 h-4 text-white relative z-20" />
                </motion.div>
                <span className="text-sm font-semibold relative z-20">Free AI &amp; Similarity Report</span>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex md:justify-start justify-center mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* <div className="relative">
                <div className="absolute inset-0 bg-[var(--secondary)] blur-2xl opacity-30 rounded-full"></div>
                <GraduationCap className="w-20 h-20 relative z-10 text-[var(--secondary)] animate-float" />
              </div> */}
            </motion.div>

            <motion.h1 
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Expert Assignment Help, Dissertation &amp; Research Paper Writing Service
            </motion.h1>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-stretch w-full max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.a
                href="https://wa.me/8801896094070"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative btn-primary text-white flex items-center gap-3 overflow-hidden !shadow-none flex-1 min-w-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
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
                className="group relative btn-primary text-white flex items-center gap-3 overflow-hidden !shadow-none flex-1 min-w-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 }}
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

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 mt-8 max-w-2xl md:max-w-md md:mx-0 mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div
                className="group text-center md:text-left cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-white mb-1 relative"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    15+
                  </motion.span>
                  <div className="absolute -top-2 -right-2 w-2 h-2 bg-[var(--secondary)] rounded-full animate-ping"></div>
                </motion.div>
                <div className="text-sm text-gray-400 group-hover:text-[var(--secondary)] transition-colors duration-300">Expert Writers</div>
              </motion.div>

              <motion.div
                className="group text-center md:text-left cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-white mb-1 relative"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                  >
                    1400+
                  </motion.span>
                  <div className="absolute -top-2 -right-2 w-2 h-2 bg-[var(--secondary)] rounded-full animate-ping animation-delay-300"></div>
                </motion.div>
                <div className="text-sm text-gray-400 group-hover:text-[var(--secondary)] transition-colors duration-300">Satisfied Clients</div>
              </motion.div>

              <motion.div
                className="group text-center md:text-left cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-white mb-1 relative"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                  >
                    98%
                  </motion.span>
                  <div className="absolute -top-2 -right-2 w-2 h-2 bg-[var(--secondary)] rounded-full animate-ping animation-delay-600"></div>
                </motion.div>
                <div className="text-sm text-gray-400 group-hover:text-[var(--secondary)] transition-colors duration-300">Success Rate</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Hero image - animates from right */}
          <motion.div
            className="hidden lg:flex flex-1 w-full lg:w-auto items-end justify-center lg:justify-end relative"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-xl h-76 lg:h-[370px] xl:h-[420px]">
              <div className="relative w-full h-full min-h-[300px] flex items-end justify-center">
                <Image
                  src="/hero.png"
                  alt="Students studying with BDJHelper - Professional academic assistance service"
                  width={570}
                  height={570}
                  priority
                  quality={95}
                  sizes="(max-width: 1024px) 0vw, (max-width: 1280px) 50vw, 40vw"
                  className="object-contain object-bottom drop-shadow-2xl lg:scale-[1.05] xl:scale-[1.2] lg:origin-bottom w-auto h-full max-h-full"
                  style={{ objectPosition: 'bottom' }}
                />
              </div>

                {/* Floating elements around image */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-[var(--secondary)] rounded-full flex items-center justify-center shadow-lg z-20"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-[var(--secondary)]/80 rounded-full flex items-center justify-center shadow-lg z-20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Star className="w-3 h-3 text-white" />
                </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(-5px) rotate(-2deg); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </section>
  );
}
