"use client";

import { useState, useCallback, useMemo } from "react";

/* ── Indicator type detection ────────────────────── */

type IndicatorType = "IPv4" | "MD5" | "SHA-1" | "SHA-256" | "Domain" | "Unknown";

const REGEXES: [IndicatorType, RegExp][] = [
  [
    "IPv4",
    /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/,
  ],
  ["MD5", /^[a-fA-F0-9]{32}$/],
  ["SHA-1", /^[a-fA-F0-9]{40}$/],
  ["SHA-256", /^[a-fA-F0-9]{64}$/],
  [
    "Domain",
    /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i,
  ],
];

function detectType(value: string): IndicatorType {
  const trimmed = value.trim();
  if (!trimmed) return "Unknown";
  for (const [type, re] of REGEXES) {
    if (re.test(trimmed)) return type;
  }
  return "Unknown";
}

/* ── Platform definitions ────────────────────────── */

interface Platform {
  name: string;
  description: string;
  url: (indicator: string) => string;
}

const IP_PLATFORMS: Platform[] = [
  { name: "AbuseIPDB", description: "Community-driven IP abuse reports", url: (v) => `https://www.abuseipdb.com/check/${v}` },
  { name: "VirusTotal", description: "Multi-engine antivirus scan results", url: (v) => `https://www.virustotal.com/gui/ip-address/${v}` },
  { name: "Shodan", description: "Internet-connected device search engine", url: (v) => `https://www.shodan.io/host/${v}` },
  { name: "GreyNoise", description: "Internet background noise analysis", url: (v) => `https://viz.greynoise.io/ip/${v}` },
  { name: "Censys", description: "Internet-wide scan data and certificates", url: (v) => `https://search.censys.io/hosts/${v}` },
  { name: "AlienVault OTX", description: "Open threat intelligence community", url: (v) => `https://otx.alienvault.com/indicator/ip/${v}` },
  { name: "IBM X-Force", description: "Threat intelligence sharing platform", url: (v) => `https://exchange.xforce.ibmcloud.com/ip/${v}` },
  { name: "Talos Intelligence", description: "Cisco threat intelligence and reputation", url: (v) => `https://talosintelligence.com/reputation_center/lookup?search=${v}` },
  { name: "IPVoid", description: "IP address blacklist and reputation check", url: (v) => `https://www.ipvoid.com/scan/${v}` },
  { name: "URLScan.io", description: "Website scanning and analysis service", url: (v) => `https://urlscan.io/ip/${v}` },
  { name: "IPQualityScore", description: "Proxy, VPN, and fraud detection", url: (v) => `https://www.ipqualityscore.com/free-ip-lookup-proxy-vpn-test/lookup/${v}` },
];

const HASH_PLATFORMS: Platform[] = [
  { name: "VirusTotal", description: "Multi-engine antivirus scan results", url: (v) => `https://www.virustotal.com/gui/file/${v}` },
  { name: "Malware Bazaar", description: "Malware sample sharing by abuse.ch", url: (v) => `https://bazaar.abuse.ch/sample/${v}` },
  { name: "AlienVault OTX", description: "Open threat intelligence community", url: (v) => `https://otx.alienvault.com/indicator/file/${v}` },
  { name: "IBM X-Force", description: "Threat intelligence sharing platform", url: (v) => `https://exchange.xforce.ibmcloud.com/malware/${v}` },
  { name: "Hybrid Analysis", description: "Free malware analysis sandbox", url: (v) => `https://www.hybrid-analysis.com/search?query=${v}` },
  { name: "ThreatMiner", description: "Threat intelligence data mining", url: (v) => `https://www.threatminer.org/sample.php?q=${v}` },
];

