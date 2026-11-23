import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, Award, FileText } from "lucide-react";
import { useSiteData } from "@/contexts/SiteDataContext";

export default function Licensing() {
  const { siteData } = useSiteData();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-16"
          >
            <div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">Agency Licensing</h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-sans max-w-2xl">
                {siteData.general.companyName} is a professional engineering collective recognized for its high standards and ethical technological governance.
              </p>
            </div>

            <div className="grid gap-12 border-t border-border pt-16">
              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-background transition-all duration-500 rounded-lg">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-primary mb-2">Professional Compliance</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our team is composed of certified IT scholars and software engineers. We adhere to the standard operating procedures defined by international engineering benchmarks for software delivery.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-background transition-all duration-500 rounded-lg">
                  <Award size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-primary mb-2">Operational Integrity</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We maintain strategic capabilities allowing us to engineer within highly regulated spaces, including revenue platforms, e-VAT systems, and enterprise financial infrastructure.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="w-16 h-16 bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-background transition-all duration-500 rounded-lg">
                  <FileText size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-primary mb-2">Software Licensing</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Unless otherwise specified, custom client software delivered by {siteData.general.companyName} is transferred under commercial intellectual property ownership as defined in client agreements.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
