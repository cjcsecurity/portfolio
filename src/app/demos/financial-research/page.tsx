"use client";

import { useState, useRef, useCallback } from "react";

/* ── Mock Data ────────────────────────────────────── */

const LOG_EVENTS = [
  { time: "10:30:45", agent: null, text: "Pipeline started — screening 500+ tickers" },
  { time: "10:30:47", agent: "Screener agent", text: "Applying technical filters..." },
  { time: "10:30:49", agent: "Screener agent", text: "Found 12 candidates passing volume/momentum filters" },
  { time: "10:30:51", agent: null, text: "Running multi-agent analysis on top candidates..." },
  { time: "10:30:53", agent: "Analyst agent", text: "NVDA — momentum breakout detected" },
  { time: "10:30:55", agent: "Analyst agent", text: "TSLA — oversold bounce setup" },
  { time: "10:30:57", agent: "Analyst agent", text: "AAPL — range consolidation break" },
  { time: "10:30:59", agent: "Analyst agent", text: "MSFT — trend continuation" },
  { time: "10:31:01", agent: "Risk manager", text: "Validating setups and calculating position sizes..." },
  { time: "10:31:03", agent: "Portfolio manager", text: "Generating final recommendations" },
  { time: "10:31:05", agent: null, text: "Pipeline complete — 4 swing trade candidates ready" },
];

interface StockCard {
  ticker: string;
  decision: "BUY" | "HOLD";
  grade: "A" | "B";
  entry: number;
  target: number;
  stop: number;
  confidence: number;
  atr: string;
  relVol: string;
  setup: string;
  horizon: string;
  winRate: string;
  instances: number;
  avgReturn: string;
  avgDrawdown: string;
  marketAnalysis: string;
  sentimentAnalysis: string;
  finalDecision: string;
}

const STOCKS: StockCard[] = [
  {
    ticker: "NVDA",
    decision: "BUY",
    grade: "A",
    entry: 875,
    target: 985,
    stop: 820,
    confidence: 78,
    atr: "3.2%",
    relVol: "1.8x",
    setup: "Momentum Breakout",
    horizon: "5-10 days",
    winRate: "64%",
    instances: 18,
    avgReturn: "+8.4%",
    avgDrawdown: "-3.1%",
    marketAnalysis:
      "NVDA is showing strong momentum following its recent earnings beat. The stock has broken above a key resistance level at $860, supported by elevated volume and a rising 20-day EMA. Sector rotation into semiconductors adds a tailwind to this setup.",
    sentimentAnalysis:
      "Social media sentiment is overwhelmingly bullish with a 4.2x positive-to-negative ratio. Institutional flow data shows net buying over the past 5 sessions. Options market is pricing in elevated implied volatility ahead of the next product launch event.",
    finalDecision:
      "Strong BUY recommendation based on the confluence of technical breakout, positive sentiment, and sector momentum. The 2:1 risk-reward ratio with a well-defined stop below the breakout level makes this a high-conviction swing trade.",
  },
  {
    ticker: "TSLA",
    decision: "BUY",
    grade: "B",
    entry: 168,
    target: 195,
    stop: 152,
    confidence: 72,
    atr: "4.1%",
    relVol: "1.5x",
    setup: "Oversold Bounce",
    horizon: "7-14 days",
    winRate: "58%",
    instances: 22,
    avgReturn: "+6.9%",
    avgDrawdown: "-4.2%",
    marketAnalysis:
      "TSLA has pulled back to the 200-day SMA after an extended sell-off. RSI(14) has dropped below 30, indicating oversold conditions. The stock is finding support near a historical demand zone between $160 and $170, with volume declining on the recent drop.",
    sentimentAnalysis:
      "Retail sentiment has shifted from bearish to cautiously neutral. Short interest remains elevated at 3.8% of float, creating potential for a short squeeze. Recent delivery numbers exceeded street estimates, providing a fundamental catalyst.",
    finalDecision:
      "BUY on the oversold bounce setup. The entry near the 200-day SMA with a stop below the demand zone offers an acceptable risk profile. The wider stop requires smaller position sizing to maintain risk parameters.",
  },
  {
    ticker: "AAPL",
    decision: "BUY",
    grade: "A",
    entry: 198,
    target: 218,
    stop: 188,
    confidence: 81,
    atr: "1.8%",
    relVol: "1.3x",
    setup: "Range Break",
    horizon: "5-8 days",
    winRate: "67%",
    instances: 15,
    avgReturn: "+5.2%",
    avgDrawdown: "-2.4%",
    marketAnalysis:
      "AAPL has consolidated in a tight range between $190 and $200 for the past three weeks. The narrowing Bollinger Bands and declining ATR suggest an imminent breakout. The stock is positioned above both the 50-day and 200-day moving averages, confirming the bullish trend structure.",
    sentimentAnalysis:
      "Sentiment is moderately bullish with analyst consensus maintaining a $225 median price target. Upcoming WWDC event provides a near-term catalyst. Institutional ownership remains stable with minimal insider selling reported in recent filings.",
    finalDecision:
      "Strong BUY on the range consolidation breakout. AAPL's low volatility setup offers excellent risk-reward with a tight stop. The highest confidence rating in the batch reflects the clean technical setup and supportive fundamentals.",
  },
  {
    ticker: "MSFT",
    decision: "HOLD",
    grade: "B",
    entry: 415,
    target: 455,
    stop: 395,
    confidence: 75,
    atr: "1.6%",
    relVol: "1.1x",
    setup: "Trend Continuation",
    horizon: "7-12 days",
    winRate: "61%",
    instances: 20,
    avgReturn: "+5.8%",
    avgDrawdown: "-2.8%",
    marketAnalysis:
      "MSFT is in a steady uptrend, recently pulling back to the 21-day EMA after hitting new highs. The pullback volume is below average, indicating healthy consolidation rather than distribution. Cloud revenue growth continues to accelerate, providing fundamental support for the trend.",
    sentimentAnalysis:
      "Analyst sentiment is broadly positive with 42 buy ratings versus 5 holds. AI-related catalysts continue to drive narrative momentum. However, the stock is trading at a premium valuation which could limit near-term upside if broader market weakens.",
    finalDecision:
      "HOLD recommendation — the setup is technically sound but the entry timing is less optimal compared to other candidates. Consider entering on a dip to the $410 level for better risk-reward. Current R/R of 2:1 is acceptable but not compelling given the premium valuation.",
  },
];

