import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { SocialIcon } from 'react-social-icons';
import confetti from 'canvas-confetti';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Contact() {
  const socialLinks = [
    "https://www.instagram.com/alphagroupofdevelopers/",
    "https://www.tiktok.com/@alphagroupofdevelopers",
    "https://wa.me/233559428462",
    "https://facebook.com/alphagroupofdevelopers",
    "https://twitter.com/alphadevgroup",
    "https://linkedin.com/company/alphagroupofdevelopers",
    "https://threads.net/@alphagroupofdevelopers"
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trigger Confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#000000', '#333333', '#666666']
    });

    const subject = `Inquiry: ${formData.projectType || "General"} from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AProject Type: ${formData.projectType}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    
    // Small delay to let them see the confetti
    setTimeout(() => {
      window.location.href = `mailto:alphagroupofdevelopers@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-8">Let's talk.</h1>
              <p className="text-xl text-muted-foreground mb-12 font-sans leading-relaxed">
                Whether you have a specific project in mind or just want to learn 
                more about how we work, we're here to help.
              </p>
              
              <div className="space-y-6 text-lg font-sans">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12 border border-border p-2 bg-white shadow-sm"
                >
                  <img 
                    src="/alpha_business_card_updated.png" 
                    alt="AlphaGroupOfDevelopers Business Card" 
                    className="w-full h-auto"
                  />
                </motion.div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Email</h4>
                  <a href="mailto:alphagroupofdevelopers@gmail.com" className="text-primary hover:italic transition-all">
                    alphagroupofdevelopers@gmail.com
                  </a>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Location</h4>
                  <p className="text-muted-foreground">Accra, Ghana</p>
                </div>

                <div className="pt-8">
                  <h4 className="text-xs uppercase tracking-widest text-primary font-bold mb-6">Connect</h4>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((url, i) => (
                      <SocialIcon 
                        key={i}
                        url={url} 
                        target="_blank" 
                        fgColor="#ffffff" 
                        bgColor="hsl(var(--primary))"
                        style={{ height: 40, width: 40 }}
                        className="hover:scale-110 transition-transform duration-300"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8 font-sans">
                <div className="space-y-2 text-primary font-serif">
                  <Label htmlFor="name" className="text-lg">Your Name</Label>
                  <Input 
                    id="name" 
                    className="bg-transparent border-0 border-b border-primary/20 rounded-none focus:border-primary px-0 text-lg transition-all shadow-none focus-visible:ring-0" 
                    required 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2 text-primary font-serif">
                  <Label htmlFor="email" className="text-lg">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    className="bg-transparent border-0 border-b border-primary/20 rounded-none focus:border-primary px-0 text-lg transition-all shadow-none focus-visible:ring-0" 
                    required 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2 text-primary font-serif">
                  <Label className="text-lg">What do you need?</Label>
                  <Select onValueChange={(value) => setFormData({...formData, projectType: value})}>
                    <SelectTrigger className="w-full bg-transparent border-0 border-b border-primary/20 rounded-none px-0 text-lg shadow-none focus:ring-0">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web Application">Web Application</SelectItem>
                      <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                      <SelectItem value="System Stability">System Stability</SelectItem>
                      <SelectItem value="Enterprise Infrastructure">Enterprise Infrastructure</SelectItem>
                      <SelectItem value="Business Consultation">Business Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 text-primary font-serif">
                  <Label htmlFor="message" className="text-lg">Project Details</Label>
                  <Textarea 
                    id="message" 
                    className="bg-transparent border-0 border-b border-primary/20 rounded-none focus:border-primary px-0 text-lg min-h-[100px] resize-none transition-all shadow-none focus-visible:ring-0" 
                    required 
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full bg-primary text-background py-6 text-lg hover:bg-primary/90 mt-8 rounded-none transition-all">
                  Send Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
