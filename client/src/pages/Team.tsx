import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const team: { name: string; role: string; image?: string; background?: string; expertise?: string; bio: string }[] = [
  {
    name: "Kingsley Okyere",
    role: "Founder & Lead Architect",
    image: "/Founder.jpeg",
    background: "BSc. Information Technology; Diploma in IT.",
    expertise: "Building Strong, Long-Lasting Software.",
    bio: "Uses ideas from physics and engineering to make sure our software survives and thrives for a long time. Kingsley ensures that every project we build is stable and scales effectively."
  },
  {
    name: "Godfred Fokuo",
    role: "Co-Founder & User Experience Lead",
    // image will be added when available
    background: "Full Stack Developer & Behavioral Economics Enthusiast.",
    expertise: "Making Software Easy to Use and Engaging.",
    bio: "Connects human psychology with computer logic, making sure people actually want to use the systems we build. Godfred bridges the gap between technical logic and human behavior."
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

      <main className="flex-1 py-12 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-5xl"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-8 ml-[-2px]">
              The Team
            </h1>
            <p className="text-xl text-muted-foreground mr-20 mb-20 max-w-2xl font-sans leading-relaxed">
              We are a close-knit group of engineers and designers. We don't just build code; 
              we solve problems for people.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24">
              {team.map((member, i) => (
                <div key={i} className="group border-t border-border pt-10">
                  <div className="flex flex-col gap-6">
                    {member.image && (
                      <div className="w-full aspect-square bg-secondary overflow-hidden mb-4 shadow-sm border border-border">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-3xl font-serif text-primary mb-2">{member.name}</h3>
                      <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-8">
                        {member.role}
                      </p>
                      
                      {member.background && (
                        <div className="mb-6 space-y-4 text-sm font-sans text-muted-foreground">
                          <p><strong className="text-primary font-medium">Background:</strong> {member.background}</p>
                          <p><strong className="text-primary font-medium">Expertise:</strong> {member.expertise}</p>
                        </div>
                      )}
                      
                      <p className="text-muted-foreground font-sans leading-relaxed text-lg">
                        {member.bio}
                      </p>
                    </div>
                  </div>
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
