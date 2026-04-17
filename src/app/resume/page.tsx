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

export default function ResumePage() {
  return (
    <main className="grid-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
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
          className="group block bg-bg-surface border-2 border-accent/40 rounded-xl overflow-hidden glow-card"
        >
          <div className={`h-1.5 ${resume.accent}`} />
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
