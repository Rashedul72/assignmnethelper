import { GraduationCap, ArrowRight, Shield, Clock, Award } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#0A1A2F] via-[#0d2340] to-[#0A1A2F] text-white pt-32 pb-24 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Shield className="w-4 h-4 text-[#00C4FF]" />
              <span className="text-sm font-medium">100% Confidential</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Clock className="w-4 h-4 text-[#00C4FF]" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Award className="w-4 h-4 text-[#00C4FF]" />
              <span className="text-sm font-medium">Expert Writers</span>
            </div>
          </div>

          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-[#00C4FF] blur-2xl opacity-30 rounded-full"></div>
              <GraduationCap className="w-20 h-20 relative z-10 text-[#00C4FF]" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
            Your Trusted Academic Partner
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-300 mb-10 animate-fade-in-up delay-100">
            We are a leading assignment helper service dedicated to supporting students across various academic disciplines. 
            With years of experience and a team of expert professionals, we help students achieve academic excellence 
            through quality assistance and guidance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-200">
            <button className="group bg-[#00C4FF] text-[#0A1A2F] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#00b3e6] transition-all duration-300 shadow-lg shadow-[#00C4FF]/30 hover:shadow-xl hover:shadow-[#00C4FF]/40 flex items-center gap-2">
              Get Started Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#00C4FF] mb-1">500+</div>
              <div className="text-sm text-gray-400">Expert Writers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#00C4FF] mb-1">50K+</div>
              <div className="text-sm text-gray-400">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#00C4FF] mb-1">98%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
