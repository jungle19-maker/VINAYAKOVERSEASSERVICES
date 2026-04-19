import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import IndustriesComponent from "@/components/Industries";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: 'Industries We Serve | Vinayak Overseas Services',
  description: 'Discover the key industries we serve including Construction, Oil & Gas, Healthcare, Hospitality, IT, and Manufacturing.',
};

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col pt-24">
      <Navbar />
      <div className="flex-grow">
          {/* Hero Banner for Industries Page */}
          <section className="bg-white py-20 text-center border-b border-[#E5E7EB]">
             <div className="container mx-auto px-6 max-w-4xl">
                 <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B1F3A] mb-4">Industries We <span className="text-[#F5B301]">Serve</span></h1>
                 <p className="text-[#4B5563] text-lg">Sourcing specialized talent for the world's most demanding sectors.</p>
             </div>
          </section>

          {/* Re-using the Industries Component */}
         <IndustriesComponent />
      </div>
      <Footer />
    </main>
  );
}
