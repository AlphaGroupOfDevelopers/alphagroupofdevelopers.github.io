import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useEmblaCarousel from "embla-carousel-react";
import { Rocket, Code2, Users, MessageSquare } from "lucide-react";
import { useEffect } from "react";
import Tilt from 'react-parallax-tilt';

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
      title: "Collaborating for Excellence",
      desc: "Our team works together to ensure every project meets the highest standards of quality and performance.",
      image: "/team meeting.jpeg"
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

        {/* Clientele Section (Infinite Scroll) */}
        <section className="py-20 border-b border-border bg-secondary/10 overflow-hidden relative">
          <div className="container mx-auto px-6 mb-12">
            <p className="text-[10px] font-sans tracking-[0.4em] uppercase text-muted-foreground/50 text-center">
              Our Clientele
            </p>
          </div>
          
          <div className="relative flex overflow-x-hidden">
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background/80 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background/80 to-transparent z-10" />
            
            <motion.div 
              className="flex whitespace-nowrap gap-24 py-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {[
                "Ghana Revenue Authority", 
                "Atsupi's Cosmetics", 
                "Walmas Travel", 
                "iPhone Global",
                "Ghana Revenue Authority", 
                "Atsupi's Cosmetics", 
                "Walmas Travel", 
                "iPhone Global"
              ].map((partner, i) => (
                <span key={i} className="text-2xl md:text-3xl font-serif text-primary/40 font-bold tracking-tighter cursor-default hover:text-primary transition-colors duration-500">
                  {partner}
                </span>
              ))}
            </motion.div>
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
                    through innovative software and applications. We partner with 
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
                    <span className="text-sm uppercase tracking-widest text-muted-foreground">Key Clients</span>
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

        {/* Technology Stack Section */}
        <section className="relative py-32 overflow-hidden">
          {/* Dynamic Gradient Background */}
          <div className="absolute inset-0 bg-secondary/30" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.15),transparent_70%)]" />
          
          <div className="container relative mx-auto px-6 z-10">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-sans tracking-[0.4em] uppercase text-primary/60 mb-16 text-center"
            >
              Our Engineering Stack
            </motion.p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-16 gap-x-8">
              {[
                { name: "Next.js", category: "Framework" },
                { name: "React", category: "Library" },
                { name: "TypeScript", category: "Language" },
                { name: "Node.js", category: "Backend" },
                { name: "Tailwind CSS", category: "Styling" }
              ].map((tech, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="text-center group"
                >
                  <Tilt 
                    tiltMaxAngleX={15} 
                    tiltMaxAngleY={15} 
                    glareEnable={true} 
                    glareMaxOpacity={0.1} 
                    glareColor="#ffffff" 
                    glarePosition="all"
                    className="inline-block"
                  >
                    <div className="px-8 py-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-primary/5 group-hover:border-primary/20 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500">
                      <h4 className="text-xl md:text-2xl font-serif text-primary mb-1 group-hover:italic">
                        {tech.name}
                      </h4>
                      <p className="text-[9px] uppercase tracking-widest text-muted-foreground/80">
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
        <section className="py-24 bg-secondary/20 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
              {[
                { value: "2024", label: "Founded", detail: "Emerging as a leader in Ghana's tech sector." },
                { value: "5+", label: "Key Clients", detail: "Partnering with government and private enterprise." },
                { value: "100%", label: "Stability Focused", detail: "Engineering legacy systems that survive and scale." }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center md:text-left md:border-l md:border-border md:pl-8"
                >
                  <span className="block text-5xl md:text-6xl font-serif text-primary font-bold mb-2">
                    {stat.value}
                  </span>
                  <span className="block text-xs uppercase tracking-[0.2em] text-primary font-bold mb-4">
                    {stat.label}
                  </span>
                  <p className="text-sm text-muted-foreground max-w-[200px] mx-auto md:mx-0">
                    {stat.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy & Values Section Haus */}
        <section className="py-32 bg-background border-t border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-24">
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-8">Engineering for the long term.</h2>
              <p className="text-xl text-muted-foreground font-sans leading-relaxed">
                Technology moves fast, but your tools shouldn't break every year. 
                We prioritize clean code and stable architecture so you can 
                focus on your business, not your software.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  title: "Integrity",
                  desc: "We don't cut corners. Every line of code is written with the future of your business in mind."
                },
                {
                  title: "Stability",
                  desc: "Our systems are built to handle growth and stress without failing when you need them most."
                },
                {
                  title: "Precision",
                  desc: "Mathematical accuracy and logical clarity are at the core of everything we engineer."
                }
              ].map((value, i) => (
                <div key={i} className="group">
                  <div className="w-12 h-[1px] bg-primary mb-6 group-hover:w-full transition-all duration-700"></div>
                  <h3 className="text-2xl font-serif text-primary mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
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
              <h2 className="text-5xl md:text-7xl font-serif mb-12">Ready to build something that lasts?</h2>
              <Link href="/contact">
                <Button size="lg" className="px-12 py-8 text-xl bg-background text-primary hover:bg-background/90 rounded-none h-auto">
                  Start a conversation
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