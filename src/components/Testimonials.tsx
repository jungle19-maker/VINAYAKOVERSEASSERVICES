const testimonials = [
  {
    stars: 5,
    quote:
      "Vinayak Overseas Services delivered 120 skilled workers for our Gulf construction project within 40 days. Their documentation process was flawless and fully MEA compliant. Highly recommend!",
    name: "Rajan Mehta",
    role: "Project Director",
    company: "Al Khalid Construction, UAE",
    initials: "RM",
  },
  {
    stars: 5,
    quote:
      "We've been partnering with VCS for over 5 years for our healthcare staffing needs. Their candidate quality and compliance standards are exceptional. The team is responsive and professional.",
    name: "Dr. Sarah Al-Qasimi",
    role: "HR Director",
    company: "Gulf Medical Center, Bahrain",
    initials: "SQ",
  },
  {
    stars: 5,
    quote:
      "Excellent service from start to finish. VCS helped us recruit 80+ hospitality professionals for our hotel chain in Qatar. The pre-departure training and documentation support was outstanding.",
    name: "Mohammed Al-Farsi",
    role: "General Manager",
    company: "Pearl Hospitality Group, Qatar",
    initials: "MF",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-5 h-5 text-[#F5B301] fill-[#F5B301]" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#23352b] relative overflow-hidden">
      {/* Decorative gold circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#F5B301]/5 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#F5B301]/5 translate-y-1/2 -translate-x-1/3" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
            <span className="text-xs font-bold text-white/40 uppercase tracking-[0.22em]">
              Client Testimonials
            </span>
            <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Trusted by Employers{" "}
            <span className="text-[#F5B301]">Worldwide.</span>
          </h2>
          <p className="text-white/50 text-base leading-relaxed">
            Here's what our clients say about working with Vinayak Overseas Services.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#F5B301]/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-7 text-6xl leading-none text-[#F5B301]/15 font-serif select-none">
                &ldquo;
              </div>

              <StarRating count={t.stars} />

              <p className="text-white/75 text-sm leading-relaxed mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-11 h-11 rounded-full bg-[#F5B301] flex items-center justify-center text-[#23352b] font-extrabold text-sm flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{t.name}</div>
                  <div className="text-white/50 text-xs">{t.role}</div>
                  <div className="text-[#F5B301] text-xs font-medium">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
