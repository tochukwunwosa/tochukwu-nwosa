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
    id: 0,
    title: "MyTreda",
    subtitle: "Inventory & business management platform",
    description:
      "Full-stack business management platform I built and currently operate. Handles inventory tracking, sales records, debt management, and daily business workflows for small businesses. I designed and built everything — the Next.js frontend, the NestJS REST API, MongoDB schema, authentication system, activity tracking, and deployment pipeline. Not a side project. A running product with real users.",
    image: "/projects/mytreda.png",
    liveDemoLink: "https://mytreda.com",
    technologies: ["Next.js", "TypeScript", "NestJS", "MongoDB", "REST API"],
    metrics: [
      "80+ Registered Businesses",
      "1,400+ Products Tracked",
      "460+ Sales Records",
      "3,000+ Activity Logs",
    ],
    category: "product",
    featured: true,
  },
  {
    id: 1,
    title: "ClaimMate",
    subtitle: "AI-powered insurance claim report generator",
    description:
      "Built the full product — Next.js frontend, Supabase backend, OpenAI API integration for intelligent narrative generation, role-based authentication, and a PDF/Word export pipeline. Optimized with Next.js SSG for sub-2s load times and a 95+ Lighthouse score.",
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
    metrics: [
      "Role-Based Auth System",
      "OpenAI API Integration",
      "PDF/Word Export Pipeline",
      "95+ Lighthouse · <2s Load",
    ],
    category: "product",
    featured: true,
  },
  {
    id: 2,
    title: "Tech LinkUp",
    subtitle: "Event discovery platform for Nigeria's tech ecosystem",
    description:
      "Platform connecting tech professionals with events across Nigeria. Built a Supabase backend with real-time filtering, optimised database queries, and event submission workflows. Currently hosts 169 published events across in-person, virtual, and hybrid formats. Performance-first architecture with debounced API calls and virtualized lists.",
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
    metrics: [
      "169 Published Events",
      "144 In-Person · 16 Virtual · 9 Hybrid",
      "Real-time Filtering",
      "Debounced Search",
    ],
    category: "product",
    featured: true,
  },

  // CLIENT WORK
  // {
  //   id: 3,
  //   title: "Kinlearn LMS",
  //   subtitle: "E-learning platform — 500+ daily active users",
  //   description:
  //     "Led fullstack development of a Learning Management System serving 500+ daily users. Built the examination engine with timer, auto-save, and real-time scoring. Integrated the Node.js/MongoDB backend, set up Cypress E2E testing, and established CI/CD pipelines enabling 2–3 production releases weekly. Took Lighthouse from 65 to 92, load time from 4.5s to 2.7s.",
  //   image: "/projects/kinlearn-mock-666x375.png",
  //   liveDemoLink: "https://kinlearn.vercel.app",
  //   technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Cypress", "TailwindCSS"],
  //   metrics: [
  //     "500+ Daily Users",
  //     "Lighthouse 65 → 92",
  //     "Load Time 4.5s → 2.7s",
  //     "Cypress E2E Test Suite",
  //   ],
  //   category: "client",
  //   featured: true,
  // },
  {
    id: 4,
    title: "Kinplus Technologies",
    subtitle: "Corporate website for engineering & construction firm",
    description:
      "Modern corporate website with headless CMS integration for easy content management. Achieved 98+ PageSpeed through image optimization, lazy loading, and lean component architecture.",
    image: "/projects/kinplus-mock-666x375.png",
    liveDemoLink: "https://www.kinplusgroup.com",
    technologies: ["React", "TailwindCSS", "Hygraph CMS"],
    metrics: ["98+ PageSpeed", "< 1.5s Load Time", "Mobile-First"],
    category: "client",
    featured: false,
  },
  // {
  //   id: 5,
  //   title: "Upsmart Solutions",
  //   subtitle: "Digital transformation & IT consulting website",
  //   description:
  //     "Business website for a digital transformation consultancy. Responsive UI, contact form integrations, and service overviews. Delivered with 98+ PageSpeed and 100% accessibility score.",
  //   image: "/projects/upsmart-mock-666x375.png",
  //   liveDemoLink: "https://www.upsmartsolutions.com.ng",
  //   technologies: ["Next.js", "TailwindCSS"],
  //   metrics: ["98+ PageSpeed", "100% Accessibility", "Responsive Design"],
  //   category: "client",
  //   featured: false,
  // },
  {
    id: 6,
    title: "KondoHQ",
    subtitle: "Real estate platform — dashboard & application flow",
    description:
      "Contributed as a frontend engineer on a real estate SaaS platform. Built the user dashboard, dashboard landing page, the full flow from viewing to applying for a property, the market insights page, and both user and admin settings pages. All implemented pixel-perfect from Figma designs using Next.js and TypeScript.",
    image: "/projects/kondohq.png",
    liveDemoLink: "https://kondohq.com",
    technologies: ["Next.js", "TypeScript", "TailwindCSS"],
    metrics: [
      "User Dashboard & Landing",
      "Full Property Application Flow",
      "Market Insights Page",
      "User & Admin Settings",
    ],
    category: "client",
    featured: false,
  },
];

// Helper to get featured projects only
export const featuredProjects = projectsData.filter((p) => p.featured);

// Helper to get by category
export const personalProjects = projectsData.filter(
  (p) => p.category === "product",
);
export const clientProjects = projectsData.filter(
  (p) => p.category === "client",
);
