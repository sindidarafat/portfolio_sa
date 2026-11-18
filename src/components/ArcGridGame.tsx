import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RotateCcw, Crosshair, Zap, Shield, Trophy, Flame, Eye, Sparkles, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface Cell {
  week: number;
  day: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
  date: string;
  count: number;
  level: number; // 0, 1, 2, 3, 4
}

interface Enemy {
  id: number;
  week: number;
  day: number;
  type: 'drone' | 'virus' | 'boss';
  health: number;
  maxHealth: number;
  spawnTime: number;
}

interface PowerUp {
  id: number;
  week: number;
  day: number;
  type: 'overcharge' | 'freeze' | 'unibeam';
  expiresAt: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
}

export const ArcGridGame: React.FC = () => {
  // Mode: 'matrix' (Heatmap viewer) or 'combat' (Arcade game)
  const [mode, setMode] = useState<'matrix' | 'combat'>('matrix');
  const [selectedYear, setSelectedYear] = useState<'2026' | '2025' | '2024' | 'ALL'>('ALL');
  const [colorTheme, setColorTheme] = useState<'cyan' | 'crimson' | 'matrix' | 'violet'>('cyan');
  
  // Custom cell hover
  const [hoveredCell, setHoveredCell] = useState<{ cell: Cell; x: number; y: number } | null>(null);

  // Paint mode for drawing commit art
  const [isPaintMode, setIsPaintMode] = useState(false);
  const [customEdits, setCustomEdits] = useState<Record<string, number>>({});

  // Game state
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('stark_arc_high_score') || '0', 10);
  });
  const [arcCharge, setArcCharge] = useState(25); // 0 to 100%
  const [unibeamReady, setUnibeamReady] = useState(false);
  const [combo, setCombo] = useState(1);
  const [comboTimer, setComboTimer] = useState(0);
  const [wave, setWave] = useState(1);
  const [commitsSecured, setCommitsSecured] = useState(0);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [reticle, setReticle] = useState<{ week: number; day: number }>({ week: 26, day: 3 });
  const [laserEffect, setLaserEffect] = useState<{ targetWeek: number; targetDay: number } | null>(null);
  const [unibeamActive, setUnibeamActive] = useState(false);
  const [announcement, setAnnouncement] = useState<string | null>("SYSTEM READY // COMMENCE PROTOCOL");

  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Generate Matrix data matching user's screenshot for 2026 and rich history for 2025/2024
  const generateYearData = useCallback((year: '2026' | '2025' | '2024' | 'ALL'): Cell[] => {
    const cells: Cell[] = [];
    const totalWeeks = 53;
    const daysInWeek = 7;

    for (let w = 0; w < totalWeeks; w++) {
      for (let d = 0; d < daysInWeek; d++) {
        let level = 0;
        let count = 0;

        // Key date calculations
        // Map approximately weeks to months
        // w 0-4: Jan, 4-8: Feb, 8-12: Mar, 12-17: Apr, 17-21: May, 21-25: Jun, 26-30: Jul, 30-34: Aug, 35-39: Sep, 40-44: Oct, 44-48: Nov, 48-52: Dec

        if (year === '2026') {
          // Exactly matching user's uploaded screenshot:
          // Feb (w=6, d=1 -> Mon), (w=5, d=3 -> Wed, d=4 -> Fri)
          // Mar (w=9, d=1 -> Mon, d=2 -> Tue)
          // May (w=19, d=3 -> Wed, d=5 -> Fri)
          // Oct (w=42, d=5, d=6)
          // Nov (w=45, d=1, d=2, d=3, d=4) - bright green clusters!
          if (w === 6 && d === 1) { level = 3; count = 4; }
          else if (w === 5 && d === 3) { level = 1; count = 1; }
          else if (w === 5 && d === 4) { level = 3; count = 5; }
          else if (w === 4 && d === 5) { level = 2; count = 2; }
          else if (w === 9 && (d === 1 || d === 2)) { level = 3; count = 4; }
          else if (w === 19 && (d === 3 || d === 5)) { level = 1; count = 1; }
          else if (w === 42 && (d === 5 || d === 6)) { level = 3; count = 5; }
          else if (w === 45 && d === 1) { level = 4; count = 8; }
          else if (w === 45 && d === 2) { level = 3; count = 4; }
          else if (w === 44 && d === 3) { level = 3; count = 5; }
          else if (w === 44 && d === 4) { level = 3; count = 4; }
          else if (w === 44 && d === 5) { level = 1; count = 1; }
          else if (w === 46 && (d === 0 || d === 1)) { level = 4; count = 9; }
        } else if (year === '2025') {
          // Very active year (SkillSwap, Electrician Finder, AI ML projects, 428 courses)
          const seed = Math.sin(w * 13 + d * 7);
          if (seed > 0.45) {
            level = Math.floor(Math.abs(seed) * 4) + 1;
            count = level * 2 + Math.floor(Math.random() * 3);
          }
        } else if (year === '2024') {
          // Active starting from summer (w >= 24)
          if (w >= 24) {
            const seed = Math.cos(w * 11 + d * 5);
            if (seed > 0.4) {
              level = Math.floor(Math.abs(seed) * 4) + 1;
              count = level * 2;
            }
          }
        } else {
          // ALL-TIME MATRIX (combines exact 2026 screenshot dots + 2025 + 2024 contributions)
          const is2026Peak =
            (w === 6 && d === 1) || (w === 5 && (d === 3 || d === 4)) || (w === 4 && d === 5) ||
            (w === 9 && (d === 1 || d === 2)) || (w === 19 && (d === 3 || d === 5)) ||
            (w === 42 && (d === 5 || d === 6)) || (w === 45 && (d === 1 || d === 2)) ||
            (w === 44 && (d === 3 || d === 4 || d === 5)) || (w === 46 && (d === 0 || d === 1));

          if (is2026Peak) {
            level = 4;
            count = 8;
          } else {
            const seed = Math.sin(w * 7 + d * 13) + Math.cos(w * 3 + d * 9);
            if (seed > 0.25) {
              level = Math.min(4, Math.floor(Math.abs(seed) * 2.1) + 1);
              count = level * 3 + 1;
            }
          }
        }

        // Apply custom paint edits if any
        const key = `${w}-${d}`;
        if (customEdits[key] !== undefined) {
          level = customEdits[key];
          count = level * 3;
        }

        const dateStr = year === 'ALL'
          ? `Week ${w + 1}, Day ${d + 1} // All-Time (2024–2026)`
          : `Week ${w + 1}, Day ${d + 1} // ${year}`;
        cells.push({ week: w, day: d, date: dateStr, count, level });
      }
    }
    return cells;
  }, [customEdits]);

  const [cells, setCells] = useState<Cell[]>(() => generateYearData('ALL'));

  useEffect(() => {
    setCells(generateYearData(selectedYear));
  }, [selectedYear, generateYearData]);

  // Color theme mapper
  const getCellColor = (level: number, isRogue = false, isReticle = false, isPowerUp = false) => {
    if (isReticle) return 'bg-arc-light border-2 border-white shadow-[0_0_12px_#00f0ff] scale-125 z-20';
    if (isPowerUp) return 'bg-amber-400 border border-yellow-200 animate-pulse shadow-[0_0_10px_#fbbf24]';
    if (isRogue) return 'bg-red-600 border border-red-400 animate-ping shadow-[0_0_12px_#ef4444]';

    if (level === 0) return 'bg-[#161b22] border border-[#21262d]/60 hover:border-cyan-500/40';

    if (colorTheme === 'cyan') {
      switch (level) {
        case 1: return 'bg-[#003847] border border-[#005c75] shadow-[0_0_4px_rgba(0,240,255,0.2)]';
        case 2: return 'bg-[#00708f] border border-[#009bb8] shadow-[0_0_6px_rgba(0,240,255,0.4)]';
        case 3: return 'bg-[#00b4d8] border border-[#38d8f7] shadow-[0_0_8px_rgba(0,240,255,0.6)]';
        case 4: return 'bg-[#00f0ff] border border-white shadow-[0_0_12px_rgba(0,240,255,0.9)]';
      }
    } else if (colorTheme === 'crimson') {
      switch (level) {
        case 1: return 'bg-[#4a0404] border border-[#7f1d1d]';
        case 2: return 'bg-[#991b1b] border border-[#b91c1c]';
        case 3: return 'bg-[#dc2626] border border-[#f87171] shadow-[0_0_8px_#ef4444]';
        case 4: return 'bg-[#fbbf24] border border-yellow-100 shadow-[0_0_12px_#fbbf24]';
      }
    } else if (colorTheme === 'matrix') {
      // Classic GitHub emerald green
      switch (level) {
        case 1: return 'bg-[#0e4429] border border-[#006d32]';
        case 2: return 'bg-[#006d32] border border-[#26a641]';
        case 3: return 'bg-[#26a641] border border-[#39d353]';
        case 4: return 'bg-[#39d353] border border-emerald-200 shadow-[0_0_8px_#39d353]';
      }
    } else {
      // Cyber violet
      switch (level) {
        case 1: return 'bg-[#2e1065] border border-[#4c1d95]';
        case 2: return 'bg-[#5b21b6] border border-[#7c3aed]';
        case 3: return 'bg-[#8b5cf6] border border-[#a78bfa]';
        case 4: return 'bg-[#c084fc] border border-white shadow-[0_0_10px_#c084fc]';
      }
    }
    return 'bg-[#161b22]';
  };

  // Start combat game
  const startGame = () => {
    setMode('combat');
    setGameActive(true);
    setScore(0);
    setArcCharge(20);
    setCombo(1);
    setWave(1);
    setCommitsSecured(0);
    setEnemies([]);
    setPowerUps([]);
    setUnibeamReady(false);
    setAnnouncement("COMBAT SIMULATION INITIALIZED // TARGET ROGUE BUGS");
    sound.playBootSound?.();
    sound.playJarvisChirp();
  };

  const stopGame = () => {
    setGameActive(false);
    setEnemies([]);
    setPowerUps([]);
  };

  // Game loop: spawning enemies and updating timers
  useEffect(() => {
    if (!gameActive) return;

    const spawnInterval = setInterval(() => {
      setEnemies(prev => {
        if (prev.length >= 8 + wave * 2) return prev;
        const newEnemy: Enemy = {
          id: Date.now() + Math.random(),
          week: Math.floor(Math.random() * 52),
          day: Math.floor(Math.random() * 7),
          type: Math.random() > 0.85 ? 'boss' : Math.random() > 0.5 ? 'virus' : 'drone',
          health: 1,
          maxHealth: 1,
          spawnTime: Date.now(),
        };
        return [...prev, newEnemy];
      });

      // Spawn powerup occasionally
      if (Math.random() > 0.75) {
        setPowerUps(prev => {
          if (prev.length >= 2) return prev;
          const types: ('overcharge' | 'freeze' | 'unibeam')[] = ['overcharge', 'freeze', 'unibeam'];
          const type = types[Math.floor(Math.random() * types.length)];
          return [
            ...prev,
            {
              id: Date.now(),
              week: Math.floor(Math.random() * 52),
              day: Math.floor(Math.random() * 7),
              type,
              expiresAt: Date.now() + 8000,
            }
          ];
        });
      }
    }, Math.max(900, 2200 - wave * 200));

    // Cleanup expired powerups
    const cleanupInterval = setInterval(() => {
      setPowerUps(prev => prev.filter(p => p.expiresAt > Date.now()));
    }, 1000);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(cleanupInterval);
    };
  }, [gameActive, wave]);

  // Combo timer decay
  useEffect(() => {
    if (combo <= 1) return;
    const timer = setTimeout(() => {
      setCombo(1);
    }, 2800);
    return () => clearTimeout(timer);
  }, [combo, comboTimer]);

  // Arc charge monitor
  useEffect(() => {
    if (arcCharge >= 100 && !unibeamReady) {
      setUnibeamReady(true);
      setAnnouncement("⚡ OVERDRIVE FULLY CHARGED! PRESS [FIRE OVERDRIVE] OR [ENTER] TO CLEAR GRID!");
      sound.playTargetLock();
    }
  }, [arcCharge, unibeamReady]);

  // Pulse blast action on cell
  const fireRepulsorAt = (week: number, day: number) => {
    setReticle({ week, day });
    setLaserEffect({ targetWeek: week, targetDay: day });
    setTimeout(() => setLaserEffect(null), 200);

    sound.playRepulsorShot();

    // Check hit on power-up
    const hitPowerUp = powerUps.find(p => p.week === week && p.day === day);
    if (hitPowerUp) {
      sound.playJarvisChirp();
      if (hitPowerUp.type === 'overcharge') {
        // Auto-blast 5 enemies
        setEnemies(prev => {
          const destroyed = prev.slice(0, 5);
          setScore(s => s + destroyed.length * 200);
          setCommitsSecured(c => c + destroyed.length);
          return prev.slice(5);
        });
        setAnnouncement("⚡ OVERCHARGE ACTIVATED! 5 THREATS PURGED!");
      } else if (hitPowerUp.type === 'unibeam') {
        setArcCharge(100);
        setAnnouncement("💥 DIRECT CORE RECHARGE! OVERDRIVE ARMED!");
      } else {
        setAnnouncement("🛡️ GRID DEFENSE BUFFER DEPLOYED!");
      }
      setPowerUps(prev => prev.filter(p => p.id !== hitPowerUp.id));
      return;
    }

    // Check hit on enemy
    const hitEnemy = enemies.find(e => e.week === week && e.day === day);
    if (hitEnemy) {
      sound.playTargetLock();
      const points = 100 * combo;
      setScore(s => {
        const next = s + points;
        if (next > highScore) {
          setHighScore(next);
          localStorage.setItem('stark_arc_high_score', String(next));
        }
        return next;
      });

      setCommitsSecured(c => c + 1);
      setCombo(c => Math.min(c + 1, 10));
      setComboTimer(Date.now());
      setArcCharge(charge => Math.min(100, charge + 7));

      setEnemies(prev => prev.filter(e => e.id !== hitEnemy.id));

      if ((commitsSecured + 1) % 10 === 0) {
        setWave(w => w + 1);
        setAnnouncement(`LEVEL UP: WAVE ${wave + 1} // ROGUE BUGS MULTIPLYING!`);
        sound.playArcPulse();
      }
    } else {
      // Missed shot
      setCombo(1);
    }
  };

  // Fire Overdrive Blast!
  const triggerUnibeam = () => {
    if (!unibeamReady && arcCharge < 100) return;
    setUnibeamActive(true);
    sound.playUnibeamBlast();

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#fbbf24', '#dc2626', '#ffffff']
    });

    const enemyCount = enemies.length;
    const bonus = 1500 + enemyCount * 250;
    setScore(s => {
      const next = s + bonus;
      if (next > highScore) {
        setHighScore(next);
        localStorage.setItem('stark_arc_high_score', String(next));
      }
      return next;
    });

    setCommitsSecured(c => c + enemyCount + 5);
    setEnemies([]);
    setPowerUps([]);
    setArcCharge(15);
    setUnibeamReady(false);
    setAnnouncement(`💥 OVERDRIVE PROTOCOL EXECUTED! ${enemyCount} ROGUE BUGS ANNIHILATED! (+${bonus} PTS)`);

    setTimeout(() => {
      setUnibeamActive(false);
    }, 800);
  };

  // Handle cell click in Paint Mode
  const handleCellClick = (week: number, day: number) => {
    if (mode === 'combat' && gameActive) {
      fireRepulsorAt(week, day);
    } else if (isPaintMode) {
      sound.playJarvisChirp();
      const key = `${week}-${day}`;
      const current = customEdits[key] !== undefined ? customEdits[key] : (cells.find(c => c.week === week && c.day === day)?.level || 0);
      const nextLevel = (current + 1) % 5;
      setCustomEdits(prev => ({ ...prev, [key]: nextLevel }));
    }
  };

  // Keyboard navigation for game
  useEffect(() => {
    if (!gameActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        setReticle(r => ({ ...r, day: (r.day + 6) % 7 }));
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        setReticle(r => ({ ...r, day: (r.day + 1) % 7 }));
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        setReticle(r => ({ ...r, week: (r.week + 52) % 53 }));
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setReticle(r => ({ ...r, week: (r.week + 1) % 53 }));
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (unibeamReady && (e.ctrlKey || e.key === 'Enter')) {
          triggerUnibeam();
        } else {
          fireRepulsorAt(reticle.week, reticle.day);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive, reticle, unibeamReady, enemies, powerUps, combo]);

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <section id="arc-matrix" className="py-16 px-4 md:px-8 relative max-w-7xl mx-auto">
      {/* Background glow and HUD framing */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-arc/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-arc/20">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold tracking-wider bg-arc/20 text-arc border border-arc/40 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-arc animate-ping" />
              LIVE HUD // TELEMETRY
            </span>
            <span className="text-xs font-mono text-slate-400">
              INTERACTIVE GRID DEFENDER
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-display flex items-center gap-3">
            <span>GITHUB MATRIX & GRID DEFENDER</span>
            <span className="text-xs font-mono px-2 py-1 rounded bg-slate-800 text-amber-400 border border-amber-500/30">
              v2.8 INTERACTIVE
            </span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mt-1 font-sans">
            Interactive visualization of GitHub contribution commits across all active cycles. Switch years, design custom commit art, or initialize the <strong>Grid Defender Arcade</strong> to protect the repository grid from rogue bugs!
          </p>
        </div>

        {/* View & Game Mode Selector */}
        <div className="flex items-center gap-3 flex-wrap">
          {mode === 'matrix' ? (
            <>
              <button
                onClick={() => {
                  setIsPaintMode(!isPaintMode);
                  sound.playJarvisChirp();
                }}
                className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-all border ${
                  isPaintMode
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                    : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isPaintMode ? 'PAINT MODE ACTIVE' : 'DRAW COMMIT ART'}
              </button>

              <button
                onClick={startGame}
                className="px-4 py-2 rounded text-xs font-mono font-bold tracking-wider bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center gap-2 border border-amber-400/50 transition-all transform hover:scale-105 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                PLAY GRID DEFENDER GAME
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={stopGame}
                className="px-3 py-1.5 rounded text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                RETURN TO HEATMAP
              </button>
              <button
                onClick={startGame}
                className="px-3 py-1.5 rounded text-xs font-mono bg-red-600/30 text-red-300 border border-red-500/50 hover:bg-red-600/40 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                RESTART MISSION
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main HUD Terminal Card */}
      <div className={`mt-6 rounded-xl border relative transition-all duration-300 ${
        unibeamActive 
          ? 'border-white bg-cyan-950/90 shadow-[0_0_80px_#00f0ff]' 
          : mode === 'combat' 
            ? 'border-red-500/40 bg-[#090d19]/90 shadow-[0_0_35px_rgba(220,38,38,0.25)]' 
            : 'border-arc/30 bg-[#0a0f1d]/90 shadow-[0_0_30px_rgba(0,240,255,0.1)]'
      }`}>
        
        {/* Top telemetry status bar inside card */}
        <div className="px-5 py-3 border-b border-arc/20 bg-slate-950/60 rounded-t-xl flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${mode === 'combat' ? 'bg-red-500 animate-ping' : 'bg-arc animate-pulse'}`} />
              <span className="font-bold text-white tracking-wider">
                {mode === 'combat'
                  ? 'COMBAT ENGAGEMENT // BUG SWARM'
                  : selectedYear === 'ALL'
                    ? 'ALL-TIME CONTRIBUTION OVERVIEW (2024 – 2026)'
                    : `${selectedYear} CONTRIBUTION OVERVIEW`}
              </span>
            </div>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="text-slate-400 hidden sm:inline">
              COORDINATES: <span className="text-arc">23.8103° N, 90.4125° E</span>
            </span>
          </div>

          {/* Right side options: Theme selector or Game Stats */}
          {mode === 'matrix' ? (
            <div className="flex items-center gap-2 flex-wrap">
              {/* Theme selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 text-[10px]">THEME:</span>
                {(['cyan', 'crimson', 'matrix', 'violet'] as const).map(theme => (
                  <button
                    key={theme}
                    onClick={() => {
                      setColorTheme(theme);
                      sound.playJarvisChirp();
                    }}
                    title={`Theme: ${theme}`}
                    className={`w-4 h-4 rounded-full border transition-all ${
                      colorTheme === theme ? 'scale-125 border-white ring-2 ring-arc/50' : 'opacity-60 border-transparent hover:opacity-100'
                    } ${
                      theme === 'cyan' ? 'bg-cyan-400' : theme === 'crimson' ? 'bg-red-500' : theme === 'matrix' ? 'bg-emerald-400' : 'bg-purple-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Combat Mode Telemetry Stats */
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-1.5 text-white">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>SCORE: <strong className="text-amber-400 text-sm">{score}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <span>BEST: <strong className="text-white">{highScore}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className={`w-3.5 h-3.5 ${combo > 1 ? 'text-red-400 animate-bounce' : 'text-slate-500'}`} />
                <span className={combo > 1 ? 'text-red-400 font-bold' : 'text-slate-400'}>
                  {combo}x COMBO
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-arc" />
                <span className="text-slate-300">WAVE {wave}</span>
              </div>
            </div>
          )}
        </div>

        {/* Combat Announcement Banner */}
        {mode === 'combat' && (
          <div className="bg-red-950/40 border-b border-red-500/30 px-4 sm:px-5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-red-200">
            <span className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
              {announcement}
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <span>COMMITS SECURED: <strong className="text-arc">{commitsSecured}</strong></span>
              {unibeamReady && (
                <button
                  onClick={triggerUnibeam}
                  className="px-2.5 py-0.5 rounded bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-[11px] animate-pulse shadow-[0_0_15px_#00f0ff]"
                >
                  ⚡ FIRE OVERDRIVE [ENTER]
                </button>
              )}
            </div>
          </div>
        )}

        {/* Energy Core Bar (Active in Combat or Heatmap) */}
        <div className="px-4 sm:px-5 pt-3 pb-2 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-900/30 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400">ENERGY CORE:</span>
            <div className="w-32 sm:w-64 h-3 bg-slate-950 rounded-full overflow-hidden border border-arc/30 p-0.5 relative">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  arcCharge >= 100 
                    ? 'bg-gradient-to-r from-cyan-400 via-amber-300 to-white animate-pulse shadow-[0_0_15px_#00f0ff]' 
                    : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-arc'
                }`}
                style={{ width: `${arcCharge}%` }}
              />
            </div>
            <span className={`font-bold ${arcCharge >= 100 ? 'text-amber-300 animate-pulse' : 'text-arc'}`}>
              {arcCharge}% {arcCharge >= 100 ? 'OVERCHARGED' : 'STABLE'}
            </span>
          </div>

          <div className="text-slate-400 text-[11px]">
            {selectedYear === 'ALL'
              ? '336+ contributions across 2024–2026 (All-Time)'
              : selectedYear === '2026'
                ? '60 contributions in 2026'
                : selectedYear === '2025'
                  ? '184 contributions in 2025'
                  : '92 contributions in 2024'}
          </div>
        </div>

        {/* The GitHub Matrix Canvas / Grid Area + Compact Right-Side Year Strip */}
        <div className="p-4 md:p-6 relative" ref={gridContainerRef}>
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            {/* Main Scrollable Contribution Grid */}
            <div className="flex-1 overflow-x-auto relative">
              {/* Laser beam overlay effect */}
              {laserEffect && (
                <div 
                  className="absolute pointer-events-none z-30 transition-opacity duration-150"
                  style={{
                    left: `${(laserEffect.targetWeek / 53) * 100}%`,
                    top: `${(laserEffect.targetDay / 7) * 100}%`,
                  }}
                >
                  <div className="w-12 h-12 -ml-6 -mt-6 rounded-full bg-cyan-400/40 animate-ping border border-white" />
                  <div className="w-4 h-4 -ml-2 -mt-2 rounded-full bg-white shadow-[0_0_20px_#00f0ff]" />
                </div>
              )}

              {/* Month labels header */}
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-2 pl-8 min-w-[740px]">
                {monthLabels.map(m => (
                  <span key={m} className="w-12 text-left">{m}</span>
                ))}
              </div>

              <div className="flex gap-2 min-w-[740px]">
                {/* Day labels column */}
                <div className="flex flex-col justify-between text-[10px] font-mono text-slate-500 pr-2 select-none h-[116px]">
                  {dayLabels.map((d, i) => (
                    <span key={i} className="h-3 leading-3">{d}</span>
                  ))}
                </div>

                {/* 53 Columns of 7 Days */}
                <div className="grid grid-flow-col grid-rows-7 gap-[3px] flex-1">
                  {cells.map((cell) => {
                    const isEnemy = enemies.find(e => e.week === cell.week && e.day === cell.day);
                    const isPowerUp = powerUps.find(p => p.week === cell.week && p.day === cell.day);
                    const isReticle = mode === 'combat' && reticle.week === cell.week && reticle.day === cell.day;

                    return (
                      <div
                        key={`${cell.week}-${cell.day}`}
                        onClick={() => handleCellClick(cell.week, cell.day)}
                        onMouseEnter={(e) => {
                          if (mode === 'combat') {
                            setReticle({ week: cell.week, day: cell.day });
                          } else {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredCell({ cell, x: rect.left, y: rect.top });
                          }
                        }}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`w-[13px] h-[13px] rounded-[2px] transition-all cursor-pointer relative ${getCellColor(
                          cell.level,
                          Boolean(isEnemy),
                          isReticle,
                          Boolean(isPowerUp)
                        )}`}
                      >
                        {/* Enemy icon */}
                        {isEnemy && (
                          <span className="absolute inset-0 flex items-center justify-center text-[9px] text-white font-bold animate-spin-slow">
                            ⚡
                          </span>
                        )}
                        {/* Power up icon */}
                        {isPowerUp && (
                          <span className="absolute inset-0 flex items-center justify-center text-[9px] text-black font-extrabold animate-bounce">
                            ★
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Very Small Right-Side Year Strip inside Box */}
            <div className="flex lg:flex-col items-center lg:items-stretch justify-end lg:justify-center gap-1 lg:pl-3 lg:border-l border-slate-800/80 shrink-0 pt-2 lg:pt-4">
              <button
                onClick={() => {
                  setSelectedYear('ALL');
                  sound.playJarvisChirp();
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider transition-all ${
                  selectedYear === 'ALL'
                    ? 'bg-blue-600 text-white shadow-[0_0_8px_rgba(37,99,235,0.6)]'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white'
                }`}
              >
                ALL-TIME
              </button>
              <div className="flex lg:flex-col gap-1 items-center lg:items-stretch">
                {(['2026', '2025', '2024'] as const).map(yr => (
                  <button
                    key={yr}
                    onClick={() => {
                      setSelectedYear(yr);
                      sound.playJarvisChirp();
                    }}
                    className={`px-2 py-0.5 rounded text-[9px] font-mono transition-all ${
                      selectedYear === yr
                        ? 'bg-cyan-500/25 text-arc border border-arc/50 font-semibold'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/60'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom legend & controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400 mt-4 pt-3 border-t border-slate-800/80">
            <a
              href="https://github.com/sindidarafat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-arc hover:underline flex items-center gap-1 text-[11px]"
            >
              Verify live on github.com/sindidarafat &rarr;
            </a>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Less</span>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map(lvl => (
                  <div
                    key={lvl}
                    className={`w-[11px] h-[11px] rounded-[2px] ${getCellColor(lvl)}`}
                  />
                ))}
              </div>
              <span className="text-slate-500">More</span>
            </div>
          </div>
        </div>

        {/* Hover Tooltip in Matrix View */}
        {hoveredCell && mode === 'matrix' && (
          <div
            className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-12 bg-slate-950/95 border border-arc/60 px-3 py-1.5 rounded shadow-[0_0_15px_rgba(0,240,255,0.4)] text-xs font-mono text-white backdrop-blur-md"
            style={{ left: hoveredCell.x, top: hoveredCell.y }}
          >
            <div className="text-arc font-bold">
              {hoveredCell.cell.count > 0 ? `${hoveredCell.cell.count} commits recorded` : 'No public commits'}
            </div>
            <div className="text-[10px] text-slate-400">
              {hoveredCell.cell.date}
            </div>
          </div>
        )}

        {/* Instructions banner for combat mode */}
        {mode === 'combat' && (
          <div className="p-3 bg-slate-950/80 border-t border-red-500/20 text-xs font-mono text-slate-400 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span><strong>HOW TO DEFEND:</strong> Click or [SPACE] to fire Pulse Cannon at red anomalies.</span>
              <span><strong>CONTROLS:</strong> Mouse aim or [WASD / Arrow Keys].</span>
              <span><strong>COMBOS:</strong> Chain quick hits to boost score multiplier up to 10x!</span>
            </div>
            <button
              onClick={() => {
                sound.playRepulsorShot();
                fireRepulsorAt(reticle.week, reticle.day);
              }}
              className="px-3 py-1 rounded bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1"
            >
              <Crosshair className="w-3.5 h-3.5" />
              FIRE PULSE
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
