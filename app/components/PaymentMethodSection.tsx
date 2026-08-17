"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Lock, Sparkles, CheckCircle2 } from "lucide-react";

type PaymentMethod = {
  name: string;
  src: string;
  badge: string;
  description: string;
  supportedRegions: string;
};

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    name: "Bank Transfer & Wire",
    src: "/images/bank.png",
    badge: "Direct & Wire",
    description: "Fast local & international direct wire transfers via major banks.",
    supportedRegions: "UK, USA, AU, CA, AT, BD (GBP, USD, AUD, EUR, BDT)",
  },
  {
    name: "bKash Mobile Banking",
    src: "/images/bkash.png",
    badge: "Instant Mobile",
    description: "Instant 24/7 mobile payment for students across Bangladesh.",
    supportedRegions: "Bangladesh (BDT) · Personal / Merchant / Send Money",
  },
  {
    name: "Taptap Send & Remittance",
    src: "/images/taptap.png",
    badge: "Zero-Fee Remittance",
    description: "Zero-fee fast international money transfers from UK, Europe, USA & Canada.",
    supportedRegions: "UK, USA, Canada, Europe (GBP, EUR, USD, CAD)",
  },
];

const CURRENCIES = ["BDT", "GBP (£)", "AUD (A$)", "USD ($)", "CAD (C$)", "EUR (€)"];

export default function PaymentMethodSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      aria-labelledby="payment-heading"
      className="section-shell bg-gradient-to-b from-white via-slate-50 to-slate-100 relative overflow-hidden"
    >
      <div className="content-shell max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow section-eyebrow-light">
            <Sparkles className="w-3.5 h-3.5 text-[#620273]" />
            Secure Transactions
          </span>
          <h2
            id="payment-heading"
            className="section-title text-[#06021f]"
          >
            Flexible &amp; Safe Payment Options
          </h2>
          <p className="section-subtitle text-slate-700 mt-4">
            Pay safely with our 30% advance milestone model using your preferred
            local or international payment method.
          </p>
        </motion.div>

        {/* 3 Payment Method Cards */}
        <motion.div
          ref={ref}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {PAYMENT_METHODS.map((method) => (
            <motion.article
              key={method.name}
              className="modern-light-card p-7 flex flex-col justify-between items-center text-center group bg-white relative overflow-hidden"
              whileHover={{ y: -5 }}
            >
              <div className="w-full flex flex-col items-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100 mb-4">
                  {method.badge}
                </span>

                <div className="h-20 w-full flex items-center justify-center mb-4 p-2">
                  <Image
                    src={method.src}
                    alt={method.name}
                    width={100}
                    height={60}
                    className="max-h-16 w-auto object-contain transition-transform group-hover:scale-105"
                  />
                </div>

                <h3 className="text-lg font-bold text-[#06021f] mb-2 group-hover:text-[#620273] transition-colors">
                  {method.name}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {method.description}
                </p>
              </div>

              <div className="w-full pt-3 border-t border-slate-100 text-xs font-medium text-slate-500">
                {method.supportedRegions}
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Security & Currency Ribbon */}
        <motion.div
          className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-[#06021f] flex items-center gap-2">
                <span>100% Encrypted &amp; Milestone Protected</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xs text-slate-500">
                Only 30% deposit upfront — remainder upon satisfaction review.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5">
            {CURRENCIES.map((curr) => (
              <span
                key={curr}
                className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200"
              >
                {curr}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
