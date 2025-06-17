
declare interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  liveDemoLink: string;
}

declare interface Experience {
  title: string;
  company: string;
  duration: string;
  align: "left" | "right";
  bullets: string[];
}

declare interface NavItem {
  name: string;
  route: string
}