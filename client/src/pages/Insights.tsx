import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowUpRight } from "lucide-react";

const articles = [
  {
    category: "Philosophy",
    title: "Why Stability Matters More Than Speed in Ghana's Digital Economy",
    excerpt: "In a rapidly evolving market, the most valuable asset isn't the fastest feature roll-out—it's the system that never fails.",
    date: "March 2024"
  },
  {
    category: "Engineering",
    title: "Scaling e-VAT Systems for National Infrastructure",
    excerpt: "A deep dive into how we architected high-availability data flows for the Ghana Revenue Authority (GRA).",
    date: "February 2024"
  },
  {
    category: "Strategy",
    title: "Building Software That Lasts: The Alpha Group Methodology",
    excerpt: "Exploring the intersection of physics, engineering, and behavioural economics in our software design process.",
    date: "January 2024"
  }
];

export default function Insights() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-serif italic text-primary mb-8 ml-[-2px]">
              Insights
            </h1>
            <p className="text-xs font-sans tracking-widest uppercase text-muted-foreground mb-20 max-w-2xl leading-relaxed">
              Field notes, technical deep-dives, and philosophical reflections from the Alpha Engineering team.
            </p>

            <div className="space-y-24">
              {articles.map((article, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-mono border border-primary/20 px-3 py-1">
                      {article.category}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                      {article.date}
                    </span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                    <div className="max-w-2xl">
                      <h3 className="text-3xl md:text-4xl font-serif text-primary group-hover:italic transition-all mb-4">
                        {article.title}
                      </h3>
                      <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                    <ArrowUpRight className="text-primary opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0 w-8 h-8" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
