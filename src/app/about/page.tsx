import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import AboutComponent from "@/components/About";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
 title: 'About Us | VCS Website',
 description: 'Learn about VCS Website, our mission, vision, and our commitment to providing top-tier overseas manpower recruitment.',
};

export default function AboutPage() {
 return (
 <main className="min-h-screen bg-[#F8FAFC] flex flex-col pt-24">
 <Navbar />
 <div className="flex-grow">
 {/* Hero Banner for About Page */}
 <section className="bg-white py-20 text-center border-b border-[#E5E7EB]">
 <div className="container mx-auto px-6 max-w-4xl">
 <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B1F3A] mb-4">About <span className="text-[#F5B301]">VCS Website</span></h1>
 <p className="text-[#4B5563] text-lg">Connecting Indian talent with global opportunities since 2014.</p>
 </div>
 </section>

 {/* Re-using the About Component */}
 <AboutComponent />
 
 <section className="bg-white py-16">
 <div className="container mx-auto px-6 max-w-5xl text-center">
 <h2 className="text-3xl font-bold text-[#0B1F3A] mb-8">Our Mission & Vision</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="p-8 bg-[#F1F5F9] border border-[#E5E7EB]">
 <h3 className="text-xl font-bold text-[#0B1F3A] mb-4">Our Mission</h3>
 <p className="text-[#4B5563] leading-relaxed">To deliver compliant, ethical, and high-speed recruitment that matches the right candidate with the right culture, while reducing time-to-hire and cost-per-hire for our global partners.</p> </div>
 <div className="p-8 bg-[#F1F5F9] border border-[#E5E7EB]">
 <h3 className="text-xl font-bold text-[#0B1F3A] mb-4">Our Vision</h3>
 <p className="text-[#4B5563] leading-relaxed">To be the most trusted and preferred overseas recruitment partner globally, recognized for our unwavering commitment to quality, compliance, and excellence in human resource management.</p>
 </div>
 </div>
 </div>
 </section>
 </div>
 <Footer />
 </main>
 );
}
