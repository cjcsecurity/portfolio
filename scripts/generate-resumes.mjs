import pkg from "/home/staycold66/projects/mission-control/node_modules/playwright-core/index.js";
const { chromium } = pkg;
import { writeFileSync } from "fs";

const CSS = `
  @page { size: Letter; margin: 0.5in 0.55in; }
  * { box-sizing: border-box; }
  html, body {
    margin: 0; padding: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 10.2pt; line-height: 1.35;
    color: #1a1a1a; background: #fff;
  }
  h1, h2, h3 { margin: 0; padding: 0; }
  .name { font-size: 26pt; font-weight: 800; letter-spacing: -0.01em; line-height: 1; color: #0a0a0a; }
  .title { margin-top: 4px; font-size: 12pt; color: #5a7a14; font-weight: 600; }
  .contact { margin-top: 6px; font-size: 9.5pt; color: #555; }
  .contact a { color: #555; text-decoration: none; }
  .contact .sep { margin: 0 7px; color: #bbb; }
  .rule { border: 0; border-top: 1.2px solid #d9d9d9; margin: 14px 0 10px; }
  .section-label { font-size: 8.5pt; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #5a7a14; margin-bottom: 8px; }
  .summary p { margin: 0 0 6px 0; color: #333; }
  .pull-quote {
    margin: 8px 0 4px 0; padding: 8px 12px; border-left: 3px solid #5a7a14;
    font-style: italic; color: #444; font-size: 10pt; background: #f7f9f1;
  }
  .job { margin-bottom: 11px; break-inside: avoid; }
  .job-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  .job-title { font-weight: 700; font-size: 10.8pt; }
  .job-company { font-weight: 500; color: #444; }
  .job-period { font-size: 9pt; color: #666; white-space: nowrap; font-variant-numeric: tabular-nums; }
  ul { margin: 5px 0 0 0; padding-left: 18px; }
  ul li { margin-bottom: 2px; color: #333; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .edu-entry { margin-bottom: 6px; }
  .edu-school { font-weight: 700; color: #0a0a0a; }
  .edu-degree { color: #444; }
  .cert-list { margin: 0; padding: 0; list-style: none; color: #333; }
  .cert-list li { margin-bottom: 3px; }
  .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 20px; }
  .skill-group-label { font-weight: 700; font-size: 9.5pt; color: #0a0a0a; margin-bottom: 2px; }
  .skill-group-items { color: #333; font-size: 9.5pt; }
  .ai-project { margin-bottom: 6px; }
  .ai-project-name { font-weight: 700; color: #0a0a0a; font-size: 10.4pt; }
  .ai-project-desc { color: #333; font-size: 9.8pt; }
  .ai-project-tech { color: #666; font-size: 9pt; font-style: italic; margin-top: 1px; }
`;

const CONTACT = `
  Colorado Springs, CO
  <span class="sep">·</span>
  <a href="mailto:christianjclark92@gmail.com">christianjclark92@gmail.com</a>
  <span class="sep">·</span>
  <a href="https://linkedin.com/in/christianclark-9b9606204">linkedin.com/in/christianclark-9b9606204</a>
  <span class="sep">·</span>
  <a href="https://github.com/cjcsecurity">github.com/cjcsecurity</a>
  <span class="sep">·</span>
  <a href="https://cjcsecurity.vercel.app">cjcsecurity.vercel.app</a>
`;

// ────────────────────────── shared content blocks ──────────────────────────

const EDU_BLOCK = `
  <div>
    <div class="section-label">Education</div>
    <div class="edu-entry"><div class="edu-school">Colorado State University</div><div class="edu-degree">B.S., Information Technology</div></div>
    <div class="edu-entry"><div class="edu-school">Red Rocks Community College</div><div class="edu-degree">A.S., Precision Machining</div></div>
  </div>
`;

const CERT_BLOCK = `
  <div>
    <div class="section-label">Certifications</div>
    <ul class="cert-list">
      <li>CompTIA Network+</li>
      <li>CompTIA A+</li>
      <li>Google IT Automation with Python (Professional Certificate)</li>
    </ul>
  </div>
`;

