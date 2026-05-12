import Link from "next/link";
import { getVariant, type VariantKey } from "@/config/variants";

const activeVariant = getVariant();

export const metadata = { title: `Resume — ${activeVariant.metaTitle}` };

interface ResumeCard {
  key: VariantKey;
  href: string;
  title: string;
  body: string;
  accent: string;
}

// All three PDFs ship in /public, but each site only surfaces its own.
const RESUMES: Record<VariantKey, ResumeCard> = {
  cybersec: {
    key: "cybersec",
    href: "/cj-clark-resume-cybersec.pdf",
    title: "Cybersecurity Engineer",
    body: "SOC and SIEM depth, threat intel pipelines, DLP across four platforms, phishing-program ownership, detection engineering, incident response and on-call.",
    accent: "bg-[#cdff64]",
  },
  prodsec: {
    key: "prodsec",
    href: "/cj-clark-resume-prodsec.pdf",
    title: "Product Security Engineer",
    body: "Secure SDLC, security-required PR reviews, vulnerability management, AppSec tooling (Wiz, ArmorCode), AWS cloud security, Jira-driven remediation.",
    accent: "bg-emerald-400",
  },
  "ai-swe": {
    key: "ai-swe",
    href: "/cj-clark-resume-ai-swe.pdf",
    title: "AI Software Engineer",
    body: "AI-augmented development since 2022, production tools shipped with Anthropic and OpenRouter APIs, custom MCP servers, a 24/7 Claude Code harness with scheduled autonomous tasks.",
    accent: "bg-fuchsia-400",
  },
};

const resume = RESUMES[activeVariant.key];
const others = (Object.keys(RESUMES) as VariantKey[])
  .filter((k) => k !== activeVariant.key)
  .map((k) => RESUMES[k]);

export default function ResumePage() {
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
            Resume
          </h1>
          <p className="text-fg-dim text-lg max-w-2xl mt-4 font-body">
            Targeted for {resume.title} roles — same facts as the other
            versions of my site, ordered and keyword-weighted for this
            role-type.
          </p>
        </header>

        <a
          href={resume.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-current="page"
          aria-label={`Download ${resume.title} resume PDF`}
          className="group block bg-bg-surface border-2 border-accent/40 rounded-xl overflow-hidden glow-card"
        >
          <div className={`h-px ${resume.accent}`} />
          <div className="p-7 flex flex-col sm:flex-row sm:items-center gap-6 sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-fg group-hover:text-accent transition-colors">
                {resume.title}
              </h2>
              <p className="text-fg-dim text-sm leading-relaxed mt-2 max-w-2xl">
                {resume.body}
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 border border-accent bg-accent/10 text-accent rounded-lg px-5 py-2.5 font-mono text-sm group-hover:bg-accent group-hover:text-bg transition-all duration-300">
                Download PDF
                <span className="text-xs">&#x2193;</span>
              </span>
            </div>
          </div>
        </a>

        <div className="mt-10">
          <p className="font-mono text-[11px] text-fg-dim/70 tracking-[0.18em] uppercase mb-4">
            // also available
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {others.map((r) => (
              <a
                key={r.key}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Download ${r.title} resume PDF`}
                className="group flex items-center justify-between gap-4 bg-bg-surface border border-border rounded-lg p-4 hover:border-accent-dim transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`h-8 w-px ${r.accent} shrink-0`} aria-hidden />
                  <div className="min-w-0">
                    <p className="font-display text-base font-bold text-fg group-hover:text-accent transition-colors truncate">
                      {r.title}
                    </p>
                    <p className="font-mono text-[11px] text-fg-dim mt-1">
                      Download PDF
                    </p>
                  </div>
                </div>
                <span className="font-mono text-fg-dim group-hover:text-accent transition-colors text-lg shrink-0">
                  &rarr;
                </span>
              </a>
            ))}
          </div>
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
