import Image from "next/image";
import { CheckCircle2, Award, Globe, Factory } from "lucide-react";

const points = [
  "Validated & verified candidates with thorough background checks",
  "Transparent, compliant processes aligned with Govt. of India",
  "Rapid deployment turnaround — shortlisting in 48–72 hours",
  "Pan-India talent pool across metros and tier-2/3 cities",
  "End-to-end visa, attestation & emigration clearance support",
  "Post-deployment onboarding and relationship management",
];

const statBadges = [
  { icon: <Award className="w-5 h-5" />, value: "10+", label: "Years Experience" },
  { icon: <Globe className="w-5 h-5" />, value: "20+", label: "Countries Served" },
  { icon: <Factory className="w-5 h-5" />, value: "15+", label: "Industries Covered" },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Left: Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl z-10 w-full h-[520px]">
              <Image
                src="/images/modern_indian_recruitment.png"
                alt="Expert Recruitment Team"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              {/* Navy overlay tint */}
              <div className="absolute inset-0 bg-[#23352b]/10" />
            </div>

            {/* Stat badges row */}
            <div className="absolute -bottom-6 left-4 right-4 z-20 flex gap-3">
              {statBadges.map((badge, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#23352b] text-white p-4 rounded-xl shadow-xl text-center border border-[#F5B301]/20"
                >
                  <div className="flex justify-center text-[#F5B301] mb-1">{badge.icon}</div>
                  <div className="text-2xl font-extrabold text-[#F5B301]">{badge.value}</div>
                  <div className="text-[10px] font-semibold text-white/60 uppercase tracking-wide leading-tight">
                    {badge.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative background */}
            <div className="absolute top-10 -left-8 w-full h-full bg-[#F1F5F9] rounded-2xl -z-10" />
          </div>

          {/* Right: Content */}
          <div className="lg:w-1/2 space-y-8 pt-6 lg:pt-0">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
              <span className="text-xs font-bold text-[#23352b]/50 uppercase tracking-wider">
                About Us
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-[#23352b] leading-tight">
              A Trusted International{" "}
              <span className="text-[#F5B301]">Recruitment Partner.</span>
            </h2>

            <p className="text-[#4B5563] leading-relaxed text-lg">
              Vinayak Overseas Services is a trusted international recruitment partner, delivering
              skilled manpower solutions across industries including construction, oil & gas,
              healthcare, hospitality, and manufacturing. With a strong compliance framework
              aligned with Government of India regulations, we ensure{" "}
              <strong className="text-[#23352b]">ethical, transparent, and efficient hiring</strong>{" "}
              for employers worldwide.
            </p>

            <ul className="space-y-3">
              {points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F5B301] flex-shrink-0 mt-0.5" />
                  <span className="text-[#374151] text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#services" className="btn-primary">
                Our Services
              </a>
              <a href="#contact" className="btn-secondary-dark">
                Get in Touch
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