// Job bullets — the full pool. Each variant picks an ordered subset.
const J_PRODSEC = {
  pr_review:        "Gate every merge as the security reviewer on GitHub — authN/authZ, secrets handling, input validation, logging, and data-exposure checks.",
  vuln_reports:     "Produce and automate monthly vulnerability remediation reports — per-team tickets, SLA compliance, open items.",
  wiz_migration:    "Lead migration from ArmorCode to Wiz Code, reworking the vulnerability ticketing pipeline across Jira projects.",
  infra_vulns:      "Investigate infrastructure vulnerabilities in Wiz across AWS — IAM misconfigurations, exposed S3, overprivileged roles, GuardDuty findings — and route remediation to owning teams.",
  ai_advising:      "Advise engineering teams on safe AI coding agent practices with tools like Claude Code and Cline.",
};

const J_CYBERSEC = {
  ai_tools_prod:    "Built and shipped 5–6 internal AI-augmented security tools now running in production at Snapdocs, used daily across Cybersecurity, IT, and Product Security.",
  threat_intel:     "Built internal threat intel pipeline: AlienVault OTX → IoC extraction → Splunk query generation → LLM-written environmental impact reports auto-created as Jira tickets.",
  kandji_app:       "Created Mac app governance web app on top of Kandji — inventories installed apps, auto-flags malicious or non-work software, one-click blocking.",
  osint_ext:        "Published an OSINT Chrome extension to the Chrome Web Store — right-click any IP or hash to query multiple platforms; one-click any.run sandbox submission.",
  phishing:         "Owned end-to-end phishing training program via KnowBe4: custom templates, campaigns, repeat-offender escalation, quarterly all-hands presentations.",
  dlp:              "Deployed and maintained DLP across CrowdStrike, Fortinet, Code42, and Google Workspace with custom content inspection patterns.",
  ai_expert:        "Company AI Expert — advises leadership on AI tooling, introduced AI coding agents to engineering, authored the AI usage policy, runs seminars on agentic tools.",
  splunk_alerts:    "Built custom Splunk alerts and correlation searches piped into Slack; automated Okta and Google Workspace access reviews.",
  cf_tf_action:     "Created GitHub Action for Cloudflare Terraform-managed IP block list management.",
  slack_apps:       "Built custom Slack apps for internal security workflows.",
  incident_triage:  "Led incident triage across severity levels; on cybersecurity on-call rotation; ran cybersecurity and IT tabletop exercises.",
  vendor_eval:      "Evaluated security vendors — ran PoCs and delivered technical go/no-go recommendations.",
};

const J_SRSYS = [
  "Overhauled onboarding workflow, cutting manual tasks by ~80%.",
  "Created automated offboarding pipeline — immediate revocation from all critical systems triggered by a Jira ticket.",
  "Completed multiple Okta SSO integrations; automated access requests with Okta Workflows tied to Jira Service Desk.",
  "Rolled out a new DLP program across the entire Mac fleet using custom Bash scripts, Kandji blueprints, and Auto Apps.",
  "Supported 100% remote workforce; maintained zero trust network via SonicWall Cloud Secure Edge; ~95% SLA on Tier 3 support.",
];

const J_ORTHO = [
  "Wrote Python and PowerShell automation for user provisioning, patch compliance, and asset reporting — cut recurring ticket volume on those categories.",
  "Administered hundreds of systems across Windows, macOS, iOS, and Linux using multiple directory platforms.",
  "Cut hardware and software costs by ~20% through vendor renegotiations and lifecycle tracking.",
  "Created and maintained the VM fleet for dev/test and CI/CD; rebuilt asset tracking and forecasting workflow.",
];

const J_48HR = [
  "Built and managed a Shopify storefront; ran SEO and social campaigns to drive online sales growth.",
  "Wrote Python web-scraping scripts for competitive market data and order-processing automation.",
  "Implemented custom order management workflows using Google Sheets and internal tooling.",
];

