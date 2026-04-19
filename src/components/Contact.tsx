"use client";

import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
            <span className="text-xs font-bold text-[#0B1F3A]/50 uppercase tracking-[0.22em]">
              Get In Touch
            </span>
            <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B1F3A] mb-4">
            Contact Information
          </h2>
          <p className="text-[#4B5563] text-base leading-relaxed">
            Reach out via phone or email to discuss your global manpower requirements or international job opportunities.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-[#E5E7EB]">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
              <div className="flex flex-col items-center text-center gap-4 bg-[#F1F5F9] p-8 rounded-xl border border-[#E5E7EB]">
                <div className="w-14 h-14 rounded-full bg-[#F5B301]/15 flex items-center justify-center text-[#F5B301]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-[#0B1F3A] text-xl mb-3">Office Address</div>
                  <div className="text-[#4B5563] leading-relaxed text-sm">
                    Shop No 5, Ground & First Floor,<br />
                    Old Hoshiarpur Road, Una,<br />
                    Himachal Pradesh — 174303
                  </div>
                </div>
              </div>

               <div className="flex flex-col items-center text-center gap-4 bg-[#F1F5F9] p-8 rounded-xl border border-[#E5E7EB]">
                <div className="w-14 h-14 rounded-full bg-[#F5B301]/15 flex items-center justify-center text-[#F5B301]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-[#0B1F3A] text-xl mb-3">Phone Number</div>
                  <a href="tel:+918894412776" className="text-[#4B5563] text-sm hover:text-[#F5B301] transition-colors">
                    +91-8894412776
                  </a>
                </div>
              </div>

               <div className="flex flex-col items-center text-center gap-4 bg-[#F1F5F9] p-8 rounded-xl border border-[#E5E7EB]">
                <div className="w-14 h-14 rounded-full bg-[#F5B301]/15 flex items-center justify-center text-[#F5B301]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-[#0B1F3A] text-xl mb-3">Email Address</div>
                  <a href="mailto:vinayakoverseas90@gmail.com" className="text-[#4B5563] text-sm hover:text-[#F5B301] transition-colors break-all">
                    vinayakoverseas90@gmail.com
                  </a>
                </div>
              </div>

           </div>
        </div>
      </div>
    </section>
  );
}
