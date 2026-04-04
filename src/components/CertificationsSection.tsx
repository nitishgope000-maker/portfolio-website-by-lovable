import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import logoGoogle from "@/assets/logo-google.png";
import logoDatabricks from "@/assets/logo-databricks.png";
import logoJpmc from "@/assets/logo-jpmc.webp";
import logoDeloitte from "@/assets/logo-deloitte.webp";
import logoTata from "@/assets/logo-tata.webp";

const certs = [
  {
    title: "Google Data Analytics Professional Certificate",
    org: "Google on Coursera · Dec 2025 – Feb 2026",
    description:
      "Comprehensive 8-course program covering data cleaning, analysis, visualization, and R programming. Gained hands-on experience with spreadsheets, SQL, Tableau, and R to make data-driven decisions.",
    logo: logoGoogle,
    credential: "https://www.coursera.org/account/accomplishments/professional-cert/UO1LXYX6EWG7",
  },
  {
    title: "SQL Analytics and BI on Databricks",
    org: "Databricks · Mar 2026",
    description:
      "Completed hands-on training in SQL analytics on the Databricks Lakehouse Platform, covering data exploration, dashboard creation, query optimization, and building business intelligence solutions at scale.",
    logo: logoDatabricks,
    logoContain: true,
    credential: "https://simpli-web.app.link/e/cNVWU7z3Y1b",
  },
  {
    title: "Quantitative Research Simulation",
    org: "JPMorgan Chase · Mar 2026",
    description:
      "Virtual experience program focused on quantitative research methods including statistical analysis, financial modeling, and data-driven investment strategies.",
    logo: logoJpmc,
    credential: "https://www.theforage.com/completion-certificates/Sj7temL583QAYpHXD/bWqaecPDbYAwSDqJy_Sj7temL583QAYpHXD_Djvs33igCaDtjC4Js_1773175094054_completion_certificate.pdf",
  },
  {
    title: "Data Analytics Job Simulation",
    org: "Deloitte · Oct 2025",
    description:
      "Simulation covering data analytics workflows, dashboard creation, and deriving business insights from complex datasets using industry-standard methodologies.",
    logo: logoDeloitte,
    credential: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_Djvs33igCaDtjC4Js_1759774822820_completion_certificate.pdf",
  },
  {
    title: "GenAI Data Analytics",
    org: "Tata · Sep 2025",
    description:
      "Explored the application of Generative AI in data analytics pipelines, including prompt engineering, AI-assisted data exploration, and automated insight generation.",
    logo: logoTata,
    logoContain: true,
    credential: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_Djvs33igCaDtjC4Js_1759784925284_completion_certificate.pdf",
  },
  {
    title: "Data Visualization: Empowering Business with Effective Insights",
    org: "Tata · Dec 2025",
    description:
      "Focused on creating impactful data visualizations, designing executive-level dashboards, and communicating analytical findings to stakeholders effectively.",
    logo: logoTata,
    logoContain: true,
    credential: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_Djvs33igCaDtjC4Js_1765718525677_completion_certificate.pdf",
  },
];

const CertificationsSection = () => (
  <section id="certifications" className="py-24 relative overflow-hidden">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        <p className="text-primary font-mono text-sm mb-2">CREDENTIALS</p>
        <h2 className="text-3xl sm:text-4xl font-bold">
          Certifications & <span className="gradient-text">Credentials</span>
        </h2>
      </motion.div>

      <div className="max-w-4xl mx-auto flex flex-col gap-5">
        {certs.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 p-6 rounded-xl bg-card border border-border card-hover glow-pulse group"
          >
            {/* Left side */}
            <div className="sm:w-2/5 flex flex-col gap-3 shrink-0">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 mt-0.5 border border-border bg-white flex items-center justify-center">
                  <img
                    src={c.logo}
                    alt={c.title}
                    className={c.logoContain ? "w-8 h-8 object-contain" : "w-full h-full object-cover"}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-snug">{c.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{c.org}</p>
                </div>
              </div>
              <a
                href={c.credential}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline mt-1 sm:ml-[3.75rem]"
              >
                <ExternalLink size={12} /> View Credential
              </a>
            </div>

            {/* Right side */}
            <div className="sm:w-3/5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {c.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CertificationsSection;
