export const profile = {
  name: "CJ Clark",
  // Home page shows a rotating title; this is the fallback / SSR-initial value.
  title: "Cybersecurity Engineer",
  titleRotation: [
    "Cybersecurity Engineer",
    "Product Security Engineer",
    "AI Software Engineer",
  ],
  tagline:
    "I ship security tools and AI-augmented software: threat intel pipelines, agent-driven workflows, and the internal automation around them. AI coding agents are how I build.",
  about: [
    "I started in IT and systems administration, worked my way into security, and kept building tools the whole time. At every job I've ended up being the person who scripts away the tedious stuff so the team can focus on actual problems.",
    "Day to day I'm automating the things that used to eat hours: threat intel pipelines, vulnerability reporting, access reviews, phishing campaigns. If a security process means clicking through three tabs, I'd rather write something that does it in one.",
    "I'm also the go-to person at my company for AI. I advise leadership on what tools are worth adopting, onboard engineering teams to AI coding agents, and wrote our AI usage policy.",
  ],
  email: "christianjclark92@gmail.com",
  location: "Colorado Springs, CO",
  links: {
    github: "https://github.com/cjcsecurity",
    linkedin: "https://linkedin.com/in/christianclark-9b9606204",
  },
} as const;

export interface Job {
  company: string;
  title: string;
  period: string;
  highlights: string[];
}

export const experience: Job[] = [
  {
    company: "Snapdocs",
    title: "Product Security Engineer",
    period: "2025 — Present",
    highlights: [
      "Gate every merge as the security reviewer on GitHub — authN/authZ, secrets handling, input validation, logging, and data-exposure checks",
      "Produce and automate monthly vulnerability remediation reports tracking tickets per engineering team, SLA compliance, and open items",
      "Investigate infrastructure vulnerabilities in Wiz for AWS environments and ticket appropriate teams for remediation",
      "Leading migration from ArmorCode to Wiz Code, reworking the vulnerability ticketing pipeline across Jira projects",
      "Advise engineering teams on safe AI coding agent practices with tools like Cline and Claude Code",
    ],
  },
  {
    company: "Snapdocs",
    title: "Cybersecurity Engineer",
    period: "Apr 2024 — Present",
    highlights: [
      "Built internal threat intel pipeline: AlienVault OTX → IoC extraction → Splunk query generation → AI-written environmental impact reports auto-created as Jira tickets",
      "Created web app for Kandji Mac app governance — inventories installed apps, auto-flags malicious or non-work software, generates reports, one-click app blocking",
      "Published a Chrome extension for OSINT — highlight IPs or SHA hashes to query multiple platforms; send links to any.run sandbox",
      "Owned end-to-end phishing training program via KnowBe4: custom templates, campaigns, reporting, repeat offender escalation, quarterly all-hands presentations",
      "Deployed and maintained DLP across four platforms: CrowdStrike, Fortinet, Code42, and Google Workspace with custom content inspection patterns",
      "Company AI Expert — advise senior leadership on AI tooling, introduced AI coding agents to engineering, authored the AI usage policy, run internal seminars on agentic tools",
      "Built custom Splunk alerts, correlation searches, and automated investigations piped into Slack",
      "Created GitHub Action for Cloudflare Terraform-managed IP block list management",
      "Automated Okta and Google Workspace access reviews",
      "Built custom Slack apps for internal security workflows",
      "Led incident triage across various severity levels; on cybersecurity on-call rotation",
      "Ran cybersecurity and IT tabletop exercises",
      "Evaluated security vendors — ran PoCs and delivered technical go/no-go recommendations",
    ],
  },
  {
    company: "Snapdocs",
    title: "Senior System Administrator",
    period: "Jul 2023 — Oct 2024",
    highlights: [
      "Overhauled onboarding workflow, cutting manual tasks by ~80%",
      "Created automated offboarding pipeline — immediate revocation from all critical systems triggered by a Jira ticket",
      "Completed multiple Okta SSO integrations",
      "Automated access requests with Okta Workflows tied to Jira Service Desk",
      "Maintained ~95% SLA rate on Tier 3 support",
      "Rolled out a new DLP program across the entire Mac fleet with custom Bash scripts",
      "Created and deployed Kandji blueprints and Auto Apps with custom scripts",
      "Built fleet-wide script to inventory non-Apple apps, output to spreadsheet, and flag malicious or policy-violating software",
      "Supported 100% remote workforce; assisted with zero trust network maintenance via SonicWall Cloud Secure Edge",
    ],
  },
  {
    company: "OrthoFi",
    title: "Systems Administrator",
    period: "Apr 2022 — Jul 2023",
    highlights: [
      "Wrote Python and PowerShell automation for user provisioning, patch compliance, and asset reporting",
      "Administered hundreds of systems across Windows, macOS, iOS, and Linux",
      "Cut hardware and software costs by ~20% through renegotiations and lifecycle tracking",
      "Created and maintained the VM fleet for dev/test and CI/CD",
      "Rebuilt the asset management workflow for tracking and forecasting",
    ],
  },
  {
    company: "48 Hour Monogram",
    title: "E-commerce Operations Specialist",
    period: "Aug 2018 — Jan 2022",
    highlights: [
      "Developed and managed a Shopify e-commerce platform",
      "Built Python web scraping scripts for competitive market data and automation",
      "Handled SEO and ran social campaigns to drive online sales",
      "Implemented custom order management solutions using Google Sheets",
    ],
  },
];

