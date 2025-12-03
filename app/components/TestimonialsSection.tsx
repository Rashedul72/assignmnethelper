import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    field: "Computer Science",
    rating: 5,
    text: "Assignment Helper saved me during my final year. Their quality is exceptional and they always deliver on time. Highly recommended!",
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    field: "Business Administration",
    rating: 5,
    text: "Professional service with expert writers. My research proposal was outstanding and helped me get approval from my supervisor.",
    avatar: "MC"
  },
  {
    name: "Emily Rodriguez",
    field: "Master of Science",
    rating: 5,
    text: "The team is incredibly responsive and understanding. They helped me with multiple assignments and each one exceeded expectations.",
    avatar: "ER"
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0A1A2F]">What Students Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied students
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <Quote className="w-8 h-8 text-[#00C4FF]/20 absolute top-6 right-6 animate-float" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#00C4FF] text-[#00C4FF]" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00C4FF]/10 flex items-center justify-center animate-float">
                  <span className="text-[#00C4FF] font-semibold">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-semibold text-[#0A1A2F]">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.field}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

