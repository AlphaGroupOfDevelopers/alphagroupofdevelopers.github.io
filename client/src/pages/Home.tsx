import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useEmblaCarousel from "embla-carousel-react";
import {
  Rocket,
  Code2,
  Users,
  MessageSquare,
  Globe,
  Terminal,
  Shield,
  Zap,
  ArrowRight,
  ExternalLink,
  Star,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { useSiteData } from "@/contexts/SiteDataContext";

const iconMap: Record<string, any> = {
  Rocket,
  Code2,
  Users,
  MessageSquare,
  Globe,
  Terminal,
  Shield,
  Zap,
  Sparkles
};

export default function Home() {
  const { siteData } = useSiteData();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (emblaApi) {
      const intervalId = setInterval(() => {
        emblaApi.scrollNext();
      }, 5500);
      return () => clearInterval(intervalId);
    }
  }, [emblaApi]);

  const featuredProjects = siteData.projects.filter(p => p.featured).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="flex-1">
        {/* Availability / Location Pill */}
        <div className="bg-secondary/40 border-b border-border/40 py-2.5 px-6">
          <div className="container mx-auto flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-muted-foreground font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="truncate">{siteData.general.badgeText}</span>
            </div>
            <Link href="/contact" className="hidden sm:inline-flex items-center gap-1 text-primary hover:underline font-mono text-[11px]">
              Direct Inquiry <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Hero Slider Section */}
        <section className="relative overflow-hidden bg-background">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex">
              {siteData.heroSlides.map((slide, index) => (
                <div key={slide.id || index} className="embla__slide flex-[0_0_100%] min-w-0 relative">
                  <div className="container mx-auto px-6 py-20 md:py-36">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                      <div className="max-w-xl z-20">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono uppercase tracking-widest mb-6"
                        >
                          <Sparkles className="w-3 h-3 text-primary" /> Alpha Software Architecture
                        </motion.div>

                        <motion.h1
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-primary leading-[1.1] mb-6 tracking-tight"
                        >
                          {slide.title}
                        </motion.h1>

                        <motion.p
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                          className="text-base md:text-xl text-muted-foreground font-sans leading-relaxed mb-8 max-w-lg"
                        >
                          {slide.desc}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
                        >
                          <Link href={slide.primaryCtaLink || "/projects"}>
                            <Button size="lg" className="px-8 py-6 text-base bg-primary hover:bg-primary/90 text-background rounded-none">
                              {slide.primaryCtaText || "See our work"} <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                          <Link href={slide.secondaryCtaLink || "/contact"}>
                            <Button variant="outline" size="lg" className="px-8 py-6 text-base border-primary text-primary hover:bg-primary/5 rounded-none">
                              {slide.secondaryCtaText || "Contact us"}
                            </Button>
                          </Link>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative hidden md:block"
                      >
                        <Tilt
                          tiltMaxAngleX={6}
                          tiltMaxAngleY={6}
                          glareEnable={true}
                          glareMaxOpacity={0.12}
                          glareColor="#ffffff"
                        >
                          <div className="bg-secondary/40 p-4 rounded-xl border border-border shadow-2xl overflow-hidden aspect-[4/3]">
                            <img
                              src={slide.image || "/alpha_banner.png"}
                              alt="AlphaGroupOfDevelopers showcase"
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        </Tilt>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clientele Marquee Section */}
        <section className="py-14 border-y border-border bg-secondary/15 overflow-hidden relative">
          <div className="container mx-auto px-6 mb-8 text-center">
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-muted-foreground">
              Trusted by Strategic Partners & Forward-Thinking Brands
            </p>
          </div>

          <div className="relative flex overflow-x-hidden">
            <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex whitespace-nowrap gap-16 md:gap-24 py-3"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...siteData.clientele, ...siteData.clientele, ...siteData.clientele].map((partner, i) => (
                <span
                  key={i}
                  className="text-xl md:text-2xl font-serif text-primary/50 font-bold tracking-tight hover:text-primary transition-colors duration-300 cursor-default"
                >
                  {partner}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-secondary/25 border-b border-border">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <div>
                <span className="text-xs uppercase font-mono tracking-[0.25em] text-primary block mb-3">
                  About Our Collective
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-8 leading-tight">
                  High-level software principles built for long-term survival.
                </h2>
                <div className="space-y-6 text-base md:text-lg text-muted-foreground font-sans leading-relaxed">
                  {siteData.general.aboutStory.map((paragraph, pi) => (
                    <p key={pi}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-12 grid grid-cols-2 gap-6 pt-6 border-t border-border">
                  <div className="border-l-2 border-primary pl-6 py-2">
                    <span className="block text-3xl font-serif text-primary font-bold">{siteData.general.foundedYear}</span>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Founded</span>
                  </div>
                  <div className="border-l-2 border-primary pl-6 py-2">
                    <span className="block text-3xl font-serif text-primary font-bold">{siteData.general.keyClientsCount}</span>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Enterprise Clients</span>
                  </div>
                </div>
              </div>

              {/* Core Values */}
              <div className="space-y-8 bg-card/60 p-8 rounded-xl border border-border/80 shadow-sm backdrop-blur-sm">
                <h3 className="text-2xl font-serif text-primary">Our Architectural Values</h3>
                <div className="grid gap-8">
                  {siteData.coreValues.map((val) => {
                    const IconComponent = iconMap[val.icon] || Code2;
                    return (
                      <div key={val.id} className="flex items-start gap-5 group">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-background transition-colors duration-300">
                          <IconComponent className="w-5 h-5 text-primary group-hover:text-background transition-colors" />
                        </div>
                        <div>
                          <h4 className="font-bold text-primary font-serif text-lg mb-1">{val.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Showcase */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-xs uppercase font-mono tracking-[0.25em] text-primary block mb-2">
                  Selected Work
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">
                  Engineering in Production
                </h2>
              </div>
              <Link href="/projects">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 rounded-none gap-2">
                  View all projects ({siteData.projects.length}) <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProjects.map((project, idx) => (
                <motion.div
                  key={project.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-card/60 border border-border hover:border-primary/50 transition-all duration-300 p-8 rounded-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono uppercase bg-secondary px-2.5 py-1 rounded text-primary">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {project.year || "2024"}
                      </span>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-primary group-hover:italic transition-all mb-3">
                      {project.client}
                    </h3>
                    {project.title && (
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary/70 mb-3">
                        {project.title}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-sans">
                      {project.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, ti) => (
                        <span key={ti} className="text-[10px] uppercase font-mono px-2 py-0.5 bg-secondary/80 text-primary border border-border/80 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-primary flex items-center gap-1 hover:underline ml-2 shrink-0"
                      >
                        Live Demo <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className="relative py-28 overflow-hidden bg-secondary/20 border-y border-border">
          <div className="container relative mx-auto px-6 z-10">
            <div className="text-center max-w-xl mx-auto mb-16">
              <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-primary mb-3">
                Modern Engineering Stack
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                Built on battle-tested frameworks
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {siteData.techStack.map((tech, i) => (
                <motion.div
                  key={tech.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="text-center group"
                >
                  <Tilt
                    tiltMaxAngleX={12}
                    tiltMaxAngleY={12}
                    glareEnable={true}
                    glareMaxOpacity={0.1}
                    glareColor="#ffffff"
                    className="w-full"
                  >
                    <div className="px-6 py-6 rounded-xl bg-card border border-border group-hover:border-primary/40 group-hover:shadow-lg transition-all duration-300">
                      <h4 className="text-lg md:text-xl font-serif text-primary mb-1 group-hover:italic transition-all">
                        {tech.name}
                      </h4>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground">
                        {tech.category}
                      </p>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Metrics Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {siteData.stats.map((stat, i) => (
                <motion.div
                  key={stat.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-lg bg-card border border-border md:border-l-4 md:border-l-primary"
                >
                  <span className="block text-4xl lg:text-5xl font-serif text-primary font-bold mb-2">
                    {stat.value}
                  </span>
                  <span className="block text-xs uppercase tracking-[0.2em] font-mono text-primary font-bold mb-3">
                    {stat.label}
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {stat.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Testimonials Section */}
        {siteData.testimonials && siteData.testimonials.length > 0 && (
          <section className="py-24 bg-secondary/20 border-t border-border">
            <div className="container mx-auto px-6">
              <div className="max-w-2xl mb-16">
                <span className="text-xs uppercase font-mono tracking-[0.25em] text-primary block mb-2">
                  Client Perspectives
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                  What our partners say about building with us
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {siteData.testimonials.map((test, ti) => (
                  <div
                    key={test.id || ti}
                    className="p-8 rounded-lg bg-card border border-border flex flex-col justify-between"
                  >
                    <div className="space-y-4 mb-6">
                      <div className="flex gap-1 text-amber-500">
                        {[...Array(test.rating || 5)].map((_, si) => (
                          <Star key={si} className="w-4 h-4 fill-amber-500" />
                        ))}
                      </div>
                      <p className="text-sm font-sans text-muted-foreground leading-relaxed italic">
                        "{test.quote}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border/60">
                      <h4 className="font-serif font-bold text-primary text-sm">{test.client}</h4>
                      <p className="text-xs text-muted-foreground font-mono">{test.role} • {test.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA Section */}
        <section className="py-28 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary-foreground/60 block mb-4">
                Initiate Consultation
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                Ready to build software that lasts for decades?
              </h2>
              <p className="text-base md:text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto leading-relaxed">
                Connect directly with our founding engineers. We evaluate your requirements and deliver transparent technical architectural roadmaps.
              </p>
              <Link href="/contact">
                <Button size="lg" className="px-10 py-7 text-lg bg-background text-primary hover:bg-background/90 rounded-none h-auto font-sans">
                  Start a conversation <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
