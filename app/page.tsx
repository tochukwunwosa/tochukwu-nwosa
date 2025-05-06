
import Contact from "@/components/contact/contact";
import HeroSection from "@/components/hero-section";
import ProfessionalExperience from "@/components/professional-experience";
import Projects from "@/components/projects";
import TechnicalSkills from "@/components/technical-skills";

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
