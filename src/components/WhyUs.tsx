import {
  ShieldCheck,
  Eye,
  Database,
  Network,
  Zap,
  LifeBuoy,
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: "MEA Approved Recruitment",
    desc: "Govt. of India Ministry of External Affairs licensed agency — RA License No: B-3393/HP/PER/100/5/11399/2026.",
    highlight: true,
  },
  {
    icon: <Eye className="w-7 h-7" />,
    title: "Transparent Process",
    desc: "No hidden fees, no false promises. Every step is documented and communicated clearly to employers and candidates.",
    highlight: false,
  },
  {
    icon: <Database className="w-7 h-7" />,
    title: "Skilled Workforce Database",
    desc: "Access to a pre-screened talent pool of 50,000+ verified candidates across 15+ industries and all skill levels.",
    highlight: false,
  },
  {
    icon: <Network className="w-7 h-7" />,
    title: "Global Client Network",
    desc: "Trusted by 500+ employers across Gulf, Middle East, Asia and Europe for consistent, high-quality manpower.",
    highlight: false,
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Fast Deployment",
    desc: "Shortlisting in 48–72 hours. Full deployment cycle completed in 30–45 days from requirement receipt.",
    highlight: false,
  },
  {
    icon: <LifeBuoy className="w-7 h-7" />,
    title: "End-to-End Support",
    desc: "From recruitement to post-deployment — we handle visa, attestation, onboarding, and ongoing support.",
    highlight: false,
  },
];

export default function WhyUs() {
  return (
    <section id="whyus" className="py-24 bg-[#F1F5F9]">
      <div className="container mx-auto px-6 max-w-7xl">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
            <span className="text-xs font-bold text-[#23352b]/50 uppercase tracking-wider">
              Why Partner With Us?
            </span>
            <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#23352b] mb-4">
            Discover Why Employers Choose Us.
          </h2>
          <p className="text-[#4B5563] text-base leading-relaxed">
            Six compelling reasons why global employers trust Vinayak Overseas Services
            for their critical manpower needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className={`group relative p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden ${feat.highlight
                  ? "bg-[#23352b] border-[#F5B301]/30 text-white"
                  : "bg-white border-[#E5E7EB] hover:border-[#23352b]/20"
                }`}
            >
              {/* Gold corner accent for highlighted card */}
              {feat.highlight && (
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#F5B301]/10 rounded-bl-[40px]" />
              )}

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${feat.highlight
                    ? "bg-[#F5B301]/15 text-[#F5B301]"
                    : "bg-[#F1F5F9] text-[#23352b] group-hover:bg-[#23352b] group-hover:text-[#F5B301]"
                  }`}
              >
                {feat.icon}
              </div>

              <h4
                className={`text-lg font-bold mb-2 ${feat.highlight ? "text-white" : "text-[#23352b]"
                  }`}
              >
                {feat.title}
              </h4>
              <p
                className={`text-sm leading-relaxed ${feat.highlight ? "text-white/65" : "text-[#4B5563]"
                  }`}
              >
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
