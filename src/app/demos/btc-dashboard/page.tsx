"use client";

import { useState, useCallback, useEffect, useMemo } from "react";

/* ── helpers ─────────────────────────────────────── */

function rand(base: number, pct = 0.05) {
  return base * (1 + (Math.random() * 2 - 1) * pct);
}
function fmt(n: number, d = 2) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
}
function clamp(v: number, lo = 0, hi = 100) {
  return Math.min(hi, Math.max(lo, v));
}

/* ── types ───────────────────────────────────────── */

type Risk = "conservative" | "balanced" | "aggressive";

interface MockData {
  btcPrice: number;
  sma50: number;
  fearGreed: number;
  rsi: number;
  macdBullish: boolean;
  bollingerPos: string;
  mempoolCongestion: string;
  networkTx: number;
  volume24h: number;
  subScores: { momentum: number; trend: number; sentiment: number; onChain: number };
  confidence: number;
}

// Deterministic seed used for SSR and first client render — avoids React hydration
// mismatch (error #418) that would otherwise be triggered by Math.random() running
// on both the server and the client. After mount, useEffect replaces this with
// real randomized data.
const SEED_DATA: MockData = {
  btcPrice: 73245.8,
  sma50: 68450.3,
  fearGreed: 28,
  rsi: 34.2,
  macdBullish: true,
  bollingerPos: "Middle Band",
  mempoolCongestion: "Medium",
  networkTx: 385420,
  volume24h: 28.4,
  subScores: { momentum: 15, trend: 18, sentiment: 8, onChain: 17 },
  confidence: 72,
};

function generateMock(): MockData {
  const momentum = rand(15, 0.15);
  const trend = rand(18, 0.15);
  const sentiment = rand(8, 0.2);
  const onChain = rand(17, 0.15);
  const congestions = ["Low", "Medium", "High"];
  const bollinger = ["Lower Band", "Middle Band", "Upper Band"];

  return {
    btcPrice: rand(73245.8, 0.05),
    sma50: rand(68450.3, 0.03),
    fearGreed: Math.round(rand(28, 0.15)),
    rsi: rand(34.2, 0.1),
    macdBullish: Math.random() > 0.4,
    bollingerPos: bollinger[Math.floor(Math.random() * 3)],
    mempoolCongestion: congestions[Math.floor(Math.random() * 3)],
    networkTx: Math.round(rand(385420, 0.08)),
    volume24h: rand(28.4, 0.1),
    subScores: {
      momentum: clamp(momentum, 0, 25),
      trend: clamp(trend, 0, 25),
      sentiment: clamp(sentiment, 0, 25),
      onChain: clamp(onChain, 0, 25),
    },
    confidence: clamp(rand(72, 0.1), 40, 99),
  };
}

function rawScore(d: MockData) {
  return clamp(
    d.subScores.momentum + d.subScores.trend + d.subScores.sentiment + d.subScores.onChain,
    0,
    100,
  );
}

function adjustedScore(raw: number, risk: Risk) {
  const mult = { conservative: 0.85, balanced: 1.0, aggressive: 1.15 }[risk];
  return clamp(Math.round(raw * mult));
}

function signalLabel(score: number) {
  if (score < 20) return "STRONG SELL";
  if (score < 35) return "SELL";
  if (score < 65) return "NEUTRAL";
  if (score < 80) return "BUY";
  return "STRONG BUY";
}

function scoreColor(score: number) {
  if (score < 35) return "#ef4444";
  if (score < 65) return "#eab308";
  return "#22c55e";
}

function fearGreedLabel(v: number) {
  if (v < 25) return "Extreme Fear";
  if (v < 45) return "Fear";
  if (v < 55) return "Neutral";
  if (v < 75) return "Greed";
  return "Extreme Greed";
}

/* ── data source badges ──────────────────────────── */

const DATA_SOURCES = [
  "CoinGecko",
  "Fear & Greed",
  "Mempool",
  "CoinPaprika",
  "Blockchain.com",
];

/* ── Gauge SVG ───────────────────────────────────── */

function Gauge({ score }: { score: number }) {
  const color = scoreColor(score);
  const r = 80;
  const stroke = 10;
  const circ = 2 * Math.PI * r;
  const arcLen = circ * 0.75; // 270°
  const filled = (score / 100) * arcLen;

  return (
    <svg viewBox="0 0 200 200" className="w-52 h-52 mx-auto">
      {/* background arc */}
      <circle
        cx={100}
        cy={100}
        r={r}
        fill="none"
        stroke="var(--border)"
        strokeWidth={stroke}
        strokeDasharray={`${arcLen} ${circ}`}
        strokeDashoffset={0}
        strokeLinecap="round"
        transform="rotate(135 100 100)"
      />
      {/* filled arc */}
      <circle
        cx={100}
        cy={100}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={`${filled} ${circ}`}
        strokeDashoffset={0}
        strokeLinecap="round"
        transform="rotate(135 100 100)"
        style={{ transition: "stroke-dasharray 0.6s ease, stroke 0.4s ease" }}
      />
      {/* score text */}
      <text
        x={100}
        y={98}
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize={42}
        fontWeight={700}
        fontFamily="var(--font-mono)"
        style={{ transition: "fill 0.4s ease" }}
      >
        {score}
      </text>
    </svg>
  );
}

/* ── SubScore bar ────────────────────────────────── */

function SubScoreBar({ label, value, max = 25 }: { label: string; value: number; max?: number }) {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-fg-dim w-24 shrink-0">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: scoreColor((value / max) * 100),
            transition: "width 0.5s ease",
          }}
        />
      </div>
      <span className="font-mono text-xs text-fg-dim w-10 text-right">
        {value.toFixed(1)}/{max}
      </span>
    </div>
  );
}

