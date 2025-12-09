"use client";

import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#21616A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-[#2E9CA0] transition-transform duration-300 hover:rotate-6 hover:scale-110" />
            <span className="text-xl font-bold text-white">Assignment Helper</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-gray-200 hover:text-[#2E9CA0] transition-colors font-medium">
              About
            </a>
            <a href="#fields" className="text-gray-200 hover:text-[#2E9CA0] transition-colors font-medium">
              Fields
            </a>
            <a href="#services" className="text-gray-200 hover:text-[#2E9CA0] transition-colors font-medium">
              Services
            </a>
            <a href="#testimonials" className="text-gray-200 hover:text-[#2E9CA0] transition-colors font-medium">
              Reviews
            </a>
            <button className="bg-[#2E9CA0] text-[#21616A] px-6 py-2 rounded-lg hover:bg-[#2599a0] transition-colors font-medium">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#21616A] border-t border-black/40">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <a href="#about" className="block text-gray-200 hover:text-[#2E9CA0] transition-colors py-2">
              About
            </a>
            <a href="#fields" className="block text-gray-200 hover:text-[#2E9CA0] transition-colors py-2">
              Fields
            </a>
            <a href="#services" className="block text-gray-200 hover:text-[#2E9CA0] transition-colors py-2">
              Services
            </a>
            <a href="#testimonials" className="block text-gray-200 hover:text-[#2E9CA0] transition-colors py-2">
              Reviews
            </a>
            <button className="w-full bg-[#2E9CA0] text-[#21616A] px-6 py-2 rounded-lg hover:bg-[#2599a0] transition-colors font-medium mt-2">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

