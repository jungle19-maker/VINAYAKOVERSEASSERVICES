import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import ProcessComponent from "@/components/Process";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: 'Our Process | VCS Website',
  description: 'Understand our 6-step global recruitment process that ensures right talent matching from requirement analysis to final deployment.',
};

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-[#24342b] flex flex-col pt-24">
      <Navbar />
      <div className="flex-grow">
        {/* Hero Banner for Process Page */}
        <section className="relative bg-white py-24 text-center border-b border-[#E5E7EB] overflow-hidden">
          {/* Modern Grid Background */}
          <div 
              className="absolute inset-0 z-0"
              style={{
                  backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                  maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
              }}
          />
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#24342b] mb-4">Our <span className="text-[#F5B301]">Process</span></h1>
          </div>
        </section>

        {/* Re-using the Process Component */}
        <ProcessComponent />
      </div>
      <Footer />
    </main>
  );
}
