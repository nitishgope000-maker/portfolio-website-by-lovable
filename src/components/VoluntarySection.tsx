import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap } from "lucide-react";

const FloatingShapes = lazy(() => import("@/components/FloatingShapes"));

const experiences = [
  {
    icon: Users,
    role: "Assistant General Secretary",
    org: "GCETTB Students' Association",
    period: "Sep 2024 – Dec 2025",
    description:
      "Served as a key member of the college student governing body, coordinating student welfare initiatives, organizing campus events, and acting as a liaison between the student community and administration. Facilitated smooth communication across departments and contributed to policy discussions impacting student life.",
  },
  {
    icon: GraduationCap,
    role: "Training & Placement Representative",
    org: "GCETTB Training & Placement Cell",
    period: "2023 – Present",
    description:
      "Bridging the gap between students and recruiters by coordinating placement drives, sharing career opportunities, and guiding peers through interview preparation. Actively collaborate with the placement cell to streamline recruitment processes and ensure maximum student participation.",
  },
];

const VoluntarySection = () => (
  <section id="voluntary" className="py-24 relative overflow-hidden">
    <Suspense fallback={null}>
      <FloatingShapes />
    </Suspense>
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-primary font-mono text-sm mb-2">EXPERIENCE</p>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Voluntary <span className="gradient-text">Experience</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.role}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="p-6 rounded-xl bg-card border border-border card-hover group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <exp.icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold">{exp.role}</h3>
                <p className="text-primary font-mono text-sm">{exp.org}</p>
                <p className="text-muted-foreground text-xs mt-1">{exp.period}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default VoluntarySection;