export interface Skill {
  category: string;
  items: string[];
}

export const skills: Skill[] = [
  {
    category: "AI Tools & Agents",
    items: [
      "Claude Code",
      "Cline",
      "Roo",
      "Cursor",
      "Anthropic API",
      "OpenAI API",
      "OpenRouter",
      "LangChain / LangGraph",
      "MCP (Model Context Protocol)",
      "Vercel AI SDK",
      "Custom skills & hooks",
      "Chroma (vector DB)",
    ],
  },
  {
    category: "Security & Infrastructure",
    items: [
      "Okta (SSO, Workflows)",
      "CrowdStrike (EDR & DLP)",
      "Wiz (Cloud Security)",
      "Splunk (SIEM)",
      "KnowBe4",
      "Fortinet DLP",
      "Code42",
      "Cloudflare",
      "SonicWall CSE",
      "ServiceNow",
      "AlienVault OTX",
    ],
  },
  {
    category: "Languages & Scripting",
    items: ["Python", "Bash", "PowerShell", "TypeScript", "Chrome Extension APIs", "REST APIs"],
  },
  {
    category: "Platforms & Tools",
    items: [
      "AWS",
      "Terraform",
      "GitHub Actions",
      "Jira",
      "Kandji (MDM)",
      "Google Workspace / GAM",
      "Slack (Custom Apps)",
      "Apple Business Manager",
    ],
  },
  {
    category: "Operating Systems",
    items: ["macOS", "Linux", "Windows", "iOS"],
  },
];

