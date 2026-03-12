import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-40 md:pb-32 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-serif font-bold text-primary leading-tight mb-8"
              >
                Simple software. <br />
                Built for people.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl text-muted-foreground font-sans leading-relaxed mb-12 max-w-2xl"
              >
                We are a small team of software engineers. We design and build 
                reliable tools that make business easier, not more complicated.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <Link href="/projects">
                  <Button size="lg" className="px-10 py-7 text-lg bg-primary hover:bg-primary/90 text-background cursor-pointer">
                    See our work
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="px-10 py-7 text-lg border-primary text-primary hover:bg-primary/5 cursor-pointer">
                    Contact us
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Short About / Philosophy */}
        <section className="py-24 border-t border-border">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif mb-8 text-primary">Our focus is stability.</h2>
                <div className="space-y-6 text-lg text-muted-foreground font-sans leading-relaxed">
                  <p>
                    Technology moves fast, but your tools shouldn't break every year. 
                    We prioritize clean code and stable architecture so you can 
                    focus on your business, not your software.
                  </p>
                  <p>
                    We started AlphaGroup to provide honest engineering. No jargon, 
                    no over-complicated features—just software that works when you need it.
                  </p>
                </div>
              </div>
              <div className="bg-secondary p-12 aspect-square flex items-center justify-center">
                <blockquote className="text-2xl font-serif italic text-primary text-center">
                  "Good design is as little design as possible."
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}