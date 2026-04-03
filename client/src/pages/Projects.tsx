import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const clientWork = [
  {
    client: "Scanty's Closet",
    desc: "A premium digital storefront featuring seamless cart experiences, real-time secure checkout, and polished dynamic animations.",
    tags: ["E-commerce", "Full Stack", "UI/UX"],
    link: "https://scantycloset.vercel.app"
  },
  {
    client: "Team Management System",
    desc: "A comprehensive dashboard for managing teams, tasks, and workflows. (Note: Optimized for Desktop).",
    tags: ["SaaS", "Dashboard", "Desktop Only"],
    link: "https://team-management-system-zq6x.onrender.com"
  },
  {
    client: "IkeNation Clothing",
    desc: "A modern, stylish e-commerce platform built for a clothing brand, featuring seamless browsing and purchasing flows.",
    tags: ["E-commerce", "Fashion", "Frontend"],
    link: "https://ikenation-clothing.vercel.app"
  },
  {
    client: "Ghana Revenue Authority (GRA)",
    desc: "Engineering systems to support fiscal management, e-VAT platforms, and national economic infrastructure.",
    tags: ["Infrastructure", "National Systems", "Scale"]
  },
  {
    client: "Atsupi's Cosmetics and Trading",
    desc: "Developing a premium digital storefront and automated e-commerce solutions to streamline sales.",
    tags: ["E-commerce", "Automation", "CX"]
  },
  {
    client: "Walmas Travel Consult & iPhone Global",
    desc: "Building secure, scalable digital foundations and agentic workflows for enterprise operations.",
    tags: ["Enterprise", "AI Workflows", "Security"]
  }
];

export default function Projects() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <h1 className="text-5xl md:text-7xl font-serif italic text-primary mb-8 ml-[-2px]">
              Our Past Work
            </h1>
            <p className="text-xs font-sans tracking-widest uppercase text-muted-foreground mb-16 max-w-2xl leading-relaxed">
              Look at the projects we've built. These aren't just case studies; 
              they are strong foundations for growing businesses.
            </p>
            
            <div className="w-full h-[1px] bg-border mb-8"></div>
            <p className="text-[10px] font-sans tracking-widest uppercase text-muted-foreground/60 mb-12">
              OUR PROJECTS
            </p>

            <div className="flex flex-col">
              {clientWork.map((item, index) => {
                const ItemContent = (
                  <>
                    <span className="text-xs font-sans text-muted-foreground w-12 shrink-0">
                      0{index + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-serif text-primary group-hover:italic transition-all mb-4">
                        {item.client}
                      </h3>
                      <p className="text-lg font-sans text-muted-foreground max-w-xl leading-relaxed mb-6">
                        {item.desc}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {item.tags.map((tag, ti) => (
                          <span key={ti} className="text-[10px] uppercase tracking-wider px-3 py-1 bg-secondary text-primary border border-border">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight 
                      size={24} 
                      className="text-border group-hover:text-primary group-hover:translate-x-2 transition-all self-end md:self-center" 
                    />
                  </>
                );

                const itemClasses = `group border-b border-border py-12 flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 transition-colors ${item.link ? 'cursor-pointer hover:bg-muted/30' : 'cursor-default'}`;

                return item.link ? (
                  <a 
                    key={index} 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={itemClasses}
                  >
                    {ItemContent}
                  </a>
                ) : (
                  <div key={index} className={itemClasses}>
                    {ItemContent}
                  </div>
                );
              })}
            </div>

            <div className="mt-20">
              <p className="text-muted-foreground font-sans italic max-w-2xl leading-relaxed">
                A significant portion of our engineering work is developed under private enterprise contracts. 
                For a more detailed technical overview of our capabilities, please contact us directly.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
