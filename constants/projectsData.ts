export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  liveDemoLink: string;
  githubLink?: string;
  technologies: string[];
  metrics?: string[];
  category: "product" | "client";
  featured: boolean;
}

export const projectsData: Project[] = [
  // PERSONAL PRODUCTS
  {
    id: 1,
    title: "ClaimMate",
    subtitle: "AI-powered insurance claim report generator",
    description:
      "SaaS platform helping insurance agents generate professional claim reports in seconds. Features AI-powered narrative generation, structured data validation, and export to PDF/Word. Built for speed and reliability with Next.js SSG and Supabase.",
    image: "/projects/claimmate.png",
    liveDemoLink: "https://getclaimmate.com",
    githubLink: "https://github.com/tochukwunwosa/claimmate",
    technologies: [
      "Next.js",
      "TypeScript",
      "OpenAI API",
      "Supabase",
      "TailwindCSS",
    ],
    metrics: ["95+ Lighthouse Score", "< 2s Load Time", "100% SEO Score"],
    category: "product",
    featured: true,
  },
  {
    id: 2,
    title: "Tech LinkUp",
    subtitle:
      "Community driven event discovery platform for Nigeria's Tech Ecosystem",
    description:
      "Platform connecting tech professionals with events across Nigeria. Features real-time filtering by location/category, and event submissions. Built with performance-first architecture using Next.js and optimized database queries.",
    image: "/projects/linkup.png",
    liveDemoLink: "https://techlinkup.xyz",
    githubLink: "https://github.com/tochukwunwosa/linkup",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Framer Motion",
      "TailwindCSS",
    ],
    metrics: ["90+ PageSpeed", "Real-time Updates", "Debounced Search"],
    category: "product",
    featured: true,
  },

  // CLIENT WORK
  {
    id: 3,
    title: "Kinlearn LMS",
    subtitle: "E-learning platform with 500+ daily active users",
    description:
      "Learning Management System for Kinplus Academy featuring course listings, custom CMS, and timed examination system with real-time scoring. Optimized for performance with 40% faster load times through architecture refactoring.",
    image: "/projects/kinlearn-mock-666x375.png",
    liveDemoLink: "https://kinlearn.vercel.app",
    technologies: ["Next.js", "TypeScript", "MongoDB", "TailwindCSS"],
    metrics: ["500+ Daily Users", "40% Faster Load", "92 Lighthouse Score"],
    category: "client",
    featured: true,
  },
  {
    id: 4,
    title: "Kinplus Technologies",
    subtitle: "Corporate website for engineering & construction firm",
    description:
      "Modern corporate website showcasing engineering, construction, and technology services. Built with headless CMS integration for easy content management. Achieved 98+ PageSpeed score through image optimization and lazy loading.",
    image: "/projects/kinplus-mock-666x375.png",
    liveDemoLink: "https://www.kinplusgroup.com",
    technologies: ["React", "TailwindCSS", "Hygraph CMS"],
    metrics: ["98+ PageSpeed", "< 1.5s Load Time", "Mobile-First"],
    category: "client",
    featured: false,
  },
  {
    id: 5,
    title: "Upsmart Solutions",
    subtitle: "Digital transformation & IT consulting website",
    description:
      "Business website highlighting digital transformation and IT consulting services. Features service overviews, contact forms, and fully responsive UI. Delivered with perfect accessibility scores and optimized performance.",
    image: "/projects/upsmart-mock-666x375.png",
    liveDemoLink: "https://www.upsmartsolutions.com.ng",
    technologies: ["Next.js", "TailwindCSS"],
    metrics: ["98+ PageSpeed", "100% Accessibility", "Responsive Design"],
    category: "client",
    featured: false,
  },
];

// Helper to get featured projects only
export const featuredProjects = projectsData.filter((p) => p.featured);

// Helper to get by category
export const personalProjects = projectsData.filter(
  (p) => p.category === "product"
);
export const clientProjects = projectsData.filter(
  (p) => p.category === "client"
);
