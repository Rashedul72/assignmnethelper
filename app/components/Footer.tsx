"use client";

import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Globe, ShieldCheck, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";

const QUICK_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "fields", label: "Disciplines" },
  { id: "services", label: "All Services" },
  { id: "how-it-works", label: "How It Works" },
  { id: "testimonials", label: "Student Reviews" },
  { id: "faq", label: "FAQ" },
];

const SERVICES_LINKS = [
  "Assignment Writing",
  "Dissertation & Thesis",
  "Research Papers",
  "Project Proposals",
  "Case Study Analysis",
  "Proofreading & Editing",
  "Academic Posters",
  "Technical Lab Reports",
];

const REGIONS = [
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "United States", flag: "🇺🇸" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Austria", flag: "🇦🇹" },
  { name: "Bangladesh", flag: "🇧🇩" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80;
    const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: pos, behavior: "smooth" });
  };

  return (
    <footer className="bg-white text-[#1c1524] border-t border-[#e6e2ea]">
      <div className="content-shell px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid gap-10 lg:gap-12 md:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-[#eeeaf1]">
          {/* Col 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("home");
              }}
              className="inline-block mb-4"
            >
              <Image
                src="/logo_text.png"
                alt="BDJHelper Logo"
                width={180}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="text-sm text-[#5e5668] leading-relaxed mb-6 max-w-sm">
              BDJHelper is a premium academic writing and research consultancy
              trusted by 1,400+ students worldwide. Delivering original, Turnitin-verified
              academic work with 24/7 dedicated support.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#620273] bg-[#f6eef8] border border-[#ead7ef] px-3.5 py-2 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>100% Confidential &amp; Turnitin Verified</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#620273] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className="text-[#5e5668] hover:text-[#620273] transition-colors cursor-pointer flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#620273]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#620273] mb-4">
              Academic Services
            </h3>
            <ul className="space-y-2 text-sm text-[#5e5668]">
              {SERVICES_LINKS.map((svc) => (
                <li key={svc} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#620273]" />
                  <span>{svc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: 24/7 WhatsApp Support (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#620273] mb-4">
              Direct Contact
            </h3>
            <div className="space-y-3">
              {/* International Contact */}
              <a
                href="https://wa.me/8801896094070"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#f6f5f3] hover:bg-[#f6eef8] border border-[#e6e2ea] transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-[#ead7ef] flex items-center justify-center text-[#620273] shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#5e5668]">International Students</div>
                  <div className="text-sm font-bold text-[#1c1524] flex items-center gap-1.5">
                    <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>+880 1896-094070</span>
                  </div>
                </div>
              </a>

              {/* Bangladesh Contact */}
              <a
                href="https://wa.me/8801857290212"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#f6f5f3] hover:bg-emerald-50 border border-[#e6e2ea] transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-emerald-200 flex items-center justify-center shrink-0">
                  <span className="relative w-4 h-3 rounded-xs overflow-hidden">
                    <span className="absolute inset-0 bg-[#006A4E]" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F42A41]" />
                    </span>
                  </span>
                </div>
                <div>
                  <div className="text-xs text-[#5e5668]">Bangladesh Students</div>
                  <div className="text-sm font-bold text-[#1c1524] flex items-center gap-1.5">
                    <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>+880 1857-290212</span>
                  </div>
                </div>
              </a>

              <div className="pt-2 text-xs text-[#5e5668] flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#620273]" />
                <span>24 Hours · 7 Days a Week Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Regions Strip */}
        <div className="py-6 border-b border-[#eeeaf1] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#1c1524] font-semibold">
            <MapPin className="w-4 h-4 text-[#620273]" />
            <span>Serving Students In:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {REGIONS.map((r) => (
              <span
                key={r.name}
                className="text-xs text-[#5e5668] bg-[#f6f5f3] border border-[#e6e2ea] px-3 py-1 rounded-full flex items-center gap-1.5"
              >
                <span>{r.flag}</span>
                <span>{r.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5e5668]">
          <p>© {currentYear} BDJHelper. All rights reserved.</p>
          <p className="text-center sm:text-right max-w-lg">
            BDJHelper provides model research papers, academic guidance, and proofreading
            services designed to assist students in their educational journey.
          </p>
        </div>
      </div>
    </footer>
  );
}
