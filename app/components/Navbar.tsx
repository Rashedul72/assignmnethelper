"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type NavItem = { id: string; label: string };

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "fields", label: "Fields" },
  { id: "services", label: "Services" },
  { id: "testimonials", label: "Reviews" },
];

const SCROLL_OFFSET = 96;
const TRACKED_SECTIONS = ["about", "fields", "services", "testimonials"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    let ticking = false;

    const updateState = () => {
      const y = window.scrollY;
      setIsScrolled(y > 40);

      if (isOpenRef.current) setIsOpen(false);

      if (y < 120) {
        setActiveSection("home");
        ticking = false;
        return;
      }

      const current = TRACKED_SECTIONS.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
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
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(sectionId);
    if (!el) return;
    window.scrollTo({
      top: el.offsetTop - SCROLL_OFFSET,
      behavior: "smooth",
    });
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-[var(--primary)]/95 backdrop-blur-md shadow-[0_10px_28px_rgba(6,2,31,0.45)]"
          : "bg-[var(--primary)]/90 backdrop-blur-sm"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "h-[4.25rem]" : "h-[5rem] md:h-[5.5rem]"
          }`}
        >
          <Link
            href="/"
            aria-label="BDJHelper home"
            className="flex items-center"
          >
            <Image
              src="/logo_text.png"
              alt="BDJHelper Logo"
              width={220}
              height={220}
              priority
              className={`w-auto transition-all duration-500 ${
                isScrolled ? "h-10 md:h-11" : "h-11 md:h-13"
              }`}
            />
          </Link>

          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primary)] ${
                    isActive
                      ? "text-white bg-[var(--secondary)] shadow-[0_8px_18px_rgba(98,2,115,0.45)] font-semibold"
                      : "text-gray-200 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className={`md:hidden relative p-2 rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary)]/60 ${
              isOpen ? "bg-white/10" : "hover:bg-white/5"
            }`}
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                }`}
              >
                <Menu className="w-6 h-6 text-white" />
              </span>
              <span
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
                }`}
              >
                <X className="w-6 h-6 text-white" />
              </span>
            </div>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[var(--primary)] border-t border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-md">
          <div className="px-5 py-4 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary)]/60 ${
                    isActive
                      ? "text-white bg-[var(--secondary)] font-semibold"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive ? "bg-white" : "bg-white/40"
                      }`}
                    />
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
