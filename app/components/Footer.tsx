"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Globe, MapPin } from "lucide-react";

const QUICK_LINKS = [
  { id: "about", label: "About" },
  { id: "fields", label: "Fields" },
  { id: "services", label: "Services" },
  { id: "testimonials", label: "Reviews" },
];

const REGIONS = [
  "Bangladesh",
  "United Kingdom",
  "Australia",
  "United States",
  "Canada",
  "Austria",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--primary)] text-white border-t border-white/10">
      <div className="content-shell px-4 sm:px-6 lg:px-8 py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="text-xl font-extrabold tracking-tight mb-3">
              BDJHelper
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Expert assignment help, dissertation writing, research papers,
              proposals, posters, case studies, and reports. Free Turnitin AI
              &amp; similarity reports on request.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`#${link.id}`}
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80 mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://wa.me/8801896094070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/85 hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4 text-[var(--secondary)]" />
                  <FaWhatsapp className="w-4 h-4" />
                  <span>+880 1896-094070</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/8801857290212"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/85 hover:text-white transition-colors"
                >
                  <span
                    aria-hidden
                    className="relative w-4 h-3 rounded-sm overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-[#006A4E]" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#F42A41]" />
                    </span>
                  </span>
                  <FaWhatsapp className="w-4 h-4" />
                  <span>+880 1857-290212</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/70">
                <MapPin className="w-4 h-4 text-[var(--secondary)] mt-0.5" />
                <span>{REGIONS.join(" · ")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {currentYear} BDJHelper. All rights reserved.</p>
          <p>Built with care for students worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
