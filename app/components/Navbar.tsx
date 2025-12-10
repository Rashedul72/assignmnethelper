"use client";

import { GraduationCap, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#21616A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-gray-200 hover:text-[#2E9CA0] transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#fields"
              className="text-gray-200 hover:text-[#2E9CA0] transition-colors font-medium"
            >
              Fields
            </a>
            <a
              href="#services"
              className="text-gray-200 hover:text-[#2E9CA0] transition-colors font-medium"
            >
              Services
            </a>
            <a
              href="#testimonials"
              className="text-gray-200 hover:text-[#2E9CA0] transition-colors font-medium"
            >
              Reviews
            </a>
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
            <a
              href="#about"
              className="block text-gray-200 hover:text-[#2E9CA0] transition-colors py-2"
            >
              About
            </a>
            <a
              href="#fields"
              className="block text-gray-200 hover:text-[#2E9CA0] transition-colors py-2"
            >
              Fields
            </a>
            <a
              href="#services"
              className="block text-gray-200 hover:text-[#2E9CA0] transition-colors py-2"
            >
              Services
            </a>
            <a
              href="#testimonials"
              className="block text-gray-200 hover:text-[#2E9CA0] transition-colors py-2"
            >
              Reviews
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