const DOMAIN_PLATFORMS: Platform[] = [
  { name: "VirusTotal", description: "Multi-engine antivirus scan results", url: (v) => `https://www.virustotal.com/gui/domain/${v}` },
  { name: "URLScan.io", description: "Website scanning and analysis service", url: (v) => `https://urlscan.io/domain/${v}` },
  { name: "Censys", description: "Certificate and host search", url: (v) => `https://censys.io/certificates?q=${v}` },
  { name: "AlienVault OTX", description: "Open threat intelligence community", url: (v) => `https://otx.alienvault.com/indicator/domain/${v}` },
  { name: "IBM X-Force", description: "Threat intelligence sharing platform", url: (v) => `https://exchange.xforce.ibmcloud.com/url/${v}` },
  { name: "Talos Intelligence", description: "Cisco threat intelligence and reputation", url: (v) => `https://talosintelligence.com/reputation_center/lookup?search=${v}` },
  { name: "SecurityTrails", description: "Historical DNS and WHOIS data", url: (v) => `https://securitytrails.com/domain/${v}` },
  { name: "DomainTools", description: "Domain registration and WHOIS lookup", url: (v) => `https://whois.domaintools.com/${v}` },
];

function getPlatforms(type: IndicatorType): { platforms: Platform[]; accent: string; label: string } | null {
  switch (type) {
    case "IPv4":
      return { platforms: IP_PLATFORMS, accent: "#3b82f6", label: "IP Platforms" };
    case "MD5":
    case "SHA-1":
    case "SHA-256":
      return { platforms: HASH_PLATFORMS, accent: "#ef4444", label: "Hash Platforms" };
    case "Domain":
      return { platforms: DOMAIN_PLATFORMS, accent: "#22c55e", label: "Domain Platforms" };
    default:
      return null;
  }
}

/* ── Sample indicators ───────────────────────────── */

