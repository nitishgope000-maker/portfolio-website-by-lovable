import { motion } from "framer-motion";
import { BarChart3, BrainCircuit, Palette } from "lucide-react";

const services = [
  {
    icon: BarChart3,
    title: "Data Analytics & Insights",
    items: [
      "Exploratory Data Analysis (EDA)",
      "Data cleaning & transformation",
      "Dashboard & report creation (Tableau, Excel)",
      "SQL & BigQuery data management",
      "Customer segmentation & churn analysis",
    ],
  },
  {
    icon: BrainCircuit,
    title: "Predictive Analytics & ML",
    items: [
      "Predictive modeling & forecasting",
      "Feature engineering & selection",
      "Statistical analysis & hypothesis testing",
      "Data-driven decision support",
    ],
  },
  {
    icon: Palette,
    title: "Visualization & Storytelling",
    items: [
      "Interactive dashboards (Tableau)",
      "Data storytelling & presentations",
      "Business intelligence reporting",
      "Clean documentation & insights delivery",
    ],
  },
];

const ServicesSection = () => (
  <section id="services" className="py-24 relative overflow-hidden">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-primary font-mono text-sm mb-2">SERVICES</p>
        <h2 className="text-3xl sm:text-4xl font-bold">
          What I <span className="gradient-text">Offer</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="p-6 rounded-xl bg-card border border-border card-hover group"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <s.icon size={24} />
            </div>
            <h3 className="text-lg font-bold mb-3">{s.title}</h3>
            <ul className="space-y-2">
              {s.items.map((item) => (
                <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
