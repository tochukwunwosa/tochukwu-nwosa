export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number; // 1-5 stars
  date: string; // e.g., "December 2024"
  relationship: "client" | "colleague" | "manager";
  projectContext?: string; // Optional: what you worked on together
  linkedin?: string; // Optional: LinkedIn profile
}

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechStart Inc.",
    image: "/testimonials/sarah-johnson.jpg", // You can use placeholder for now
    content:
      "Tochukwu delivered our e-commerce platform 2 weeks ahead of schedule with exceptional quality. The site now loads 40% faster and our conversion rate increased by 25%. His attention to performance optimization and clean code made all the difference.",
    rating: 5,
    date: "December 2024",
    relationship: "client",
    projectContext: "E-commerce Platform Rebuild",
    linkedin: "https://linkedin.com/in/sarah-johnson",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Senior Frontend Engineer",
    company: "Kinplus Technologies",
    image: "/testimonials/michael-chen.jpg",
    content:
      "Working with Tochukwu on the LMS platform was excellent. He took full ownership of the frontend architecture and consistently delivered high-quality, maintainable code. His expertise in React and Next.js helped us scale to 500+ daily users without performance issues.",
    rating: 5,
    date: "November 2024",
    relationship: "colleague",
    projectContext: "Learning Management System",
    linkedin: "https://linkedin.com/in/michael-chen",
  },
  {
    id: 3,
    name: "David Okafor",
    role: "CTO",
    company: "Brainzcode",
    image: "/testimonials/david-okafor.jpg",
    content:
      "Tochukwu is a reliable frontend engineer who consistently delivers pixel-perfect implementations. He improved our client project PageSpeed scores from 60s to 98+ across the board. Clients frequently compliment the speed and responsiveness of their sites.",
    rating: 5,
    date: "October 2024",
    relationship: "manager",
    projectContext: "Multiple Client Projects",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Founder & CEO",
    company: "StartupX",
    image: "/testimonials/emily-rodriguez.jpg",
    content:
      "We hired Tochukwu for a complex dashboard project and he exceeded expectations. Not only did he deliver a beautiful, responsive interface, but he also suggested performance improvements that made our app significantly faster. Highly recommend!",
    rating: 5,
    date: "September 2024",
    relationship: "client",
    projectContext: "Analytics Dashboard",
    linkedin: "https://linkedin.com/in/emily-rodriguez",
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Lead Developer",
    company: "Digital Solutions Ltd",
    image: "/testimonials/james-wilson.jpg",
    content:
      "Tochukwu's work ethic and technical skills are outstanding. He consistently writes clean, well-documented code and is always willing to help team members. His expertise in TypeScript and modern React patterns elevated our entire codebase quality.",
    rating: 5,
    date: "August 2024",
    relationship: "colleague",
    projectContext: "Enterprise Web Application",
  },
  {
    id: 6,
    name: "Amara Nwosu",
    role: "Marketing Director",
    company: "Growth Agency",
    image: "/testimonials/amara-nwosu.jpg",
    content:
      "Our website went from slow and clunky to lightning-fast after Tochukwu's optimization work. Our bounce rate dropped by 35% and time on site increased significantly. He explained technical concepts in a way we could understand and delivered exactly what we needed.",
    rating: 5,
    date: "July 2024",
    relationship: "client",
    projectContext: "Website Performance Optimization",
  },
];

// Helper to get testimonials by relationship type
export const getTestimonialsByType = (type: Testimonial["relationship"]) => {
  return testimonialsData.filter((t) => t.relationship === type);
};

// Helper to get featured testimonials (highest rated, most recent)
export const getFeaturedTestimonials = (count: number = 3) => {
  return testimonialsData.sort((a, b) => b.rating - a.rating).slice(0, count);
};
