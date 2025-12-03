import { ArrowRight, CheckCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#0A1A2F] to-[#0d2340] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Excel in Your Studies?
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Join thousands of successful students who trust us with their academic assignments. 
          Get started today and experience the difference.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="group bg-[#00C4FF] text-[#0A1A2F] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#00b3e6] transition-all duration-300 shadow-lg shadow-[#00C4FF]/30 hover:shadow-xl hover:shadow-[#00C4FF]/40 flex items-center gap-2">
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20">
            View Pricing
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-[#00C4FF] flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold mb-1">Free Revisions</div>
              <div className="text-sm text-gray-400">Unlimited revisions until satisfied</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-[#00C4FF] flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold mb-1">24/7 Support</div>
              <div className="text-sm text-gray-400">Always here when you need us</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-[#00C4FF] flex-shrink-0 mt-1" />
            <div>
              <div className="font-semibold mb-1">Secure Payment</div>
              <div className="text-sm text-gray-400">Safe and encrypted transactions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

