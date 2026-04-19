import Navbar      from "@/components/Navbar";
import Hero        from "@/components/Hero";
import About       from "@/components/About";
import Services    from "@/components/Services";
import Industries  from "@/components/Industries";
import WhyUs       from "@/components/WhyUs";
import Process     from "@/components/Process";
import FAQ         from "@/components/FAQ";
import Footer      from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Industries />
      <WhyUs />
      <Process />
      <FAQ />
      <Footer />
    </main>
  );
}
