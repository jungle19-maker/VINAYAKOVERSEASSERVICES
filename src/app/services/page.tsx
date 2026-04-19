import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import ServicesComponent from "@/components/Services";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: 'Our Services | Vinayak Overseas Services',
  description: 'Explore our comprehensive overseas recruitment services, from candidate screening and visa processing to bulk hiring and deployment support.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col pt-24">
      <Navbar />
      <div className="flex-grow">
          {/* Hero Banner for Services Page */}
          <section className="bg-white py-20 text-center border-b border-[#E5E7EB]">
             <div className="container mx-auto px-6 max-w-4xl">
                 <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B1F3A] mb-4">Our <span className="text-[#F5B301]">Services</span></h1>
                 <p className="text-[#4B5563] text-lg">End-to-end international hiring solutions tailored to your needs.</p>
             </div>
          </section>

          {/* Re-using the Services Component */}
         <ServicesComponent />
      </div>
      <Footer />
    </main>
  );
}