function jobBlock(title, company, period, bullets) {
  return `
    <div class="job">
      <div class="job-head">
        <div><span class="job-title">${title}</span> · <span class="job-company">${company}</span></div>
        <div class="job-period">${period}</div>
      </div>
      <ul>${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
    </div>
  `;
}

// ────────────────────────── variants ──────────────────────────

const SKILLS = {
  aiAgents:     ["Claude Code", "Cline", "Roo", "Cursor", "Anthropic API", "OpenAI API", "OpenRouter", "LangChain / LangGraph", "Chroma", "MCP (Model Context Protocol)", "Vercel AI SDK", "Custom skills & hooks"],
  secInfra:     ["Okta (SSO, Workflows)", "CrowdStrike (EDR & DLP)", "Wiz (Cloud Security)", "Splunk (SIEM)", "KnowBe4", "Fortinet DLP", "Code42", "Cloudflare", "SonicWall CSE", "AlienVault OTX"],
  appsec:       ["Secure code review", "SAST / DAST concepts", "SDLC security", "Vulnerability management", "Wiz Code", "ArmorCode (migrated from)", "Threat modeling"],
  languages:    ["Python", "TypeScript / JavaScript", "Bash", "PowerShell", "Chrome Extension APIs", "REST APIs"],
  platforms:    ["AWS", "Terraform", "GitHub Actions", "Jira", "Kandji (MDM)", "Google Workspace / GAM", "Slack (custom apps)", "Apple Business Manager"],
  os:           ["macOS", "Linux", "Windows", "iOS"],
};

function skillRow(label, items) {
  return `<div><div class="skill-group-label">${label}</div><div class="skill-group-items">${items.join(", ")}</div></div>`;
}

// ──── Cybersec variant ────
const CYBERSEC = {
  title: "Cybersecurity Engineer",
  summary: `Cybersecurity engineer with a background in IT and systems administration. I build internal security tools and automation — threat intel pipelines, DLP across four platforms, phishing-program ownership, detection engineering — so security teams spend less time on toil and more time on actual threats. Company AI Expert at Snapdocs: advised leadership on AI adoption, onboarded engineering to AI coding agents, authored the AI usage policy.`,
  experience: [
    jobBlock("Cybersecurity Engineer", "Snapdocs", "Apr 2024 — Present", [
      J_CYBERSEC.threat_intel, J_CYBERSEC.dlp, J_CYBERSEC.phishing, J_CYBERSEC.splunk_alerts,
      J_CYBERSEC.osint_ext, J_CYBERSEC.kandji_app, J_CYBERSEC.incident_triage, J_CYBERSEC.ai_expert, J_CYBERSEC.vendor_eval,
    ]),
    jobBlock("Product Security Engineer", "Snapdocs", "2025 — Present", [
      J_PRODSEC.pr_review, J_PRODSEC.vuln_reports, J_PRODSEC.wiz_migration, J_PRODSEC.infra_vulns,
    ]),
    jobBlock("Senior System Administrator", "Snapdocs", "Jul 2023 — Oct 2024", J_SRSYS),
    jobBlock("Systems Administrator", "OrthoFi", "Apr 2022 — Jul 2023", J_ORTHO),
    jobBlock("E-commerce Operations Specialist", "48 Hour Monogram", "Aug 2018 — Jan 2022", J_48HR),
  ],
  skills: [
    skillRow("Security &amp; Infra", SKILLS.secInfra),
    skillRow("Languages &amp; Scripting", SKILLS.languages),
    skillRow("Platforms &amp; Tools", SKILLS.platforms),
    skillRow("Operating Systems", SKILLS.os),
  ],
  aiProjectsBlock: "",
  pullQuote: "",
};

