"use client";

import { useState, useMemo } from "react";

/* ── Mock Data ─────────────────────────────────────── */

interface ClothingItem {
  id: number;
  name: string;
  category: "Top" | "Bottom" | "Outerwear" | "Shoes" | "Accessories";
  color: string;
  colorHex: string;
  season: string;
  formality: string;
}

const ITEMS: ClothingItem[] = [
  { id: 1, name: "White T-Shirt", category: "Top", color: "white", colorHex: "#f0f0f0", season: "all-season", formality: "casual" },
  { id: 2, name: "Blue Jeans", category: "Bottom", color: "blue", colorHex: "#3b82f6", season: "all-season", formality: "casual" },
  { id: 3, name: "Black Leather Jacket", category: "Outerwear", color: "black", colorHex: "#1a1a2e", season: "fall/winter", formality: "smart-casual" },
  { id: 4, name: "Gray Hoodie", category: "Top", color: "gray", colorHex: "#6b7280", season: "fall/winter", formality: "casual" },
  { id: 5, name: "Khaki Chinos", category: "Bottom", color: "khaki", colorHex: "#c4a882", season: "all-season", formality: "smart-casual" },
  { id: 6, name: "White Sneakers", category: "Shoes", color: "white", colorHex: "#f0f0f0", season: "all-season", formality: "casual" },
  { id: 7, name: "Navy Blazer", category: "Outerwear", color: "navy", colorHex: "#1e3a5f", season: "all-season", formality: "business" },
  { id: 8, name: "Black Dress Shoes", category: "Shoes", color: "black", colorHex: "#1a1a2e", season: "all-season", formality: "business" },
  { id: 9, name: "Red Flannel Shirt", category: "Top", color: "red", colorHex: "#dc2626", season: "fall/winter", formality: "casual" },
  { id: 10, name: "Olive Cargo Pants", category: "Bottom", color: "olive", colorHex: "#556b2f", season: "spring/summer", formality: "casual" },
];

const CATEGORIES = ["All", "Top", "Bottom", "Outerwear", "Shoes", "Accessories"] as const;

const NEUTRAL_COLORS = new Set(["white", "black", "gray", "navy", "khaki"]);

/* ── Matching Algorithm ────────────────────────────── */

interface MatchResult {
  item: ClothingItem;
  score: number;
  reasons: string[];
}

function computeMatches(selected: ClothingItem[]): MatchResult[] {
  const selectedIds = new Set(selected.map((s) => s.id));
  const unselected = ITEMS.filter((i) => !selectedIds.has(i.id));

  return unselected
    .map((candidate) => {
      let score = 50; // base score
      const reasons: string[] = [];

      for (const sel of selected) {
        // Category compatibility
        const catCompat = getCategoryCompatibility(sel.category, candidate.category);
        score += catCompat;
        if (catCompat > 0) reasons.push("Category match");

        // Color harmony
        const colorScore = getColorHarmony(sel.color, candidate.color);
        score += colorScore;
        if (colorScore > 0) reasons.push("Color harmony");
        if (colorScore < 0) reasons.push("Color clash");

        // Formality alignment
        if (sel.formality === candidate.formality) {
          score += 8;
          reasons.push("Same formality");
        } else {
          score -= 5;
        }

        // Season compatibility
        if (sel.season === candidate.season || candidate.season === "all-season" || sel.season === "all-season") {
          score += 5;
          reasons.push("Season match");
        } else {
          score -= 3;
        }
      }

      // Normalize to 0-100
      score = Math.max(0, Math.min(100, score));

      // Deduplicate reasons
      const uniqueReasons = [...new Set(reasons)].slice(0, 2);

      return { item: candidate, score, reasons: uniqueReasons };
    })
    .sort((a, b) => b.score - a.score);
}

function getCategoryCompatibility(a: string, b: string): number {
  if (a === b) return -5; // same category = less useful
  if (a === "Outerwear" || b === "Outerwear") return 10;
  const pairings: Record<string, string[]> = {
    Top: ["Bottom", "Shoes"],
    Bottom: ["Top", "Shoes"],
    Shoes: ["Top", "Bottom"],
  };
  if (pairings[a]?.includes(b)) return 12;
  return 3;
}

function getColorHarmony(a: string, b: string): number {
  if (NEUTRAL_COLORS.has(a) || NEUTRAL_COLORS.has(b)) return 6;
  if (a === b) return 4; // monochrome
  // Non-neutral + non-neutral that differ = potential clash
  return -4;
}

/* ── Score Color Helper ────────────────────────────── */

function scoreColor(score: number): string {
  if (score > 70) return "text-green-400";
  if (score >= 40) return "text-yellow-400";
  return "text-red-400";
}

function scoreBg(score: number): string {
  if (score > 70) return "bg-green-400/10 border-green-400/30";
  if (score >= 40) return "bg-yellow-400/10 border-yellow-400/30";
  return "bg-red-400/10 border-red-400/30";
}

/* ── Component ─────────────────────────────────────── */

