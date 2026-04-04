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
import Chatbot from "@/components/Chatbot";

const Index = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <HeroSection />
    <div className="section-divider" />
    <AboutSection />
    <div className="section-divider" />
    <SkillsSection />
    <div className="section-divider" />
    <ServicesSection />
    <div className="section-divider" />
    <ProjectsSection />
    <div className="section-divider" />
    <CertificationsSection />
    <div className="section-divider" />
    <VoluntarySection />
    <div className="section-divider" />
    <ContactSection />
    <Footer />
    <Chatbot />
  </div>
);

export default Index;
