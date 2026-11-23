import { Link } from "wouter";
import { SocialIcon } from "react-social-icons";
import { useSiteData } from "@/contexts/SiteDataContext";
import { Shield, Clock, MapPin, Mail, Phone } from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const { siteData } = useSiteData();
  const [ghanaTime, setGhanaTime] = useState("");

  // Live Accra, Ghana local time (GMT)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Accra",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      }).format(now);
      setGhanaTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-primary text-primary-foreground py-16 mt-auto border-t border-border/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-serif font-bold text-primary-foreground hover:opacity-90 transition-opacity">
                {siteData.general.companyName}
              </h3>
            </Link>
            <p className="text-xs text-primary-foreground/75 leading-relaxed max-w-xs font-sans">
              {siteData.general.shortBio}
            </p>
            {/* Live Clock / Location Pill */}
            <div className="pt-2 flex flex-col gap-1.5 text-[11px] text-primary-foreground/70 font-mono">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary-foreground/60" />
                <span>{siteData.general.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary-foreground/60" />
                <span>Accra Time (GMT): <strong className="text-primary-foreground">{ghanaTime || "Loading..."}</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-primary-foreground/50 font-mono">Explore</h4>
            <div className="grid grid-cols-1 gap-2.5 text-xs font-sans text-primary-foreground/80">
              <Link href="/" className="hover:text-white transition-colors">Overview</Link>
              <Link href="/team" className="hover:text-white transition-colors">The Team ({siteData.team.length})</Link>
              <Link href="/services" className="hover:text-white transition-colors">Engineering Services</Link>
              <Link href="/projects" className="hover:text-white transition-colors">Recent Work & Portfolio</Link>
              <Link href="/insights" className="hover:text-white transition-colors">Field Insights & Papers</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Schedule Consultation</Link>
            </div>
          </div>

          {/* Governance & Admin */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-primary-foreground/50 font-mono">Governance</h4>
            <div className="grid grid-cols-1 gap-2.5 text-xs font-sans text-primary-foreground/80">
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy & Security</Link>
              <Link href="/licensing" className="hover:text-white transition-colors">Agency Licensing</Link>
              <Link href="/admin" className="hover:text-white transition-colors inline-flex items-center gap-1.5 pt-2 text-primary-foreground font-medium">
                <Shield className="w-3.5 h-3.5" /> Admin Console
              </Link>
            </div>
          </div>

          {/* Connect & Socials */}
          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-widest text-primary-foreground/50 font-mono">Connect</h4>
            <div className="flex flex-wrap gap-2.5">
              {siteData.socialLinks.map((social) => (
                <SocialIcon
                  key={social.id}
                  url={social.url}
                  target="_blank"
                  fgColor="#ffffff"
                  bgColor="rgba(255,255,255,0.12)"
                  style={{ height: 34, width: 34 }}
                  className="hover:scale-110 transition-transform duration-300"
                />
              ))}
            </div>
            <div className="text-[11px] text-primary-foreground/60 space-y-1 font-mono pt-2">
              <p>Email: {siteData.general.email}</p>
              <p>Direct: {siteData.general.phone}</p>
            </div>
            <p className="text-[11px] text-primary-foreground/40 font-mono pt-4 border-t border-primary-foreground/10">
              &copy; {new Date().getFullYear()} {siteData.general.companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
