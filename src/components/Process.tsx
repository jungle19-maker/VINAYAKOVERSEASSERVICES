const steps = [
  {
    num: "01",
    title: "Requirement Analysis",
    desc: "We conduct a thorough analysis of your workforce needs — skill sets, industry standards, volume, and timeline.",
  },
  {
    num: "02",
    title: "Candidate Sourcing",
    desc: "Tapping our database of 50,000+ pre-screened professionals and running targeted recruitment drives across India.",
  },
  {
    num: "03",
    title: "Screening & Interviews",
    desc: "Multi-stage evaluation: written tests, trade tests, panel interviews, and medical fitness assessments.",
  },
  {
    num: "04",
    title: "Documentation",
    desc: "Complete documentation handling — offer letters, contracts, attestation, emigration clearance, and compliance checks.",
  },
  {
    num: "05",
    title: "Visa Processing",
    desc: "End-to-end visa application, embassy coordination, work permit processing, and travel arrangements.",
  },
  {
    num: "06",
    title: "Deployment",
    desc: "Pre-departure orientation, flight coordination, airport assistance, and smooth onboarding at the destination.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
            <span className="text-xs font-bold text-[#23352b]/50 uppercase tracking-[0.22em]">
              How It Works
            </span>
            <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#23352b] leading-tight mb-4">
            Our 6-Step Recruitment Process
          </h2>
          <p className="text-[#4B5563] text-base leading-relaxed">
            A proven, structured approach to deliver the right talent at the right time —
            every single time.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] hover:bg-[#23352b] hover:border-[#23352b] transition-all duration-400 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Step number */}
              <div className="text-6xl font-extrabold text-[#23352b]/8 group-hover:text-white/5 absolute top-4 right-6 leading-none select-none transition-colors duration-300">
                {step.num}
              </div>

              {/* Gold dot + number badge */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#F5B301] flex items-center justify-center text-[#23352b] font-extrabold text-sm shadow-md">
                  {step.num}
                </div>
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block h-px flex-1 bg-[#E5E7EB] group-hover:bg-white/15 transition-colors" />
                )}
              </div>

              <h4 className="text-lg font-bold text-[#23352b] group-hover:text-white mb-2 transition-colors duration-300">
                {step.title}
              </h4>
              <p className="text-sm leading-relaxed text-[#4B5563] group-hover:text-white/70 transition-colors duration-300">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-[#4B5563] mb-6">
            Ready to start your recruitment journey? Contact us today.
          </p>
          <a href="#contact" className="btn-primary inline-flex">
            Start Hiring Now
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
