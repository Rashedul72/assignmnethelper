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
    <div className="min-h-screen bg-[#f6f5f3] text-[#1c1524] selection:bg-[#ead7ef] selection:text-[#1c1524]">
      <header>
        <Navbar />
      </header>

      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. About Us */}
        <AboutUsSection />

        {/* 3. Fields & Disciplines */}
        <FieldsSection />

        {/* 4. Services & Deliverables */}
        <ServicesSection />

        {/* 5. Progress & How It Works */}
        <ProgressSection />

        {/* 6. Testimonials & Leadership */}
        <TestimonialsSection />

        {/* 7. FAQ */}
        <FAQSection />

        {/* 8. Call to Action */}
        <CTASection />

        {/* 9. Payment Methods */}
        <PaymentMethodSection />
      </main>

      {/* 24/7 Floating WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* 10. Footer */}
      <Footer />
    </div>
  );
}
