import Image from "next/image";
import { GraduationCap, ArrowRight, Shield, Clock, Award } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-[#0A1A2F] text-white pt-32 pb-0 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-12">
          {/* Left: Text content */}
          <div className="flex-1 text-center md:text-left pb-16 md:pb-24">
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 animate-fade-in">
                <Shield className="w-4 h-4 text-[#00C4FF]" />
                <span className="text-sm font-medium">100% Confidential</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 animate-fade-in delay-100">
                <Clock className="w-4 h-4 text-[#00C4FF]" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 animate-fade-in delay-200">
                <Award className="w-4 h-4 text-[#00C4FF]" />
                <span className="text-sm font-medium">Expert Writers</span>
              </div>
            </div>

            <div className="flex md:justify-start justify-center mb-8 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-[#00C4FF] blur-2xl opacity-30 rounded-full"></div>
                <GraduationCap className="w-20 h-20 relative z-10 text-[#00C4FF] animate-float" />
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in-up">
              Your Trusted Academic Partner
            </h1>


            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center animate-fade-in-up delay-200">
              <button className="btn-primary group animate-pulse-glow">
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary">
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl md:max-w-md md:mx-0 mx-auto">
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-[#00C4FF] mb-1">500+</div>
                <div className="text-sm text-gray-400">Expert Writers</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-[#00C4FF] mb-1">50K+</div>
                <div className="text-sm text-gray-400">Happy Students</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-[#00C4FF] mb-1">98%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right: Hero image, bottom-aligned */}
          <div className="flex-1 w-full md:w-auto flex items-end justify-center md:justify-end">
            <div className="relative w-full max-w-xl h-80 md:h-[450px]">
              <Image
                src="/hero.png"
                alt="Students studying with Assignment Helper"
                fill
                priority
                className="object-contain object-bottom drop-shadow-2xl md:scale-[1.25] lg:scale-[1.45] md:origin-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
