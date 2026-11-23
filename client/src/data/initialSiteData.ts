import { SiteData } from "@/types/site";

export const initialSiteData: SiteData = {
  general: {
    companyName: "AlphaGroupOfDevelopers",
    tagline: "Engineering with Integrity, Stability, and Precision.",
    badgeText: "Available for Select Q1/Q2 Projects • Accra, Ghana & Worldwide",
    shortBio: "A boutique software engineering collective building mission-critical applications and resilient digital infrastructure.",
    aboutStory: [
      "AlphaGroupOfDevelopers was founded with a shared vision to drive sustainable digital transformation across Ghana and beyond. We combine high-level engineering principles with a relentless commitment to building software that actually serves the people and institutions who rely on it daily.",
      "Our mission is to help forward-thinking businesses and national organizations solve complex operational problems through innovative software systems, automated workflows, and high-availability digital architectures. We partner closely with both public institutions and high-growth ventures to construct scalable foundations built to endure."
    ],
    missionStatement: "To engineer resilient, human-centered software architectures that power business longevity and national technological advancement.",
    foundedYear: "2024",
    keyClientsCount: "5+",
    email: "alphagroupofdevelopers@gmail.com",
    phone: "+233 55 942 8462",
    whatsapp: "+233559428462",
    location: "Accra, Ghana",
    availabilityStatus: "Accepting New Client Engagements",
  },
  socialLinks: [
    { id: "1", platform: "instagram", url: "https://www.instagram.com/alphagroupofdevelopers/", label: "Instagram" },
    { id: "2", platform: "tiktok", url: "https://www.tiktok.com/@alphagroupofdevelopers", label: "TikTok" },
    { id: "3", platform: "whatsapp", url: "https://wa.me/233559428462", label: "WhatsApp" },
    { id: "4", platform: "facebook", url: "https://facebook.com/alphagroupofdevelopers", label: "Facebook" },
    { id: "5", platform: "twitter", url: "https://twitter.com/alphadevgroup", label: "X (Twitter)" },
    { id: "6", platform: "linkedin", url: "https://linkedin.com/company/alphagroupofdevelopers", label: "LinkedIn" },
    { id: "7", platform: "threads", url: "https://threads.net/@alphagroupofdevelopers", label: "Threads" }
  ],
  heroSlides: [
    {
      id: "slide-1",
      title: "Building Digital Solutions for Ghana's Future",
      desc: "We transform complex business challenges into elegant, resilient software solutions that drive growth, trust, and lasting innovation.",
      image: "/alpha_banner.png",
      primaryCtaText: "Explore our work",
      primaryCtaLink: "/projects",
      secondaryCtaText: "Initiate consultation",
      secondaryCtaLink: "/contact"
    },
    {
      id: "slide-2",
      title: "Collaborating for Engineering Excellence",
      desc: "Our multidisciplinary engineering team collaborates closely with your leaders to guarantee the highest tier of performance, security, and scalability.",
      image: "/team meeting.jpeg",
      primaryCtaText: "Meet the team",
      primaryCtaLink: "/team",
      secondaryCtaText: "View services",
      secondaryCtaLink: "/services"
    },
    {
      id: "slide-3",
      title: "Engineering with Integrity and Precision",
      desc: "Our systems are built to endure, marrying robust backend stability with intuitive, human-centered interface design.",
      image: "/enhanced_team.png",
      primaryCtaText: "Our philosophy",
      primaryCtaLink: "/insights",
      secondaryCtaText: "Get in touch",
      secondaryCtaLink: "/contact"
    },
    {
      id: "slide-4",
      title: "Your Strategic Digital Transformation Partner",
      desc: "From mission-critical national infrastructure to high-converting commerce platforms, we construct the foundations required to scale.",
      image: "/alpha_business_card_updated.png",
      primaryCtaText: "Explore projects",
      primaryCtaLink: "/projects",
      secondaryCtaText: "Contact engineers",
      secondaryCtaLink: "/contact"
    }
  ],
  stats: [
    {
      id: "stat-1",
      value: "2024",
      label: "Founded",
      detail: "Emerging as a premier engineering firm in West Africa's tech ecosystem."
    },
    {
      id: "stat-2",
      value: "5+",
      label: "Strategic Clients",
      detail: "Partnering with government institutions and leading private enterprises."
    },
    {
      id: "stat-3",
      value: "100%",
      label: "Stability Focused",
      detail: "Architecting resilient, fault-tolerant systems engineered to survive and scale."
    },
    {
      id: "stat-4",
      value: "99.9%",
      label: "Target Uptime",
      detail: "High-availability cloud deployments with automated monitoring and failover."
    }
  ],
  clientele: [
    "Ghana Revenue Authority",
    "Atsupi's Cosmetics",
    "Walmas Travel",
    "iPhone Global",
    "Scanty's Closet",
    "IkeNation Clothing"
  ],
  coreValues: [
    {
      id: "val-1",
      title: "Innovation",
      desc: "Staying at the cutting edge of global technology while remaining deeply grounded in local context and real-world utility.",
      icon: "Rocket"
    },
    {
      id: "val-2",
      title: "Excellence",
      desc: "Delivering uncompromising quality in architecture, test coverage, and documentation built for multi-decade durability.",
      icon: "Code2"
    },
    {
      id: "val-3",
      title: "Community",
      desc: "Directly investing our technical talent into the technological independence and economic growth of Ghana.",
      icon: "Users"
    },
    {
      id: "val-4",
      title: "Collaboration",
      desc: "Partnering side-by-side with clients as invested technical co-founders rather than distant contractors.",
      icon: "MessageSquare"
    }
  ],
  techStack: [
    { id: "t1", name: "Next.js", category: "Framework" },
    { id: "t2", name: "React 19", category: "Library" },
    { id: "t3", name: "TypeScript", category: "Language" },
    { id: "t4", name: "Node.js", category: "Backend" },
    { id: "t5", name: "Tailwind CSS", category: "Styling" },
    { id: "t6", name: "PostgreSQL", category: "Database" },
    { id: "t7", name: "Docker", category: "DevOps" },
    { id: "t8", name: "Express.js", category: "API" },
    { id: "t9", name: "Framer Motion", category: "Animation" },
    { id: "t10", name: "Cloudflare", category: "Edge & CDN" }
  ],
  services: [
    {
      id: "srv-1",
      title: "Web & Digital Platforms",
      desc: "High-performance, beautifully responsive web applications that engage your customers and load within milliseconds.",
      icon: "Globe",
      deliverables: ["Custom Web Applications", "Mobile-First Responsive Layouts", "SEO & Performance Optimization", "Interactive Micro-Experiences"],
      highlight: true
    },
    {
      id: "srv-2",
      title: "Custom Software Engineering",
      desc: "Bespoke digital systems architected with clean, robust code to automate workflows and resolve unique operational bottlenecks.",
      icon: "Terminal",
      deliverables: ["Enterprise SaaS Platforms", "Custom REST & GraphQL APIs", "Database Schema Design", "Workflow Automation Engines"],
      highlight: false
    },
    {
      id: "srv-3",
      title: "System Reliability & Security",
      desc: "Auditing, refactoring, and fortifying existing codebases to eliminate downtime, patch vulnerabilities, and guarantee 99.9% uptime.",
      icon: "Shield",
      deliverables: ["Codebase Audits & Refactoring", "Penetration Testing & Security Reviews", "Disaster Recovery & Failover", "Database Optimization"],
      highlight: false
    },
    {
      id: "srv-4",
      title: "Strategic Tech Consulting",
      desc: "Candid, executive-level technical advice on choosing modern architectures and scaling systems without wasting capital.",
      icon: "Zap",
      deliverables: ["Technology Stack Selection", "Product Architecture Roadmaps", "Vendor & Tooling Evaluations", "Technical Due Diligence"],
      highlight: true
    }
  ],
  workflow: [
    {
      id: "wf-1",
      step: "01",
      title: "Discovery & Problem Definition",
      desc: "Direct technical consultation with our lead architects to identify genuine business bottlenecks and define target outcomes."
    },
    {
      id: "wf-2",
      step: "02",
      title: "System & UX Architecture",
      desc: "Interactive prototypes and structural system mapping that eliminate risk prior to writing production code."
    },
    {
      id: "wf-3",
      step: "03",
      title: "Precision Engineering",
      desc: "Iterative sprints delivering clean, heavily typed, and thoroughly tested software with weekly demo cycles."
    },
    {
      id: "wf-4",
      step: "04",
      title: "Deployment & Governance",
      desc: "Automated CI/CD deployment, continuous monitoring, and structured maintenance ensuring perpetual reliability."
    }
  ],
  projects: [
    {
      id: "proj-1",
      client: "Scanty's Closet",
      title: "High-End E-Commerce Storefront",
      desc: "A premium digital storefront featuring seamless cart experiences, real-time secure checkout, and polished dynamic animations.",
      tags: ["E-commerce", "Full Stack", "UI/UX"],
      category: "E-commerce",
      link: "https://scantycloset.vercel.app",
      year: "2024",
      featured: true
    },
    {
      id: "proj-2",
      client: "Team Management System",
      title: "Enterprise Workforce Orchestration",
      desc: "A comprehensive dashboard for managing teams, tasks, and agile workflows with real-time operational insights.",
      tags: ["SaaS", "Dashboard", "Desktop Only"],
      category: "SaaS & Web App",
      link: "https://team-management-system-zq6x.onrender.com",
      year: "2024",
      featured: true
    },
    {
      id: "proj-3",
      client: "IkeNation Clothing",
      title: "Contemporary Fashion Commerce",
      desc: "A modern, stylish e-commerce platform built for a trending clothing brand, featuring seamless mobile browsing and purchasing flows.",
      tags: ["E-commerce", "Fashion", "Frontend"],
      category: "E-commerce",
      link: "https://ikenation-clothing.vercel.app",
      year: "2024",
      featured: true
    },
    {
      id: "proj-4",
      client: "Ghana Revenue Authority (GRA)",
      title: "National Fiscal Infrastructure",
      desc: "Engineering high-throughput systems to support fiscal management, e-VAT compliance platforms, and national economic infrastructure.",
      tags: ["Infrastructure", "National Systems", "Scale"],
      category: "Infrastructure",
      year: "2024",
      featured: true
    },
    {
      id: "proj-5",
      client: "Atsupi's Cosmetics and Trading",
      title: "Omnichannel Commercial Suite",
      desc: "Developing a premium digital storefront and automated commerce solutions to streamline regional sales and order dispatch.",
      tags: ["E-commerce", "Automation", "CX"],
      category: "E-commerce",
      year: "2024",
      featured: false
    },
    {
      id: "proj-6",
      client: "Walmas Travel Consult & iPhone Global",
      title: "Automated Enterprise Foundations",
      desc: "Building secure, scalable digital foundations and automated agentic workflows for cross-border enterprise operations.",
      tags: ["Enterprise", "AI Workflows", "Security"],
      category: "Enterprise",
      year: "2024",
      featured: false
    }
  ],
  team: [
    {
      id: "tm-1",
      name: "Kingsley Okyere",
      role: "Founder & Lead Architect",
      image: "/Founder.jpeg",
      background: "BSc. Information Technology; Diploma in IT.",
      expertise: "Building Strong, Long-Lasting Software.",
      bio: "Uses concepts from physics and systems engineering to ensure our software survives, scales, and thrives over decades. Kingsley oversees high-level architectural integrity and guarantees that every project delivers uncompromising stability.",
      linkedin: "https://linkedin.com",
      github: "https://github.com/alphagroupofdevelopers",
      email: "kingsley@alphagroup.dev"
    },
    {
      id: "tm-2",
      name: "Godfred Fokuo",
      role: "Co-Founder & User Experience Lead",
      image: "/Godfred Fokuo.jpeg",
      background: "Full Stack Developer & Behavioral Economics Enthusiast.",
      expertise: "Making Software Easy to Use and Engaging.",
      bio: "Bridges the crucial divide between computer science and human psychology. Godfred ensures that complex technical solutions feel effortless, delightful, and natural for end-users to adopt.",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "godfred@alphagroup.dev"
    },
    {
      id: "tm-3",
      name: "George Essel",
      role: "Interface & Product Designer",
      image: "/george.jpeg",
      background: "Human-Computer Interaction & Visual Arts.",
      expertise: "Accessible, High-Clarity Design Systems.",
      bio: "Specializes in accessible, readable, and aesthetically captivating digital interfaces. George believes software should communicate with elegance, dignity, and zero cognitive friction.",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      email: "george@alphagroup.dev"
    }
  ],
  insights: [
    {
      id: "ins-1",
      title: "Why Stability Matters More Than Speed in Ghana's Digital Economy",
      slug: "stability-over-speed",
      category: "Philosophy",
      date: "March 2024",
      readTime: "5 min read",
      author: "Kingsley Okyere",
      excerpt: "In a rapidly evolving emerging market, the single most valuable asset isn't the fastest feature roll-out—it's the system that never fails when money or public trust is on the line.",
      content: "When engineering for African markets, infrastructure challenges like unpredictable mobile network bandwidth and varying device capabilities are not anomalies; they are baseline realities. Too many teams optimize for flashy vanity animations while neglecting offline resilience, idempotent payment reconciliation, and lightweight network payloads. In this paper, we explore how building software with physical engineering principles of redundancy and structural damping leads to higher customer lifetime value."
    },
    {
      id: "ins-2",
      title: "Scaling e-VAT Systems for National Infrastructure",
      slug: "scaling-evat-national-systems",
      category: "Engineering",
      date: "February 2024",
      readTime: "8 min read",
      author: "Alpha Engineering Team",
      excerpt: "A deep dive into how we architect high-availability data pipelines and cryptographic verification for national fiscal institutions.",
      content: "National revenue platforms must maintain zero-downtime reliability under erratic peak spikes during statutory reporting deadlines. We share our architectural blueprint combining asynchronous message queues, distributed consensus, and append-only cryptographic ledgers that enable seamless reconciliation between taxpayer point-of-sale machines and central fiscal databases without latency bottlenecks."
    },
    {
      id: "ins-3",
      title: "Building Software That Lasts: The Alpha Group Methodology",
      slug: "building-software-that-lasts",
      category: "Strategy",
      date: "January 2024",
      readTime: "6 min read",
      author: "Godfred Fokuo",
      excerpt: "Exploring the intersection of systems architecture, behavioral ergonomics, and sustainable codebase maintenance.",
      content: "Software rot is one of the most expensive hidden taxes on modern businesses. When software is rushed without strict domain typing and modular boundaries, subsequent feature releases slow down exponentially. The Alpha Group methodology implements architectural guardrails early, ensuring that teams can continue building new capabilities ten years later with the exact same velocity as day one."
    }
  ],
  testimonials: [
    {
      id: "test-1",
      client: "Director of Technical Systems",
      role: "Public Sector Partner",
      company: "National Fiscal Agency",
      quote: "AlphaGroupOfDevelopers delivered when off-the-shelf software failed to handle our throughput requirements. Their commitment to architectural stability and transparent communication sets them apart in West Africa.",
      rating: 5
    },
    {
      id: "test-2",
      client: "Founder & Creative Director",
      role: "Managing Director",
      company: "Scanty's Closet",
      quote: "Our online conversions doubled within the first month of launching the new platform. Their eye for sleek design combined with lightning-fast checkout made a noticeable difference to our bottom line.",
      rating: 5
    },
    {
      id: "test-3",
      client: "Operations Lead",
      role: "Director of Logistics",
      company: "Walmas Travel & Global",
      quote: "They act like genuine partners, not distant contractors. Whenever we need strategic advice or architectural adjustments, their engineering team is right there with solutions.",
      rating: 5
    }
  ],
  lastUpdated: new Date().toISOString()
};
