"use client";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutUsSection from "./components/AboutUsSection";
import FieldsSection from "./components/FieldsSection";
import ServicesSection from "./components/ServicesSection";
import ProgressSection from "./components/ProgressSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CTASection from "./components/CTASection";
import PaymentMethodSection from "./components/PaymentMethodSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header>
        <Navbar />
      </header>
      <main>
        <HeroSection />
        <AboutUsSection />
        <FieldsSection />
        <ServicesSection />
        <ProgressSection />
        <TestimonialsSection />
        <CTASection />
        <PaymentMethodSection />
      </main>
      <Footer />
    </div>
  );
}
