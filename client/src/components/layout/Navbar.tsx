import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Overview", path: "/" },
    { name: "The Team", path: "/team" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Insights", path: "/insights" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 transition-all duration-300">
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary/20 origin-left z-50"
        style={{ scaleX }}
      />
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer group">
              <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-primary transition-all duration-300 group-hover:italic">
                AlphaGroupOfDevelopers
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:text-primary ${
                  isActive(link.path)
                    ? "text-primary font-bold"
                    : "text-muted-foreground/70"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-[60] w-10 h-10 flex items-center justify-center text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                >
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                >
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-background flex flex-col"
            >
              {/* Header inside overlay to keep toggle button accessible */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/40">
                <span className="text-xl font-serif font-bold tracking-tight text-primary italic">
                  Alpha
                </span>
                <button
                  className="w-10 h-10 flex items-center justify-center text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={28} />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-center px-8 space-y-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link 
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-4"
                    >
                      <span className="text-xs font-mono text-primary/30 group-hover:text-primary transition-colors">
                        0{i + 1}
                      </span>
                      <span className={`text-4xl md:text-5xl font-serif font-bold transition-all duration-500 group-hover:italic group-hover:pl-4 ${
                        isActive(link.path) ? "text-primary italic" : "text-primary/40"
                      }`}>
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="p-8 border-t border-border/40 flex justify-between items-center"
              >
                <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/50 font-sans">
                  AlphaGroupOfDevelopers &copy; {new Date().getFullYear()}
                </p>
                <div className="w-12 h-[1px] bg-primary/20"></div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
