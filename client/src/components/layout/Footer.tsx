import { Link } from "wouter";
import { SocialIcon } from 'react-social-icons';

export default function Footer() {
  const socialLinks = [
    "https://www.instagram.com/alphagroupofdevelopers/",
    "https://www.tiktok.com/@alphagroupofdevelopers",
    "https://wa.me/233559428462",
    "https://facebook.com/alphagroupofdevelopers",
    "https://twitter.com/alphadevgroup",
    "https://linkedin.com/company/alphagroupofdevelopers",
    "https://threads.net/@alphagroupofdevelopers"
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-16 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
            <div className="grid grid-cols-1 gap-2 text-sm font-sans text-primary-foreground/70">
              <Link href="/"><a className="hover:text-white transition-colors">Overview</a></Link>
              <Link href="/team"><a className="hover:text-white transition-colors">The Team</a></Link>
              <Link href="/services"><a className="hover:text-white transition-colors">Our Services</a></Link>
              <Link href="/projects"><a className="hover:text-white transition-colors">Recent Work</a></Link>
              <Link href="/insights"><a className="hover:text-white transition-colors">Insights</a></Link>
            </div>
          </div>

          {/* Governance */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-primary-foreground/50 font-sans">Governance</h4>
            <div className="grid grid-cols-1 gap-2 text-sm font-sans text-primary-foreground/70">
              <Link href="/terms"><a className="hover:text-white transition-colors">Terms of Service</a></Link>
              <Link href="/privacy"><a className="hover:text-white transition-colors">Privacy & Security</a></Link>
              <Link href="/licensing"><a className="hover:text-white transition-colors">Agency Licensing</a></Link>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest text-primary-foreground/50 font-sans">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((url, i) => (
                <SocialIcon 
                  key={i}
                  url={url} 
                  target="_blank" 
                  fgColor="#ffffff" 
                  bgColor="rgba(255,255,255,0.1)"
                  style={{ height: 35, width: 35 }}
                  className="hover:scale-110 transition-transform duration-300"
                />
              ))}
            </div>
            <p className="text-xs text-primary-foreground/40 font-sans pt-8">
              &copy; {new Date().getFullYear()} AlphaGroupOfDevelopers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
