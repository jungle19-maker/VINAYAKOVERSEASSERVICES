"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  User,
  Globe,
  Briefcase,
  Heart,
  Truck,
  Hammer,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  MapPin,
  HeartPulse, 
  HardHat, 
  Car, 
  Plane, 
  GraduationCap, 
  Building2, 
  Stethoscope, 
  HelpCircle, 
  Settings
} from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

type Requirement = {
  _id: string;
  title: string;
  icon: string;
  countries: string[];
  shortDescription: string;
  status: "active" | "inactive";
  details: string;
};

type DocumentItem = {
  _id: string;
  title: string;
  description: string;
  countrySpecificNote: string;
  status: "active" | "inactive";
};

type CtaSetting = {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  status: "active" | "inactive";
};

const IconMap = (name: string) => {
  const icons: Record<string, any> = {
    HeartPulse, HardHat, Car, Plane, Briefcase, 
    GraduationCap, Building2, Stethoscope, Hammer, Settings, Truck, Heart, Globe, MapPin
  };
  const IconComponent = icons[name] || HelpCircle;
  return <IconComponent className="w-6 h-6" />;
};



export default function Requirements() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [cta, setCta] = useState<CtaSetting | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reqsRes, docsRes, ctaRes] = await Promise.all([
          fetch("/api/requirements"),
          fetch("/api/documents"),
          fetch("/api/cta")
        ]);
        
        const reqsData = await reqsRes.json();
        const docsData = await docsRes.json();
        const ctaData = await ctaRes.json();
        
        setRequirements(reqsData.filter((req: Requirement) => req.status === "active"));
        setDocuments(docsData.filter((doc: DocumentItem) => doc.status === "active"));
        if (ctaData && ctaData.status === "active") {
          setCta(ctaData);
        }
      } catch (error) {
        console.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section
      id="requirements"
      className="py-24 bg-[#F8F9FA] overflow-hidden"
      aria-label="Job requirements for overseas recruitment from Una, Himachal Pradesh"
    >
      {/* Hidden SEO text for local keyword targeting */}
      <div className="sr-only">
        <p>
          Overseas recruitment in Una Himachal Pradesh. Foreign job consultants Una HP. Visa consultant Una.
          Canada PR consultancy Una. Germany nursing jobs from Una. Dubai job agencies near me Una HP.
          Nursing jobs in UK from Una Himachal. Driver jobs abroad Una HP. Construction work visa Una.
          Abroad job placement for Hamirpur students. Foreign recruitment near Chandigarh road Una.
          Overseas jobs from Una HP. Best manpower agency Una Himachal Pradesh.
        </p>
      </div>

      <div className="container mx-auto px-6 max-w-7xl">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-[#F5B301]" />
            <span className="text-xs font-bold text-[#24342b]/50 uppercase tracking-wider">
              Requirements
            </span>
            <span className="h-[2px] w-8 bg-[#F5B301]" />
          </div>
          <AnimatedHeading
            text="Job Requirements & [Eligibility Criteria]"
            className="text-[#24342b] text-4xl lg:text-5xl font-bold leading-tight mb-6"
          />
           {/* Local tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {[
                "Una, HP",
                "Hamirpur",
                "Kangra",
                "Near Chandigarh Road",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-[#F1F5F9] border border-[#E5E7EB] text-[#24342b] font-semibold px-3 py-1 uppercase tracking-wide"
                >
                  📍 {tag}
                </span>
              ))}
            </div>
        </div>

        {/* Job Category Cards */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse flex space-x-4">
              <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-36"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {requirements.map((req) => (
              <div
                key={req._id}
                className={`bg-white border transition-all duration-300 cursor-pointer group ${
                  activeCategory === req._id
                    ? "border-[#F5B301] shadow-xl shadow-[#F5B301]/10"
                    : "border-[#E5E7EB] hover:border-[#F5B301]/50 hover:shadow-lg"
                }`}
                onClick={() => setActiveCategory(activeCategory === req._id ? null : req._id)}
                aria-expanded={activeCategory === req._id}
              >
                {/* Card Header */}
                <div className="p-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 transition-colors duration-300 ${
                        activeCategory === req._id
                          ? "bg-[#F5B301] text-white"
                          : "bg-[#F1F5F9] text-[#24342b] group-hover:bg-[#F5B301]/10 group-hover:text-[#24342b]"
                      }`}
                    >
                      {IconMap(req.icon)}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#24342b] text-lg leading-tight">{req.title}</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {req.countries.slice(0, 3).map((d) => (
                          <span
                            key={d}
                            className="text-[10px] font-semibold text-[#4B5563] bg-[#F1F5F9] px-2 py-0.5 uppercase tracking-wide"
                          >
                            {d}
                          </span>
                        ))}
                        {req.countries.length > 3 && (
                          <span className="text-[10px] font-semibold text-[#4B5563] bg-[#F1F5F9] px-2 py-0.5">
                            +{req.countries.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#24342b]/40 flex-shrink-0 mt-1 transition-transform duration-300 ${
                      activeCategory === req._id ? "rotate-180 text-[#F5B301]" : ""
                    }`}
                  />
                </div>

                {/* Expandable Requirements */}
                {activeCategory === req._id && (
                  <div className="border-t border-[#E5E7EB] px-6 pb-6 pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <p className="text-sm font-medium text-[#24342b] mb-4">{req.shortDescription}</p>
                    
                    {req.roles && req.roles.length > 0 && (
                      <>
                        <p className="text-xs font-bold text-[#24342b]/50 uppercase tracking-wider mb-2">Common Roles</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {req.roles.map((role, i) => (
                            <span key={i} className="text-xs bg-[#24342b] text-white px-3 py-1 font-medium">
                              {role}
                            </span>
                          ))}
                        </div>
                      </>
                    )}

                    {req.eligibilityRequirements && req.eligibilityRequirements.length > 0 && (
                      <>
                        <p className="text-xs font-bold text-[#24342b]/50 uppercase tracking-wider mb-2 mt-4">
                          Eligibility Requirements
                        </p>
                        <ul className="space-y-2 mb-4">
                          {req.eligibilityRequirements.map((er, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[#374151]">
                              <CheckCircle2 className="w-4 h-4 text-[#F5B301] flex-shrink-0 mt-0.5" />
                              {er}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {req.details && (
                      <div 
                        className="prose prose-sm max-w-none prose-green text-[#374151]"
                        dangerouslySetInnerHTML={{ __html: req.details }}
                      />
                    )}

                    <a
                      href="/contact-info"
                      className="mt-5 inline-block btn-primary text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Apply Now
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* General Documents Section */}
        <div className="bg-white border border-[#E5E7EB] p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#F5B301] text-white">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#24342b]">General Documents Required</h2>
              <p className="text-[#4B5563] text-sm">
                Applicable for all overseas job applications from Una, Hamirpur & surrounding regions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.length > 0 ? documents.map((doc, i) => (
              <div
                key={doc._id}
                className="flex items-start gap-3 p-4 bg-[#F8F9FA] border border-[#E5E7EB] hover:border-[#F5B301]/40 transition-colors"
              >
                <div className="w-7 h-7 bg-[#24342b] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className="font-semibold text-[#24342b] text-sm">{doc.title}</p>
                  <p className="text-[#6B7280] text-xs mt-0.5">{doc.description}</p>
                  {doc.countrySpecificNote && (
                    <div className="mt-2 flex items-start gap-1.5 p-2 bg-orange-50 rounded text-xs text-orange-800 border border-orange-100">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      <span>{doc.countrySpecificNote}</span>
                    </div>
                  )}
                </div>
              </div>
            )) : (
              <p className="col-span-2 text-sm text-gray-500">No documents found.</p>
            )}
          </div>

          {/* Notice Banner */}
          <div className="mt-8 flex items-start gap-3 bg-[#FFF8E1] border border-[#F5B301]/40 p-5">
            <AlertCircle className="w-5 h-5 text-[#F5B301] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#374151]">
              <strong className="text-[#24342b]">Note:</strong> Document requirements may vary by destination country and
              job category. Our team at VOS, Una (Himachal Pradesh) will provide a personalised checklist once you
              register with us. Visit our office at <strong>Old Hoshiarpur Road, Una, HP</strong> or call{" "}
              <a href="tel:+918894412776" className="text-[#24342b] font-bold underline">
                +91 88944 12776
              </a>
              .
            </p>
          </div>
        </div>

        {/* CTA Strip */}
        {cta && (
          <div className={`mt-12 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 ${cta.backgroundColor || 'bg-[#24342b]'}`}>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {cta.heading}
              </h3>
              <p className="text-white/70 text-sm max-w-2xl">
                {cta.description}
              </p>
            </div>
            <div className="flex gap-4 flex-shrink-0">
              <a href={cta.buttonLink} className="btn-primary whitespace-nowrap bg-[#F5B301] text-[#24342b] hover:bg-yellow-400">
                {cta.buttonText}
              </a>
              <a href="/services" className="btn-secondary-dark whitespace-nowrap">
                View Services
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
