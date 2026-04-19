import Navbar      from "@/components/Navbar";
import Hero        from "@/components/Hero";
import About       from "@/components/About";
import Services    from "@/components/Services";
import Industries  from "@/components/Industries";
import Stats       from "@/components/Stats";
import WhyUs       from "@/components/WhyUs";
import Process     from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Certificate from "@/components/Certificate";
import FAQ         from "@/components/FAQ";
import Contact     from "@/components/Contact";
import Footer      from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Industries />
      <Stats />
      <WhyUs />
      <Process />
      <Testimonials />
      <Certificate />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
