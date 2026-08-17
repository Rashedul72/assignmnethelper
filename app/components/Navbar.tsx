"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import {
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Globe,
  Award,
  BookOpen,
  Layers,
  Star,
  CheckCircle2,
} from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  icon: typeof BookOpen;
};

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Sparkles },
  { id: "about", label: "About Us", icon: Award },
  { id: "fields", label: "Disciplines", icon: BookOpen },
  { id: "services", label: "Services", icon: Layers },
  { id: "how-it-works", label: "How It Works", icon: CheckCircle2 },
  { id: "testimonials", label: "Reviews", icon: Star },
  { id: "faq", label: "FAQ", icon: Layers },
];

const SCROLL_OFFSET = 88;
const TRACKED_SECTIONS = [
  "about",
  "fields",
  "how-it-works",
  "services",
  "testimonials",
  "faq",
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Handle outside click for contact dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowContactDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Handle scroll spy and header background change
  useEffect(() => {
    let ticking = false;

    const updateState = () => {
      const y = window.scrollY;
      setIsScrolled(y > 30);

      if (isOpenRef.current) setIsOpen(false);

      if (y < 150) {
        setActiveSection("home");
        ticking = false;
        return;
      }

      const current = TRACKED_SECTIONS.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom >= 140;
      });

      if (current) setActiveSection(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateState();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    setIsOpen(false);
    setShowContactDropdown(false);
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(sectionId);
    if (!el) return;
    const offsetPosition =
      el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, []);

  return (
    <nav
      aria-label="Main Navigation"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#06021f]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_35px_rgba(3,1,18,0.6)] py-2.5"
          : "bg-gradient-to-b from-[#06021f]/95 via-[#06021f]/80 to-transparent backdrop-blur-sm py-4 md:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            aria-label="BDJHelper Home"
            className="flex items-center gap-2.5 group focus:outline-none shrink-0"
          >
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/logo_text.png"
                alt="BDJHelper Logo"
                width={200}
                height={50}
                priority
                className={`w-auto object-contain transition-all duration-300 ${
                  isScrolled ? "h-9 md:h-10" : "h-10 md:h-12"
                }`}
              />
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-white/[0.04] p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-[#620273] to-[#9333ea] shadow-[0_4px_16px_rgba(147,51,234,0.4)]"
                      : "text-slate-200 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action & WhatsApp Dropdown */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick WhatsApp button with dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowContactDropdown((prev) => !prev)}
                className="btn-whatsapp-intl flex items-center gap-2.5 px-4 py-2 text-sm font-semibold cursor-pointer"
                aria-expanded={showContactDropdown}
                aria-haspopup="true"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <FaWhatsapp className="w-4 h-4 text-white" />
                <span>Get Help Now</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    showContactDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {showContactDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-[#0b0528] border border-purple-500/30 rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-purple-300 border-b border-white/10 mb-1.5">
                    Select Your Region
                  </div>
                  <a
                    href="https://wa.me/8801896094070"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-purple-600/30 border border-purple-400/30 flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4 text-purple-300 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white">
                        International Students
                      </div>
                      <div className="text-xs text-purple-200/80 flex items-center gap-1.5">
                        <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
                        <span>+880 1896-094070</span>
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/8801857290212"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors group mt-1"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-600/30 border border-emerald-400/30 flex items-center justify-center shrink-0">
                      <span className="relative w-4 h-3 rounded-xs overflow-hidden">
                        <span className="absolute inset-0 bg-[#006A4E]" />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-[#F42A41]" />
                        </span>
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white">
                        Bangladesh Students
                      </div>
                      <div className="text-xs text-emerald-200/80 flex items-center gap-1.5">
                        <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
                        <span>+880 1857-290212</span>
                      </div>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="https://wa.me/8801896094070"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct WhatsApp chat"
              className="p-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/30"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>

            <button
              type="button"
              className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 transition-colors"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-[34rem] opacity-100 border-b border-white/15 shadow-2xl"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-[#0b0528]/98 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left text-sm font-medium transition-all ${
                    isActive
                      ? "text-white bg-gradient-to-r from-[#620273] to-[#9333ea] font-bold shadow-md"
                      : "text-slate-200 bg-white/[0.04] hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-purple-300" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile CTA WhatsApp Buttons */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-300 px-1">
              Connect on WhatsApp (24/7 Fast Response)
            </div>

            <a
              href="https://wa.me/8801896094070"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-intl w-full py-2.5 px-4 flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-purple-200" />
                <span className="font-semibold">International Students</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-purple-100">
                <FaWhatsapp className="w-4 h-4 text-emerald-300" />
                <span>+880 1896-094070</span>
              </div>
            </a>

            <a
              href="https://wa.me/8801857290212"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-bd w-full py-2.5 px-4 flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative w-4 h-3 rounded-xs overflow-hidden">
                  <span className="absolute inset-0 bg-[#006A4E]" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F42A41]" />
                  </span>
                </span>
                <span className="font-semibold">Bangladesh Students</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-100">
                <FaWhatsapp className="w-4 h-4 text-emerald-300" />
                <span>+880 1857-290212</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
