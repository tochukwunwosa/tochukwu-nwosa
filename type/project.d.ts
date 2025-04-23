
declare interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  liveDemoLink: string;
}