export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/#projects" },
  { name: "Skills", href: "/#skills" },
  { name: "Certificates", href: "/certificates" },
  { name: "Contact", href: "/#Footer" },
];

export const projects = [
  {
    id: 1,
    slug: "dashboard-builder",
    title: "Dashboard Builder",
    shortDescription:
      "A customizable dashboard builder with drag-and-drop functionality.",
    description:
      "A comprehensive dashboard builder that empowers users to create custom analytics dashboards through an intuitive drag-and-drop interface. Built with modern web technologies, it features real-time data visualization, customizable widgets, and a plugin system for extensibility.",
    button: "View Project",
    variant: "dashboard",
    isFeatured: true,
    problem:
      "Business teams needed a way to create custom analytics dashboards without relying on engineering resources. Existing solutions were either too rigid or required extensive coding knowledge, creating a bottleneck in data-driven decision making.",
    solution:
      "Built a drag-and-drop dashboard builder with real-time preview, customizable widgets, and a plugin system. The interface allows non-technical users to create complex data visualizations in minutes while giving developers the flexibility to extend functionality.",
    features: [
      "Drag-and-drop widget placement with intelligent grid snapping",
      "Real-time data visualization with 12+ chart types",
      "Custom theme engine with full branding support",
      "Export to PDF, PNG, and embeddable iframe options",
      "Team collaboration with shared workspaces and role-based access",
      "Plugin marketplace for custom widget development",
      "Autosave with version history and rollback capability",
    ],
    techStack: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Docker",
      "Redis",
      "Tailwind",
    ],
    challenges: [
      "Maintaining 60fps performance during complex widget interactions across all device types required careful memoization and virtual DOM optimization",
      "Building a real-time collaboration system with operational transform for conflict resolution",
      "Designing an intuitive drag-and-drop experience that felt native while supporting keyboard accessibility",
    ],
    results:
      "Reduced dashboard creation time by 80% across the organization. User satisfaction scores improved by 40%. The tool was adopted by 12 teams within the first quarter, processing over 500k data points daily.",
    timeline: "Q1 2024 — Q3 2024",
    liveUrl: "#",
    githubUrl: "#",
    screenshots: {
      desktop: null,
      tablet: null,
      mobile: null,
    },
  },
  {
    id: 2,
    slug: "web-design-portfolio",
    title: "Web Design\nEcommerce\nApps & Software\nFintech",
    shortDescription:
      "A versatile platform showcasing web design, ecommerce, apps, and fintech solutions.",
    description:
      "A multi-faceted platform demonstrating expertise across four major domains: web design, ecommerce, applications & software, and fintech. Each domain features carefully crafted interfaces and seamless user experiences.",
    button: "View Project",
    variant: "textArrow",
    isFeatured: false,
    problem:
      "Clients needed a unified platform that could showcase capabilities across multiple domains while maintaining consistent quality and user experience.",
    solution:
      "Developed a modular platform architecture with domain-specific modules sharing a common design system and component library.",
    features: [
      "Domain-specific landing pages with tailored experiences",
      "Shared component library ensuring visual consistency",
      "Performance optimized with dynamic imports per domain",
      "Analytics dashboard tracking engagement across domains",
    ],
    techStack: ["React", "TypeScript", "Next.js", "Tailwind", "Prisma"],
    challenges: [
      "Balancing domain-specific requirements with a unified codebase",
      "Ensuring consistent loading performance across all domains",
    ],
    results:
      "Successfully launched four domain platforms with 99.5% uptime. Average page load time under 1.2 seconds.",
    timeline: "Q2 2024 — Q4 2024",
    liveUrl: "#",
    githubUrl: "#",
    screenshots: {
      desktop: null,
      tablet: null,
      mobile: null,
    },
  },
  {
    id: 3,
    slug: "task-manager-app",
    title: "Task Manager App",
    shortDescription:
      "A sleek, intuitive task manager to organize your work.",
    description:
      "A modern task management application designed for productivity. Features include project organization, real-time collaboration, smart reminders, and comprehensive reporting capabilities.",
    button: "View Project",
    variant: "diamond",
    isFeatured: false,
    problem:
      "Existing task management tools were either too complex for individual use or lacked the collaboration features teams needed.",
    solution:
      "Created a balanced task manager that scales from personal todo lists to team project management with intuitive interfaces at every level.",
    features: [
      "Smart task creation with natural language parsing",
      "Kanban board, list, and calendar views",
      "Real-time team collaboration with comments and mentions",
      "Smart reminders with timezone awareness",
      "Productivity analytics and reporting",
    ],
    techStack: ["React", "Node.js", "MongoDB", "Socket.io", "Redis"],
    challenges: [
      "Implementing real-time sync without conflicts",
      "Designing an intuitive UI that works for both power users and beginners",
    ],
    results:
      "Achieved 4.8/5 rating on product launch. 15k active users within 3 months.",
    timeline: "Q3 2024 — Q1 2025",
    liveUrl: "#",
    githubUrl: "#",
    screenshots: {
      desktop: null,
      tablet: null,
      mobile: null,
    },
  },
  {
    id: 4,
    slug: "fintech-web-application",
    title: "Fintech Web Application",
    shortDescription:
      "A secure fintech app for managing personal finances.",
    description:
      "A secure, full-featured fintech application for personal finance management. Includes budgeting tools, investment tracking, bill management, and financial goal planning with bank-grade security.",
    button: "View Project",
    variant: "camera",
    isFeatured: false,
    problem:
      "Users needed a comprehensive personal finance tool that combined budgeting, investment tracking, and financial planning in one secure platform.",
    solution:
      "Built a secure fintech platform with end-to-end encryption, real-time financial data aggregation, and intelligent budgeting algorithms.",
    features: [
      "Automated transaction categorization with ML",
      "Investment portfolio tracking with real-time market data",
      "Smart budget creation and spending alerts",
      "Financial goal planning with progress tracking",
      "Multi-account aggregation with Plaid integration",
    ],
    techStack: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Plaid API",
    ],
    challenges: [
      "Implementing bank-grade security while maintaining seamless user experience",
      "Handling real-time financial data aggregation across multiple institutions",
    ],
    results:
      "Processed $2M+ in transactions. Maintained 99.9% uptime with zero security incidents.",
    timeline: "Q4 2023 — Q2 2024",
    liveUrl: "#",
    githubUrl: "#",
    screenshots: {
      desktop: null,
      tablet: null,
      mobile: null,
    },
  },
  {
    id: 5,
    slug: "mobile-banking-app",
    title: "Mobile Banking App",
    shortDescription: "A modern mobile banking application.",
    description:
      "A full-featured mobile banking application with biometric authentication, real-time transaction monitoring, peer-to-peer payments, and financial insights.",
    button: "View Project",
    variant: "phone",
    isFeatured: false,
    features: [
      "Biometric authentication and face recognition",
      "Real-time transaction notifications",
      "Peer-to-peer payments and splitting",
      "Spending insights and categorization",
    ],
    techStack: ["React Native", "Node.js", "PostgreSQL", "Redis"],
    timeline: "Q2 2024 — Q4 2024",
    liveUrl: "#",
    githubUrl: "#",
    screenshots: {
      desktop: null,
      tablet: null,
      mobile: null,
    },
  },
  {
    id: 6,
    slug: "saas-analytics-platform",
    title: "SaaS Analytics Platform",
    shortDescription: "A comprehensive analytics platform for SaaS businesses.",
    description:
      "An analytics platform designed specifically for SaaS businesses, tracking key metrics like MRR, churn, LTV, and user engagement with beautiful visualizations.",
    button: "View Project",
    variant: "smallLaptop",
    isFeatured: false,
    features: [
      "Real-time SaaS metrics dashboard",
      "Cohort analysis and retention tracking",
      "Revenue forecasting with ML models",
    ],
    techStack: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL"],
    timeline: "Q1 2024 — Q3 2024",
    liveUrl: "#",
    githubUrl: "#",
    screenshots: {
      desktop: null,
      tablet: null,
      mobile: null,
    },
  },
  {
    id: 7,
    slug: "contact",
    title: "CONTACT.",
    shortDescription: "",
    description: "",
    variant: "contact",
    isFeatured: false,
    screenshots: {
      desktop: null,
      tablet: null,
      mobile: null,
    },
  },
  {
    id: 8,
    title: "",
    description: "",
    variant: "empty",
  },
];

