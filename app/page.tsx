
import Contact from "@/components/contact/contact";
import ProfessionalExperience from "@/components/professional-experience";
import Projects from "@/components/projects";
import TechnicalSkills from "@/components/technical-skills";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Projects />
      <TechnicalSkills />
      <ProfessionalExperience />
      <Contact />
    </div>
  );
}
