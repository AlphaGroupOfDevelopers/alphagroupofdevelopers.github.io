import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const team = [
  {
    name: "Kingsley Okyere",
    role: "Lead Architect",
    bio: "Focuses on software architecture and system reliability. Kingsley ensures that every project we build is stable and scales effectively."
  },
  {
    name: "Godfred Fokuo",
    role: "UX Engineer",
    bio: "Passionate about making complex systems easy to use. Godfred bridges the gap between technical logic and human behavior."
  },
  {
    name: "Livingstone Keli",
    role: "Backend Engineer",
    bio: "Directs how data flows through our systems. Livingstone builds the quiet, powerful engines that keep our applications running."
  },
  {
    name: "George Essel",
    role: "Interface Designer",
    bio: "Specializes in accessible and readable interfaces. George believes that great software should feel natural to use."
  }
];

export default function Team() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-8">The Team</h1>
            <p className="text-xl text-muted-foreground mb-20 max-w-2xl font-sans">
              We are a close-knit group of engineers and designers. We don't just build code; 
              we solve problems for people.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
              {team.map((member, i) => (
                <div key={i} className="group border-t border-border pt-8">
                  <h3 className="text-2xl font-serif text-primary mb-1">{member.name}</h3>
                  <p className="text-sm uppercase tracking-widest text-primary font-sans mb-6">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground font-sans leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
