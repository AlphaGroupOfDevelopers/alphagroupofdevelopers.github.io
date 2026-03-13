import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Privacy() {
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
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-12">Privacy & Data Security</h1>
            
            <section className="mb-12 border-l-2 border-primary pl-8">
              <h2 className="text-2xl font-serif text-primary mb-4 italic">The Alpha Security Mandate</h2>
              <p className="text-muted-foreground leading-relaxed font-sans mb-4">
                At AlphaGroupOfDevelopers, client privacy is not just a policy—it is a core engineering requirement. We handle sensitive data for national institutions and private enterprises with a zero-vulnerability mindset.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif text-primary mb-4 italic">01. Data Sovereignty</h2>
              <p className="text-muted-foreground leading-relaxed font-sans mb-4">
                All data architected within our systems remains under the absolute control of the client. We implement strict encryption standards (AES-256) and ensure data is stored in compliance with Ghana's Data Protection Act, 2012 (Act 843).
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif text-primary mb-4 italic">02. Information Collection</h2>
              <p className="text-muted-foreground leading-relaxed font-sans mb-4">
                We only collect information necessary for the execution of software services. We do not engage in data mining, third-party analytics sharing, or any form of digital tracking for commercial purposes.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-serif text-primary mb-4 italic">03. Professional Confidentiality</h2>
              <p className="text-muted-foreground leading-relaxed font-sans mb-4">
                Every member of the Alpha Group team is bound by an enforceable Non-Disclosure Agreement (NDA). Your business logic, proprietary algorithms, and trade secrets are safe within our infrastructure.
              </p>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
