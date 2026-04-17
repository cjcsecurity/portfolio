export const profile = {
  name: "CJ Clark",
  title: "Cybersecurity Engineer",
  tagline:
    "I build security tools and automation so teams can move fast without cutting corners on security.",
  about: [
    "I started in IT and systems administration, worked my way into security, and kept building tools the whole time. At every job I've ended up being the person who scripts away the tedious stuff so the team can focus on actual problems.",
    "Most of my day-to-day is automating things that used to be manual: threat intel pipelines, vulnerability reporting, access reviews, phishing campaigns. If a security process involves copying and pasting between three tabs, I'd rather write something that does it in one click.",
    "I'm also the go-to person at my company for AI. I advise leadership on what tools are worth adopting, help engineering teams get started with AI coding agents, and wrote our AI usage policy.",
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
      "Pulls threat intel from AlienVault OTX, extracts IoCs, builds Splunk queries to check if we're affected, and has an LLM write up impact reports that get dropped into Jira automatically.",
    details: [
      "Ingests AlienVault OTX feeds and pulls out IoCs",
      "Generates Splunk queries to check our environment for matches",
      "LLM writes environmental impact reports per threat",
      "Reports auto-created as Jira tickets for the team to triage",
    ],
    tech: ["Python", "AlienVault OTX API", "Splunk", "AI/LLM", "Jira API"],
    category: "security-tool",
  },
  {
    name: "Mac App Governance Dashboard",
    description:
      "Web app that inventories every app installed across our Mac fleet via Kandji, flags anything sketchy or unapproved, and lets you block it in one click.",
    details: [
      "Pulls app inventories from Kandji across the whole fleet",
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
      "Chrome extension I published for our analysts. Highlight an IP or hash on any page, right-click, and it opens lookups across a bunch of OSINT platforms. You can also send URLs straight to any.run.",
    details: [
      "Right-click any IP or hash to query OSINT platforms",
      "Hits multiple threat intel sources at once",
      "One-click URL submission to any.run sandbox",
      "Made to be fast during incident response",
    ],
    tech: ["Chrome Extension APIs", "OSINT Platform APIs", "any.run API", "JavaScript"],
    category: "extension",
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
      "GitHub Action so the security team can add or remove IPs from our Cloudflare block list by opening a PR. Terraform handles the rest.",
    details: [
      "Simple PR workflow to manage blocked IPs",
      "Terraform applies changes to Cloudflare automatically",
      "PR approval gives you a built-in audit trail",
      "Security team uses it for quick threat response",
    ],
    tech: ["GitHub Actions", "Terraform", "Cloudflare API"],
    category: "automation",
  },
  {
    name: "Automated Access Reviews",
    description:
      "Scripts that run our periodic access reviews for Okta and Google Workspace. Generates the reports, flags anything that looks off, and cuts what used to take days down to minutes.",
    details: [
      "Scheduled access reviews for Okta and Google Workspace",
      "Generates access reports automatically",
      "Flags excessive or unusual permissions",
      "Turned a multi-day manual process into minutes",
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
      "A pipeline of AI agents that screens stocks for swing trades. One agent finds candidates, another analyzes them, a risk manager validates, and a portfolio manager outputs the final picks. Includes paper trading.",
    details: [
      "Pipeline: screener, analyst, risk manager, portfolio manager",
      "Trade cards with entry/target/stop and risk-reward ratios",
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
];
