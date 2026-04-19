import {
  Users,
  Layers,
  FileCheck,
  FileText,
  Search,
  Plane,
} from "lucide-react";

const services = [
  {
    icon: <Users className="w-7 h-7" />,
    title: "Overseas Recruitment",
    desc: "End-to-end international placement across Gulf, Middle East, Asia & Europe. Fully verified, 100% legal.",
    color: "from-[#23352b] to-[#0D2847]",
  },
  {
    icon: <Layers className="w-7 h-7" />,
    title: "Bulk Hiring",
    desc: "Mass recruitment drives for large-scale projects in construction, manufacturing, and hospitality sectors.",
    color: "from-[#0D2847] to-[#23352b]",
  },
  {
    icon: <FileCheck className="w-7 h-7" />,
    title: "Visa Processing",
    desc: "Expert handling of work visas, employment permits, and all necessary immigration documentation.",
    color: "from-[#23352b] to-[#0D2847]",
  },
  {
    icon: <FileText className="w-7 h-7" />,
    title: "Documentation & Compliance",
    desc: "Attestation, emigration clearance, MEA compliance, and full legal documentation management.",
    color: "from-[#0D2847] to-[#23352b]",
  },
  {
    icon: <Search className="w-7 h-7" />,
    title: "Candidate Screening",
    desc: "Rigorous skill tests, background verification, medical checks, and structured interviews.",
    color: "from-[#23352b] to-[#0D2847]",
  },
  {
    icon: <Plane className="w-7 h-7" />,
    title: "Deployment Support",
    desc: "Pre-departure briefings, onboarding assistance, and post-deployment relationship management.",
    color: "from-[#0D2847] to-[#23352b]",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#F1F5F9]">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
            <span className="text-xs font-bold text-[#23352b]/50 tracking-[0.22em] uppercase">
              What We Offer
            </span>
            <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#23352b] leading-tight mb-4">
            Comprehensive Recruitment Services
          </h2>
          <p className="text-[#4B5563] text-base max-w-xl mx-auto leading-relaxed">
            From initial sourcing to post-deployment support, we provide a complete suite of
            manpower solutions tailored to international employers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl p-8 shadow-sm border border-[#E5E7EB] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              {/* Gold hover bar */}
              <div className="absolute top-0 left-0 h-1 w-0 bg-[#F5B301] group-hover:w-full transition-all duration-500 rounded-t-2xl" />

              {/* Icon */}
              <div
                className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center text-[#F5B301] shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                {svc.icon}
              </div>

              <h3 className="text-lg font-bold text-[#23352b] mb-3 group-hover:text-[#23352b]">
                {svc.title}
              </h3>
              <p className="text-[#4B5563] text-sm leading-relaxed">
                {svc.desc}
              </p>

              {/* Learn more link */}
              <div className="mt-6 flex items-center gap-2 text-[#F5B301] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href="#contact">Enquire Now</a>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
