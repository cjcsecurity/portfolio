import Link from "next/link";
import { projects, type Project } from "@/data/profile";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getVariant } from "@/config/variants";

const variant = getVariant();

export const metadata = { title: `Projects — ${variant.metaTitle}` };

// Sort projects by the variant's category order — AI projects first on the
// AI-SWE site, security-tools first on the cybersec/prodsec sites.
const orderedProjects: Project[] = [...projects].sort((a, b) => {
  const ai = variant.projectCategoryOrder.indexOf(a.category);
  const bi = variant.projectCategoryOrder.indexOf(b.category);
  const aRank = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
  const bRank = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;
  if (aRank !== bRank) return aRank - bRank;
  // preserve original order within a category
  return projects.indexOf(a) - projects.indexOf(b);
});

const categoryLabels: Record<Project["category"], string> = {
  "security-tool": "Security Tool",
  automation: "Automation",
  extension: "Extension",
  "web-app": "Web App",
  dashboard: "Dashboard",
  "ml-project": "ML / AI",
  "ai-project": "AI / LLM",
};

const accentStripColors: Record<Project["category"], string> = {
  "security-tool": "bg-[#cdff64]",
  automation: "bg-emerald-400",
  extension: "bg-violet-400",
  "web-app": "bg-amber-400",
  dashboard: "bg-cyan-400",
  "ml-project": "bg-rose-400",
  "ai-project": "bg-fuchsia-400",
};

// Numeric callouts pulled from the project's `details[]` — only where a real
// number lives in the source. Do not invent numbers.
const projectCallouts: Record<string, { value: string; label: string }> = {
  "OSINT Lookup Tool": { value: "27", label: "OSINT platforms" },
  "Bitcoin Buy/Sell Signal Dashboard": { value: "4", label: "signal categories" },
  "Pac-Man ML": { value: "4", label: "frame stacking" },
};

// Oversized hero callouts for the lead/featured project on /projects. Derived
// from `details[]` lengths (a real pipeline-stage count), not invented numbers.
// Keyed by name so each variant's first project gets its own real kpi.
const heroCallouts: Record<string, { value: string; label: string }> = {
  // cybersec / prodsec first project: 4 pipeline stages
  // (OTX → IoCs → Splunk queries → LLM impact report → Jira)
  "Threat Intel Pipeline": { value: "4", label: "pipeline stages" },
  // ai-swe first project: 4 retrieval-stack details
  "DocSiphon": { value: "4", label: "retrieval stack" },
};

