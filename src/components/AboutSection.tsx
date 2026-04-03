import { motion } from "framer-motion";
import { GraduationCap, Brain, Target } from "lucide-react";

const AboutSection = () => (
  <section id="about" className="py-24 relative overflow-hidden">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="text-primary font-mono text-sm mb-2">ABOUT ME</p>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Data-Driven <span className="gradient-text">Problem Solver</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5"
        >
          <p className="text-secondary-foreground/80 leading-relaxed">
            I'm a Computer Science undergraduate focused on analytical thinking, problem-solving, and data-driven decision making. I love turning raw data into meaningful stories and building intelligent solutions that make a real impact.
          </p>
          <p className="text-secondary-foreground/80 leading-relaxed">
            Currently pursuing my B.Tech in CSE from Government College of Engineering & Textile Technology, Berhampore, with an expected graduation in June 2026.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid gap-4"
        >
          {[
            { icon: GraduationCap, title: "Education", desc: "B.Tech CSE — GCETTB, Berhampore (2022–2026)" },
            { icon: Brain, title: "Mindset", desc: "Analytical, innovation-focused, continuous learner" },
            { icon: Target, title: "Goal", desc: "Emerging AI professional & data-driven problem solver" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4 items-start p-4 rounded-lg bg-card border border-border card-hover">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
