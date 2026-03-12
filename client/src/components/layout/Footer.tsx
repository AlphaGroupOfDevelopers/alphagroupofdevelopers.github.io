import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold">AlphaGroupOfDevelopers</h3>
            <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-xs font-sans">
              A software development team building reliable systems. We focus on 
              clarity, stability, and human usability.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-primary-foreground/50 font-sans">Explore</h4>
            <div className="grid grid-cols-1 gap-2 text-sm font-sans">
              <Link href="/"><a className="hover:text-white transition-colors">Overview</a></Link>
              <Link href="/team"><a className="hover:text-white transition-colors">The Team</a></Link>
              <Link href="/services"><a className="hover:text-white transition-colors">Our Approach</a></Link>
              <Link href="/projects"><a className="hover:text-white transition-colors">Recent Work</a></Link>
            </div>
          </div>

          {/* Contact Bits */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-primary-foreground/50 font-sans">Connect</h4>
            <p className="text-sm font-sans">
              alphagroupofdevelopers@gmail.com
            </p>
            <p className="text-xs text-primary-foreground/40 font-sans pt-4">
              &copy; {new Date().getFullYear()} AlphaGroupOfDevelopers. Built for longevity.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
