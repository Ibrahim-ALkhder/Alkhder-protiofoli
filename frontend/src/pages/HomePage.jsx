import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import CertificatesSection from "../components/CertificatesSection";
import Footer from "../components/Footer";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#1f2937]">
      <Navbar />

      <main>
        <HeroSection />

        <div className="section-blend-light-to-dark" />
        <ProjectsSection />

        <SkillsSection />

        <CertificatesSection />

        <div className="section-blend-light-to-dark" />
      </main>

      <Footer />
    </div>
  );
}