export default function ProjectsPage() {
  const shippedCount = orderedProjects.length;
  const demoCount = orderedProjects.filter((p) => p.demoUrl).length;

  return (
    <main className="grid-bg min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        <Link
          href="/"
          className="font-mono text-xs text-fg-dim hover:text-accent transition-colors"
        >
          &larr; Back to Home
        </Link>

        <header className="mt-8 mb-10">
          <h1 className="font-display text-5xl font-extrabold text-fg tracking-tight">
            Projects
          </h1>
          <p className="text-fg-dim text-lg max-w-xl mt-4 font-body">
            Things I&apos;ve built at work and on the side. Mostly security
            tools and automation.
          </p>
          <p className="font-mono text-[11px] text-accent/70 tracking-[0.18em] uppercase mt-5">
            {`// ${shippedCount} shipped · ${demoCount} with demos`}
          </p>
        </header>

        <p className="font-mono text-[11px] text-fg-dim/60 tracking-wide mb-6">
          {"// most projects built with AI coding agents"}
        </p>

        <div className="space-y-8">
          {orderedProjects.map((project, i) => {
            const isHero = i === 0;
            const hero = heroCallouts[project.name];

            if (isHero) {
              return (
                <ScrollReveal key={project.name} delay={0}>
                  <article className="relative bg-bg-surface border border-accent/30 border-l-2 border-l-accent overflow-hidden glow-card">
                    {/* Inner 1px edge — gives the left rule a "double rule"
                        feel without a second physical border. Escapes the
                        rounded-tile + colored-strip pattern (Sin 5). */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-1 w-px bg-accent/25"
                    />

                    <div className="p-10 grid grid-cols-1 md:grid-cols-5 gap-10">
                      {/* Left column — 60% (3/5) */}
                      <div className="md:col-span-3">
                        <p className="font-mono text-[11px] text-accent tracking-[0.22em] uppercase mb-4">
                          {"// featured"}
                        </p>
                        <div className="flex items-start justify-between gap-4 mb-5">
                          <h2 className="font-display text-3xl md:text-4xl font-bold text-fg leading-[1.05] tracking-tight">
                            {project.name}
                          </h2>
                          <span
                            className={`shrink-0 text-xs font-mono border rounded-full px-3 py-1 badge-${project.category}`}
                          >
                            {categoryLabels[project.category]}
                          </span>
                        </div>

                        <p className="text-fg-dim text-base leading-relaxed">
                          {project.description}
                        </p>

                        <div className="mt-7">
                          <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-accent mb-3">
                            Key Features
                          </h3>
                          <ul className="space-y-2">
                            {project.details.map((detail) => (
                              <li
                                key={detail}
                                className="text-sm text-fg-dim flex items-start gap-2.5"
                              >
                                <span
                                  className="bg-accent shrink-0 size-1.5 mt-2"
                                  aria-hidden
                                />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-7">
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

                      {/* Right column — 40% (2/5): oversized kpi + CTA */}
                      <div className="md:col-span-2 flex flex-col gap-8 md:border-l md:border-border md:pl-10">
                        {hero && (
                          <div>
                            <p className="font-mono text-[11px] text-fg-dim/70 tracking-[0.18em] uppercase mb-3">
                              {"// at a glance"}
                            </p>
                            <p className="font-display text-7xl md:text-8xl font-extrabold text-accent leading-[0.9] tracking-tighter">
                              {hero.value}
                            </p>
                            <p className="font-mono text-xs text-fg-dim tracking-wide mt-3">
                              {`// ${hero.label}`}
                            </p>
                          </div>
                        )}

                        {(project.demoUrl || project.announcements) && (
                          <div className="flex flex-col items-start gap-3 mt-auto">
                            {project.demoUrl && (
                              <Link
                                href={project.demoUrl}
                                className="inline-flex items-center gap-2 border border-accent bg-accent/5 text-accent rounded-lg px-5 py-2.5 font-mono text-sm hover:bg-accent hover:text-bg transition-all duration-300"
                              >
                                View Interactive Demo
                                <span className="text-xs">&#x2192;</span>
                              </Link>
                            )}
                            {project.announcements?.map((a) => (
                              <a
                                key={a.url}
                                href={a.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-mono text-xs text-fg-dim hover:text-accent transition-colors"
                              >
                                {a.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            }

            return (
              <ScrollReveal key={project.name} delay={Math.min(i * 80, 400)}>
                <article className="bg-bg-surface border border-border rounded-xl overflow-hidden glow-card">
                  <div className={`h-px ${accentStripColors[project.category]}`} />

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

                    {projectCallouts[project.name] && (
                      <div className="group/callout mt-5 inline-flex items-baseline gap-2 border-l-2 hover:border-l-4 border-accent-dim hover:border-accent pl-3 transition-all">
                        <span className="font-display text-3xl font-bold text-accent leading-none">
                          {projectCallouts[project.name].value}
                        </span>
                        <span className="font-mono text-xs text-fg-dim tracking-wide">
                          {`// ${projectCallouts[project.name].label}`}
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                      <div>
                        <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-accent mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {project.details.map((detail) => (
                            <li
                              key={detail}
                              className="text-sm text-fg-dim flex items-start gap-2.5"
                            >
                              <span
                                className="bg-accent shrink-0 size-1.5 mt-2"
                                aria-hidden
                              />
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

                    {(project.demoUrl || project.announcements) && (
                      <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center gap-4">
                        {project.demoUrl && (
                          <Link
                            href={project.demoUrl}
                            className="inline-flex items-center gap-2 border border-accent text-accent rounded-lg px-5 py-2.5 font-mono text-sm hover:bg-accent hover:text-bg transition-all duration-300"
                          >
                            View Interactive Demo
                            <span className="text-xs">&#x2192;</span>
                          </Link>
                        )}
                        {project.announcements?.map((a) => (
                          <a
                            key={a.url}
                            href={a.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-xs text-fg-dim hover:text-accent transition-colors"
                          >
                            {a.label}
                          </a>
                        ))}
                      </div>
                    )}

                  </div>
                </article>
              </ScrollReveal>
            );
          })}
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
