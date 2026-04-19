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
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col pt-24">
      <Navbar />
      <div className="flex-grow">
          {/* Hero Banner for Process Page */}
          <section className="bg-white py-20 text-center border-b border-[#E5E7EB]">
             <div className="container mx-auto px-6 max-w-4xl">
                 <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B1F3A] mb-4">Our <span className="text-[#F5B301]">Process</span></h1>
                 <p className="text-[#4B5563] text-lg">A transparent and proven methodology for successful global placements.</p>
             </div>
          </section>

          {/* Re-using the Process Component */}
         <ProcessComponent />
      </div>
      <Footer />
    </main>
  );
}