// ──── ProdSec variant ────
const PRODSEC = {
  title: "Product Security Engineer",
  summary: `Product security engineer embedded in the SDLC at Snapdocs — security-required PR reviews, vulnerability management, and AWS cloud infrastructure scanning via Wiz. Leading the ArmorCode → Wiz Code migration and the Jira vulnerability ticketing rework. Partner with engineering on threat modeling, secure coding guidance, and vuln SLAs.`,
  experience: [
    jobBlock("Product Security Engineer", "Snapdocs", "2025 — Present", [
      J_PRODSEC.pr_review, J_PRODSEC.vuln_reports, J_PRODSEC.wiz_migration, J_PRODSEC.infra_vulns, J_PRODSEC.ai_advising,
    ]),
    jobBlock("Cybersecurity Engineer", "Snapdocs", "Apr 2024 — Present", [
      J_CYBERSEC.threat_intel, J_CYBERSEC.kandji_app, J_CYBERSEC.osint_ext, J_CYBERSEC.dlp,
      J_CYBERSEC.phishing, J_CYBERSEC.splunk_alerts, J_CYBERSEC.ai_expert, J_CYBERSEC.vendor_eval,
    ]),
    jobBlock("Senior System Administrator", "Snapdocs", "Jul 2023 — Oct 2024", J_SRSYS),
    jobBlock("Systems Administrator", "OrthoFi", "Apr 2022 — Jul 2023", J_ORTHO),
    jobBlock("E-commerce Operations Specialist", "48 Hour Monogram", "Aug 2018 — Jan 2022", J_48HR),
  ],
  skills: [
    skillRow("AppSec &amp; Vuln Mgmt", SKILLS.appsec),
    skillRow("Security &amp; Infra", SKILLS.secInfra),
    skillRow("Languages &amp; Scripting", SKILLS.languages),
    skillRow("Platforms &amp; Tools", SKILLS.platforms),
  ],
  aiProjectsBlock: "",
  pullQuote: "",
};

// ──── AI SWE variant ────
const AI_PROJECTS_HTML = `
  <div class="ai-project">
    <div class="ai-project-name">DocSiphon — RAG documentation assistant</div>
    <div class="ai-project-desc">Multi-provider LLM factory with OpenRouter fallback, LangChain orchestration, Chroma vector store, Streamlit UI.</div>
    <div class="ai-project-tech">Python · LangChain · Chroma · OpenRouter · LiteLLM · Streamlit</div>
  </div>
  <div class="ai-project">
    <div class="ai-project-name">SecureCatch — phishing triage SOAR</div>
    <div class="ai-project-desc">Claude-powered email classification via OpenRouter, structured JSON output with temperature-tuned determinism, automated OSINT enrichment.</div>
    <div class="ai-project-tech">Next.js · TypeScript · Anthropic API · OpenRouter · Prisma</div>
  </div>
  <div class="ai-project">
    <div class="ai-project-name">Threat Intel Pipeline (production at Snapdocs)</div>
    <div class="ai-project-desc">AlienVault OTX → IoC extraction → Splunk query generation → LLM-written environmental impact reports auto-created as Jira tickets.</div>
    <div class="ai-project-tech">Python · Splunk · Anthropic API · Jira API</div>
  </div>
  <div class="ai-project">
    <div class="ai-project-name">Financial Research Agent</div>
    <div class="ai-project-desc">Multi-agent pipeline (screener → analyst → risk manager → portfolio manager) for swing-trade candidate generation with backtesting and paper trading.</div>
    <div class="ai-project-tech">React · FastAPI · LangGraph · Anthropic API · OpenBB SDK</div>
  </div>
  <div class="ai-project">
    <div class="ai-project-name">OSINT Chrome Extension (Chrome Web Store)</div>
    <div class="ai-project-desc">Published analyst productivity tool — right-click any IP/hash to query 27+ OSINT platforms; one-click any.run sandbox submission. Built entirely with AI coding agents.</div>
    <div class="ai-project-tech">Chrome Extension APIs · JavaScript · OSINT Platform APIs</div>
  </div>
`;

