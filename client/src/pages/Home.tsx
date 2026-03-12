import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useEmblaCarousel from "embla-carousel-react";
import { Rocket, Code2, Users, MessageSquare } from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (emblaApi) {
      const intervalId = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [emblaApi]);

  const slides = [
    {
      title: "Building Digital Solutions for Ghana's Future",
      desc: "We transform complex business challenges into elegant software solutions that drive growth and innovation.",
      image: "/alpha_banner.png"
    },
    {
      title: "Engineering with Integrity and Precision",
      desc: "Our systems are built to last, combining stable architecture with intuitive human-centric design.",
      image: "/enhanced_team.png"
    },
    {
      title: "Your Partner in Digital Transformation",
      desc: "From enterprise infrastructure to local business growth, we build the foundations you need to succeed.",
      image: "/enhanced_team.png"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Slider Section */}
        <section className="relative overflow-hidden bg-background">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex">
              {slides.map((slide, index) => (
                <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 relative">
                  <div className="container mx-auto px-6 py-24 md:py-40">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                      <div className="max-w-xl z-20">
                        <motion.h1 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="text-5xl md:text-7xl font-serif font-bold text-primary leading-tight mb-8"
                        >
                          {slide.title}
                        </motion.h1>
                        <motion.p 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                          className="text-lg md:text-xl text-muted-foreground font-sans leading-relaxed mb-10"
                        >
                          {slide.desc}
                        </motion.p>
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                          className="flex flex-col sm:flex-row gap-6"
                        >
                          <Link href="/projects">
                            <Button size="lg" className="px-10 py-7 text-lg bg-primary hover:bg-primary/90 text-background">
                              See our work
                            </Button>
                          </Link>
                          <Link href="/contact">
                            <Button variant="outline" size="lg" className="px-10 py-7 text-lg border-primary text-primary hover:bg-primary/5">
                              Contact us
                            </Button>
                          </Link>
                        </motion.div>
                      </div>
                      
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative hidden md:block"
                      >
                        <div className="bg-secondary p-8 aspect-[4/3] overflow-hidden">
                          <img
                            src={slide.image}
                            alt="AlphaGroupOfDevelopers workspace"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-24 bg-secondary/30 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-10">About Us</h2>
                <div className="space-y-6 text-lg text-muted-foreground font-sans leading-relaxed">
                  <p>
                    <strong>AlphaGroupOfDevelopers</strong> was founded with a shared vision to drive digital transformation 
                    across Ghana. We combine high-level engineering principles with a commitment 
                    to building software that actually serves the people who use it.
                  </p>
                  <p>
                    Our mission is to help businesses and organizations solve complex problems 
                    through innovative software and applications. We partner with leading 
                    institutions and private ventures to build scalable, reliable solutions 
                    that create lasting impact.
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-8">
                  <div className="border-l-2 border-primary pl-6 py-2">
                    <span className="block text-3xl font-serif text-primary font-bold">2024</span>
                    <span className="text-sm uppercase tracking-widest text-muted-foreground">Founded</span>
                  </div>
                  <div className="border-l-2 border-primary pl-6 py-2">
                    <span className="block text-3xl font-serif text-primary font-bold">5+</span>
                    <span className="text-sm uppercase tracking-widest text-muted-foreground">Strategic Partners</span>
                  </div>
                </div>
              </div>

              <div className="space-y-12">
                <h3 className="text-2xl font-serif text-primary">Our Core Values</h3>
                <div className="grid gap-10">
                  <div className="flex items-start gap-6">
                    <Rocket className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-primary mb-2">Innovation</h4>
                      <p className="text-muted-foreground text-sm uppercase tracking-wide text-[10px] tracking-[0.2em]">Staying ahead of global technology trends while remaining grounded in local needs.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <Code2 className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-primary mb-2">Excellence</h4>
                      <p className="text-muted-foreground text-sm uppercase tracking-wide text-[10px] tracking-[0.2em]">Delivering high-quality solutions that are built for longevity and stability.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <Users className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-primary mb-2">Community</h4>
                      <p className="text-muted-foreground text-sm uppercase tracking-wide text-[10px] tracking-[0.2em]">Contributing directly to the technological and economic development of Ghana.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <MessageSquare className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-primary mb-2">Collaboration</h4>
                      <p className="text-muted-foreground text-sm uppercase tracking-wide text-[10px] tracking-[0.2em]">Working as true partners with our clients to ensure mutual success.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif mb-8 text-primary">Our focus is stability.</h2>
                <p className="text-lg text-muted-foreground font-sans leading-relaxed">
                  Technology moves fast, but your tools shouldn't break every year. 
                  We prioritize clean code and stable architecture so you can 
                  focus on your business, not your software.
                </p>
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