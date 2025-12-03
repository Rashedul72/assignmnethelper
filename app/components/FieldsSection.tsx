const fields = [
  { code: "CSE", name: "Computer Science and Engineering" },
  { code: "BBA", name: "Bachelor of Business Administration" },
  { code: "BSE", name: "Bachelor of Science in Engineering" },
  { code: "MSC", name: "Master of Science" },
  { code: "BA", name: "Bachelor of Arts" },
  { code: "MA", name: "Master of Arts" },
  { code: "BSS", name: "Bachelor of Social Science" },
  { code: "MSS", name: "Master of Social Science" },
];

const tickerItems = [...fields, ...fields];

export default function FieldsSection() {
  return (
    <section id="fields" className="py-20 px-4 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0A1A2F]">Fields We Cover</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide specialized assistance across the following academic majors and fields
          </p>
        </div>

        {/* Moving ticker of subjects */}
        <div className="subject-marquee-container border-y border-gray-200 py-3 mb-10 bg-white/60">
          <div className="subject-marquee-track gap-8 text-sm font-medium text-[#0A1A2F]/80">
            {tickerItems.map((field, index) => (
              <span key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00C4FF]" />
                {field.code} &mdash; {field.name}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fields.map((field, index) => (
            <div 
              key={index}
              className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#00C4FF] hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="text-3xl font-bold text-[#0A1A2F] mb-3 group-hover:text-[#00C4FF] transition-colors">
                {field.code}
              </div>
              <div className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors">
                {field.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
