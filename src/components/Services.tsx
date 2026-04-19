import Image from "next/image";
import { ArrowRight } from "lucide-react";

const services = [
 {
 title: "Skilled Technical Workforce Solutions",
 category: "Skilled Trades & Technical Staff",
 desc: "We provide highly trained engineers, welders, electricians, HVAC technicians, and industrial fitters ready for global deployment. Our candidates are certified, experienced, and compliant with international safety standards.",
 img: "/images/modern_indian_skilled_trades.png",
 alt: "Skilled welders working at industrial site",
 cta: "Hire Talent",
 },
 {
 title: "International Healthcare Staffing Solutions",
 category: "Healthcare Professionals",
 desc: "We recruit qualified nurses, doctors, lab technicians, and paramedics with complete licensing and documentation support for overseas placements.",
 img: "/images/modern_indian_healthcare.png",
 alt: "Nurses providing patient care in hospital",
 cta: "Get Workforce",
 },
 {
 title: "Hospitality & Retail Staffing Services",
 category: "Hospitality & Retail",
 desc: "From chefs and housekeeping staff to retail managers and customer service professionals, we deliver trained candidates for hotels, restaurants, and retail chains worldwide.",
 img: "/images/modern_indian_hospitality.png",
 alt: "Hospitality staff providing premium service",
 cta: "Request Candidates",
 },
 {
 title: "IT & BPO Recruitment Services",
 category: "IT & BPO Experts",
 desc: "Hire skilled software developers, data analysts, customer support executives, and IT professionals for global business operations and outsourcing needs.",
 img: "/images/modern_indian_it.png",
 alt: "Modern IT and BPO professionals working in an office",
 cta: "Hire Talent",
 },
 {
 title: "Oil, Gas & Construction Workforce",
 category: "Oil & Gas & Construction",
 desc: "We supply experienced rig workers, safety officers, engineers, and heavy equipment operators for large-scale infrastructure and energy projects.",
 img: "/images/modern_indian_oil_gas.png",
 alt: "Engineers working on an international oil and gas rig",
 cta: "Request Candidates",
 },
];

export default function Services() {
 const schemaData = {
 "@context": "https://schema.org",
 "@type": "ItemList",
 "itemListElement": services.map((svc, i) => ({
 "@type": "ListItem",
 "position": i + 1,
 "item": {
 "@type": "Service",
 "name": svc.title,
 "description": svc.desc,
 "serviceType": svc.category,
 "provider": {
 "@type": "Organization",
 "name": "VCS Website"
 }
 }
 }))
 };

 return (
 <section id="services" className="py-24 bg-[#F8FAFC]">
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
 />
 <div className="container mx-auto px-6 max-w-[90rem]">

 {/* Header */}
 <div className="text-center max-w-4xl mx-auto mb-20">
 <div className="flex items-center justify-center gap-3 mb-4">
 <span className="h-[2px] w-8 bg-[#F5B301] " />
 <span className="text-xs font-bold text-[#0B1F3A]/60 tracking-[0.2em] uppercase">
 Our Expertise
 </span>
 <span className="h-[2px] w-8 bg-[#F5B301] " />
 </div>
 <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B1F3A] leading-tight mb-6">
 Global Manpower Services Across Key Industries
 </h2>
 <p className="text-[#4B5563] text-lg max-w-3xl mx-auto leading-relaxed">
 We deliver skilled, certified, and job-ready professionals for international employers across high-demand sectors.
 </p>
 </div>

 {/* Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {services.map((svc, i) => (
 <div
 key={i}
 className="group relative h-[420px] md:h-[480px] overflow-hidden shadow-lg border border-[#E5E7EB] bg-[#0B1F3A] cursor-pointer flex flex-col justify-end transform transition-transform duration-500 hover:shadow-2xl hover:-translate-y-2 lg:last:col-span-1"
 >
 {/* Background Image */}
 <Image
 src={svc.img}
 alt={svc.alt}
 fill
 className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 opacity-90 group-hover:opacity-70"
 />

 {/* Gradient Overlay */}
 <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/70 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90" />

 {/* Content */}
 <div className="relative z-20 p-8 flex flex-col h-full justify-end">
 <span className="inline-block py-1 px-3 mb-4 bg-[#F5B301]/20 text-[#F5B301] border border-[#F5B301]/30 text-xs font-bold uppercase tracking-wider w-fit transform transition-transform duration-500 group-hover:-translate-y-2">
 {svc.category}
 </span>

 <h3 className="text-2xl font-bold text-white mb-3 leading-snug group-hover:text-[#F5B301] transition-colors duration-300 transform group-hover:-translate-y-2">
 {svc.title}
 </h3>
 
 {/* Description - Fades in and slides up slightly on hover */}
 <div className="h-0 overflow-hidden opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-in-out">
 <p className="text-white/80 text-sm leading-relaxed mb-6">
 {svc.desc}
 </p>
 </div>

 {/* CTA Link */}
 <a 
 href="/contact-info" 
 className="flex items-center gap-2 text-white font-semibold text-sm uppercase tracking-wide group-hover:text-[#F5B301] transition-colors mt-2"
 >
 {svc.cta}
 <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-2" />
 </a>
 </div>
 </div>
 ))}
 </div>

 </div>
 </section>
 );
}
