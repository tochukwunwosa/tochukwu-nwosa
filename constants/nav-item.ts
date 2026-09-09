interface NavItem {
  name: string;
  route: string;
  isPage?: boolean;
}

export const navItems: NavItem[] = [
  { name: "About", route: "/#about" },
  { name: "Projects", route: "/projects", isPage: true },
  { name: "Skills", route: "/#skill" },
  { name: "Experience", route: "/#experience" },
  // { name: "Testimonials", route: "#testimonials" },
  { name: "Contact", route: "/#contact" },
  { name: "Blog", route: "/blog", isPage: true },
];