export default function ThreadlyticDemo() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [showMatches, setShowMatches] = useState(false);

  // Filtered items
  const filteredItems = useMemo(() => {
    return ITEMS.filter((item) => {
      const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
      if (!matchesCategory) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.color.toLowerCase().includes(q)
      );
    });
  }, [search, categoryFilter]);

  // Selected items
  const selectedItems = useMemo(() => ITEMS.filter((i) => selectedIds.has(i.id)), [selectedIds]);

  // Match results
  const matchResults = useMemo(() => {
    if (!showMatches || selectedItems.length === 0) return [];
    return computeMatches(selectedItems);
  }, [showMatches, selectedItems]);

  // Group matches by category
  const groupedMatches = useMemo(() => {
    const groups: Record<string, MatchResult[]> = {};
    for (const m of matchResults) {
      const cat = m.item.category;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(m);
    }
    return groups;
  }, [matchResults]);

  function toggleSelect(id: number) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setShowMatches(false);
  }

  function clearSelection() {
    setSelectedIds(new Set());
    setShowMatches(false);
  }

  return (
    <div className="space-y-8 pb-32">
      {/* ── Header ──────────────────────────────────── */}
      <header className="space-y-3">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Threadlytic
        </h1>
        <p className="text-fg-dim max-w-2xl text-lg leading-relaxed">
          AI-powered wardrobe management with smart outfit matching
        </p>
        <div className="inline-flex items-center gap-2 rounded-lg border border-accent/20 bg-accent/5 px-3 py-1.5 text-sm text-accent">
          <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
          Demo Mode — Browse the closet and try the matching algorithm
        </div>
      </header>

      {/* ── Controls Bar ────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-dim"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-bg-surface py-2 pl-10 pr-3 text-sm text-fg placeholder:text-fg-dim/60 outline-none transition focus:border-accent-dim"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-border bg-bg-surface px-3 py-2 text-sm text-fg outline-none transition focus:border-accent-dim cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : `${cat}s`}
              </option>
            ))}
          </select>
        </div>

        {/* Selected count */}
        {selectedIds.size > 0 && (
          <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            {selectedIds.size} item{selectedIds.size !== 1 ? "s" : ""} selected
          </div>
        )}
      </div>

      {/* ── Wardrobe Grid ───────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filteredItems.map((item) => {
          const isSelected = selectedIds.has(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggleSelect(item.id)}
              className={`group relative flex flex-col overflow-hidden rounded-xl border text-left transition-all duration-200 ${
                isSelected
                  ? "border-accent shadow-[0_0_20px_-6px_var(--accent-glow)]"
                  : "border-border hover:border-border-hover hover:shadow-[0_0_30px_-10px_var(--accent-glow)]"
              } bg-bg-surface`}
            >
              {/* Color placeholder */}
              <div
                className="relative h-32 w-full sm:h-36"
                style={{ backgroundColor: item.colorHex }}
              >
                {/* Checkbox */}
                <div
                  className={`absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded border transition ${
                    isSelected
                      ? "border-accent bg-accent text-bg"
                      : "border-white/30 bg-black/30"
                  }`}
                >
                  {isSelected && (
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-2 p-3">
                <span className="font-body text-sm font-semibold leading-tight text-fg">
                  {item.name}
                </span>

                {/* Category + Color tags */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-md border border-border px-1.5 py-0.5 text-[11px] font-medium text-fg-dim">
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 rounded-md border border-border px-1.5 py-0.5 text-[11px] font-medium text-fg-dim">
                    <span
                      className="inline-block h-2 w-2 rounded-full border border-white/20"
                      style={{ backgroundColor: item.colorHex }}
                    />
                    {item.color}
                  </span>
                </div>

                {/* Season + Formality */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-md px-1.5 py-0.5 text-[10px] text-fg-dim/70">
                    {item.season}
                  </span>
                  <span className="rounded-md px-1.5 py-0.5 text-[10px] text-fg-dim/70">
                    {item.formality}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-12 text-fg-dim">
          <svg className="h-10 w-10 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <p className="text-sm">No items match your search</p>
        </div>
      )}

      {/* ── Match Results Panel ─────────────────────── */}
      {showMatches && matchResults.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-xl font-bold tracking-tight">
              Match Results
            </h2>
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
              {matchResults.length} items scored
            </span>
          </div>

          {Object.entries(groupedMatches).map(([category, matches]) => (
            <div key={category} className="space-y-3">
              <h3 className="section-heading">Matching {category}s</h3>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {matches.map((match) => (
                  <div
                    key={match.item.id}
                    className="flex items-start gap-3 rounded-xl border border-border bg-bg-surface p-4 transition hover:border-border-hover"
                  >
                    {/* Color swatch */}
                    <div
                      className="mt-0.5 h-10 w-10 shrink-0 rounded-lg border border-white/10"
                      style={{ backgroundColor: match.item.colorHex }}
                    />

                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-fg">
                          {match.item.name}
                        </span>
                        <span
                          className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-bold tabular-nums ${scoreBg(match.score)} ${scoreColor(match.score)}`}
                        >
                          {match.score}
                        </span>
                      </div>

                      {/* Reason tags */}
                      <div className="flex flex-wrap gap-1">
                        {match.reasons.map((reason, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] text-fg-dim"
                          >
                            {reason}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ── Selection Tray (sticky bottom) ──────────── */}
      {selectedIds.size > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <span className="text-sm text-fg-dim">
              <span className="font-semibold text-fg">{selectedIds.size}</span> item{selectedIds.size !== 1 ? "s" : ""} selected
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={clearSelection}
                className="rounded-lg border border-border px-4 py-1.5 text-sm text-fg-dim transition hover:border-border-hover hover:text-fg"
              >
                Clear
              </button>
              <button
                onClick={() => setShowMatches(true)}
                className="rounded-lg bg-accent px-4 py-1.5 text-sm font-semibold text-bg transition hover:bg-accent/90"
              >
                Find Matches
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
