"use client";

import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#21616A] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid md:grid-cols-4 gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-8 h-8 text-[#2E9CA0]" />
              <span className="text-xl font-bold">StudyBeee</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your trusted academic partner for quality assignments, research papers, and academic support.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#2E9CA0] transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {["About Us", "Our Fields", "Services", "Testimonials"].map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-gray-400 hover:text-[#2E9CA0] transition-colors text-sm">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Services</h3>
            <ul className="space-y-2">
              {["Assignments", "Research Papers", "Dissertations", "Proofreading"].map((service, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a href="#" className="text-gray-400 hover:text-[#2E9CA0] transition-colors text-sm">
                    {service}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <motion.li 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 text-[#2E9CA0] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">support@assignmenthelper.com</span>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 text-[#2E9CA0] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5 text-[#2E9CA0] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">Global Service</span>
              </motion.li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-gray-400 text-sm">
            © 2024 StudyBeee. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, index) => (
              <motion.a 
                key={index}
                href="#" 
                className="text-gray-400 hover:text-[#2E9CA0] transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
