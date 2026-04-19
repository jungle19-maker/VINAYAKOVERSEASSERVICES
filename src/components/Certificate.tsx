import Image from "next/image";
import { ShieldCheck, CheckCircle2, Award, BadgeCheck } from "lucide-react";

const trustPoints = [
  "Only MEA-licensed agencies can legally recruit for overseas employment from India.",
  "All our contracts and hiring procedures adhere strictly to Government of India norms.",
  "Candidates are protected under the Emigration Act and international labor standards.",
  "Fully transparent fee structure — no hidden costs for employers or candidates.",
];

const badges = [
  { icon: <ShieldCheck className="w-5 h-5" />, label: "MEA Registered" },
  { icon: <BadgeCheck className="w-5 h-5" />, label: "Verified Agency" },
  { icon: <Award className="w-5 h-5" />, label: "Legal Recruitment" },
  { icon: <CheckCircle2 className="w-5 h-5" />, label: "Active License" },
];

export default function Certificate() {
  return (
    <section id="certificate" className="py-24 bg-[#23352b] relative overflow-hidden">

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5B301' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
            <span className="text-xs font-bold text-white/40 uppercase tracking-[0.22em]">
              Government Affiliation
            </span>
            <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Authorized & Licensed by{" "}
            <span className="text-[#F5B301]">Ministry of External Affairs</span>
          </h2>
          <p className="text-white/55 text-base max-w-2xl mx-auto leading-relaxed">
            Government of India — ensuring every placement is 100% legal, ethical, and transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Content */}
          <div className="space-y-8">

            {/* Trust badges row */}
            <div className="grid grid-cols-2 gap-4">
              {badges.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#F5B301]/30 transition-all"
                >
                  <span className="text-[#F5B301]">{b.icon}</span>
                  <span className="text-white text-sm font-semibold">{b.label}</span>
                </div>
              ))}
            </div>

            {/* License number */}
            <div className="p-5 bg-white/8 border border-[#F5B301]/30 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#F5B301] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-[#23352b]" />
                </div>
                <span className="text-white font-bold text-sm">RA License Number</span>
              </div>
              <p className="text-[#F5B301] font-mono font-bold text-lg tracking-wide pl-11">
                B-3393/HP/PER/100/5/11399/2026
              </p>
              <p className="text-white/40 text-xs pl-11 mt-1">Status: Active & Verified</p>
            </div>

            {/* Points */}
            <ul className="space-y-3">
              {trustPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F5B301] flex-shrink-0 mt-0.5" />
                  <span className="text-white/65 text-sm leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>

            <a href="#contact" className="btn-primary inline-flex">
              Enquire About Compliance
            </a>
          </div>

          {/* Right: Certificate */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#F5B301]/10 rounded-2xl blur-2xl scale-105" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#F5B301]/30 group">
                <Image
                  src="/images/license_certificate.png"
                  alt="Ministry of External Affairs — Recruitment License Certificate"
                  width={640}
                  height={460}
                  className="object-contain w-full group-hover:scale-105 transition-transform duration-500"
                />
                {/* Shine on hover */}
                <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 group-hover:ring-[#F5B301]/40 transition-all" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
