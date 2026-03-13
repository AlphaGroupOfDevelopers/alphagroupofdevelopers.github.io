import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-slate max-w-none"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-12">Terms of Service</h1>
            
            <section className="mb-12">
              <h2 className="text-2xl font-serif text-primary mb-4 italic">01. Professional Engagement</h2>
              <p className="text-muted-foreground leading-relaxed font-sans mb-4">
                AlphaGroupOfDevelopers (the "Agency") operates under a strict code of engineering excellence. By engaging our services, you acknowledge that our focus is on building stable, long-term digital infrastructure rather than rapid-cycle, disposable software.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif text-primary mb-4 italic">02. Engineering Standards</h2>
              <p className="text-muted-foreground leading-relaxed font-sans mb-4">
                We utilize industrial-grade technologies including React, TypeScript, and Node.js. All code produced remains the property of the Agency until final contractual obligations are met, at which point Intellectual Property is transferred as per the individual Service Level Agreement (SLA).
              </p> section.
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif text-primary mb-4 italic">03. Project Governance</h2>
              <p className="text-muted-foreground leading-relaxed font-sans mb-4">
                Every project undergoes rigorous architectural auditing. We do not support or maintain systems produced by non-verified third parties once an Alpha Group system has been deployed, unless a designated Stability Contract is in place.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif text-primary mb-4 italic">04. Liability & Stability</h2>
              <p className="text-muted-foreground leading-relaxed font-sans mb-4">
                While we build for 100% stability, the Agency is not liable for data loss occurring due to user-end hardware failure or unpatched third-party integrations not covered in our initial engineering roadmap.
              </p>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