export interface Project {
  name: string;
  description: string;
  details: string[];
  tech: string[];
  category:
    | "security-tool"
    | "automation"
    | "extension"
    | "web-app"
    | "dashboard"
    | "ml-project"
    | "ai-project";
  demoUrl?: string;
  announcements?: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    name: "Threat Intel Pipeline",
    description:
      "Pulls threat intel from AlienVault OTX, extracts IoCs, builds Splunk queries to check the environment for matches, and has an LLM write up impact reports that get dropped into Jira automatically.",
    details: [
      "Ingests AlienVault OTX feeds and pulls out IoCs",
      "Generates Splunk queries to check the environment for matches",
      "LLM writes environmental impact reports per threat",
      "Reports auto-created as Jira tickets for triage",
    ],
    tech: ["Python", "AlienVault OTX API", "Splunk", "AI/LLM", "Jira API"],
    category: "security-tool",
  },
  {
    name: "Mac App Governance Dashboard",
    description:
      "Web app that inventories every app installed across the Mac fleet via Kandji, flags anything sketchy or unapproved, and lets you block it in one click.",
    details: [
      "Pulls app inventories from Kandji across the fleet",
      "Flags malicious, unapproved, or non-work apps automatically",
      "Per-machine reports for compliance reviews",
      "One-click blocking through Kandji",
    ],
    tech: ["Python", "Kandji API", "Web Framework", "REST APIs"],
    category: "web-app",
  },
  {
    name: "OSINT Chrome Extension",
    description:
      "Chrome extension I published to help SOC analysts move faster. Highlight an IP or hash on any page, right-click, and it opens lookups across dozens of OSINT platforms. URLs go straight to any.run with one click.",
    details: [
      "Right-click any IP or hash to query OSINT platforms",
      "Hits multiple threat intel sources in one action",
      "One-click URL submission to any.run sandbox",
      "Built for incident-response speed",
      "Live on the Chrome Web Store",
    ],
    tech: ["Chrome Extension APIs", "OSINT Platform APIs", "any.run API", "JavaScript"],
    category: "extension",
    announcements: [
      {
        label: "Chrome Web Store →",
        url: "https://chromewebstore.google.com/detail/osint-extension/bcjgklcpmfgkpjppcogekgkppmhmihda",
      },
      {
        label: "LinkedIn announcement →",
        url: "https://www.linkedin.com/posts/christian-clark-9b9606204_osint-lookup-chrome-extension-activity-7364419824321495041-Qwze",
      },
    ],
  },
  {
    name: "Automated Offboarding Pipeline",
    description:
      "When someone leaves the company, a Jira ticket fires off automated access revocation across every system. No manual steps, no forgotten accounts.",
    details: [
      "Triggered by a Jira Service Desk ticket",
      "Kills access in Okta, Google Workspace, and connected apps",
      "Runs immediately with no manual intervention",
      "Full audit trail for compliance",
    ],
    tech: ["Jira API", "Okta API", "Google Workspace", "Python"],
    category: "automation",
  },
  {
    name: "Cloudflare IP Blocklist Action",
    description:
      "GitHub Action so the security team can add or remove IPs from the Cloudflare block list by opening a PR. Terraform handles the rest.",
    details: [
      "Simple PR workflow to manage blocked IPs",
      "Terraform applies changes to Cloudflare automatically",
      "PR approval is the audit trail",
      "Used for quick threat response",
    ],
    tech: ["GitHub Actions", "Terraform", "Cloudflare API"],
    category: "automation",
  },
  {
    name: "Automated Access Reviews",
    description:
      "Scripts that run periodic access reviews for Okta and Google Workspace. Generates the reports, flags anything that looks off, and turned a multi-day process into minutes.",
    details: [
      "Scheduled access reviews for Okta and Google Workspace",
      "Auto-generated access reports",
      "Flags excessive or unusual permissions",
      "Multi-day manual process down to minutes",
    ],
    tech: ["Python", "Okta API", "Google Workspace / GAM"],
    category: "automation",
  },
  {
    name: "Bitcoin Buy/Sell Signal Dashboard",
    description:
      "Bitcoin trading signal dashboard that pulls from free APIs and scores buy/sell signals based on technicals, on-chain data, and sentiment. You can adjust risk tolerance and everything runs client-side.",
    details: [
      "Scores from 4 categories: momentum, trend, sentiment, on-chain",
      "RSI, MACD, Bollinger Bands, SMA all calculated in the browser",
      "Risk tolerance toggle: conservative, balanced, aggressive",
      "Data from CoinGecko, Mempool, Fear & Greed Index, etc.",
      "SVG gauge with confidence scoring",
    ],
    tech: ["JavaScript", "Chart.js", "Tailwind CSS", "CoinGecko API", "Mempool API"],
    category: "dashboard",
    demoUrl: "/demos/btc-dashboard",
  },
  {
    name: "OSINT Lookup Tool",
    description:
      "Paste an IP, hash, or domain and get one-click lookup links to 27+ OSINT platforms. Auto-detects what you pasted and opens the right tools.",
    details: [
      "Auto-detects IPv4, IPv6, MD5, SHA-1, SHA-256, SHA-512, and domains",
      "Links to 27 platforms: VirusTotal, Shodan, AbuseIPDB, and more",
      "Color-coded by type: blue for IPs, red for hashes, green for domains",
      "Send URLs to any.run sandbox in one click",
    ],
    tech: ["Chrome Extension APIs", "JavaScript", "Regex Validation", "OSINT Platforms"],
    category: "security-tool",
    demoUrl: "/demos/osint-lookup",
  },
  {
    name: "Financial Research Agent",
    description:
      "A multi-agent pipeline that screens stocks for swing trades. A screener surfaces candidates, an analyst breaks them down, a risk manager vetoes the junk, and a portfolio manager picks the final trades. Paper trading included.",
    details: [
      "Pipeline: screener → analyst → risk manager → portfolio manager",
      "Trade cards with entry, target, stop, and risk-reward ratios",
      "Backtesting with win rate and drawdown stats",
      "Paper trading portfolio with P&L tracking",
      "Live progress log as the pipeline runs",
    ],
    tech: ["React", "FastAPI", "LangGraph", "Anthropic API", "OpenBB SDK"],
    category: "web-app",
    demoUrl: "/demos/financial-research",
  },
  {
    name: "Threadlytic",
    description:
      "Wardrobe app where you upload clothing photos and a vision model tags them automatically. Then a matching algorithm scores outfit combinations by color, formality, and season.",
    details: [
      "Vision AI tags clothing by category, color, season, and formality",
      "Matching algorithm scores outfit compatibility",
      "Search and filter your wardrobe",
      "Chat with an AI stylist (pick a persona)",
      "Demo mode lets you browse without an account",
    ],
    tech: ["Next.js", "React", "Supabase", "OpenRouter Vision API", "Tailwind CSS"],
    category: "web-app",
    demoUrl: "/demos/threadlytic",
  },
  {
    name: "Pac-Man ML",
    description:
      "RL environment where a DQN agent learns to play Ms. Pac-Man. You can watch it train live in the browser or play the game yourself.",
    details: [
      "DQN with 4-frame stacking and experience replay",
      "Game frames streamed to the browser over WebSocket",
      "Training metrics: score, epsilon, loss, rolling averages",
      "Pause/resume with full state persistence",
      "Play it yourself with keyboard controls",
    ],
    tech: ["Python", "PyTorch", "FastAPI", "Gymnasium (Atari)", "Chart.js"],
    category: "ml-project",
    demoUrl: "/demos/pacman-ml",
  },
  {
    name: "DocSiphon",
    description:
      "RAG-powered API documentation assistant. Scrapes docs, builds a chunked vector store in Chroma, and answers natural-language queries through a multi-provider LLM factory with OpenRouter fallback — so you can swap between Claude, GPT, and open models per query.",
    details: [
      "LangChain + Chroma vector store with chunked embeddings",
      "Multi-provider LLM factory with OpenRouter / LiteLLM fallback routing",
      "Streamlit front-end for ingestion and Q&A",
      "Configurable document loaders for HTML, PDF, and Markdown sources",
    ],
    tech: ["Python", "LangChain", "Chroma", "OpenRouter", "LiteLLM", "Streamlit"],
    category: "ai-project",
  },
  {
    name: "SecureCatch",
    description:
      "Security orchestration platform that triages reported phishing end-to-end. A Claude-powered decision engine (via OpenRouter) classifies emails, auto-enriches OSINT, and recommends SOC actions — bridging AppSec tooling with production LLM use.",
    details: [
      "LLM-based phishing classifier with structured JSON output and temperature-tuned determinism",
      "Automated OSINT enrichment pipeline",
      "SOC action recommendations per case",
      "Prisma data layer and Next.js admin UI",
    ],
    tech: ["Next.js", "TypeScript", "OpenRouter", "Anthropic API", "Prisma"],
    category: "security-tool",
  },
];

export interface Education {
  school: string;
  degree: string;
}

export const education: Education[] = [
  {
    school: "Colorado State University",
    degree: "B.S., Information Technology",
  },
  {
    school: "Red Rocks Community College",
    degree: "A.S., Precision Machining",
  },
];

export const certifications: string[] = [
  "CompTIA Network+",
  "CompTIA A+",
  "Google IT Automation with Python (Professional Certificate)",
];

export const howIWork = {
  heading: "AI-augmented software engineering",
  paragraphs: [
    "Using AI coding agents since 2022 — started by copy-pasting from the ChatGPT web app into VS Code before Copilot was generally available. Today I run a dedicated Claude Code machine 24/7 that executes scheduled autonomous tasks and that I control remotely over Discord.",
    "I build with Claude Code, Cline, and Roo daily, and extend them with custom skills, agents, and MCP servers. Some I authored directly; others I specced out and had Claude Code author for me.",
    "Five to six of my AI-augmented internal tools are running in production at Snapdocs right now, used daily across Cybersecurity, IT, and Product Security.",
  ],
  pullQuote:
    "Don't commit to a single model. Monitor benchmarks and rotate per task — engineers who settle on one model and stop looking miss half the ceiling.",
};
