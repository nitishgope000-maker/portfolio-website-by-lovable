import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Play } from "lucide-react";

const filters = ["All", "Data Analytics", "AI/ML"];

const projects = [
  {
    title: "Facility Allocation using Aerial Image Analysis",
    desc: "Urban planning solution using spatial analysis on aerial imagery to optimize facility placement.",
    problem: "Inefficient urban resource allocation lacking data-driven spatial insights.",
    tools: ["Python", "DeepLab V3+", "DBSCAN", "Bellman-Ford"],
    outcomes: "Automated facility zone detection with optimized routing paths.",
    tags: ["AI/ML"],
    github: "#",
  },
  {
    title: "Customer Churn Analysis",
    desc: "Analyzed 7000+ telecom records to build retention strategies via customer segmentation.",
    problem: "High customer churn rates without clear retention strategies.",
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    outcomes: "Identified key churn drivers; proposed targeted retention campaigns.",
    tags: ["Data Analytics"],
    github: "https://github.com/nitishgope000-maker/customer-churn-analysis",
  },
  {
    title: "JARVIS: AI Personal Assistant",
    desc: "Voice-controlled automation system for personal task management and information retrieval.",
    problem: "Need for hands-free, AI-powered personal automation.",
    tools: ["Python", "APIs", "Speech Recognition", "pyttsx3"],
    outcomes: "Fully functional voice assistant with multi-API integration.",
    tags: ["AI/ML"],
    github: "https://github.com/nitishgope000-maker/jarvis-ai-personal-assisatant",
  },
  {
    title: "Hotel Performance Analytics Dashboard",
    desc: "Interactive dashboard analyzing hotel performance metrics including revenue, occupancy rate, ADR, and booking trends.",
    problem: "Lack of centralized, real-time visibility into hotel revenue and operational KPIs for data-driven decision-making.",
    tools: ["Power BI", "SQL", "Excel"],
    outcomes: "Identified seasonal trends and peak booking periods; enabled stakeholder decision-making with dynamic drill-down filters and KPI cards.",
    tags: ["Data Analytics"],
    github: "https://github.com/nitishgope000-maker/hospitality-revenue-dashboard",
    video: "https://youtu.be/XBJzUpY7wBc?si=lEIzplO_FHoOTk9j",
  },
  {
    title: "Zepto SQL Data Analysis",
    desc: "Analyzed real-world grocery delivery dataset to extract actionable business insights on revenue and customer behavior.",
    problem: "Unstructured grocery delivery data with no clear visibility into top-performing categories and buying patterns.",
    tools: ["SQL", "MySQL", "PostgreSQL", "Data Analysis"],
    outcomes: "Derived revenue trends, category-wise performance insights, and identified high-demand products driving business growth.",
    tags: ["Data Analytics"],
    github: "https://github.com/nitishgope000-maker/Zepto_SQL_Analysis_Project",
  },
  {
    title: "Customer Trends Data Analysis",
    desc: "Analyzed 3,900 transactional records to uncover spending patterns, customer segmentation, and product performance using SQL, Python, and Power BI.",
    problem: "Lack of actionable insights into customer shopping behavior, spending trends, and subscription impact on revenue.",
    tools: ["Python", "SQL", "PostgreSQL", "Power BI", "Pandas"],
    outcomes: "Identified male customers generate 2× more revenue; segmented 3,116 loyal customers; revealed 27% subscription rate with no spending difference; built interactive dashboard.",
    tags: ["Data Analytics"],
    github: "https://github.com/nitishgope000-maker/customer_behavior_analysis",
  },
  {
    title: "Weather Detector",
    desc: "Real-time weather detection application providing current weather data and forecasts for any location worldwide.",
    problem: "Need for a simple, accessible tool to quickly check weather conditions and forecasts.",
    tools: ["Python", "APIs", "Data Visualization"],
    outcomes: "Fully functional weather app with real-time data fetching, location-based search, and clean visual output.",
    tags: ["Data Analytics"],
    github: "https://github.com/nitishgope000-maker/Weather-Detector",
  },
];

const ProjectsSection = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.tags.includes(active));

  return (
    <section id="projects" className="py-16 sm:py-24 bg-card/50 relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="text-primary font-mono text-sm mb-2">PORTFOLIO</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                active === f
                  ? "bg-primary text-primary-foreground glow-border"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl bg-background border border-border p-4 sm:p-6 card-hover glow-pulse flex flex-col"
              >
                <div className="flex gap-2 mb-3 flex-wrap">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-primary/10 text-primary">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
                <div className="text-xs text-muted-foreground mb-2">
                  <span className="text-foreground font-medium">Problem:</span> {p.problem}
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  <span className="text-foreground font-medium">Outcome:</span> {p.outcomes}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4 mt-auto pt-3">
                  {p.tools.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    <Github size={14} /> GitHub
                  </a>
                  {p.video && (
                    <a
                      href={p.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                    >
                      <Play size={14} /> Video
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;
