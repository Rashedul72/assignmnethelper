"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles, MessageCircleQuestion } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

type FAQItem = {
  question: string;
  answer: string;
  category: string;
};

const FAQS: FAQItem[] = [
  {
    question: "What academic writing services does BDJHelper provide?",
    answer:
      "BDJHelper provides comprehensive academic assistance including assignment writing, dissertation and thesis support, academic research papers, proposals, lab reports, case studies, academic posters, and professional proofreading/editing. All services are handled by qualified subject scholars.",
    category: "Services",
  },
  {
    question: "Do you provide free Turnitin AI and similarity reports?",
    answer:
      "Yes! Every order includes a complimentary Turnitin similarity and AI detection report upon request. We ensure 0% unauthorized AI generation and strictly adhere to safe similarity thresholds under your university guidelines.",
    category: "Quality",
  },
  {
    question: "How many revisions are included with my assignment?",
    answer:
      "We include up to three free revisions with every project. If your professor requests updates or adjustments based on the initial submission guidelines, our experts will modify the paper promptly at no extra charge.",
    category: "Policies",
  },
  {
    question: "Which countries and universities do you cater to?",
    answer:
      "We actively serve students studying in Bangladesh, the United Kingdom (UK), Australia (AU), the United States (USA), Canada (CA), and Austria (AT). Our scholars are well-versed in APA 7th, Harvard, IEEE, MLA, Chicago, and Oxford referencing formats.",
    category: "Coverage",
  },
  {
    question: "How does the payment process work?",
    answer:
      "We operate with a transparent 2-stage milestone system: a 30% advance deposit to assign your subject expert and commence writing, and the remaining 70% upon completion after you inspect the draft or similarity reports. We accept bKash, direct Bank Transfer, and Taptap.",
    category: "Payment",
  },
  {
    question: "How quickly can you deliver urgent assignments?",
    answer:
      "We offer rush delivery options ranging from 12 to 48 hours for urgent assignments, as well as extended milestone deliveries for multi-week dissertations and thesis projects. Message us on WhatsApp for an immediate timeframe confirmation.",
    category: "Deadlines",
  },
  {
    question: "Is my personal and academic information kept confidential?",
    answer:
      "Absolutely. We maintain strict non-disclosure policies. Your student ID, personal details, and university name are never shared or stored in public repositories.",
    category: "Privacy",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="section-shell bg-slate-50 scroll-mt-24 relative overflow-hidden"
    >
      <div className="content-shell max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow section-eyebrow-light">
            <Sparkles className="w-3.5 h-3.5 text-[#620273]" />
            Frequently Asked Questions
          </span>
          <h2
            id="faq-heading"
            className="section-title text-[#06021f]"
          >
            Got Questions? We Have Answers
          </h2>
          <p className="section-subtitle text-slate-700 mt-4">
            Everything you need to know about our writing process, Turnitin
            guarantees, revisions, and payment options.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div ref={ref} className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                className="modern-light-card overflow-hidden bg-white border border-slate-200/90"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#620273] text-white"
                          : "bg-purple-100 text-[#620273]"
                      }`}
                    >
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-base sm:text-lg text-[#06021f]">
                      {faq.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#620273]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-slate-100">
                        <div className="pt-3">{faq.answer}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <motion.div
          className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <MessageCircleQuestion className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#06021f]">
                Still have specific questions?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Our support team is online 24/7 on WhatsApp to assist you immediately.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/8801896094070"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-intl px-5 py-2.5 text-xs sm:text-sm whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <FaWhatsapp className="w-4 h-4 text-emerald-300" />
            <span>Ask Us Directly</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
