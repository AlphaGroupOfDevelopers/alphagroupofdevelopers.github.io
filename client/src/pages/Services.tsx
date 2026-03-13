import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Globe, Shield, Terminal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const services = [
  {
    icon: Globe,
    title: "Web & Digital",
    desc: "We build fast, responsive websites and applications that help you reach your customers."
  },
  {
    icon: Terminal,
    title: "Software Engineering",
    desc: "Custom software built with stable, modern code to solve unique business challenges."
  },
  {
    icon: Shield,
    title: "System Stability",
    desc: "We help fix and optimize existing systems to make them more reliable and secure."
  },
  {
    icon: Zap,
    title: "Consulting",
    desc: "Direct, honest advice on how to use technology to grow your business without overspending."
  }
];

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 overflow-hidden">
        {/* Services Content Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-12">Our Services</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {services.map((s, i) => (
                  <div key={i} className="space-y-4">
                    <s.icon className="w-8 h-8 text-primary" />
                    <h3 className="text-2xl font-serif text-primary">{s.title}</h3>
                    <p className="text-muted-foreground font-sans text-lg leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-32">
                <p className="text-[10px] font-sans tracking-[0.3em] uppercase text-muted-foreground/60 mb-16">
                  Our Workflow
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                  {[
                    { step: "01", title: "Consultation", desc: "Direct dialogue to define core business problems." },
                    { step: "02", title: "Architecture", desc: "Mapping out stable, scalable digital infrastructure." },
                    { step: "03", title: "Engineering", desc: "Building with clean, modern, and efficient code." },
                    { step: "04", title: "Governance", desc: "Ensuring long-term stability and high performance." }
                  ].map((item, i) => (
                    <div key={i} className="space-y-4 border-t border-border pt-8">
                      <span className="text-xs font-mono text-primary opacity-50">{item.step}</span>
                      <h4 className="text-xl font-serif text-primary">{item.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-24 p-10 bg-secondary border-l-4 border-primary">
                <h4 className="text-xl font-serif text-primary mb-4">How we work</h4>
                <p className="text-muted-foreground font-sans leading-relaxed">
                  We don't believe in long-winded technical presentations. We believe in building prototypes 
                  early, getting feedback, and refining until the solution is perfect. You'll always talk 
                  directly to the engineers building your software.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-32 bg-primary text-background">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-5xl md:text-7xl font-serif mb-12">Let's solve your toughest challenges.</h2>
              <Link href="/contact">
                <Button size="lg" className="px-12 py-8 text-xl bg-background text-primary hover:bg-background/90 rounded-none h-auto">
                  Get in touch
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
