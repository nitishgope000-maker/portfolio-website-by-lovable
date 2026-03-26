import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certs = [
  { title: "Google Data Analytics Professional Certificate", org: "Google (Coursera) · Dec 2025 – Feb 2026" },
  { title: "Quantitative Research Simulation", org: "JPMorgan Chase" },
  { title: "Data Analytics", org: "Deloitte" },
  { title: "GenAI Data Analytics", org: "Tata" },
  { title: "Data Visualization", org: "Tata" },
];

const CertificationsSection = () => (
  <section id="certifications" className="py-24">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-primary font-mono text-sm mb-2">CREDENTIALS</p>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Certifications & <span className="gradient-text">Credentials</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {certs.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-card border border-border text-center card-hover group"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Award size={26} />
            </div>
            <h3 className="font-bold text-sm mb-1">{c.title}</h3>
            <p className="text-xs text-muted-foreground">{c.org}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CertificationsSection;