const AI_SWE = {
  title: "AI Software Engineer",
  summary: `Software engineer using AI coding agents as a core part of my practice since 2022 — started by copy-pasting from ChatGPT into VS Code pre-Copilot-GA. Today I run a dedicated 24/7 Claude Code harness with scheduled autonomous tasks, controlled remotely over Discord. I build with the APIs, not just the IDE tooling: shipped RAG systems, LLM-driven security platforms, and multi-agent pipelines. Company AI Expert at Snapdocs: authored the AI usage policy, onboarded engineering to Claude Code and Cline.`,
  experience: [
    jobBlock("Product Security Engineer", "Snapdocs", "2025 — Present", [
      J_PRODSEC.ai_advising, J_PRODSEC.pr_review, J_PRODSEC.vuln_reports, J_PRODSEC.wiz_migration, J_PRODSEC.infra_vulns,
    ]),
    jobBlock("Cybersecurity Engineer", "Snapdocs", "Apr 2024 — Present", [
      J_CYBERSEC.ai_tools_prod, J_CYBERSEC.ai_expert, J_CYBERSEC.threat_intel, J_CYBERSEC.kandji_app,
      J_CYBERSEC.osint_ext, J_CYBERSEC.splunk_alerts, J_CYBERSEC.phishing, J_CYBERSEC.dlp, J_CYBERSEC.vendor_eval,
    ]),
    jobBlock("Senior System Administrator", "Snapdocs", "Jul 2023 — Oct 2024", J_SRSYS),
    jobBlock("Systems Administrator", "OrthoFi", "Apr 2022 — Jul 2023", J_ORTHO),
    jobBlock("E-commerce Operations Specialist", "48 Hour Monogram", "Aug 2018 — Jan 2022", J_48HR),
  ],
  skills: [
    skillRow("AI Tools &amp; Agents", SKILLS.aiAgents),
    skillRow("Languages &amp; Scripting", SKILLS.languages),
    skillRow("Security &amp; Infra", SKILLS.secInfra),
    skillRow("Platforms &amp; Tools", SKILLS.platforms),
  ],
  aiProjectsBlock: `
    <hr class="rule" />
    <section>
      <div class="section-label">Selected AI Projects</div>
      ${AI_PROJECTS_HTML}
    </section>
  `,
  pullQuote: "",
};

// ────────────────────────── HTML assembly ──────────────────────────

function buildHTML(v) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>CJ Clark — ${v.title} — Resume</title>
  <style>${CSS}</style>
</head>
<body>
  <header>
    <div class="name">CJ Clark</div>
    <div class="title">${v.title}</div>
    <div class="contact">${CONTACT}</div>
  </header>

  <hr class="rule" />

  <section class="summary">
    <div class="section-label">Summary</div>
    <p>${v.summary}</p>
    ${v.pullQuote}
  </section>

  <hr class="rule" />

  <section>
    <div class="section-label">Experience</div>
    ${v.experience.join("")}
  </section>

  ${v.aiProjectsBlock}

  <hr class="rule" />

  <section class="two-col">
    ${EDU_BLOCK}
    ${CERT_BLOCK}
  </section>

  <hr class="rule" />

  <section>
    <div class="section-label">Skills</div>
    <div class="skills-grid">${v.skills.join("")}</div>
  </section>
</body>
</html>`;
}

// ────────────────────────── render ──────────────────────────

const browser = await chromium.launch({
  executablePath: "/home/staycold66/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome",
  headless: true,
});

const ctx = await browser.newContext();
const page = await ctx.newPage();

const variants = [
  { key: "cybersec", data: CYBERSEC },
  { key: "prodsec", data: PRODSEC },
  { key: "ai-swe", data: AI_SWE },
];

for (const v of variants) {
  const html = buildHTML(v.data);
  const tmpPath = `/tmp/resume-${v.key}.html`;
  writeFileSync(tmpPath, html);
  await page.goto(`file://${tmpPath}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(200);
  const pdfPath = `/home/staycold66/projects/PortfolioWebsite/public/cj-clark-resume-${v.key}.pdf`;
  await page.pdf({
    path: pdfPath,
    format: "Letter",
    printBackground: true,
    margin: { top: "0.5in", right: "0.55in", bottom: "0.5in", left: "0.55in" },
    preferCSSPageSize: true,
  });
  console.log(`Wrote ${pdfPath}`);
}

await ctx.close();
await browser.close();
