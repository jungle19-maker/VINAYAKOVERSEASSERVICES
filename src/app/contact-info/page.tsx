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
    <main className="min-h-screen bg-[#24342b] flex flex-col pt-24">
      <Navbar />
      <div className="flex-grow">
        {/* Hero Banner for Contact Page */}
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
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#24342b] mb-4">Contact <span className="text-[#F5B301]">Us</span></h1>
          </div>
        </section>

        {/* Re-using the Contact Component */}
        <ContactComponent />
      </div>
      <Footer />
    </main>
  );
}
