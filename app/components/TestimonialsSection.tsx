"use client";

import { Star, Quote } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Testimonial = {
  name: string;
  text: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
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
    text: "I'm truly satisfied with your work delivered right on time. Exceptional quality — satisfied with your work.",
    rating: 5,
  },
];

const FOUNDERS = [
  {
    role: "CEO",
    name: "MD Rashedul Islam Junayed",
    degree:
      "Bachelor of Computer Science (Hons) – Mobile Computing and Networking",
    institute: "UCSI University, Kuala Lumpur.",
  },
  {
    role: "Managing Director",
    name: "Fahad Rahul",
    degree: "BSc in Environmental Science and Disaster Management",
    institute:
      "Gopalganj Science and Technology University, Gopalganj 8105, Bangladesh.",
  },
  {
    role: "Marketing & Technical Head",
    name: "Irfatul Islam",
    degree: "BSc in Multimedia & Gaming Technology",
    institute: "",
  },
];

const AUTOPLAY_MS = 4500;

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate slides for seamless infinite loop
  const slides = [...TESTIMONIALS, ...TESTIMONIALS];

  // Recompute translation on resize / index change
  useEffect(() => {
    const recompute = () => {
      if (!carouselRef.current) return;
      const firstCard = carouselRef.current.querySelector(
        ".carousel-item"
      ) as HTMLElement | null;
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const gap = window.innerWidth >= 768 ? 24 : 16;
      setTranslateX(-currentIndex * (cardWidth + gap));
    };

    const t = setTimeout(recompute, 80);
    window.addEventListener("resize", recompute);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", recompute);
    };
  }, [currentIndex]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= TESTIMONIALS.length) {
          resetTimer = setTimeout(() => {
            setIsTransitioning(false);
            setCurrentIndex(0);
            setTimeout(() => setIsTransitioning(true), 20);
          }, 600);
          return next;
        }
        return next;
      });
    }, AUTOPLAY_MS);

    return () => {
      clearInterval(interval);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [isPaused]);

  const activeDot = currentIndex % TESTIMONIALS.length;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-shell bg-white scroll-mt-24"
    >
      <div className="content-shell">
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Testimonials</span>
          <h2
            id="testimonials-heading"
            className="section-title text-[var(--primary)]"
          >
            What Our Clients Say
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto mt-4">
            Trusted by students and professionals worldwide.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          ref={sectionRef}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div
            ref={carouselRef}
            className="overflow-hidden -ml-2 md:-ml-4"
            aria-label="Client testimonials carousel"
            aria-roledescription="carousel"
          >
            <motion.div
              className="flex gap-4 md:gap-6"
              animate={{ x: translateX }}
              transition={
                isTransitioning
                  ? { type: "tween", ease: "easeInOut", duration: 0.6 }
                  : { duration: 0 }
              }
            >
              {slides.map((t, index) => (
                <article
                  key={`${t.name}-${index}`}
                  className="carousel-item shrink-0 w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] pl-2 md:pl-4"
                  aria-roledescription="slide"
                >
                  <div className="bg-linear-to-br from-white to-gray-50/60 rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_rgba(6,2,31,0.06)] border border-gray-100 p-6 sm:p-8 md:p-9 h-[360px] sm:h-[400px] md:h-[440px] flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_18px_40px_rgba(6,2,31,0.12)] transition-shadow duration-300">
                    <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-[var(--secondary)] via-[var(--primary)] to-[var(--secondary)]" />

                    <div className="absolute top-6 right-6 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity">
                      <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-[var(--primary)]" />
                    </div>

                    <div className="flex items-center gap-1 mb-4 sm:mb-5 z-10">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    <p className="flex-1 text-gray-700 text-sm sm:text-[15px] md:text-base leading-[1.75] z-10">
                      “{t.text}”
                    </p>

                    <div className="mt-6 pt-5 border-t border-gray-200/70 z-10">
                      <div className="flex items-center gap-3">
                        <div
                          aria-hidden
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-linear-to-br from-[var(--secondary)] to-[var(--primary)] flex items-center justify-center text-white font-semibold text-sm shadow-md"
                        >
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm sm:text-base text-[var(--primary)] tracking-tight">
                            {t.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            Verified Client
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8" role="tablist">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={activeDot === i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary)]/50 ${
                  activeDot === i
                    ? "w-7 bg-[var(--secondary)]"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Founders */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary)] text-center mb-8">
            Founders
          </h3>
          <div className="grid gap-5 md:gap-6 sm:grid-cols-2 md:grid-cols-3">
            {FOUNDERS.map((f, i) => (
              <motion.article
                key={f.name}
                className="soft-card p-6 h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.55, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div className="text-xs font-semibold text-[var(--secondary)] mb-2 uppercase tracking-[0.18em]">
                  {f.role}
                </div>
                <div className="font-semibold text-lg text-[var(--primary)] mb-1.5">
                  {f.name}
                </div>
                <div className="text-sm text-gray-700 mb-1.5">{f.degree}</div>
                {f.institute && (
                  <div className="text-sm text-gray-500">{f.institute}</div>
                )}
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
