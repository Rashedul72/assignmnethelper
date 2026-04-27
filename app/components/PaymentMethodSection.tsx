"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type PaymentMethod = {
  name: string;
  src: string;
  width: number;
  height: number;
  description: string;
};

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    name: "Bank Transfer",
    src: "/images/bank.png",
    width: 60,
    height: 60,
    description: "Direct local & international bank transfers.",
  },
  {
    name: "bKash",
    src: "/images/bkash.png",
    width: 110,
    height: 110,
    description: "Fast, popular mobile wallet payments in Bangladesh.",
  },
  {
    name: "Taptap",
    src: "/images/taptap.png",
    width: 90,
    height: 90,
    description: "Convenient digital wallet for quick transfers.",
  },
];

export default function PaymentMethodSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      aria-labelledby="payment-heading"
      className="section-shell bg-gray-50"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Payments</span>
          <h2
            id="payment-heading"
            className="section-title text-[var(--primary)]"
          >
            Flexible Payment Methods
          </h2>
          <p className="text-base md:text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Choose from multiple secure and easy payment options for your
            convenience.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {PAYMENT_METHODS.map((method) => (
            <motion.article
              key={method.name}
              className="soft-card flex flex-col items-center justify-center p-8 text-center"
              whileHover={{ y: -4 }}
            >
              <div className="h-24 flex items-center justify-center mb-4">
                <Image
                  src={method.src}
                  alt={method.name}
                  width={method.width}
                  height={method.height}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-[var(--primary)] mb-1.5">
                {method.name}
              </h3>
              <p className="text-sm text-gray-600 max-w-xs">
                {method.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
