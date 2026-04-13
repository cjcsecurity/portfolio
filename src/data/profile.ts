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
  category: "security-tool" | "automation" | "extension" | "web-app";
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
];
