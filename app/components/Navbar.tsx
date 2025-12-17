"use client";

import { GraduationCap, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Close mobile menu when scrolling
      if (isOpen) {
        setIsOpen(false);
      }

      // Update active section based on scroll position
      const sections = ["home", "about", "fields", "services", "testimonials"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 96; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "fields", label: "Fields" },
    { id: "services", label: "Services" },
    { id: "testimonials", label: "Reviews" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      isScrolled
        ? 'bg-[#21616A]/95 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/30 h-20'
        : 'bg-[#21616A] backdrop-blur-sm border-b border-white/5 shadow-lg shadow-black/20 h-24'
    }`}>
      {/* Dynamic gradient overlay */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isScrolled
          ? 'bg-linear-to-b from-[#21616A]/95 to-[#21616A]/90'
          : 'bg-linear-to-b from-[#21616A]/90 to-[#21616A]'
      }`}></div>

      {/* Background pattern with dynamic opacity */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        isScrolled ? 'opacity-8' : 'opacity-5'
      }`}>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/new-logo.png"
                alt="StudyBeee Logo"
                width={220}
                height={220}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-xl transition-all duration-300 font-medium backdrop-blur-sm group focus:outline-none focus:ring-2 focus:ring-[#2E9CA0]/50 focus:ring-offset-2 focus:ring-offset-[#21616A] ${
                  activeSection === item.id
                    ? 'text-[#2E9CA0] bg-white/10 shadow-lg shadow-[#2E9CA0]/20'
                    : 'text-gray-200 hover:text-[#2E9CA0] hover:bg-white/5 hover:scale-105'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {/* Active indicator */}
                {activeSection === item.id && (
                  <div className="absolute inset-0 bg-[#2E9CA0]/20 rounded-xl animate-pulse"></div>
                )}
                {/* Hover effect */}
                <div className="absolute inset-0 bg-[#2E9CA0]/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden relative p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2E9CA0]/50 focus:ring-offset-2 focus:ring-offset-[#21616A] ${
              isOpen ? 'bg-white/10' : 'hover:bg-white/5'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute inset-0 transition-all duration-300 ${
                isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
              }`}>
                <Menu className="w-6 h-6 text-white" />
              </span>
              <span className={`absolute inset-0 transition-all duration-300 ${
                isOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'
              }`}>
                <X className="w-6 h-6 text-white" />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-[#21616A] border-t border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.25)] rounded-b-2xl backdrop-blur-md">
          <div className="px-6 py-5 space-y-2">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium group focus:outline-none focus:ring-2 focus:ring-[#2E9CA0]/50 focus:bg-white/10 ${
                  activeSection === item.id
                    ? 'text-[#2E9CA0] bg-white/10 shadow-md shadow-[#2E9CA0]/20 font-semibold'
                    : 'text-white hover:text-[#2E9CA0] hover:bg-white/5 hover:translate-x-2'
                }`}
                style={{
                  animationDelay: isOpen ? `${index * 100}ms` : '0ms',
                  animation: isOpen ? 'slideInLeft 0.3s ease-out forwards' : 'none'
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-[#2E9CA0] shadow-md shadow-[#2E9CA0]/50'
                      : 'bg-white/60 group-hover:bg-[#2E9CA0]'
                  }`}></div>
                  <span>{item.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
}
