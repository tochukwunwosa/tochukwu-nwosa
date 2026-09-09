
import Contact from "@/components/contact/contact";
import ProfessionalExperience from "@/components/professional-experience";
import Projects from "@/components/projects";
import TechnicalSkills from "@/components/technical-skills";
import HeroSection from "@/components/hero-section";

export const revalidate = 60;

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Projects />
      <TechnicalSkills />
      <ProfessionalExperience />
      {/* <Testimonials/> */}
      <Contact />
    </div>
  );
}
