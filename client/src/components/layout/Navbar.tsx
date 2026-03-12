import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Overview", path: "/" },
    { name: "The Team", path: "/team" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer group">
              <span className="text-xl md:text-2xl font-serif font-bold tracking-tight text-primary">
                AlphaGroupOfDevelopers
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <a
                  className={`text-sm tracking-wide transition-colors hover:text-primary ${
                    isActive(link.path)
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </a>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-4 flex flex-col items-center">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <a
                  onClick={() => setIsOpen(false)}
                  className={`text-lg transition-colors ${
                    isActive(link.path) ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