const TRADES = [
  { ticker: "NVDA", entry: 830, current: 873.16, returnPct: 5.2, status: "Open", date: "2024-03-08", isOpen: true },
  { ticker: "AAPL", entry: 192, current: 195.46, returnPct: 1.8, status: "Open", date: "2024-03-10", isOpen: true },
  { ticker: "AMZN", entry: 182, current: 178.18, returnPct: -2.1, status: "Open", date: "2024-03-11", isOpen: true },
  { ticker: "META", entry: 480, current: 540, returnPct: 12.5, status: "Target Hit", date: "2024-02-28", isOpen: false },
  { ticker: "GOOGL", entry: 142, current: 148.82, returnPct: 4.8, status: "Target Hit", date: "2024-02-20", isOpen: false },
  { ticker: "AMD", entry: 178, current: 172.3, returnPct: -3.2, status: "Stop Hit", date: "2024-03-01", isOpen: false },
];

/* ── Component ────────────────────────────────────── */

export default function FinancialResearchPage() {
  const [mainTab, setMainTab] = useState<"analysis" | "portfolio">("analysis");
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [logLines, setLogLines] = useState<typeof LOG_EVENTS>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [tradeFilter, setTradeFilter] = useState<"all" | "open" | "closed">("all");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runPipeline = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    setIsComplete(false);
    setLogLines([]);

    let i = 0;
    const tick = () => {
      if (i < LOG_EVENTS.length) {
        const event = LOG_EVENTS[i];
        i++;
        setLogLines((prev) => [...prev, event]);
        timerRef.current = setTimeout(tick, 400);
      } else {
        setIsRunning(false);
        setIsComplete(true);
      }
    };
    timerRef.current = setTimeout(tick, 300);
  }, [isRunning]);

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const pctChange = (entry: number, target: number) => (((target - entry) / entry) * 100).toFixed(1);

  const filteredTrades =
    tradeFilter === "all"
      ? TRADES
      : tradeFilter === "open"
        ? TRADES.filter((t) => t.isOpen)
        : TRADES.filter((t) => !t.isOpen);

  return (
    <div className="mt-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Financial Research Agent
        </h1>
        <p className="text-fg-dim mt-1">
          AI agents screen stocks and build swing trade setups
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {(["analysis", "portfolio"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setMainTab(tab)}
            className={`px-4 py-2 text-sm font-display font-semibold uppercase tracking-wider transition-colors ${
              mainTab === tab
                ? "text-accent border-b-2 border-accent"
                : "text-fg-dim hover:text-fg"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── ANALYSIS TAB ──────────────────────────── */}
      {mainTab === "analysis" && (
        <div className="space-y-6">
          {/* Run button */}
          <div className="flex items-center gap-4">
            <button
              onClick={runPipeline}
              disabled={isRunning}
              className="flex items-center gap-2 bg-accent text-[#07080f] font-display font-bold text-sm uppercase tracking-wider px-5 py-2.5 rounded-lg hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isRunning ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Running...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Run Analysis
                </>
              )}
            </button>
            {isComplete && (
              <span className="text-sm text-green-400 font-mono">
                Analysis Complete — 4 candidates found
              </span>
            )}
          </div>

          {/* Progress Log */}
          {logLines.length > 0 && (
            <div className="rounded-xl border border-border bg-[#06070c] p-4 font-mono text-xs leading-relaxed max-h-72 overflow-y-auto">
              {logLines.map((line, i) => (
                <div key={i} className="py-0.5">
                  <span className="text-fg-dim">[{line.time}]</span>{" "}
                  {line.agent ? (
                    <>
                      <span className="text-accent">{line.agent}:</span>{" "}
                      <span className="text-fg">{line.text}</span>
                    </>
                  ) : (
                    <span className="text-fg">{line.text}</span>
                  )}
                </div>
              ))}
              {isRunning && (
                <span className="inline-block w-2 h-3.5 bg-accent/70 animate-pulse ml-1" />
              )}
            </div>
          )}

          {/* Stock Report Cards */}
          {isComplete &&
            STOCKS.map((stock) => (
              <div
                key={stock.ticker}
                className="rounded-xl border border-border bg-bg-surface p-6 space-y-5 glow-card"
              >
                {/* Header row */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-display text-2xl font-bold tracking-tight">
                    {stock.ticker}
                  </span>
                  <span
                    className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded ${
                      stock.decision === "BUY"
                        ? "bg-green-500/15 text-green-400 border border-green-500/30"
                        : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {stock.decision}
                  </span>
                  <span className="w-7 h-7 flex items-center justify-center rounded border border-accent/40 text-accent font-mono text-sm font-bold">
                    {stock.grade}
                  </span>
                </div>

                {/* Price Ladder */}
                <div className="flex items-stretch gap-3">
                  <div className="w-1.5 rounded-full bg-gradient-to-b from-green-500 via-fg/60 to-red-500 shrink-0" />
                  <div className="flex flex-col justify-between text-sm font-mono gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">Target</span>
                      <span className="text-fg font-semibold">${stock.target}</span>
                      <span className="text-green-400 text-xs">
                        (+{pctChange(stock.entry, stock.target)}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-fg-dim">Entry</span>
                      <span className="text-fg font-semibold">${stock.entry}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-400">Stop</span>
                      <span className="text-fg font-semibold">${stock.stop}</span>
                      <span className="text-red-400 text-xs">
                        (-{pctChange(stock.stop, stock.entry)}%)
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center font-mono text-sm text-fg-dim">
                    R/R{" "}
                    <span className="text-accent ml-1 font-semibold">
                      {((stock.target - stock.entry) / (stock.entry - stock.stop)).toFixed(1)}:1
                    </span>
                  </div>
                </div>

                {/* Confidence bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-fg-dim">Confidence</span>
                    <span className="font-mono text-fg">{stock.confidence}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent transition-all duration-700"
                      style={{ width: `${stock.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {[
                    ["ATR%", stock.atr],
                    ["Rel. Volume", stock.relVol],
                    ["Setup", stock.setup],
                    ["Horizon", stock.horizon],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-[#0a0b14] rounded-lg px-3 py-2 border border-border">
                      <div className="text-fg-dim">{label}</div>
                      <div className="font-mono text-fg font-semibold mt-0.5">{value}</div>
                    </div>
                  ))}
                </div>

                {/* Backtest Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {[
                    ["Win Rate", stock.winRate],
                    ["Instances", String(stock.instances)],
                    ["Avg Return", stock.avgReturn],
                    ["Avg Drawdown", stock.avgDrawdown],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-[#0a0b14] rounded-lg px-3 py-2 border border-border">
                      <div className="text-fg-dim">{label}</div>
                      <div className="font-mono text-fg font-semibold mt-0.5">{value}</div>
                    </div>
                  ))}
                </div>

                {/* Collapsible sections */}
                {(
                  [
                    ["Market Analysis", stock.marketAnalysis],
                    ["Sentiment Analysis", stock.sentimentAnalysis],
                    ["Final Decision", stock.finalDecision],
                  ] as const
                ).map(([title, content]) => {
                  const key = `${stock.ticker}-${title}`;
                  const open = expandedSections[key];
                  return (
                    <div key={key} className="border-t border-border pt-3">
                      <button
                        onClick={() => toggleSection(key)}
                        className="flex items-center gap-2 text-sm text-fg-dim hover:text-fg transition-colors w-full text-left"
                      >
                        <svg
                          className={`h-3 w-3 transition-transform ${open ? "rotate-90" : ""}`}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M10 6l6 6-6 6V6z" />
                        </svg>
                        <span className="font-display font-semibold uppercase tracking-wider text-xs">
                          {title}
                        </span>
                      </button>
                      {open && (
                        <p className="text-sm text-fg-dim mt-2 pl-5 leading-relaxed">
                          {content}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
        </div>
      )}

      {/* ── PORTFOLIO TAB ─────────────────────────── */}
      {mainTab === "portfolio" && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              ["Total Trades", "24"],
              ["Open Trades", "3"],
              ["Closed Trades", "21"],
              ["Win Rate", "58%"],
              ["Avg Return", "+3.2%"],
              ["Realized P&L", "+$4,250"],
              ["Unrealized P&L", "+$1,120"],
              ["Best Trade", "+12.5%"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="bg-bg-surface border border-border rounded-xl px-4 py-3"
              >
                <div className="text-xs text-fg-dim">{label}</div>
                <div className="font-mono text-lg font-bold mt-1">{value}</div>
              </div>
            ))}
          </div>

          {/* Trade Filter */}
          <div className="flex gap-1">
            {(
              [
                ["all", "All (24)"],
                ["open", "Open (3)"],
                ["closed", "Closed (21)"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTradeFilter(key)}
                className={`px-4 py-1.5 text-xs font-display font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                  tradeFilter === key
                    ? "bg-accent/15 text-accent border border-accent/30"
                    : "text-fg-dim hover:text-fg border border-border"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Trade Rows */}
          <div className="space-y-2">
            {filteredTrades.map((trade, i) => (
              <div
                key={`${trade.ticker}-${i}`}
                className="flex items-center justify-between bg-bg-surface border border-border rounded-xl px-5 py-3 glow-card"
              >
                <div className="flex items-center gap-4">
                  <span className="font-display text-lg font-bold w-16">
                    {trade.ticker}
                  </span>
                  <div className="text-xs font-mono text-fg-dim">
                    <span>Entry ${trade.entry}</span>
                    <span className="mx-2 text-border">|</span>
                    <span>{trade.isOpen ? "Current" : "Exit"} ${trade.current}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`font-mono text-sm font-bold ${
                      trade.returnPct >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {trade.returnPct >= 0 ? "+" : ""}
                    {trade.returnPct}%
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-semibold ${
                      trade.status === "Open"
                        ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                        : trade.status === "Target Hit"
                          ? "bg-green-500/15 text-green-400 border border-green-500/30"
                          : "bg-red-500/15 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {trade.status}
                  </span>
                  <span className="text-xs text-fg-dim font-mono hidden sm:inline">
                    {trade.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
