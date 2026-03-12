import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Globe, Shield, Terminal, Zap } from "lucide-react";

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

      <main className="flex-1 py-24">
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
      </main>

      <Footer />
    </div>
  );
}
