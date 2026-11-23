export interface GeneralInfo {
  companyName: string;
  tagline: string;
  badgeText: string;
  shortBio: string;
  aboutStory: string[];
  missionStatement: string;
  foundedYear: string;
  keyClientsCount: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  availabilityStatus: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  label: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  desc: string;
  image: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  detail: string;
}

export interface CoreValue {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

export interface TechItem {
  id: string;
  name: string;
  category: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
  deliverables?: string[];
  highlight?: boolean;
}

export interface WorkflowStep {
  id: string;
  step: string;
  title: string;
  desc: string;
}

export interface ProjectItem {
  id: string;
  client: string;
  title?: string;
  desc: string;
  tags: string[];
  category: "E-commerce" | "SaaS & Web App" | "Infrastructure" | "Enterprise" | "Other";
  link?: string;
  year?: string;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  background?: string;
  expertise?: string;
  bio: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

export interface InsightArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  author: string;
}

export interface TestimonialItem {
  id: string;
  client: string;
  role: string;
  company: string;
  quote: string;
  rating?: number;
}

export interface SiteData {
  general: GeneralInfo;
  socialLinks: SocialLink[];
  heroSlides: HeroSlide[];
  stats: StatItem[];
  clientele: string[];
  coreValues: CoreValue[];
  techStack: TechItem[];
  services: ServiceItem[];
  workflow: WorkflowStep[];
  projects: ProjectItem[];
  team: TeamMember[];
  insights: InsightArticle[];
  testimonials: TestimonialItem[];
  lastUpdated: string;
}
