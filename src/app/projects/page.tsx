import Link from "next/link";
import { projects, type Project } from "@/data/profile";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata = { title: "Projects — CJ Clark" };

const categoryLabels: Record<Project["category"], string> = {
  "security-tool": "Security Tool",
  automation: "Automation",
  extension: "Extension",
  "web-app": "Web App",
  dashboard: "Dashboard",
  "ml-project": "ML / AI",
};

const accentStripColors: Record<Project["category"], string> = {
  "security-tool": "bg-[#cdff64]",
  automation: "bg-emerald-400",
  extension: "bg-violet-400",
  "web-app": "bg-amber-400",
  dashboard: "bg-cyan-400",
  "ml-project": "bg-rose-400",
};

export default function ProjectsPage() {
  return (
    <main className="grid-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <Link
          href="/"
          className="font-mono text-xs text-fg-dim hover:text-accent transition-colors"
        >
          &larr; Back to Home
        </Link>

        <header className="mt-8 mb-14">
          <h1 className="font-display text-5xl font-extrabold text-fg tracking-tight">
            Projects
          </h1>
          <p className="text-fg-dim text-lg max-w-xl mt-4 font-body">
            Internal tools and automation I&apos;ve built to solve real security
            problems.
          </p>
        </header>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <ScrollReveal key={project.name} delay={i * 80}>
              <article className="bg-bg-surface border border-border rounded-xl overflow-hidden glow-card">
                <div className={`h-1 ${accentStripColors[project.category]}`} />

                <div className="p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-2xl font-bold text-fg">
                      {project.name}
                    </h2>
                    <span
                      className={`shrink-0 text-xs font-mono border rounded-full px-3 py-1 badge-${project.category}`}
                    >
                      {categoryLabels[project.category]}
                    </span>
                  </div>

                  <p className="text-fg-dim leading-relaxed mt-4">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    <div>
                      <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-accent mb-3">
                        Key Features
                      </h3>
                      <ul className="space-y-2">
                        {project.details.map((detail) => (
                          <li
                            key={detail}
                            className="text-sm text-fg-dim flex items-start gap-2"
                          >
                            <span className="text-accent shrink-0 mt-0.5">
                              &#x25B9;
                            </span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-accent mb-3">
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="bg-bg border border-border rounded-full px-3 py-1.5 text-xs font-mono text-fg-dim"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {project.demoUrl && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <Link
                        href={project.demoUrl}
                        className="inline-flex items-center gap-2 border border-accent text-accent rounded-lg px-5 py-2.5 font-mono text-sm hover:bg-accent hover:text-bg transition-all duration-300"
                      >
                        View Interactive Demo
                        <span className="text-xs">&#x2192;</span>
                      </Link>
                    </div>
                  )}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <footer className="mt-16 text-center pb-8">
          <Link
            href="/"
            className="font-mono text-xs text-fg-dim hover:text-accent transition-colors"
          >
            &larr; Back to Home
          </Link>
        </footer>
      </div>
    </main>
  );
}
