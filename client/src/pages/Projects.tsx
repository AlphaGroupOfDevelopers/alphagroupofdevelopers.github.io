import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Search, Filter, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = ["All", "E-commerce", "SaaS & Web App", "Infrastructure", "Enterprise"] as const;

export default function Projects() {
  const { siteData } = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = useMemo(() => {
    return siteData.projects.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.client.toLowerCase().includes(q) ||
        (item.title && item.title.toLowerCase().includes(q)) ||
        item.desc.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [siteData.projects, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono uppercase tracking-widest mb-4">
              <Sparkles className="w-3 h-3 text-primary" /> Engineering Portfolio
            </div>

            <h1 className="text-4xl md:text-7xl font-serif font-bold text-primary mb-6">
              Our Past Work & Systems
            </h1>
            <p className="text-sm md:text-base font-sans text-muted-foreground mb-12 max-w-2xl leading-relaxed">
              Explore the architectures and platforms we've built. These aren't merely case studies;
              they represent high-availability engines powering growing enterprises and government institutions.
            </p>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-8 border-b border-border">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md border transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-background border-primary font-semibold shadow-sm"
                        : "bg-secondary/40 text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Filter projects or tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-xs h-9"
                />
              </div>
            </div>

            {/* Project List */}
            <div className="flex flex-col divide-y divide-border pt-4">
              {filteredProjects.length === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <p className="text-base text-muted-foreground font-serif">No projects matched your criteria.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchQuery("");
                    }}
                    className="text-xs"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                filteredProjects.map((item, index) => {
                  const itemNumber = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

                  const content = (
                    <div className="group py-12 flex flex-col md:flex-row md:items-baseline gap-6 md:gap-12 transition-all duration-300 hover:bg-secondary/20 px-4 -mx-4 rounded-lg">
                      <span className="text-xs font-mono text-muted-foreground w-12 shrink-0">
                        {itemNumber}
                      </span>

                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono uppercase bg-secondary px-2 py-0.5 rounded text-primary">
                            {item.category}
                          </span>
                          {item.year && (
                            <span className="text-[11px] font-mono text-muted-foreground">
                              {item.year}
                            </span>
                          )}
                        </div>

                        <div>
                          <h3 className="text-2xl md:text-4xl font-serif font-bold text-primary group-hover:italic transition-all">
                            {item.client}
                          </h3>
                          {item.title && (
                            <p className="text-xs font-mono uppercase tracking-wider text-primary/70 mt-1">
                              {item.title}
                            </p>
                          )}
                        </div>

                        <p className="text-base md:text-lg font-sans text-muted-foreground max-w-2xl leading-relaxed">
                          {item.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {item.tags.map((tag, ti) => (
                            <span
                              key={ti}
                              className="text-[10px] uppercase font-mono px-2.5 py-1 bg-secondary text-primary border border-border"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="self-end md:self-center shrink-0">
                        {item.link ? (
                          <div className="flex items-center gap-1.5 text-xs font-mono text-primary group-hover:underline">
                            <span>Open Project</span>
                            <ExternalLink size={16} className="text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </div>
                        ) : (
                          <div className="text-xs font-mono text-muted-foreground/50">
                            Enterprise Internal
                          </div>
                        )}
                      </div>
                    </div>
                  );

                  return item.link ? (
                    <a
                      key={item.id || index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block focus:outline-none"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.id || index}>{content}</div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
