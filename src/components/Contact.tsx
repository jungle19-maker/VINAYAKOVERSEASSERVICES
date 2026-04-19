"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, Send, Briefcase, UserCheck } from "lucide-react";

const enquiryTypes = [
  "Overseas Recruitment",
  "Bulk Hiring",
  "Visa Processing",
  "Documentation & Compliance",
  "Candidate Screening",
  "General Inquiry",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiry: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to WhatsApp with pre-filled message
    const message = encodeURIComponent(
      `*New Inquiry — Vinayak Overseas Services*\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nEnquiry Type: ${formData.enquiry}\n\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/918894412776?text=${message}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-[#F1F5F9]">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
            <span className="text-xs font-bold text-[#23352b]/50 uppercase tracking-[0.22em]">
              Get In Touch
            </span>
            <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#23352b] mb-4">
            Let&apos;s Build Your Global Team
          </h2>
          <p className="text-[#4B5563] text-base leading-relaxed">
            Whether you&apos;re an employer seeking skilled manpower or a candidate looking for
            international opportunities — we&apos;re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left Info Panel */}
          <div className="lg:col-span-2 bg-[#23352b] rounded-2xl p-8 text-white flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Contact Information</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Reach out via form, WhatsApp, or visit our office.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F5B301]/15 flex items-center justify-center text-[#F5B301] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm mb-1">Office Address</div>
                  <div className="text-white/55 text-sm leading-relaxed">
                    Shop No 5, Ground & First Floor,<br />
                    Old Hoshiarpur Road, Una,<br />
                    Himachal Pradesh — 174303
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F5B301]/15 flex items-center justify-center text-[#F5B301] flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm mb-0.5">Phone</div>
                  <a href="tel:+918894412776" className="text-white/55 text-sm hover:text-[#F5B301] transition-colors">
                    +91-8894412776
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#F5B301]/15 flex items-center justify-center text-[#F5B301] flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm mb-0.5">Email</div>
                  <a href="mailto:vinayakoverseas90@gmail.com" className="text-white/55 text-sm hover:text-[#F5B301] transition-colors break-all">
                    vinayakoverseas90@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/918894412776"
                target="_blank"
                rel="noopener noreferrer"
                id="contact-whatsapp"
                className="flex items-center justify-center gap-3 px-5 py-3 bg-[#25D366] hover:bg-[#20BC5A] text-white font-bold rounded-xl transition-colors text-sm"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#"
                  id="contact-hire"
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-[#F5B301]/40 text-[#F5B301] font-semibold rounded-xl hover:bg-[#F5B301]/10 transition-colors text-sm"
                >
                  <Briefcase className="w-4 h-4" />
                  Hire Talent
                </a>
                <a
                  href="#"
                  id="contact-apply"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[#F5B301] text-[#23352b] font-semibold rounded-xl hover:bg-[#d9a000] transition-colors text-sm"
                >
                  <UserCheck className="w-4 h-4" />
                  Apply Now
                </a>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm border border-[#E5E7EB]">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#F5B301]/15 flex items-center justify-center mb-4">
                  <MessageCircle className="w-8 h-8 text-[#F5B301]" />
                </div>
                <h3 className="text-2xl font-bold text-[#23352b] mb-2">Message Sent!</h3>
                <p className="text-[#4B5563]">We&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#23352b] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#23352b] focus:ring-1 focus:ring-[#23352b] transition-colors placeholder:text-[#9CA3AF]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#23352b] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#23352b] focus:ring-1 focus:ring-[#23352b] transition-colors placeholder:text-[#9CA3AF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#23352b] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#23352b] focus:ring-1 focus:ring-[#23352b] transition-colors placeholder:text-[#9CA3AF]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#23352b] mb-2">
                      Enquiry Type
                    </label>
                    <select
                      name="enquiry"
                      value={formData.enquiry}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#23352b] focus:ring-1 focus:ring-[#23352b] transition-colors text-[#374151] bg-white"
                    >
                      <option value="">Select enquiry type</option>
                      {enquiryTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#23352b] mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your requirements — number of workers, skills needed, destination country, timeline..."
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#23352b] focus:ring-1 focus:ring-[#23352b] transition-colors resize-none placeholder:text-[#9CA3AF]"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit"
                  className="w-full btn-primary justify-center py-4 text-base"
                >
                  <Send className="w-5 h-5" />
                  Send Message via WhatsApp
                </button>

                <p className="text-center text-xs text-[#9CA3AF]">
                  Your message will be sent directly to our WhatsApp for fastest response.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
