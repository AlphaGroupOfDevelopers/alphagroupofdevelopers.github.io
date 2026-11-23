import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Globe, Shield, Terminal, Zap, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useSiteData } from "@/contexts/SiteDataContext";

const iconMap: Record<string, any> = {
  Globe,
  Terminal,
  Shield,
  Zap
};

export default function Services() {
  const { siteData } = useSiteData();

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="flex-1 overflow-hidden py-16 md:py-24">
        {/* Services Header */}
        <div className="container mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono uppercase tracking-widest mb-4">
              <Sparkles className="w-3 h-3 text-primary" /> Engineering Capabilities
            </div>
            <h1 className="text-4xl md:text-7xl font-serif font-bold text-primary mb-6">
              Our Capabilities & Disciplines
            </h1>
            <p className="text-base md:text-xl text-muted-foreground font-sans leading-relaxed max-w-2xl">
              We specialize in full-stack web platforms, distributed systems architecture, and mission-critical reliability for scaling organizations.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <section className="container mx-auto px-6 mb-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {siteData.services.map((s, i) => {
              const IconComp = iconMap[s.icon] || Terminal;
              return (
                <div
                  key={s.id || i}
                  className={`p-8 md:p-10 rounded-xl border bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 flex flex-col justify-between ${
                    s.highlight ? "border-primary/40 shadow-md" : "border-border"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComp className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary">{s.title}</h3>
                    <p className="text-muted-foreground font-sans text-sm md:text-base leading-relaxed">
                      {s.desc}
                    </p>

                    {s.deliverables && s.deliverables.length > 0 && (
                      <div className="pt-4 border-t border-border/60 space-y-2">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-primary font-bold">
                          Core Deliverables:
                        </span>
                        <div className="grid grid-cols-1 gap-2 pt-1">
                          {s.deliverables.map((deliv, di) => (
                            <div key={di} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                              <span>{deliv}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-8">
                    <Link href="/contact">
                      <Button variant="outline" size="sm" className="text-xs border-primary/30 text-primary hover:bg-primary hover:text-background gap-1.5">
                        Consult on this service <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-24 bg-secondary/20 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <span className="text-xs uppercase font-mono tracking-[0.3em] text-primary block mb-2">
                Execution Methodology
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">
                How We Deliver Without Delay
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {siteData.workflow.map((item, i) => (
                <div key={item.id || i} className="space-y-4 border-t-2 border-primary pt-6">
                  <span className="text-xs font-mono text-primary font-bold">{item.step}</span>
                  <h4 className="text-xl font-serif font-bold text-primary">{item.title}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-20 p-8 md:p-10 rounded-xl bg-card border border-border">
              <h4 className="text-xl font-serif font-bold text-primary mb-3">Our Engagement Philosophy</h4>
              <p className="text-sm md:text-base text-muted-foreground font-sans leading-relaxed max-w-3xl">
                We do not produce 80-page speculative slide decks. We construct working, interactive prototypes in the earliest sprints, gather stakeholder validation, and engineer stable production pipelines with continuous feedback. You always speak directly to the engineers building your software.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-28 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                Let's engineer your next digital solution.
              </h2>
              <p className="text-base text-primary-foreground/80 leading-relaxed">
                Contact our engineering leads today for a thorough architectural review and scope estimate.
              </p>
              <Link href="/contact">
                <Button size="lg" className="px-10 py-7 text-base bg-background text-primary hover:bg-background/90 rounded-none font-sans">
                  Schedule an Engineering Call <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
