"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/* ── Maze layout: 19 columns x 21 rows ─────────────────────── */
// 0=empty, 1=wall, 2=pellet, 3=power pellet
const MAZE_TEMPLATE: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,3,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,3,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,0,1,0,1,1,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,1,1,0,1,1,0,1,2,1,1,1,1],
  [0,0,0,0,2,0,0,1,0,0,0,1,0,0,2,0,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,3,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,3,1],
  [1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const COLS = 19;
const ROWS = 21;
const CELL = 20;
const CANVAS_W = COLS * CELL;
const CANVAS_H = ROWS * CELL;

type Dir = "up" | "down" | "left" | "right" | "none";
const DIR_VEC: Record<Dir, [number, number]> = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
  none: [0, 0],
};
const DIRS: Dir[] = ["up", "down", "left", "right"];

const GHOST_COLORS = ["#ef4444", "#ec4899", "#22d3ee", "#f97316"];
const GHOST_START: [number, number][] = [
  [8, 9],
  [9, 9],
  [10, 9],
  [9, 10],
];
const PACMAN_START: [number, number] = [9, 15];

interface Ghost {
  x: number;
  y: number;
  tx: number;
  ty: number;
  dir: Dir;
  color: string;
  scared: boolean;
  eaten: boolean;
  respawnTimer: number;
  moveTimer: number;
}

interface GameState {
  maze: number[][];
  px: number;
  py: number;
  ptx: number;
  pty: number;
  pdir: Dir;
  nextDir: Dir;
  pmoveTimer: number;
  mouthAngle: number;
  mouthDir: number;
  ghosts: Ghost[];
  score: number;
  lives: number;
  level: number;
  powerTimer: number;
  paused: boolean;
  gameOver: boolean;
  totalPellets: number;
  pelletsEaten: number;
  ghostsEatenCombo: number;
}

function cloneMaze(): number[][] {
  return MAZE_TEMPLATE.map((r) => [...r]);
}

function countPellets(maze: number[][]): number {
  let c = 0;
  for (const row of maze) for (const v of row) if (v === 2 || v === 3) c++;
  return c;
}

function canMove(maze: number[][], x: number, y: number): boolean {
  if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return false;
  return maze[y][x] !== 1;
}

function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function opposite(d: Dir): Dir {
  if (d === "up") return "down";
  if (d === "down") return "up";
  if (d === "left") return "right";
  if (d === "right") return "left";
  return "none";
}

/* ── Component ─────────────────────────────────────────────── */