/* ── Indicator card ──────────────────────────────── */

function Card({
  title,
  value,
  sub,
}: {
  title: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="glow-card bg-bg-surface border border-border rounded-xl p-4 flex flex-col gap-1">
      <span className="font-mono text-[11px] uppercase tracking-wider text-fg-dim">{title}</span>
      <span className="font-mono text-lg text-fg font-semibold leading-tight">{value}</span>
      {sub && <span className="font-mono text-xs text-fg-dim">{sub}</span>}
    </div>
  );
}

/* ── Spinner ─────────────────────────────────────── */

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx={12}
        cy={12}
        r={10}
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="31.4 31.4"
      />
    </svg>
  );
}

/* ── Page ─────────────────────────────────────────── */

export default function BtcDashboardPage() {
  const [data, setData] = useState<MockData>(SEED_DATA);
  const [risk, setRisk] = useState<Risk>("balanced");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(generateMock());
  }, []);

  const raw = useMemo(() => rawScore(data), [data]);
  const score = useMemo(() => adjustedScore(raw, risk), [raw, risk]);
  const signal = signalLabel(score);
  const color = scoreColor(score);

  const refresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setData(generateMock());
      setLoading(false);
    }, 1500);
  }, []);

  const riskButtons: { key: Risk; label: string }[] = [
    { key: "conservative", label: "Conservative" },
    { key: "balanced", label: "Balanced" },
    { key: "aggressive", label: "Aggressive" },
  ];

  return (
    <div className="mt-10 space-y-8">
      {/* ── Header ──────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-fg">
            Bitcoin Buy/Sell Signal Dashboard
          </h1>
          <p className="mt-2 text-fg-dim text-sm max-w-xl leading-relaxed">
            Scores buy/sell signals from momentum, trend, sentiment, and
            on-chain data. All data here is simulated for the demo.
          </p>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold
                     bg-accent text-bg hover:brightness-110 transition-all disabled:opacity-60 cursor-pointer disabled:cursor-wait"
        >
          {loading ? <Spinner /> : null}
          {loading ? "Refreshing…" : "Refresh Data"}
        </button>
      </div>

      {/* ── Main Grid ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6">
        {/* ── Left column: Gauge ────────────────── */}
        <div className="glow-card bg-bg-surface border border-border rounded-xl p-6 flex flex-col items-center gap-4">
          <Gauge score={score} />

          <div className="text-center space-y-1">
            <p
              className="font-display text-xl font-bold tracking-wide"
              style={{ color, transition: "color 0.4s ease" }}
            >
              {signal}
            </p>
            <p className="font-mono text-xs text-fg-dim">
              Confidence: {data.confidence.toFixed(1)}%
            </p>
          </div>

          <div className="w-full space-y-2 mt-2">
            <SubScoreBar label="Momentum" value={data.subScores.momentum} />
            <SubScoreBar label="Trend" value={data.subScores.trend} />
            <SubScoreBar label="Sentiment" value={data.subScores.sentiment} />
            <SubScoreBar label="On-Chain" value={data.subScores.onChain} />
          </div>
        </div>

        {/* ── Right column ──────────────────────── */}
        <div className="space-y-6">
          {/* Risk Tolerance */}
          <div className="glow-card bg-bg-surface border border-border rounded-xl p-5">
            <h2 className="font-display text-xs font-bold uppercase tracking-widest text-accent mb-3">
              Risk Tolerance
            </h2>
            <div className="flex gap-2">
              {riskButtons.map((b) => (
                <button
                  key={b.key}
                  onClick={() => setRisk(b.key)}
                  className={`flex-1 py-2 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer
                    ${
                      risk === b.key
                        ? "bg-accent text-bg"
                        : "bg-border text-fg-dim hover:bg-border-hover hover:text-fg"
                    }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Data Source Status */}
          <div className="glow-card bg-bg-surface border border-border rounded-xl p-5">
            <h2 className="font-display text-xs font-bold uppercase tracking-widest text-accent mb-3">
              Data Source Status
            </h2>
            <div className="flex flex-wrap gap-2">
              {DATA_SOURCES.map((src) => (
                <span
                  key={src}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-800/40 bg-green-950/30 font-mono text-[11px] text-green-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {src}
                </span>
              ))}
            </div>
          </div>

          {/* Indicator Cards 3x3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card
              title="BTC Price"
              value={`$${fmt(data.btcPrice)}`}
              sub="USD"
            />
            <Card
              title="50-Day SMA"
              value={`$${fmt(data.sma50)}`}
            />
            <Card
              title="Fear & Greed"
              value={String(data.fearGreed)}
              sub={fearGreedLabel(data.fearGreed)}
            />
            <Card
              title="RSI (14)"
              value={fmt(data.rsi, 1)}
              sub={data.rsi < 30 ? "Oversold" : data.rsi > 70 ? "Overbought" : "Neutral"}
            />
            <Card
              title="MACD Signal"
              value={data.macdBullish ? "Bullish" : "Bearish"}
              sub={data.macdBullish ? "↑ Cross above signal" : "↓ Cross below signal"}
            />
            <Card
              title="Bollinger Pos."
              value={data.bollingerPos}
            />
            <Card
              title="Mempool"
              value={data.mempoolCongestion}
              sub="Congestion"
            />
            <Card
              title="Network Activity"
              value={data.networkTx.toLocaleString("en-US")}
              sub="tx / 24h"
            />
            <Card
              title="24h Volume"
              value={`$${fmt(data.volume24h, 1)}B`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
