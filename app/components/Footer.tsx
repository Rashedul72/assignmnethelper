import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A1A2F] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-8 h-8 text-[#00C4FF]" />
              <span className="text-xl font-bold">Assignment Helper</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your trusted academic partner for quality assignments, research papers, and academic support.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00C4FF] transition-colors flex items-center justify-center">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00C4FF] transition-colors flex items-center justify-center">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00C4FF] transition-colors flex items-center justify-center">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00C4FF] transition-colors flex items-center justify-center">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-[#00C4FF] transition-colors text-sm">About Us</a></li>
              <li><a href="#fields" className="text-gray-400 hover:text-[#00C4FF] transition-colors text-sm">Our Fields</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-[#00C4FF] transition-colors text-sm">Services</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-[#00C4FF] transition-colors text-sm">Testimonials</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-[#00C4FF] transition-colors text-sm">Assignments</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#00C4FF] transition-colors text-sm">Research Papers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#00C4FF] transition-colors text-sm">Dissertations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#00C4FF] transition-colors text-sm">Proofreading</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#00C4FF] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">support@assignmenthelper.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#00C4FF] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#00C4FF] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">Global Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 Assignment Helper. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-[#00C4FF] transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-[#00C4FF] transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-[#00C4FF] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
