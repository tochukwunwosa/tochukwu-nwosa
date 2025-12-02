interface NavItem {
  name: string;
  route: string;
}

export const navItems: NavItem[] = [
  { name: "About", route: "#about" },
  { name: "Projects", route: "#project" },
  { name: "Skills", route: "#skill" },
  { name: "Experience", route: "#experience" },
  // { name: "Testimonials", route: "#testimonials" },
  { name: "Contact", route: "#contact" },
];
