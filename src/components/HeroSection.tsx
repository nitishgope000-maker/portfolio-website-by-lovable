import { useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import profileImg from "@/assets/profile.png";

const ParticleNetwork = lazy(() => import("@/components/ParticleNetwork"));

const terminalLines = [
  "> Querying datasets (SQL)...",
  "> Cleaning data (Python)...",
  "> Building dashboards (Power BI)...",
  "> Ready.",
];

const HeroSection = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    if (lineIndex >= terminalLines.length) {
      const timeout = setTimeout(() => {
        setLineIndex(0);
        setCharIndex(0);
        setDisplayedLines([]);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    const currentLine = terminalLines[lineIndex];
    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => setCharIndex(charIndex + 1), 40);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentLine]);
        setLineIndex(lineIndex + 1);
        setCharIndex(0);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, charIndex]);

  const currentTyping =
    lineIndex < terminalLines.length
      ? terminalLines[lineIndex].slice(0, charIndex)
      : "";

  return (
    <section id="home" className="min-h-screen flex items-center pt-16 pb-12 grid-bg relative overflow-hidden">
      <Suspense fallback={null}>
        <ParticleNetwork />
      </Suspense>

      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary font-mono text-sm mb-3">Hello, I'm</p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Nitish <span className="gradient-text">Gope</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-2 whitespace-normal sm:whitespace-nowrap">
            Turning Data into Business Insights | SQL &bull; Python &bull; Power BI
          </p>
          <p className="text-secondary-foreground/70 max-w-md mb-8">
            I analyze data, build dashboards, and deliver insights that drive smarter decisions.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition glow-border"
            >
              View Portfolio <ArrowRight size={16} />
            </a>
            <a
              href="mailto:nitishgope000@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground hover:border-primary hover:text-primary transition"
            >
              <Mail size={16} /> Contact Me
            </a>
          </div>

          {/* Terminal */}
          <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm max-w-md">
            <div className="flex gap-1.5 mb-3">
              <span className="w-3 h-3 rounded-full bg-destructive/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            {displayedLines.map((line, i) => (
              <div key={i} className="text-primary/80">{line}</div>
            ))}
            {lineIndex < terminalLines.length && (
              <div>
                <span className="text-primary">{currentTyping}</span>
                <span className="terminal-cursor text-primary">▌</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right – profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-110" />
            <div className="relative w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 glow-border">
              <img
                src={profileImg}
                alt="Nitish Gope"
                className="w-full h-full object-cover"
                width={1024}
                height={1024}
              />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-bottom-3 sm:-right-6 bg-card border border-border rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-sm font-semibold glow-border whitespace-nowrap text-center leading-tight"
            >
              <span className="text-primary">Available for</span> Internship / Entry-Level Roles
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
