export const profile = {
  name: "CJ Clark",
  title: "Cybersecurity Engineer",
  tagline:
    "Building internal tools, automation, and AI-driven workflows that keep remote-first teams secure without slowing them down.",
  about: [
    "I'm a Cybersecurity Engineer who grew out of hands-on IT and systems work. My career has taken me from e-commerce operations to systems administration to security engineering — and at every step, I've been the person building tools to make security practical, not painful.",
    "I specialize in turning messy, manual security processes into something repeatable, measurable, and as push-button as possible. Whether it's automating threat intel pipelines, building app governance dashboards, or standing up phishing education programs, I focus on making the secure path the easiest path.",
    "I'm also recognized internally as our company's AI expert — advising senior leadership on emerging tools, introducing AI coding agents to engineering teams, and writing the policies that govern safe AI adoption across the organization.",
  ],
  email: "cj@example.com",
  // Add your real links here
  links: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
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
    period: "Current",
    highlights: [
      "Review GitHub PRs as the security team representative — security approval required before merge, focusing on authN/authZ, secrets handling, input validation, logging, and data exposure",
      "Produce and automate monthly vulnerability remediation reports tracking tickets per engineering team, SLA compliance, and open items",
      "Investigate infrastructure vulnerabilities in Wiz for AWS environments and ticket appropriate teams for remediation",
      "Leading migration from ArmorCode to Wiz Code, reworking the vulnerability ticketing pipeline across Jira projects",
      "Advise engineering teams on safe AI coding agent practices with tools like Cline and Claude Code",
    ],
  },
  {
    company: "Snapdocs",
    title: "Cybersecurity Engineer",
    period: "Previous",
    highlights: [
      "Built internal threat intel pipeline: AlienVault OTX → IoC extraction → Splunk query generation → AI-written environmental impact reports auto-created as Jira tickets",
      "Created web app for Kandji Mac app governance — inventories installed apps, auto-flags malicious or non-work software, generates reports, one-click app blocking",
      "Published a Chrome extension for OSINT — highlight IPs or SHA hashes to query multiple platforms; send links to any.run sandbox",
      "Owned end-to-end phishing training program via KnowBe4: custom templates, campaigns, reporting, repeat offender escalation, quarterly all-hands presentations",
      "Deployed and maintained DLP across four platforms: CrowdStrike, Fortinet, Code42, and Google Workspace with custom content inspection patterns",
      "Company AI Expert — advises senior leadership, introduced AI coding agents to engineering, authored AI usage policy, runs seminars on agentic tools",
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
    period: "Previous",
    highlights: [
      "Overhauled onboarding workflow, cutting manual tasks by ~80%",
      "Created automated offboarding pipeline — immediate revocation from all critical systems triggered by a Jira ticket",
      "Completed multiple Okta SSO integrations",
      "Automated access requests with Okta Workflows tied to Jira Service Desk",
      "Maintained ~95% SLA rate on Tier 3 support",
      "Facilitated deployment of a new DLP program across entire Mac fleet with custom Bash scripts",
      "Created and deployed Kandji blueprints and Auto Apps with custom scripts",
      "Built fleet-wide script to inventory non-Apple apps, output to spreadsheet, and flag malicious or policy-violating software",
      "Supported 100% remote workforce; assisted with zero trust network maintenance via SonicWall Cloud Secure Edge",
    ],
  },
  {
    company: "OrthoFi",
    title: "Systems Administrator",
    period: "Previous",
    highlights: [
      "Developed automation scripts with Python and PowerShell",
      "Administered hundreds of systems across Windows, macOS, iOS, and Linux",
      "Implemented cost-saving strategies achieving ~20% budget reduction",
      "Led creation and maintenance of VMs for dev/test and CI/CD environments",
      "Improved asset management workflows for tracking and forecasting",
    ],
  },
  {
    company: "48 Hour Monogram",
    title: "E-commerce Operations Specialist",
    period: "Previous",
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
  category: "security-tool" | "automation" | "extension" | "web-app" | "dashboard" | "ml-project";
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    name: "Threat Intel Pipeline",
    description:
      "Automated threat intelligence platform that ingests AlienVault OTX pulses, extracts IoCs, generates Splunk queries, checks the environment for matches, and uses AI to produce custom environmental impact reports — auto-created as Jira tickets.",
    details: [
      "Ingests threat intelligence feeds from AlienVault OTX in real time",
      "Extracts and normalizes Indicators of Compromise (IoCs)",
      "Auto-generates Splunk queries to check for environmental matches",
      "AI writes custom environmental impact or threat intel reports",
      "Reports are automatically created as Jira tickets for triage",
    ],
    tech: ["Python", "AlienVault OTX API", "Splunk", "AI/LLM", "Jira API"],
    category: "security-tool",
  },
  {
    name: "Mac App Governance Dashboard",
    description:
      "Web application that pulls installed app inventories from all managed Macs via Kandji, auto-flags malicious or non-work-appropriate apps, generates machine-level reports, and enables one-click app blocking.",
    details: [
      "Pulls full app inventories from Kandji MDM across the fleet",
      "Auto-flags apps that are malicious, unapproved, or non-work-related",
      "Generates per-machine reports for compliance review",
      "One-click blocking of flagged apps directly through Kandji",
    ],
    tech: ["Python", "Kandji API", "Web Framework", "REST APIs"],
    category: "web-app",
  },
  {
    name: "OSINT Chrome Extension",
    description:
      "Published Chrome extension for security analysts — highlight an IP address or SHA hash on any page to instantly query multiple OSINT platforms, or send suspicious links to an any.run sandbox for analysis.",
    details: [
      "Context-menu and highlight-driven OSINT lookups",
      "Queries multiple threat intelligence platforms simultaneously",
      "One-click submission of URLs to any.run sandbox",
      "Built for speed during incident investigations",
    ],
    tech: ["Chrome Extension APIs", "OSINT Platform APIs", "any.run API", "JavaScript"],
    category: "extension",
  },
  {
    name: "Automated Offboarding Pipeline",
    description:
      "Zero-touch employee offboarding system triggered by a Jira ticket — immediately revokes access from all critical systems, ensuring no lingering permissions after separation.",
    details: [
      "Triggered automatically by a Jira Service Desk ticket",
      "Revokes access across Okta, Google Workspace, and all integrated apps",
      "Immediate execution — no manual steps or delays",
      "Audit trail maintained for compliance",
    ],
    tech: ["Jira API", "Okta API", "Google Workspace", "Python"],
    category: "automation",
  },
  {
    name: "Cloudflare IP Blocklist Action",
    description:
      "GitHub Action that allows the security team to add or remove IPs from a Cloudflare Terraform-managed block list through a simple PR workflow.",
    details: [
      "GitHub Action for easy IP block list management",
      "Integrates with Terraform-managed Cloudflare configuration",
      "PR-based workflow for audit trail and approval",
      "Used by security team for rapid threat response",
    ],
    tech: ["GitHub Actions", "Terraform", "Cloudflare API"],
    category: "automation",
  },
  {
    name: "Automated Access Reviews",
    description:
      "Automated periodic access review system for Okta and Google Workspace — generates reports on user access levels, flags anomalies, and streamlines the review cycle.",
    details: [
      "Automated scheduled access reviews for Okta and Google Workspace",
      "Generates comprehensive access reports",
      "Flags anomalous or excessive permissions",
      "Reduces manual review effort from days to minutes",
    ],
    tech: ["Python", "Okta API", "Google Workspace / GAM"],
    category: "automation",
  },
  {
    name: "Bitcoin Buy/Sell Signal Dashboard",
    description:
      "Client-side Bitcoin trading signal dashboard using an ensemble scoring system — aggregates technical indicators, on-chain metrics, and market sentiment from multiple free APIs into a single buy/sell score with configurable risk tolerance.",
    details: [
      "Ensemble scoring from 4 sub-models: Momentum, Trend, Sentiment, On-Chain",
      "Client-side RSI, MACD, Bollinger Bands, and SMA calculations",
      "Configurable risk tolerance (Conservative / Balanced / Aggressive)",
      "Real-time data from CoinGecko, Mempool, Fear & Greed Index, and more",
      "SVG gauge visualization with confidence metrics",
    ],
    tech: ["JavaScript", "Chart.js", "Tailwind CSS", "CoinGecko API", "Mempool API"],
    category: "dashboard",
    demoUrl: "/demos/btc-dashboard",
  },
  {
    name: "OSINT Lookup Tool",
    description:
      "Chrome extension and interactive web tool for security analysts — paste any IP address, file hash, or domain to instantly generate lookup links across 27+ OSINT platforms with automatic indicator type detection.",
    details: [
      "Auto-detects indicator type: IPv4, IPv6, MD5, SHA-1, SHA-256, SHA-512, domain",
      "Generates links to 27 OSINT platforms (VirusTotal, Shodan, AbuseIPDB, etc.)",
      "Color-coded grouping: blue for IPs, red for hashes, green for domains",
      "One-click submission to any.run sandbox for URL analysis",
    ],
    tech: ["Chrome Extension APIs", "JavaScript", "Regex Validation", "OSINT Platforms"],
    category: "security-tool",
    demoUrl: "/demos/osint-lookup",
  },
  {
    name: "Financial Research Agent",
    description:
      "Multi-agent stock screening and analysis platform — automated pipeline screens for swing trade candidates, runs technical/fundamental/sentiment analysis through specialized AI agents, and tracks paper trading performance.",
    details: [
      "Multi-agent pipeline: screener → analyst → risk manager → portfolio manager",
      "Swing trade setup cards with entry/target/stop prices and R/R ratios",
      "Walk-forward backtesting with win rate and drawdown metrics",
      "Paper trading portfolio with real-time P&L tracking",
      "Streaming progress log showing pipeline execution in real time",
    ],
    tech: ["React", "FastAPI", "LangGraph", "Anthropic API", "OpenBB SDK"],
    category: "web-app",
    demoUrl: "/demos/financial-research",
  },
  {
    name: "Threadlytic",
    description:
      "AI-powered wardrobe management app — upload clothing photos for automatic tagging via vision AI, browse and filter your closet, and get outfit recommendations through a client-side matching algorithm that scores compatibility by color, formality, season, and style.",
    details: [
      "Vision AI auto-tags uploaded clothing (category, color, season, formality)",
      "Client-side outfit matching algorithm with multi-factor scoring",
      "Search, filter, and curate wardrobe items",
      "AI stylist chat with persona selection",
      "Demo mode with read-only wardrobe browsing",
    ],
    tech: ["Next.js", "React", "Supabase", "OpenRouter Vision API", "Tailwind CSS"],
    category: "web-app",
    demoUrl: "/demos/threadlytic",
  },
  {
    name: "Pac-Man ML",
    description:
      "Reinforcement learning environment for training a DQN agent to play Ms. Pac-Man — includes a live training dashboard with WebSocket-streamed game frames, real-time metrics, and interactive controls.",
    details: [
      "DeepMind-style DQN with 4-frame stacking and experience replay",
      "Live game rendering via WebSocket-streamed frames",
      "Real-time training metrics: score, epsilon, loss, rolling averages",
      "Pause/resume training controls with full state persistence",
      "Playable browser demo with keyboard controls",
    ],
    tech: ["Python", "PyTorch", "FastAPI", "Gymnasium (Atari)", "Chart.js"],
    category: "ml-project",
    demoUrl: "/demos/pacman-ml",
  },
];
