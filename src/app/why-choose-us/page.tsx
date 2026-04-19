import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: 'Why Choose Us | VCS Website',
  description: 'Discover why VCS Website is your trusted MEA-approved global manpower recruitment partner.',
};

export default function WhyChooseUsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col pt-24">
      <Navbar />
      <div className="flex-grow">
          {/* Hero Banner for Why Choose Us Page */}
          <section className="bg-white py-20 text-center border-b border-[#E5E7EB]">
             <div className="container mx-auto px-6 max-w-4xl">
                 <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B1F3A] mb-4">Why Choose <span className="text-[#F5B301]">VCS?</span></h1>
                 <p className="text-[#4B5563] text-lg">Your trusted MEA-approved global manpower partner.</p>
             </div>
          </section>

          {/* Re-using the WhyUs Component */}
         <WhyUs />
      </div>
      <Footer />
    </main>
  );
}
