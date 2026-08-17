"use client";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutUsSection from "./components/AboutUsSection";
import FieldsSection from "./components/FieldsSection";
import ProgressSection from "./components/ProgressSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import PaymentMethodSection from "./components/PaymentMethodSection";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#0f172a] selection:bg-purple-700 selection:text-white">
      <header>
        <Navbar />
      </header>

      <main>
        {/* 1. Hero (Dark) */}
        <HeroSection />

        {/* 2. About Us (Light) */}
        <AboutUsSection />

        {/* 3. Fields & Disciplines (Dark) */}
        <FieldsSection />

        {/* 4. Services & Deliverables (Dark) */}
        <ServicesSection />

        {/* 5. Progress & How It Works (Light) */}
        <ProgressSection />

        {/* 6. Testimonials & Leadership (Light) */}
        <TestimonialsSection />

        {/* 7. FAQ (Light/Soft) */}
        <FAQSection />

        {/* 8. Call to Action (Dark) */}
        <CTASection />

        {/* 9. Payment Methods (Light) */}
        <PaymentMethodSection />
      </main>

      {/* 24/7 Floating WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* 10. Footer (Dark) */}
      <Footer />
    </div>
  );
}
