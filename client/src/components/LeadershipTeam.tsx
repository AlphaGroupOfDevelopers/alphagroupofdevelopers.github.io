import { motion } from "framer-motion";

export default function LeadershipTeam() {
  return (
    <section id="team" className="px-6 md:px-12 lg:px-24 py-12 md:py-24 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-light mb-4 text-gray-900">
          Leadership &amp; Team
        </h2>
        <p className="text-xs font-mono tracking-widest uppercase text-gray-500 mb-16 max-w-2xl leading-relaxed">
          Our team is comprised of elite IT scholars from Ghana Communication Technology University (GCTU),
          the premier technology institution in Ghana.
        </p>

        {/* Founders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="border border-gray-200 p-8 md:p-12 hover:border-blue-600 transition-colors">
            <h3 className="text-xs font-mono tracking-widest uppercase text-blue-600 mb-2">
              Founder &amp; Lead Architect
            </h3>
            <h4 className="text-3xl italic mb-6 text-gray-900 font-serif">Kingsley Okyere</h4>
            <div className="space-y-4 text-sm font-light text-gray-600">
              <p>
                <strong className="font-medium text-gray-900">Background:</strong>{" "}
                BSc. Information Technology (GCTU); Diploma in IT.
              </p>
              <p>
                <strong className="font-medium text-gray-900">Expertise:</strong>{" "}
                Building Strong, Long-Lasting Software.
              </p>
              <p>
                <strong className="font-medium text-gray-900">Role:</strong>{" "}
                Uses ideas from physics and engineering to make sure our software survives and thrives for a long time.
              </p>
            </div>
          </div>

          <div className="border border-gray-200 p-8 md:p-12 hover:border-blue-600 transition-colors">
            <h3 className="text-xs font-mono tracking-widest uppercase text-blue-600 mb-2">
              Co-Founder &amp; User Experience Lead
            </h3>
            <h4 className="text-3xl italic mb-6 text-gray-900 font-serif">Godfred Fokuo</h4>
            <div className="space-y-4 text-sm font-light text-gray-600">
              <p>
                <strong className="font-medium text-gray-900">Background:</strong>{" "}
                Full Stack Developer &amp; Behavioral Economics Enthusiast.
              </p>
              <p>
                <strong className="font-medium text-gray-900">Expertise:</strong>{" "}
                Making Software Easy to Use and Engaging.
              </p>
              <p>
                <strong className="font-medium text-gray-900">Bio:</strong>{" "}
                Connects human psychology with computer logic, making sure people actually want to use the systems we build.
              </p>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <h3 className="text-2xl font-light mb-8 text-gray-900">Our Diverse Team</h3>
        <p className="text-sm font-light text-gray-500 mb-12 max-w-2xl">
          Our team combines computer science, psychology, and history to build platforms that stand the test of time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Livingstone Keli",
              role: "User Behavior Expert",
              desc: "Studies how people use data over time, designing databases that grow and change with human behavior.",
            },
            {
              name: "George Essel",
              role: "Design Researcher",
              desc: "Uses psychology to design interfaces that feel natural and are easy for the brain to understand.",
            },
            {
              name: "AGD Autonomous AI",
              role: "The AI Assistant",
              desc: "An AI system that remembers everything about our projects, helping us plan and build better software in the future.",
            },
          ].map((member, i) => (
            <div key={i} className="border-t border-gray-200 pt-6">
              <h4 className="font-medium mb-1 text-gray-900">{member.name}</h4>
              <p className="text-xs font-mono text-blue-600 mb-4">{member.role}</p>
              <p className="text-sm font-light text-gray-600">{member.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
