import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import VoluntarySection from "@/components/VoluntarySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ServicesSection />
    <ProjectsSection />
    <CertificationsSection />
    <VoluntarySection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
