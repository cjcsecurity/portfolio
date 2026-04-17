// Per-site variant config. One codebase, three deployments: each Vercel
// project sets NEXT_PUBLIC_SITE_VARIANT to cybersec | prodsec | ai-swe,
// and getVariant() returns the config that drives titles, tagline,
// skills/project ordering, and the "How I Work" section.

export type VariantKey = "cybersec" | "prodsec" | "ai-swe";

export const SITE_URLS: Record<VariantKey, string> = {
  cybersec: "https://cjcsecurity.vercel.app",
  prodsec: "https://cjc-prodsec.vercel.app",
  "ai-swe": "https://cjc-ai.vercel.app",
};

export interface Variant {
  key: VariantKey;
  url: string;
  heroTitle: string;
  metaTitle: string;
  metaDescription: string;
  ogSubtitle: string;
  ogDescription: string;
  tagline: string;
  showHowIWork: boolean;
  skillsOrder: readonly string[];
  // Higher weight = earlier on the projects page. Any category not listed
  // falls to the bottom in its natural order.
  projectCategoryOrder: readonly string[];
  defaultResumeHref: string;
  crossLinks: readonly { label: string; url: string }[];
}

export const VARIANTS: Record<VariantKey, Variant> = {
  cybersec: {
    key: "cybersec",
    url: SITE_URLS.cybersec,
    heroTitle: "Cybersecurity Engineer",
    metaTitle: "CJ Clark — Cybersecurity Engineer",
    metaDescription:
      "Cybersecurity engineer. Threat intel pipelines, DLP across four platforms, phishing-program ownership, detection engineering, incident response, and internal security tooling.",
    ogSubtitle: "Cybersecurity Engineer",
    ogDescription:
      "Threat intel, DLP, phishing programs, detection engineering, and internal security tools.",
    tagline:
      "I build internal security tools and automation — threat intel pipelines, DLP programs, phishing training, detection engineering — so security teams spend less time on toil and more on real threats.",
    showHowIWork: false,
    skillsOrder: [
      "Security & Infrastructure",
      "Languages & Scripting",
      "Platforms & Tools",
      "Operating Systems",
      "AI Tools & Agents",
    ],
    projectCategoryOrder: [
      "security-tool",
      "extension",
      "automation",
      "web-app",
      "dashboard",
      "ai-project",
      "ml-project",
    ],
    defaultResumeHref: "/cj-clark-resume-cybersec.pdf",
    crossLinks: [
      { label: "Product Security version", url: SITE_URLS.prodsec },
      { label: "AI Engineering version", url: SITE_URLS["ai-swe"] },
    ],
  },

  prodsec: {
    key: "prodsec",
    url: SITE_URLS.prodsec,
    heroTitle: "Product Security Engineer",
    metaTitle: "CJ Clark — Product Security Engineer",
    metaDescription:
      "Product security engineer. Security-required PR reviews, vulnerability management, AWS cloud security with Wiz, ArmorCode → Wiz Code migration, and the Jira remediation pipeline.",
    ogSubtitle: "Product Security Engineer",
    ogDescription:
      "Secure SDLC, PR-gate reviews, vulnerability management, AppSec tooling (Wiz, ArmorCode), AWS cloud security.",
    tagline:
      "Product security engineer embedded in the SDLC: PR-gate reviews, vulnerability management, AWS cloud security via Wiz, and the Jira remediation pipeline. Partner with engineering on threat modeling and secure coding guidance.",
    showHowIWork: false,
    skillsOrder: [
      "Security & Infrastructure",
      "Languages & Scripting",
      "Platforms & Tools",
      "Operating Systems",
      "AI Tools & Agents",
    ],
    projectCategoryOrder: [
      "security-tool",
      "extension",
      "automation",
      "web-app",
      "dashboard",
      "ai-project",
      "ml-project",
    ],
    defaultResumeHref: "/cj-clark-resume-prodsec.pdf",
    crossLinks: [
      { label: "Cybersecurity version", url: SITE_URLS.cybersec },
      { label: "AI Engineering version", url: SITE_URLS["ai-swe"] },
    ],
  },

  "ai-swe": {
    key: "ai-swe",
    url: SITE_URLS["ai-swe"],
    heroTitle: "AI Software Engineer",
    metaTitle: "CJ Clark — AI Software Engineer",
    metaDescription:
      "AI-augmented software engineer. Using AI coding agents daily since 2022. Shipped RAG systems, LLM-driven security platforms, multi-agent pipelines. Custom MCP servers and a 24/7 Claude Code harness.",
    ogSubtitle: "AI Software Engineer",
    ogDescription:
      "AI-augmented development since 2022. RAG systems, LLM-driven platforms, multi-agent pipelines, custom MCP servers.",
    tagline:
      "I ship security tools and AI-augmented software: threat intel pipelines, agent-driven workflows, and the internal automation around them. AI coding agents are how I build.",
    showHowIWork: true,
    skillsOrder: [
      "AI Tools & Agents",
      "Languages & Scripting",
      "Security & Infrastructure",
      "Platforms & Tools",
      "Operating Systems",
    ],
    projectCategoryOrder: [
      "ai-project",
      "ml-project",
      "web-app",
      "dashboard",
      "security-tool",
      "extension",
      "automation",
    ],
    defaultResumeHref: "/cj-clark-resume-ai-swe.pdf",
    crossLinks: [
      { label: "Cybersecurity version", url: SITE_URLS.cybersec },
      { label: "Product Security version", url: SITE_URLS.prodsec },
    ],
  },
};

export function getVariant(): Variant {
  // .trim() defends against trailing whitespace the Vercel CLI bakes in
  // when the env value is added via stdin pipe (printf "x\n" | vercel env add).
  const raw = process.env.NEXT_PUBLIC_SITE_VARIANT?.trim();
  if (raw === "prodsec" || raw === "ai-swe" || raw === "cybersec") {
    return VARIANTS[raw];
  }
  // Default to cybersec — the cjcsecurity.vercel.app canonical URL matches
  // the security-branded handle, so this is the sensible fallback.
  return VARIANTS.cybersec;
}
