import { Globe, Users, CheckCircle2, TrendingUp } from "lucide-react";

export default function AboutUsSection() {
  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0A1A2F]">About Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by thousands of students worldwide for academic excellence
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#00C4FF]/30 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#00C4FF]/10 flex items-center justify-center group-hover:bg-[#00C4FF]/20 transition-colors animate-float">
                <Globe className="w-8 h-8 text-[#00C4FF]" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#0A1A2F]">Global Reach</h3>
            <p className="text-gray-600 leading-relaxed">
              We proudly serve students in multiple countries, providing academic support services worldwide.
            </p>
          </div>

          <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#00C4FF]/30 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#00C4FF]/10 flex items-center justify-center group-hover:bg-[#00C4FF]/20 transition-colors animate-float">
                <Users className="w-8 h-8 text-[#00C4FF]" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#0A1A2F]">Expert Team</h3>
            <div className="text-4xl font-bold text-[#00C4FF] mb-2">500+</div>
            <p className="text-gray-600">Expert Writers and Researchers</p>
          </div>

          <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#00C4FF]/30 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#00C4FF]/10 flex items-center justify-center group-hover:bg-[#00C4FF]/20 transition-colors animate-float">
                <CheckCircle2 className="w-8 h-8 text-[#00C4FF]" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#0A1A2F]">Satisfied Clients</h3>
            <div className="text-4xl font-bold text-[#00C4FF] mb-2">50,000+</div>
            <p className="text-gray-600">Satisfied Students</p>
          </div>

          <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#00C4FF]/30 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#00C4FF]/10 flex items-center justify-center group-hover:bg-[#00C4FF]/20 transition-colors animate-float">
                <TrendingUp className="w-8 h-8 text-[#00C4FF]" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#0A1A2F]">Success Rate</h3>
            <div className="text-4xl font-bold text-[#00C4FF] mb-2">98%</div>
            <p className="text-gray-600">Assignment Success</p>
          </div>
        </div>
      </div>
    </section>
  );
}
