import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowUpRight, BookOpen, Clock, User, X, Sparkles, Search } from "lucide-react";
import { useSiteData } from "@/contexts/SiteDataContext";
import { InsightArticle } from "@/types/site";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Insights() {
  const { siteData } = useSiteData();
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(siteData.insights.map(a => a.category)))];

  const filteredArticles = siteData.insights.filter(article => {
    const matchesCat = selectedCategory === "All" || article.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.content.toLowerCase().includes(q) ||
      article.author.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono uppercase tracking-widest mb-4">
              <Sparkles className="w-3 h-3 text-primary" /> Engineering Papers & Philosophy
            </div>

            <h1 className="text-4xl md:text-7xl font-serif font-bold text-primary mb-6">
              Field Insights & Papers
            </h1>
            <p className="text-sm md:text-base font-sans text-muted-foreground mb-12 max-w-2xl leading-relaxed">
              Technical deep-dives, systems architecture notes, and economic reflections from the Alpha Engineering team.
            </p>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-8 mb-12 border-b border-border">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md border transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-background border-primary font-semibold"
                        : "bg-secondary/40 text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-xs h-9"
                />
              </div>
            </div>

            {/* Articles List */}
            <div className="space-y-16">
              {filteredArticles.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground font-serif">
                  No articles matched your search query.
                </div>
              ) : (
                filteredArticles.map((article, i) => (
                  <div
                    key={article.id || i}
                    onClick={() => setSelectedArticle(article)}
                    className="group cursor-pointer p-6 -mx-6 rounded-xl hover:bg-secondary/20 transition-all duration-300 border border-transparent hover:border-border"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[10px] uppercase tracking-widest text-primary font-mono bg-primary/10 px-2.5 py-1 rounded border border-primary/20">
                        {article.category}
                      </span>
                      <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-mono">
                        {article.date} • {article.readTime}
                      </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="max-w-2xl space-y-3">
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary group-hover:italic transition-all">
                          {article.title}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground font-sans leading-relaxed">
                          {article.excerpt}
                        </p>
                        <p className="text-xs font-mono text-primary/70">
                          By {article.author}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono text-primary group-hover:underline shrink-0 pt-2">
                        <span>Read Paper</span>
                        <ArrowUpRight className="text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform w-5 h-5" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Full Article Reader Dialog */}
      <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
        {selectedArticle && (
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader className="space-y-3 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase bg-primary/10 text-primary px-2.5 py-1 rounded border border-primary/20">
                  {selectedArticle.category}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {selectedArticle.date} • {selectedArticle.readTime}
                </span>
              </div>
              <DialogTitle className="text-2xl md:text-4xl font-serif font-bold text-primary leading-snug">
                {selectedArticle.title}
              </DialogTitle>
              <DialogDescription className="text-xs font-mono text-primary/80">
                Author: {selectedArticle.author}
              </DialogDescription>
            </DialogHeader>

            <div className="py-6 space-y-6 text-foreground font-sans text-base leading-relaxed">
              <div className="p-4 bg-secondary/40 border-l-4 border-primary rounded text-sm italic text-muted-foreground">
                "{selectedArticle.excerpt}"
              </div>

              <div className="space-y-4 whitespace-pre-wrap text-muted-foreground">
                {selectedArticle.content}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <Footer />
    </div>
  );
}
