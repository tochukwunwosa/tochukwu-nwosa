export interface Experience {
  title: string;
  company: string;
  location: string;
  duration: string;
  type: "full-time" | "contract" | "internship";
  bullets: string[];
  align: "left" | "right";
  technologies?: string[];
}

export const experiencesData: Experience[] = [
  {
    title: "Fullstack Developer",
    company: "Brainzcode",
    location: "Remote, Nigeria",
    duration: "June 2024 - Present",
    type: "full-time",
    bullets: [
      "Build and ship web applications and client websites using Next.js, React, and TypeScript",
      "Integrate third-party APIs, webhooks, authentication services, and analytics tools into client platforms",
      "Optimized site architectures for 40% faster load times through code-splitting, lazy loading, and asset optimization",
      "Implemented SEO strategies including structured data, meta tags, and accessibility standards — improving organic traffic by 25%",
      "Delivered 10+ client projects with consistent 98+ PageSpeed scores",
      "Established CI/CD pipelines reducing deployment time by 60%",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "CI/CD",
      "SEO",
    ],
    align: "left",
  },
  {
    title: "Fullstack Developer",
    company: "Kinplus Technologies",
    location: "Ado-Ekiti, Nigeria",
    duration: "November 2023 - March 2025",
    type: "contract",
    bullets: [
      "Led fullstack development of an LMS platform — built the UI, integrated Node.js/MongoDB backend APIs, and designed the examination engine with timer, auto-save, and real-time scoring",
      "Improved platform performance by 40%, reducing page load times from 4.5s to 2.7s for 500+ daily active users",
      "Elevated Lighthouse scores from 65 to 92 through architecture refactoring and optimization",
      "Increased user engagement by 30% through gamified dashboards and strategic UX improvements",
      "Developed intelligent course filtering with debounced API calls and optimized database queries",
      "Set up Cypress E2E testing suite and CI/CD pipelines enabling 2–3 production releases weekly",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Cypress",
      "CI/CD",
    ],
    align: "right",
  },
  {
    title: "Frontend Developer Intern",
    company: "Ekiti State Digital Skill Academy",
    location: "Ado-Ekiti, Nigeria",
    duration: "January 2023 - June 2023",
    type: "internship",
    bullets: [
      "Collaborated with cross-functional team to build responsive web applications using React and Tailwind CSS",
      "Participated in agile ceremonies including daily standups, sprint planning, and code reviews",
      "Gained hands-on experience with version control, component architecture, and modern frontend workflows",
    ],
    technologies: ["React", "Tailwind CSS", "Git", "Agile"],
    align: "left",
  },
];