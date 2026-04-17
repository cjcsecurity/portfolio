import Link from "next/link";

export const metadata = { title: "Resume — CJ Clark" };

const variants = [
  {
    href: "/cj-clark-resume-cybersec.pdf",
    title: "Cybersecurity Engineer",
    body: "SOC/SIEM depth, threat intel, DLP, phishing programs, incident response. Tuned for security operations and detection engineering roles.",
    accent: "bg-[#cdff64]",
  },
  {
    href: "/cj-clark-resume-prodsec.pdf",
    title: "Product Security Engineer",
    body: "Secure SDLC, code review, vulnerability management, AppSec tooling (Wiz, ArmorCode), Jira-driven remediation. Tuned for product security and AppSec roles.",
    accent: "bg-emerald-400",
  },
  {
    href: "/cj-clark-resume-ai-swe.pdf",
    title: "AI Software Engineering",
    body: "AI-augmented development since 2022, shipped production tools with Anthropic/OpenRouter APIs, custom MCP servers, 24/7 Claude Code harness. Tuned for AI engineering and agent-focused roles.",
    accent: "bg-fuchsia-400",
  },
];

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
            Three variants of the same story, each tuned for a different
            role-type and keyword set. Pick whichever matches the job you
            have in hand.
          </p>
        </header>

        <div className="space-y-6">
          {variants.map((v) => (
            <a
              key={v.href}
              href={v.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-bg-surface border border-border rounded-xl overflow-hidden glow-card"
            >
              <div className={`h-1 ${v.accent}`} />
              <div className="p-7 flex flex-col sm:flex-row sm:items-center gap-6 sm:justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold text-fg group-hover:text-accent transition-colors">
                    {v.title}
                  </h2>
                  <p className="text-fg-dim text-sm leading-relaxed mt-2 max-w-2xl">
                    {v.body}
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-2 border border-accent text-accent rounded-lg px-5 py-2.5 font-mono text-sm group-hover:bg-accent group-hover:text-bg transition-all duration-300">
                    Download PDF
                    <span className="text-xs">&#x2193;</span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-10 text-fg-dim/70 text-xs font-mono">
          {
            "// same facts in every variant — only the ordering and keyword emphasis change"
          }
        </p>

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