const SAMPLES = [
  { value: "8.8.8.8", label: "IPv4" },
  { value: "44d88612fea8a8f36de82e1278abb02f", label: "MD5" },
  { value: "da39a3ee5e6b4b0d3255bfef95601890afd80709", label: "SHA-1" },
  { value: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", label: "SHA-256" },
  { value: "example.com", label: "Domain" },
];

/* ── Badge color helper ──────────────────────────── */

function badgeStyle(type: IndicatorType): { bg: string; text: string; border: string } {
  switch (type) {
    case "IPv4":
      return { bg: "rgba(59,130,246,0.1)", text: "#60a5fa", border: "rgba(59,130,246,0.3)" };
    case "MD5":
    case "SHA-1":
    case "SHA-256":
      return { bg: "rgba(239,68,68,0.1)", text: "#f87171", border: "rgba(239,68,68,0.3)" };
    case "Domain":
      return { bg: "rgba(34,197,94,0.1)", text: "#4ade80", border: "rgba(34,197,94,0.3)" };
    default:
      return { bg: "rgba(139,143,163,0.1)", text: "#8b8fa3", border: "rgba(139,143,163,0.3)" };
  }
}

/* ── External link icon ──────────────────────────── */

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* ── Search icon ─────────────────────────────────── */

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-fg-dim"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/* ── Main component ──────────────────────────────── */

export default function OsintLookupPage() {
  const [input, setInput] = useState("");
  const [analyzedValue, setAnalyzedValue] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const currentType = useMemo(() => detectType(input), [input]);
  const isValid = currentType !== "Unknown";

  const handleAnalyze = useCallback(() => {
    if (!isValid) return;
    setAnalyzedValue(input.trim());
    setShowResults(true);
  }, [input, isValid]);

  const handleSample = useCallback((value: string) => {
    setInput(value);
    setAnalyzedValue(value);
    setShowResults(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && isValid) handleAnalyze();
    },
    [isValid, handleAnalyze],
  );

  const resultData = useMemo(() => {
    if (!analyzedValue) return null;
    const type = detectType(analyzedValue);
    return getPlatforms(type);
  }, [analyzedValue]);

  const badge = badgeStyle(currentType);

  return (
    <div className="mt-12 space-y-10">
      {/* ── Header ──────────────────────────────── */}
      <header>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-fg">
          OSINT Lookup Tool
        </h1>
        <p className="mt-3 text-fg-dim text-sm sm:text-base max-w-2xl leading-relaxed">
          Paste any indicator to generate lookup links across 25+ threat
          intelligence platforms
        </p>
      </header>

      {/* ── Input section ───────────────────────── */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setShowResults(false);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter an IP address, file hash, or domain..."
              className="w-full pl-12 pr-4 py-3.5 bg-bg-surface border border-border rounded-lg font-mono text-sm text-fg placeholder:text-fg-dim/50 focus:outline-none focus:border-accent-dim focus:ring-1 focus:ring-accent-dim/30 transition-colors"
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={!isValid}
            className="px-6 py-3.5 bg-accent text-bg font-display font-bold text-sm uppercase tracking-wider rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 active:brightness-95 transition-all shrink-0"
          >
            Analyze
          </button>
        </div>

        {/* Type badge */}
        <div className="flex items-center gap-3">
          <span className="text-fg-dim text-xs font-mono">Detected type:</span>
          <span
            className="px-2.5 py-1 text-xs font-mono font-semibold rounded-md border"
            style={{
              backgroundColor: badge.bg,
              color: badge.text,
              borderColor: badge.border,
            }}
          >
            {currentType}
          </span>
        </div>
      </section>

      {/* ── Sample indicators ───────────────────── */}
      <section>
        <h2 className="section-heading mb-4">Sample Indicators</h2>
        <div className="flex flex-wrap gap-2">
          {SAMPLES.map((s) => {
            const sStyle = badgeStyle(s.label as IndicatorType);
            return (
              <button
                key={s.value}
                onClick={() => handleSample(s.value)}
                className="group flex items-center gap-2 px-3 py-2 bg-bg-surface border border-border rounded-lg hover:border-border-hover transition-colors cursor-pointer"
              >
                <span
                  className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border"
                  style={{
                    backgroundColor: sStyle.bg,
                    color: sStyle.text,
                    borderColor: sStyle.border,
                  }}
                >
                  {s.label}
                </span>
                <span className="font-mono text-xs text-fg-dim group-hover:text-fg transition-colors truncate max-w-[260px]">
                  {s.value}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Results ─────────────────────────────── */}
      {showResults && resultData && analyzedValue && (
        <section
          className="space-y-6"
          style={{ animation: "fadeSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both" }}
        >
          {/* Results header */}
          <div className="flex items-center gap-3">
            <h2
              className="font-display text-lg font-bold"
              style={{ color: resultData.accent }}
            >
              {resultData.label}
            </h2>
            <span
              className="px-2 py-0.5 text-xs font-mono font-semibold rounded-md border"
              style={{
                backgroundColor: `${resultData.accent}15`,
                color: resultData.accent,
                borderColor: `${resultData.accent}40`,
              }}
            >
              Opening {resultData.platforms.length} platforms
            </span>
          </div>

          {/* Analyzed indicator */}
          <div className="px-4 py-3 bg-bg-surface border border-border rounded-lg">
            <span className="text-fg-dim text-xs font-mono">Indicator: </span>
            <span className="font-mono text-sm text-fg break-all">
              {analyzedValue}
            </span>
          </div>

          {/* Platform cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {resultData.platforms.map((platform, i) => (
              <a
                key={platform.name}
                href={platform.url(analyzedValue)}
                target="_blank"
                rel="noopener noreferrer"
                className="group glow-card flex items-start gap-3 p-4 bg-bg-surface border border-border rounded-lg hover:border-border-hover transition-all"
                style={{
                  animation: `fadeSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s both`,
                }}
              >
                {/* Accent bar */}
                <div
                  className="w-1 h-10 rounded-full shrink-0 mt-0.5"
                  style={{ backgroundColor: resultData.accent }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-semibold text-fg group-hover:text-accent transition-colors">
                      {platform.name}
                    </span>
                    <ExternalLinkIcon />
                  </div>
                  <p className="text-xs text-fg-dim mt-1 leading-relaxed">
                    {platform.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ── Inline keyframes ────────────────────── */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
