import Image from "next/image";
import { ArrowRight } from "lucide-react";

const industries = [
  {
    id: "construction",
    title: "Construction",
    desc: "Civil engineers, site supervisors, masons, steel fixers, and heavy equipment operators.",
    image: "/images/modern_indian_skilled_trades.jpg",
    tag: "Construction",
  },
  {
    id: "oil-gas",
    title: "Oil & Gas",
    desc: "Rig operators, drilling engineers, safety officers, and pipeline technicians.",
    image: "/images/modern_indian_oil_gas.jpg",
    tag: "Energy",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    desc: "Qualified nurses, doctors, lab technicians, paramedics, and healthcare assistants.",
    image: "/images/modern_indian_healthcare.jpg",
    tag: "Healthcare",
  },
  {
    id: "hospitality",
    title: "Hospitality",
    desc: "Expert chefs, housekeeping staff, F&B managers, and luxury hotel professionals.",
    image: "/images/modern_indian_hospitality.jpg",
    tag: "Hospitality",
  },
  {
    id: "it",
    title: "IT & Engineering",
    desc: "Software developers, data analysts, cloud engineers, and tier-1 technical teams.",
    image: "/images/modern_indian_it.jpg",
    tag: "Technology",
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    desc: "Production supervisors, quality control specialists, machine operators & technicians.",
    image: "/images/modern_indian_recruitment.jpg",
    tag: "Manufacturing",
  },
];

export default function Industries() {
  return (
    <section id="industries" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-8 bg-[#F5B301] rounded-full" />
              <span className="text-xs font-bold text-[#23352b]/50 tracking-[0.22em] uppercase">
                Industries We Serve
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#23352b] leading-tight max-w-xl">
              Talent Solutions Across Every Key Sector.
            </h2>
          </div>
          <p className="text-[#4B5563] text-base max-w-sm leading-relaxed">
            We source, screen, and deploy certified professionals across the world's most
            demanding industries with speed and precision.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className="group relative h-[340px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={ind.image}
                  alt={ind.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Navy gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#23352b]/95 via-[#23352b]/50 to-[#23352b]/10 group-hover:from-[#23352b]/98 transition-all duration-500" />

              {/* Gold left accent bar */}
              <div className="absolute top-0 left-0 w-1 h-0 bg-[#F5B301] group-hover:h-full transition-all duration-500" />

              {/* Tag */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 bg-[#F5B301] text-[#23352b] text-[11px] font-bold rounded-full uppercase tracking-wider">
                  {ind.tag}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="text-xl font-bold text-white mb-2 leading-tight font-heading">
                  {ind.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-5 line-clamp-2">
                  {ind.desc}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F5B301] hover:bg-[#d9a000] text-[#23352b] text-sm font-bold rounded-full transition-all duration-300 shadow-lg hover:gap-3"
                >
                  Enquire Now <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
