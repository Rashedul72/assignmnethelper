"use client";

import { useEffect, useState } from "react";
import { Target, ShieldCheck, Trophy } from "lucide-react";

const progressData = [
  {
    icon: Target,
    label: "On-time Delivery",
    value: 98,
    description: "Assignments delivered before the deadline",
  },
  {
    icon: ShieldCheck,
    label: "Plagiarism-Free Work",
    value: 100,
    description: "Every paper passes originality scans",
  },
  {
    icon: Trophy,
    label: "Customer Satisfaction",
    value: 96,
    description: "Students who rated us 5 stars",
  },
];

export default function ProgressSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-[#00C4FF] mb-3">
            Our Promise
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0A1A2F]">
            Quality You Can Rely On
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We obsess over the details so you can focus on learning. Here is how we perform on the metrics students care about most.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {progressData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm animate-float">
                    <Icon className="w-7 h-7 text-[#00C4FF]" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-wide text-gray-500">
                      {item.label}
                    </p>
                    <p className="text-3xl font-bold text-[#0A1A2F]">
                      {item.value}%
                    </p>
                  </div>
                </div>

                <div className="progress-track mb-3">
                  <div
                    className="progress-fill"
                    style={{ width: animate ? `${item.value}%` : "0%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

