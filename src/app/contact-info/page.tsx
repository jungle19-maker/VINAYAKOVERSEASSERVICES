import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import ContactComponent from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: 'Contact Us | VCS Website',
  description: 'Get in touch with VCS Website. We are ready to assist you with your international manpower recruitment and job placement needs.',
};

export default function ContactInfoPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col pt-24">
      <Navbar />
      <div className="flex-grow">
          {/* Hero Banner for Contact Page */}
          <section className="bg-white py-20 text-center border-b border-[#E5E7EB]">
             <div className="container mx-auto px-6 max-w-4xl">
                 <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B1F3A] mb-4">Contact <span className="text-[#F5B301]">Us</span></h1>
                 <p className="text-[#4B5563] text-lg">We are here to answer any questions you may have about our services.</p>
             </div>
          </section>

          {/* Re-using the Contact Component */}
         <ContactComponent />
      </div>
      <Footer />
    </main>
  );
}
