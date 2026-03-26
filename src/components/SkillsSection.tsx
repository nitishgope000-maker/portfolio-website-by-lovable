import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
}

const technicalSkills: Skill[] = [
  { name: "Python", level: 90 },
  { name: "SQL / BigQuery", level: 85 },
  { name: "R / RStudio", level: 70 },
  { name: "C", level: 65 },
  { name: "Tableau", level: 80 },
  { name: "Excel (Advanced)", level: 85 },
  { name: "Git & GitHub", level: 75 },
  { name: "AI Tools (ChatGPT, Gemini)", level: 80 },
];

const expertise = [
  "Data Analytics & EDA",
  "Feature Engineering",
  "Churn Segmentation",
  "Spatial Analysis",
  "ML & Automation",
  "Predictive Modeling",
];

const softSkills = ["Problem Solving", "Teamwork", "Analytical Thinking", "Communication"];

const ProgressBar = ({ skill, delay }: { skill: Skill; delay: number }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-sm">
      <span className="text-foreground font-medium">{skill.name}</span>
      <span className="text-primary font-mono">{skill.level}%</span>
    </div>
    <div className="h-2 rounded-full bg-secondary overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
        className="h-full rounded-full"
        style={{ background: "var(--gradient-primary)" }}
      />
    </div>
  </div>
);

const SkillsSection = () => (
  <section id="skills" className="py-24 bg-card/50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-primary font-mono text-sm mb-2">SKILLS</p>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Technical <span className="gradient-text">Arsenal</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Progress bars */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-4">Programming & Tools</h3>
          {technicalSkills.map((s, i) => (
            <ProgressBar key={s.name} skill={s} delay={i * 0.08} />
          ))}
        </div>

        {/* Tags */}
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {expertise.map((e) => (
                <span
                  key={e}
                  className="px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm font-medium hover:bg-primary/20 transition"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((s) => (
                <span
                  key={s}
                  className="px-4 py-2 rounded-lg bg-accent/10 text-accent border border-accent/20 text-sm font-medium hover:bg-accent/20 transition"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SkillsSection;
