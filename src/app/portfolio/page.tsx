import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Services } from "@/components/portfolio/Services";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export default function PortfolioPage() {
  return (
    <main className="w-full min-h-screen bg-[#0d0d0d] text-white selection:bg-[#00ff9f] selection:text-black overflow-x-hidden font-sans">
      <Hero />
      <About />
      <Projects />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
