import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: 'Careers | Vinayak Overseas Services',
  description: 'Explore international job opportunities and start your overseas career journey with Vinayak Overseas Services.',
};

const placeholderJobs = [
  {
    title: "Senior Healthcare Nurse",
    location: "Doha, Qatar",
    type: "Full-Time",
    category: "Healthcare",
  },
  {
    title: "Civil Field Engineer",
    location: "Dubai, UAE",
    type: "Contract",
    category: "Construction",
  },
  {
    title: "Executive Sous Chef",
    location: "Riyadh, Saudi Arabia",
    type: "Full-Time",
    category: "Hospitality",
  },
  {
    title: "Heavy Equipment Operator",
    location: "Muscat, Oman",
    type: "Contract",
    category: "Logistics & Energy",
  }
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col pt-24">
      <Navbar />
      <div className="flex-grow">
          {/* Hero Banner for Careers Page */}
          <section className="bg-white py-20 text-center border-b border-[#E5E7EB]">
             <div className="container mx-auto px-6 max-w-4xl">
                 <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B1F3A] mb-4">Current <span className="text-[#F5B301]">Openings</span></h1>
                 <p className="text-[#4B5563] text-lg">Take the next step in your career with premier international employers.</p>
             </div>
          </section>

          {/* Job Listings */}
          <section className="py-24">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="grid gap-6">
                    {placeholderJobs.map((job, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-[#E5E7EB] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
                            <div>
                                <div className="text-sm font-semibold text-[#F5B301] mb-2">{job.category}</div>
                                <h3 className="text-2xl font-bold text-[#23352b] mb-4">{job.title}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-[#4B5563]">
                                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {job.location}</span>
                                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4"/> {job.type}</span>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                 <a
                                    href="https://wa.me/918894412776"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary inline-flex"
                                  >
                                    <Briefcase className="w-4 h-4 mr-2" />
                                    Apply via WhatsApp
                                  </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </section>
      </div>
      <Footer />
    </main>
  );
}
