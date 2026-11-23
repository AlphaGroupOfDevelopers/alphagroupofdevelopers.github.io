import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Shield, Sparkles } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, switchable } = useTheme();
  const { siteData } = useSiteData();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
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
    <nav className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border/50 transition-all duration-300">
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary origin-left z-50"
        style={{ scaleX }}
      />
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2.5 cursor-pointer group">
              <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-primary transition-all duration-300 group-hover:italic">
                {siteData.general.companyName}
              </span>
              <span className="hidden lg:inline-flex items-center gap-1.5 text-[9px] uppercase font-mono tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Available
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:text-primary relative py-1 ${
                  isActive(link.path)
                    ? "text-primary font-bold"
                    : "text-muted-foreground/80 hover:text-primary"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Action Icons & Controls */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle */}
            {switchable && toggleTheme && (
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                aria-label="Toggle Dark / Light Theme"
                title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            {/* Admin Portal Link */}
            <Link href="/admin">
              <button
                className={`w-9 h-9 rounded-md border flex items-center justify-center transition-colors ${
                  location === "/admin"
                    ? "bg-primary text-background border-primary"
                    : "border-border text-muted-foreground hover:text-primary hover:border-primary/40"
                }`}
                aria-label="Admin Portal"
                title="Admin Management Console"
              >
                <Shield size={16} />
              </button>
            </Link>

            {/* Quick Consultation CTA */}
            <Link href="/contact">
              <Button
                size="sm"
                className="text-xs font-sans tracking-wide bg-primary hover:bg-primary/90 text-background px-4 py-2"
              >
                Let's talk
              </Button>
            </Link>
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            {switchable && toggleTheme && (
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            <button
              className="relative z-[60] w-10 h-10 flex items-center justify-center text-primary"
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
                    <X size={26} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                  >
                    <Menu size={26} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden bg-background border-t border-border/20"
            >
              <div className="flex flex-col py-8 px-2 space-y-5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-xl font-serif font-medium transition-all duration-300 block py-1 ${
                        isActive(link.path) ? "text-primary italic font-bold" : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <div className="pt-6 border-t border-border/40 flex flex-col gap-3">
                  <Link href="/admin" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full justify-start gap-2 text-xs">
                      <Shield size={14} /> Admin Content Management
                    </Button>
                  </Link>
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-primary text-background text-xs">
                      Start Consultation
                    </Button>
                  </Link>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 font-mono pt-2">
                    {siteData.general.companyName} &copy; {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
