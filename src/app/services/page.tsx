import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import ServicesComponent from "@/components/Services";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: 'Our Services | VCS Website',
  description: 'Explore our comprehensive overseas recruitment services, from candidate screening and visa processing to bulk hiring and deployment support.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#24342b] flex flex-col pt-24">
      <Navbar />
      <div className="flex-grow">
        {/* Hero Banner for Services Page */}
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
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#24342b] mb-4">Our <span className="text-[#F5B301]">Services</span></h1>
          </div>
        </section>

        {/* Re-using the Services Component */}
        <ServicesComponent />
      </div>
      <Footer />
    </main>
  );
}
