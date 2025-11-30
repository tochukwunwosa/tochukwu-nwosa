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
    title: "Frontend Developer",
    company: "Brainzcode",
    location: "Remote, Nigeria",
    duration: "June 2024 - Present",
    type: "full-time",
    bullets: [
      "Delivered 10+ high-performance client websites achieving 98+ PageSpeed scores across all projects",
      "Optimized site architectures for 40% faster load times through code-splitting, lazy loading, and asset optimization",
      "Implemented comprehensive SEO strategies including structured data, meta tags, and accessibility standards",
      "Collaborated with design and product teams to translate Figma designs into pixel-perfect, responsive React components",
      "Established CI/CD pipelines and testing workflows to ensure stable deployments and maintain code quality",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Performance Optimization",
      "SEO",
    ],
    align: "left",
  },
  {
    title: "Frontend Developer",
    company: "Kinplus Technologies",
    location: "Ado-Ekiti, Nigeria",
    duration: "November 2023 - Present",
    type: "contract",
    bullets: [
      "Led frontend development of Learning Management System (LMS) platform serving 500+ daily active users",
      "Increased user engagement by 30% through gamified dashboards and strategic UI enhancements",
      "Improved platform performance by 40%, reducing page load times from 4.5s to 2.7s",
      "Elevated Lighthouse scores from 65 to 92 through architecture refactoring and optimization",
      "Developed intelligent course filtering system with debounced API calls and optimized database queries",
      "Set up Cypress end-to-end testing and CI/CD pipelines to ensure stable releases",
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