export const skills = [
  { name: "React", value: 90, level: "Advanced" },
  { name: "Node.js", value: 85, level: "Advanced" },
  { name: "JavaScript", value: 80, level: "Advanced" },
  { name: "UI/UX Design", value: 75, level: "Strong" },
];

export const softSkills = [
  "Problem Solving",
  "Communication",
  "Teamwork",
  "Leadership",
  "Adaptability",
  "Time Management",
  "Critical Thinking",
  "Project Ownership",
];

export const certificates = [
  {
    id: 1,
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta",
    issued: "Jan 2024",
    credentialLink: "#",
    thumbnail: null,
    description:
      "Comprehensive front-end development certification covering React, UI frameworks, responsive design, and version control.",
    category: "Frontend",
  },
  {
    id: 2,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    issued: "Mar 2024",
    credentialLink: "#",
    thumbnail: null,
    description:
      "Professional certification validating expertise in designing distributed systems on AWS, including compute, storage, networking, and security.",
    category: "Cloud",
  },
  {
    id: 3,
    title: "Google UX Design Professional Certificate",
    issuer: "Google",
    issued: "Aug 2023",
    credentialLink: "#",
    thumbnail: null,
    description:
      "Comprehensive UX design certification covering user research, wireframing, prototyping, and visual design principles.",
    category: "Design",
  },
  {
    id: 4,
    title: "Node.js Backend Development Nanodegree",
    issuer: "Udacity",
    issued: "Nov 2023",
    credentialLink: "#",
    thumbnail: null,
    description:
      "Advanced backend development certification covering RESTful APIs, authentication, database design, and deployment.",
    category: "Backend",
  },
  {
    id: 5,
    title: "React Advanced Patterns and Performance",
    issuer: "Frontend Masters",
    issued: "Jun 2024",
    credentialLink: "#",
    thumbnail: null,
    description:
      "Advanced React patterns including render props, higher-order components, compound components, and performance optimization techniques.",
    category: "Frontend",
  },
  {
    id: 6,
    title: "Docker & Kubernetes Professional",
    issuer: "Linux Foundation",
    issued: "Apr 2024",
    credentialLink: "#",
    thumbnail: null,
    description:
      "Professional certification in containerization and orchestration using Docker and Kubernetes for production deployments.",
    category: "Cloud",
  },
  {
    id: 7,
    title: "Database Design and Management",
    issuer: "Stanford Online",
    issued: "Oct 2023",
    credentialLink: "#",
    thumbnail: null,
    description:
      "Comprehensive database certification covering relational database design, normalization, indexing, and query optimization.",
    category: "Backend",
  },
];

export const certificateCategories = [
  "All",
  "Frontend",
  "Backend",
  "Design",
  "Cloud",
  "Other",
];
