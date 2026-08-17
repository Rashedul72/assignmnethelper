"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Sparkles,
  Building2,
} from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  location: string;
  text: string;
  rating: number;
  subject: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Mir",
    role: "Postgraduate Student",
    location: "United Kingdom",
    subject: "Information Technology & Software Engineering",
    text: "Excellent service provided with a high level of professionalism and a friendly approach. The team has strong knowledge across all core areas of IT projects and demonstrates great expertise. Most importantly they are always available when needed and ensure the best possible service at all times.",
    rating: 5,
  },
  {
    name: "Suneha",
    role: "Undergraduate Student",
    location: "Australia",
    subject: "Business Administration & Marketing",
    text: "The in-depth research and delightful insights are only possible with your work. The Turnitin similarity report gave me complete confidence before submitting to my university portal.",
    rating: 5,
  },
  {
    name: "Saleha",
    role: "Master's Candidate",
    location: "United States",
    subject: "Public Health & Data Analysis",
    text: "I am truly happy with the quality and sincerity of your work. Everything was delivered on time and very well organized. Throughout the entire process, I felt fully supported and always received a prompt response. I sincerely appreciate your dedication, patience, and genuine support.",
    rating: 5,
  },
  {
    name: "Woishi",
    role: "University Student",
    location: "Bangladesh",
    subject: "Computer Science & Engineering (CSE)",
    text: "I'm truly satisfied with your work delivered right on time. Exceptional code explanations and documentation. My professor was very impressed with the structured submission.",
    rating: 5,
  },
  {
    name: "Tithi",
    role: "Economics Student",
    location: "Canada",
    subject: "Macroeconomics & Econometrics",
    text: "Grateful for completing all the work ahead of time. The statistical modeling was precise, and the 3 revision rounds gave me peace of mind throughout my semester.",
    rating: 5,
  },
  {
    name: "Himu",
    role: "Engineering Student",
    location: "Austria",
    subject: "Mechanical & Systems Design",
    text: "Thank you for doing the work flawlessly. The calculations and diagrams were crystal clear, formatted strictly according to European academic rubrics.",
    rating: 5,
  },
];

const FOUNDERS = [
  {
    role: "Chief Executive Officer",
    name: "MD Rashedul Islam Junayed",
    degree: "Bachelor of Computer Science (Hons) – Mobile Computing & Networking",
    institute: "UCSI University, Kuala Lumpur",
    initials: "RJ",
  },
  {
    role: "Managing Director",
    name: "Fahad Rahul",
    degree: "BSc in Environmental Science & Disaster Management",
    institute: "Gopalganj Science & Technology University, Bangladesh",
    initials: "FR",
  },
  {
    role: "Marketing & Technical Head",
    name: "Irfatul Islam",
    degree: "BSc in Multimedia & Gaming Technology",
    institute: "Academic Specialist & Systems Architect",
    initials: "II",
  },
];

const AUTOPLAY_MS = 5000;

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [...TESTIMONIALS, ...TESTIMONIALS];

  const recompute = useCallback(() => {
    if (!carouselRef.current) return;
    const firstCard = carouselRef.current.querySelector(
      ".carousel-item"
    ) as HTMLElement | null;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = window.innerWidth >= 768 ? 24 : 16;
    setTranslateX(-currentIndex * (cardWidth + gap));
  }, [currentIndex]);

  useEffect(() => {
    const t = setTimeout(recompute, 50);
    window.addEventListener("resize", recompute);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", recompute);
    };
  }, [recompute]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(handleNext, AUTOPLAY_MS);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-shell bg-gradient-to-b from-white via-slate-50 to-white scroll-mt-24 overflow-hidden"
    >
      <div className="content-shell">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow section-eyebrow-light">
            <Sparkles className="w-3.5 h-3.5 text-[#620273]" />
            Student Reviews
          </span>
          <h2
            id="testimonials-heading"
            className="section-title text-[#06021f]"
          >
            Trusted by 1,400+ Students Worldwide
          </h2>
          <p className="section-subtitle text-slate-700 mt-4">
            Hear from students across the UK, Australia, USA, Canada, Austria,
            and Bangladesh who achieved their academic goals with our expert guidance.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div
          ref={sectionRef}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Controls Bar */}
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-[#06021f]">
                4.9 / 5.0 Average Rating
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-[#620273] hover:border-purple-300 flex items-center justify-center shadow-sm transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-[#620273] hover:border-purple-300 flex items-center justify-center shadow-sm transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Testimonial Slides Track */}
          <div
            ref={carouselRef}
            className="overflow-hidden -mx-2 md:-mx-3"
            aria-label="Client testimonials carousel"
          >
            <motion.div
              className="flex gap-4 md:gap-6 px-2 md:px-3"
              animate={{ x: translateX }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
            >
              {slides.map((t, index) => (
                <article
                  key={`${t.name}-${index}`}
                  className="carousel-item shrink-0 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  <div className="modern-light-card p-6 sm:p-7 h-[380px] sm:h-[400px] flex flex-col justify-between relative group bg-white">
                    {/* Top Accent Gradient */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-80" />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                        <Quote className="w-8 h-8 text-purple-200 group-hover:text-purple-300 transition-colors" />
                      </div>

                      <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100 inline-block mb-3">
                        {t.subject}
                      </span>

                      <p className="text-slate-700 text-sm sm:text-[15px] leading-relaxed line-clamp-6">
                        “{t.text}”
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#620273] to-[#9333ea] flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-[#06021f] truncate">
                          {t.name}
                        </div>
                        <div className="text-xs text-slate-500 truncate flex items-center gap-1.5">
                          <span>{t.role}</span>
                          <span>•</span>
                          <span className="text-purple-700 font-medium">
                            {t.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>

          {/* Dots Pagination */}
          <div className="flex justify-center gap-2 mt-8" role="tablist">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={currentIndex % TESTIMONIALS.length === i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex % TESTIMONIALS.length === i
                    ? "w-8 bg-[#620273]"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Leadership & Founders Showcase */}
        <motion.div
          className="mt-20 sm:mt-24 pt-14 border-t border-slate-200"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#620273] bg-purple-100 px-3 py-1 rounded-full inline-block mb-2">
              Academic Leadership
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#06021f] tracking-tight">
              Meet Our Founders &amp; Directors
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Educated at prestigious international universities, leading a team
              of 15+ verified academic writers.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {FOUNDERS.map((f, i) => (
              <motion.article
                key={f.name}
                className="modern-light-card p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#06021f] text-white font-extrabold text-base flex items-center justify-center shadow-lg shadow-purple-950/20 shrink-0">
                      {f.initials}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 block">
                        {f.role}
                      </span>
                      <h4 className="font-bold text-base sm:text-lg text-[#06021f]">
                        {f.name}
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-[#620273] shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-800">{f.degree}</span>
                    </div>
                    {f.institute && (
                      <div className="flex items-start gap-2 text-slate-600 pt-1 border-t border-slate-200/60">
                        <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span>{f.institute}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
