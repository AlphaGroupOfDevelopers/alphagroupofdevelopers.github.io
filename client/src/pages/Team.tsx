import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Tilt from "react-parallax-tilt";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Mail, Linkedin, Github, Sparkles } from "lucide-react";

export default function Team() {
  const { siteData } = useSiteData();

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
              <Sparkles className="w-3 h-3 text-primary" /> Engineering Collective
            </div>

            <h1 className="text-4xl md:text-7xl font-serif font-bold text-primary mb-6">
              The Leadership & Team
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-16 max-w-2xl font-sans leading-relaxed">
              We are a close-knit group of engineers and product designers. We don't just ship code;
              we solve fundamental structural problems for growing businesses.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
              {siteData.team.map((member, i) => (
                <div key={member.id || i} className="group border-t border-border pt-10">
                  <div className="flex flex-col gap-6">
                    {member.image && (
                      <Tilt
                        tiltMaxAngleX={8}
                        tiltMaxAngleY={8}
                        glareEnable={true}
                        glareMaxOpacity={0.12}
                        glareColor="#ffffff"
                        perspective={1200}
                      >
                        <div className="w-full aspect-square bg-secondary/50 rounded-xl overflow-hidden mb-2 shadow-lg border border-border transition-all duration-500 group-hover:shadow-2xl">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      </Tilt>
                    )}

                    <div>
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary">
                          {member.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="hover:text-primary transition-colors p-1"
                              title={`Email ${member.name}`}
                            >
                              <Mail size={16} />
                            </a>
                          )}
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary transition-colors p-1"
                              title="LinkedIn profile"
                            >
                              <Linkedin size={16} />
                            </a>
                          )}
                          {member.github && (
                            <a
                              href={member.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary transition-colors p-1"
                              title="GitHub profile"
                            >
                              <Github size={16} />
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-xs uppercase tracking-[0.2em] font-mono text-primary font-bold mb-6">
                        {member.role}
                      </p>

                      {(member.background || member.expertise) && (
                        <div className="mb-6 space-y-2 text-xs font-sans text-muted-foreground bg-secondary/30 p-4 rounded-lg border border-border/60">
                          {member.background && (
                            <p>
                              <strong className="text-primary font-mono text-[11px] uppercase tracking-wider block">Background:</strong> {member.background}
                            </p>
                          )}
                          {member.expertise && (
                            <p className="pt-1">
                              <strong className="text-primary font-mono text-[11px] uppercase tracking-wider block">Specialty:</strong> {member.expertise}
                            </p>
                          )}
                        </div>
                      )}

                      <p className="text-muted-foreground font-sans leading-relaxed text-sm md:text-base">
                        {member.bio}
                      </p>
                    </div>
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
