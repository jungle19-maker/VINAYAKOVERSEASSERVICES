"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, HeartPulse, HardHat, Car, Plane, 
  Briefcase, GraduationCap, Building2, Stethoscope, Hammer, 
  HelpCircle, Settings, Truck 
} from "lucide-react";

type Requirement = {
  _id: string;
  title: string;
  icon: string;
  countries: string[];
  shortDescription: string;
  status: "active" | "inactive";
  details: string;
};

// Map string icon names to Lucide components
const IconMap = (name: string) => {
  const icons: Record<string, any> = {
    HeartPulse, HardHat, Car, Plane, Briefcase, 
    GraduationCap, Building2, Stethoscope, Hammer, Settings, Truck
  };
  const IconComponent = icons[name] || HelpCircle;
  return <IconComponent className="w-8 h-8 text-[#F5B301]" />;
};

export default function DynamicRequirements() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchReqs = async () => {
      try {
        const res = await fetch("/api/requirements");
        const data = await res.json();
        setRequirements(data.filter((req: Requirement) => req.status === "active"));
      } catch (error) {
        console.error("Failed to fetch requirements");
      } finally {
        setLoading(false);
      }
    };
    fetchReqs();
  }, []);

  if (loading) {
    return (
      <div className="py-20 bg-gray-50 flex justify-center">
        <div className="animate-pulse space-y-4 max-w-4xl w-full px-6">
          <div className="h-20 bg-gray-200 rounded-xl w-full"></div>
          <div className="h-20 bg-gray-200 rounded-xl w-full"></div>
          <div className="h-20 bg-gray-200 rounded-xl w-full"></div>
        </div>
      </div>
    );
  }

  if (requirements.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#24342b] mb-4">
            Job Categories & Eligibility
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the requirements for various global opportunities
          </p>
        </div>

        <div className="space-y-4">
          {requirements.map((req) => (
            <div
              key={req._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setExpandedId(expandedId === req._id ? null : req._id)}
                className="w-full text-left p-6 md:p-8 flex items-start md:items-center justify-between focus:outline-none"
              >
                <div className="flex items-start md:items-center gap-6">
                  <div className="p-4 bg-green-50 rounded-xl flex-shrink-0">
                    {IconMap(req.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#24342b] mb-2">{req.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base mb-3">{req.shortDescription}</p>
                    <div className="flex flex-wrap gap-2">
                      {req.countries.map((country, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedId === req._id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4 p-2"
                >
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedId === req._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 md:p-8 pt-0 border-t border-gray-50 text-gray-700 bg-gray-50/50">
                      <div 
                        className="prose prose-green max-w-none prose-sm md:prose-base"
                        dangerouslySetInnerHTML={{ __html: req.details }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