export default function PacmanMLPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<GameState | null>(null);
  const keysRef = useRef<Set<string>>(new Set());
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const [mode, setMode] = useState<"play" | "ai">("play");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [bestScore, setBestScore] = useState(0);
  const [episode, setEpisode] = useState(1);
  const [epsilon, setEpsilon] = useState(1.0);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [episodeScores, setEpisodeScores] = useState<number[]>([]);
  const [avgScore, setAvgScore] = useState(0);
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  /* ── Init game state ─────────────────────────────────── */
  const initGame = useCallback(() => {
    const maze = cloneMaze();
    const gs: GameState = {
      maze,
      px: PACMAN_START[0],
      py: PACMAN_START[1],
      ptx: PACMAN_START[0],
      pty: PACMAN_START[1],
      pdir: "none",
      nextDir: "none",
      pmoveTimer: 0,
      mouthAngle: 0.25,
      mouthDir: 1,
      ghosts: GHOST_COLORS.map((color, i) => ({
        x: GHOST_START[i][0],
        y: GHOST_START[i][1],
        tx: GHOST_START[i][0],
        ty: GHOST_START[i][1],
        dir: "up" as Dir,
        color,
        scared: false,
        eaten: false,
        respawnTimer: 0,
        moveTimer: 0,
      })),
      score: 0,
      lives: 3,
      level: 1,
      powerTimer: 0,
      paused: false,
      gameOver: false,
      totalPellets: countPellets(maze),
      pelletsEaten: 0,
      ghostsEatenCombo: 0,
    };
    gameRef.current = gs;
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameOver(false);
    setPaused(false);
  }, []);

  const resetPositions = useCallback(() => {
    const gs = gameRef.current;
    if (!gs) return;
    gs.px = PACMAN_START[0];
    gs.py = PACMAN_START[1];
    gs.ptx = PACMAN_START[0];
    gs.pty = PACMAN_START[1];
    gs.pdir = "none";
    gs.nextDir = "none";
    gs.pmoveTimer = 0;
    gs.ghosts.forEach((g, i) => {
      g.x = GHOST_START[i][0];
      g.y = GHOST_START[i][1];
      g.tx = GHOST_START[i][0];
      g.ty = GHOST_START[i][1];
      g.dir = "up";
      g.scared = false;
      g.eaten = false;
      g.respawnTimer = 0;
      g.moveTimer = 0;
    });
    gs.powerTimer = 0;
    gs.ghostsEatenCombo = 0;
  }, []);

  /* ── AI logic ─────────────────────────────────────── */
  const getAIDirection = useCallback((gs: GameState): Dir => {
    const { px, py, maze, ghosts } = gs;
    const activeGhosts = ghosts.filter((g) => !g.eaten);

    // find nearest ghost
    let nearestGhostDist = Infinity;
    let nearestGhost: Ghost | null = null;
    for (const g of activeGhosts) {
      const d = dist(px, py, g.x, g.y);
      if (d < nearestGhostDist) {
        nearestGhostDist = d;
        nearestGhost = g;
      }
    }

    // find nearest pellet
    let nearestPelletDist = Infinity;
    let nearestPelletX = px;
    let nearestPelletY = py;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (maze[r][c] === 2 || maze[r][c] === 3) {
          const d = dist(px, py, c, r);
          if (d < nearestPelletDist) {
            nearestPelletDist = d;
            nearestPelletX = c;
            nearestPelletY = r;
          }
        }
      }
    }

    // find nearest power pellet
    let nearestPowerDist = Infinity;
    let nearestPowerX = px;
    let nearestPowerY = py;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (maze[r][c] === 3) {
          const d = dist(px, py, c, r);
          if (d < nearestPowerDist) {
            nearestPowerDist = d;
            nearestPowerX = c;
            nearestPowerY = r;
          }
        }
      }
    }

    const validDirs = DIRS.filter((d) => {
      const [dx, dy] = DIR_VEC[d];
      return canMove(maze, px + dx, py + dy);
    });

    if (validDirs.length === 0) return "none";

    // flee from ghosts if nearby and not scared
    if (nearestGhost && nearestGhostDist <= 3 && !nearestGhost.scared) {
      // check if power pellet nearby — go for it
      if (nearestPowerDist <= 4 && nearestPowerDist < Infinity) {
        return pickBest(validDirs, nearestPowerX, nearestPowerY, px, py);
      }
      // flee: pick direction that maximizes distance from nearest ghost
      let bestDir = validDirs[0];
      let bestDist = -1;
      for (const d of validDirs) {
        const [dx, dy] = DIR_VEC[d];
        const dd = dist(px + dx, py + dy, nearestGhost.x, nearestGhost.y);
        if (dd > bestDist) {
          bestDist = dd;
          bestDir = d;
        }
      }
      return bestDir;
    }

    // chase scared ghosts
    if (nearestGhost && nearestGhost.scared && nearestGhostDist <= 5) {
      return pickBest(validDirs, nearestGhost.x, nearestGhost.y, px, py);
    }

    // go toward nearest pellet
    return pickBest(validDirs, nearestPelletX, nearestPelletY, px, py);
  }, []);

  /* ── Game loop ────────────────────────────────────── */
  const gameLoop = useCallback(
    (time: number) => {
      const gs = gameRef.current;
      const canvas = canvasRef.current;
      if (!gs || !canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dt = lastTimeRef.current ? (time - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = time;

      if (!gs.paused && !gs.gameOver) {
        /* ── Input ──────────────────────────────── */
        if (modeRef.current === "play") {
          const keys = keysRef.current;
          if (keys.has("ArrowUp") || keys.has("w")) gs.nextDir = "up";
          if (keys.has("ArrowDown") || keys.has("s")) gs.nextDir = "down";
          if (keys.has("ArrowLeft") || keys.has("a")) gs.nextDir = "left";
          if (keys.has("ArrowRight") || keys.has("d")) gs.nextDir = "right";
        } else {
          gs.nextDir = getAIDirection(gs);
        }

        /* ── Pac-Man movement ───────────────────── */
        gs.pmoveTimer += dt;
        const pSpeed = 0.18;
        if (gs.pmoveTimer >= pSpeed) {
          gs.pmoveTimer = 0;
          // try next dir first, then current dir
          const [ndx, ndy] = DIR_VEC[gs.nextDir];
          if (gs.nextDir !== "none" && canMove(gs.maze, gs.px + ndx, gs.py + ndy)) {
            gs.pdir = gs.nextDir;
          }
          const [dx, dy] = DIR_VEC[gs.pdir];
          const nx = gs.px + dx;
          const ny = gs.py + dy;
          if (canMove(gs.maze, nx, ny)) {
            gs.px = nx;
            gs.py = ny;
          }

          // collect pellet
          if (gs.maze[gs.py][gs.px] === 2) {
            gs.maze[gs.py][gs.px] = 0;
            gs.score += 10;
            gs.pelletsEaten++;
          } else if (gs.maze[gs.py][gs.px] === 3) {
            gs.maze[gs.py][gs.px] = 0;
            gs.score += 50;
            gs.pelletsEaten++;
            gs.powerTimer = 5;
            gs.ghostsEatenCombo = 0;
            gs.ghosts.forEach((g) => {
              if (!g.eaten) g.scared = true;
            });
          }

          setScore(gs.score);

          // level complete
          if (gs.pelletsEaten >= gs.totalPellets) {
            gs.level++;
            setLevel(gs.level);
            setEpisodeScores((prev) => {
              const next = [...prev, gs.score].slice(-10);
              setAvgScore(Math.round(next.reduce((a, b) => a + b, 0) / next.length));
              return next;
            });
            gs.maze = cloneMaze();
            gs.totalPellets = countPellets(gs.maze);
            gs.pelletsEaten = 0;
            resetPositions();
          }
        }

        /* ── Power timer ────────────────────────── */
        if (gs.powerTimer > 0) {
          gs.powerTimer -= dt;
          if (gs.powerTimer <= 0) {
            gs.powerTimer = 0;
            gs.ghosts.forEach((g) => (g.scared = false));
            gs.ghostsEatenCombo = 0;
          }
        }

        /* ── Ghost movement ─────────────────────── */
        const ghostSpeed = 0.25 - gs.level * 0.01;
        gs.ghosts.forEach((g) => {
          if (g.eaten) {
            g.respawnTimer -= dt;
            if (g.respawnTimer <= 0) {
              g.eaten = false;
              g.scared = false;
              const idx = gs.ghosts.indexOf(g);
              g.x = GHOST_START[idx][0];
              g.y = GHOST_START[idx][1];
              g.tx = g.x;
              g.ty = g.y;
              g.moveTimer = 0;
            }
            return;
          }

          g.moveTimer += dt;
          const speed = g.scared ? ghostSpeed + 0.08 : Math.max(0.12, ghostSpeed);
          if (g.moveTimer >= speed) {
            g.moveTimer = 0;

            const validDirs = DIRS.filter((d) => {
              if (d === opposite(g.dir) && DIRS.filter((dd) => {
                const [ddx, ddy] = DIR_VEC[dd];
                return canMove(gs.maze, g.x + ddx, g.y + ddy);
              }).length > 1) return false;
              const [ddx, ddy] = DIR_VEC[d];
              return canMove(gs.maze, g.x + ddx, g.y + ddy);
            });

            if (validDirs.length > 0) {
              let chosenDir: Dir;
              if (g.scared) {
                // flee from pacman
                let bestDist = -1;
                chosenDir = validDirs[0];
                for (const d of validDirs) {
                  const [ddx, ddy] = DIR_VEC[d];
                  const dd = dist(g.x + ddx, g.y + ddy, gs.px, gs.py);
                  if (dd > bestDist) {
                    bestDist = dd;
                    chosenDir = d;
                  }
                }
              } else if (Math.random() < 0.6) {
                // chase pacman
                let bestDist = Infinity;
                chosenDir = validDirs[0];
                for (const d of validDirs) {
                  const [ddx, ddy] = DIR_VEC[d];
                  const dd = dist(g.x + ddx, g.y + ddy, gs.px, gs.py);
                  if (dd < bestDist) {
                    bestDist = dd;
                    chosenDir = d;
                  }
                }
              } else {
                chosenDir = validDirs[Math.floor(Math.random() * validDirs.length)];
              }

              const [ddx, ddy] = DIR_VEC[chosenDir];
              g.x += ddx;
              g.y += ddy;
              g.dir = chosenDir;
            }
          }

          // collision with pacman
          if (g.x === gs.px && g.y === gs.py) {
            if (g.scared) {
              g.eaten = true;
              g.respawnTimer = 3;
              gs.ghostsEatenCombo++;
              gs.score += 200 * gs.ghostsEatenCombo;
              setScore(gs.score);
            } else {
              gs.lives--;
              setLives(gs.lives);
              setEpisodeScores((prev) => {
                const next = [...prev, gs.score].slice(-10);
                setAvgScore(
                  Math.round(next.reduce((a, b) => a + b, 0) / next.length)
                );
                return next;
              });
              if (gs.lives <= 0) {
                gs.gameOver = true;
                setGameOver(true);
                setBestScore((prev) => Math.max(prev, gs.score));
                setEpisode((prev) => prev + 1);
                setEpsilon((prev) => Math.max(0.05, prev - 0.05));
              } else {
                resetPositions();
              }
            }
          }
        });

        // also check collision after pacman moves
        gs.ghosts.forEach((g) => {
          if (g.eaten) return;
          if (g.x === gs.px && g.y === gs.py) {
            if (g.scared) {
              g.eaten = true;
              g.respawnTimer = 3;
              gs.ghostsEatenCombo++;
              gs.score += 200 * gs.ghostsEatenCombo;
              setScore(gs.score);
            } else {
              gs.lives--;
              setLives(gs.lives);
              if (gs.lives <= 0) {
                gs.gameOver = true;
                setGameOver(true);
                setBestScore((prev) => Math.max(prev, gs.score));
                setEpisode((prev) => prev + 1);
                setEpsilon((prev) => Math.max(0.05, prev - 0.05));
              } else {
                resetPositions();
              }
            }
          }
        });

        /* ── Mouth animation ────────────────────── */
        gs.mouthAngle += gs.mouthDir * dt * 4;
        if (gs.mouthAngle >= 0.35) gs.mouthDir = -1;
        if (gs.mouthAngle <= 0.02) gs.mouthDir = 1;
      }

      /* ── Render ─────────────────────────────────── */
      ctx.fillStyle = "#07080f";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // grid lines
      ctx.strokeStyle = "rgba(205,255,100,0.03)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= COLS; x++) {
        ctx.beginPath();
        ctx.moveTo(x * CELL, 0);
        ctx.lineTo(x * CELL, CANVAS_H);
        ctx.stroke();
      }
      for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * CELL);
        ctx.lineTo(CANVAS_W, y * CELL);
        ctx.stroke();
      }

      // maze
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const v = gs.maze[r][c];
          const cx = c * CELL + CELL / 2;
          const cy = r * CELL + CELL / 2;

          if (v === 1) {
            ctx.fillStyle = "#1e1b4b";
            ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2);
            ctx.strokeStyle = "#312e81";
            ctx.lineWidth = 1;
            ctx.strokeRect(c * CELL + 1, r * CELL + 1, CELL - 2, CELL - 2);
          } else if (v === 2) {
            ctx.fillStyle = "#e2e4ed";
            ctx.beginPath();
            ctx.arc(cx, cy, 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (v === 3) {
            const pulse = 3 + Math.sin(time * 0.005) * 1.5;
            ctx.fillStyle = "#e2e4ed";
            ctx.beginPath();
            ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "rgba(226,228,237,0.2)";
            ctx.beginPath();
            ctx.arc(cx, cy, pulse + 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // ghosts
      gs.ghosts.forEach((g) => {
        if (g.eaten) return;
        const gx = g.x * CELL + CELL / 2;
        const gy = g.y * CELL + CELL / 2;
        const radius = CELL / 2 - 2;

        ctx.fillStyle = g.scared
          ? gs.powerTimer < 2 && Math.floor(time / 200) % 2 === 0
            ? "#ffffff"
            : "#3b82f6"
          : g.color;

        // ghost body
        ctx.beginPath();
        ctx.arc(gx, gy - 2, radius, Math.PI, 0);
        ctx.lineTo(gx + radius, gy + radius - 2);
        // wavy bottom
        const segs = 3;
        const segW = (radius * 2) / segs;
        for (let i = 0; i < segs; i++) {
          const sx = gx + radius - i * segW;
          const sy = gy + radius - 2 + (i % 2 === 0 ? -3 : 0);
          ctx.lineTo(sx - segW / 2, sy);
          ctx.lineTo(sx - segW, gy + radius - 2);
        }
        ctx.closePath();
        ctx.fill();

        // eyes
        if (!g.scared) {
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(gx - 3, gy - 3, 2.5, 0, Math.PI * 2);
          ctx.arc(gx + 3, gy - 3, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#1e1b4b";
          const [edx, edy] = DIR_VEC[g.dir];
          ctx.beginPath();
          ctx.arc(gx - 3 + edx, gy - 3 + edy, 1.2, 0, Math.PI * 2);
          ctx.arc(gx + 3 + edx, gy - 3 + edy, 1.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // scared face
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(gx - 3, gy - 3, 1.5, 0, Math.PI * 2);
          ctx.arc(gx + 3, gy - 3, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // pac-man
      {
        const pcx = gs.px * CELL + CELL / 2;
        const pcy = gs.py * CELL + CELL / 2;
        const radius = CELL / 2 - 1;
        const mouth = gs.mouthAngle * Math.PI;

        let startAngle = mouth;
        let endAngle = Math.PI * 2 - mouth;

        if (gs.pdir === "right") {
          startAngle = mouth;
          endAngle = Math.PI * 2 - mouth;
        } else if (gs.pdir === "left") {
          startAngle = Math.PI + mouth;
          endAngle = Math.PI - mouth;
        } else if (gs.pdir === "up") {
          startAngle = Math.PI * 1.5 + mouth;
          endAngle = Math.PI * 1.5 - mouth;
        } else if (gs.pdir === "down") {
          startAngle = Math.PI * 0.5 + mouth;
          endAngle = Math.PI * 0.5 - mouth;
        }

        ctx.fillStyle = "#facc15";
        ctx.beginPath();
        ctx.moveTo(pcx, pcy);
        ctx.arc(pcx, pcy, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();

        // glow
        ctx.shadowColor = "#facc15";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // AI label
      if (modeRef.current === "ai") {
        ctx.fillStyle = "#cdff64";
        ctx.font = "bold 10px monospace";
        ctx.textAlign = "left";
        ctx.fillText("AI AGENT", 4, 12);
      }

      // score on canvas
      ctx.fillStyle = "#cdff64";
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "right";
      ctx.fillText(`SCORE: ${gs.score}`, CANVAS_W - 4, 12);

      // game over overlay
      if (gs.gameOver) {
        ctx.fillStyle = "rgba(7,8,15,0.75)";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 20px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", CANVAS_W / 2, CANVAS_H / 2 - 10);
        ctx.fillStyle = "#e2e4ed";
        ctx.font = "12px monospace";
        ctx.fillText(`Score: ${gs.score}`, CANVAS_W / 2, CANVAS_H / 2 + 14);
        ctx.fillStyle = "#8b8fa3";
        ctx.font = "10px monospace";
        ctx.fillText("Press R to restart", CANVAS_W / 2, CANVAS_H / 2 + 34);
      }

      // paused
      if (gs.paused && !gs.gameOver) {
        ctx.fillStyle = "rgba(7,8,15,0.6)";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.fillStyle = "#cdff64";
        ctx.font = "bold 18px monospace";
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", CANVAS_W / 2, CANVAS_H / 2);
      }

      rafRef.current = requestAnimationFrame(gameLoop);
    },
    [getAIDirection, resetPositions]
  );

  /* ── Effects ──────────────────────────────────────── */
  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    lastTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gameLoop]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (
        ["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(
          key === e.key ? key : e.key
        )
      ) {
        e.preventDefault();
      }
      keysRef.current.add(e.key.length === 1 ? e.key.toLowerCase() : e.key);

      if (e.key === " " || e.key === "p") {
        const gs = gameRef.current;
        if (gs && !gs.gameOver) {
          gs.paused = !gs.paused;
          setPaused(gs.paused);
        }
      }
      if (e.key === "r" || e.key === "R") {
        initGame();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.length === 1 ? e.key.toLowerCase() : e.key);
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [initGame]);

  /* ── Handlers ──────────────────────────────────────── */
  const handleTogglePause = () => {
    const gs = gameRef.current;
    if (gs && !gs.gameOver) {
      gs.paused = !gs.paused;
      setPaused(gs.paused);
    }
  };

  const handleReset = () => {
    initGame();
  };

  const handleModeSwitch = (m: "play" | "ai") => {
    setMode(m);
    initGame();
  };

  /* ── Render ────────────────────────────────────────── */
  const maxEpScore = Math.max(1, ...episodeScores);

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-fg">
          Pac-Man ML
        </h1>
        <p className="mt-2 text-fg-dim text-sm max-w-xl">
          Reinforcement learning meets classic arcade — play manually or watch the
          AI agent
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => handleModeSwitch("play")}
            className={`font-mono text-xs px-4 py-1.5 rounded-lg border transition-colors ${
              mode === "play"
                ? "bg-accent text-[#07080f] border-accent"
                : "bg-bg-surface border-border text-fg-dim hover:border-border-hover"
            }`}
          >
            Play
          </button>
          <button
            onClick={() => handleModeSwitch("ai")}
            className={`font-mono text-xs px-4 py-1.5 rounded-lg border transition-colors ${
              mode === "ai"
                ? "bg-accent text-[#07080f] border-accent"
                : "bg-bg-surface border-border text-fg-dim hover:border-border-hover"
            }`}
          >
            Watch AI
          </button>
        </div>
      </div>

      {/* Main content: canvas + sidebar */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Canvas */}
        <div className="flex-shrink-0">
          <div className="bg-bg-surface border border-border rounded-xl p-4 inline-block">
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="block rounded"
              style={{ imageRendering: "pixelated" }}
            />
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={handleTogglePause}
              className="font-mono text-xs px-4 py-1.5 rounded-lg border border-border bg-bg-surface text-fg-dim hover:border-border-hover hover:text-fg transition-colors"
            >
              {paused ? "Resume" : "Pause"}
            </button>
            <button
              onClick={handleReset}
              className="font-mono text-xs px-4 py-1.5 rounded-lg border border-border bg-bg-surface text-fg-dim hover:border-border-hover hover:text-fg transition-colors"
            >
              Reset
            </button>
            <div className="ml-auto flex items-center gap-2 text-fg-dim text-[10px] font-mono">
              <span className="border border-border rounded px-1.5 py-0.5">W</span>
              <span className="border border-border rounded px-1.5 py-0.5">A</span>
              <span className="border border-border rounded px-1.5 py-0.5">S</span>
              <span className="border border-border rounded px-1.5 py-0.5">D</span>
              <span className="text-fg-dim">/</span>
              <span className="border border-border rounded px-1.5 py-0.5">Arrows</span>
              <span className="text-fg-dim ml-2">Space: Pause</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex-1 min-w-[240px] space-y-3">
          {/* Training Metrics header */}
          <h3 className="font-display text-xs font-bold tracking-widest uppercase text-accent">
            Training Metrics
          </h3>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Episode" value={episode.toString()} />
            <StatCard label="Score" value={score.toString()} accent />
            <StatCard label="Best Score" value={bestScore.toString()} />
            <StatCard label="Avg Score" value={avgScore.toString()} />
            <StatCard label="Epsilon" value={epsilon.toFixed(2)} />
            <div className="bg-bg-surface border border-border rounded-xl p-3">
              <div className="text-[10px] font-mono text-fg-dim uppercase tracking-wider mb-1">
                Lives
              </div>
              <div className="text-sm font-mono text-fg">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    className={i < lives ? "text-red-400" : "text-fg-dim/30"}
                  >
                    {"\u2665 "}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <StatCard label="Level" value={level.toString()} />

          {/* Episode Score Chart */}
          <div className="bg-bg-surface border border-border rounded-xl p-3">
            <div className="text-[10px] font-mono text-fg-dim uppercase tracking-wider mb-2">
              Episode Scores (Last 10)
            </div>
            {episodeScores.length === 0 ? (
              <div className="text-[10px] font-mono text-fg-dim/50 py-2">
                No episodes yet
              </div>
            ) : (
              <div className="space-y-1.5">
                {episodeScores.map((s, i) => {
                  const pct = (s / maxEpScore) * 100;
                  const barColor =
                    s < 200
                      ? "#ef4444"
                      : s < 500
                        ? "#eab308"
                        : "#22c55e";
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-fg-dim w-4 text-right">
                        {i + 1}
                      </span>
                      <div className="flex-1 h-3 bg-[#0a0b12] rounded overflow-hidden">
                        <div
                          className="h-full rounded transition-all duration-300"
                          style={{
                            width: `${Math.max(4, pct)}%`,
                            backgroundColor: barColor,
                            opacity: 0.8,
                          }}
                        />
                      </div>
                      <span className="text-[9px] font-mono text-fg-dim w-8 text-right">
                        {s}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="bg-bg-surface border border-border rounded-xl p-3">
            <div className="text-[10px] font-mono text-fg-dim uppercase tracking-wider mb-1">
              Status
            </div>
            <div className="text-xs font-mono">
              {gameOver ? (
                <span className="text-red-400">Game Over — Press R</span>
              ) : paused ? (
                <span className="text-yellow-400">Paused</span>
              ) : (
                <span className="text-accent">
                  {mode === "ai" ? "AI Agent Running" : "Playing"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Helper components ────────────────────────────────────── */

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-bg-surface border border-border rounded-xl p-3">
      <div className="text-[10px] font-mono text-fg-dim uppercase tracking-wider mb-1">
        {label}
      </div>
      <div
        className={`text-lg font-mono font-bold ${
          accent ? "text-accent" : "text-fg"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

/* ── AI helper ─────────────────────────────────────────────── */

function pickBest(
  validDirs: Dir[],
  targetX: number,
  targetY: number,
  fromX: number,
  fromY: number
): Dir {
  let bestDir = validDirs[0];
  let bestDist = Infinity;
  for (const d of validDirs) {
    const [dx, dy] = DIR_VEC[d];
    const dd = dist(fromX + dx, fromY + dy, targetX, targetY);
    if (dd < bestDist) {
      bestDist = dd;
      bestDir = d;
    }
  }
  return bestDir;
}
