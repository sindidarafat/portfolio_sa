import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ArrowRight, Zap, FileText, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface CoreStageConfig {
  level: number;
  label: string;
  diagnostic: string;
  outerRing: string;
  gearRing: string;
  housing: string;
  innerRing: string;
  coreOuter: string;
  coreInner: string;
  coilClass: string;
  coilCount: number;
  badgeClass: string;
  shockwaveColor: string;
  diagBorder: string;
  diagText: string;
  outerSpinSec: number;
  gearSpinSec: number;
  innerSpinSec: number;
  orbCount: number;
  showLightning: boolean;
  tremor: boolean;
}

const CORE_STAGES: Record<number, CoreStageConfig> = {
  100: {
    level: 100,
    label: 'NOMINAL',
    diagnostic: 'ALL CIRCUITS NOMINAL',
    outerRing: 'border-arc/35',
    gearRing: 'border-amber-400/40',
    housing: 'border-arc/65 shadow-[0_0_40px_rgba(0,240,255,0.4)]',
    innerRing: 'border-arc/80 bg-cyan-950/35',
    coreOuter: 'bg-white shadow-[0_0_32px_#00f0ff] scale-100',
    coreInner: 'bg-cyan-400 shadow-[0_0_18px_#ffffff]',
    coilClass: 'bg-amber-400/80 shadow-[0_0_6px_#fbbf24]',
    coilCount: 8,
    badgeClass: 'border-arc/50 text-arc bg-slate-900/95 shadow-[0_0_12px_rgba(0,240,255,0.3)]',
    shockwaveColor: 'border-cyan-400',
    diagBorder: 'border-slate-800',
    diagText: 'text-arc',
    outerSpinSec: 18,
    gearSpinSec: 22,
    innerSpinSec: 10,
    orbCount: 0,
    showLightning: false,
    tremor: false,
  },
  150: {
    level: 150,
    label: 'CHARGED SURGE',
    diagnostic: 'SURGE ACTIVE // 150%',
    outerRing: 'border-cyan-300/75 shadow-[0_0_25px_rgba(0,240,255,0.45)]',
    gearRing: 'border-cyan-200/75',
    housing: 'border-cyan-300 shadow-[0_0_65px_rgba(0,240,255,0.75)]',
    innerRing: 'border-cyan-200 bg-cyan-900/50 shadow-[inset_0_0_25px_rgba(0,240,255,0.5)]',
    coreOuter: 'bg-white shadow-[0_0_50px_#38f9ff] scale-110',
    coreInner: 'bg-cyan-200 shadow-[0_0_28px_#00f0ff]',
    coilClass: 'bg-cyan-300 shadow-[0_0_12px_#00f0ff]',
    coilCount: 12,
    badgeClass: 'border-cyan-300 text-cyan-200 bg-cyan-950/90 shadow-[0_0_20px_rgba(0,240,255,0.55)]',
    shockwaveColor: 'border-cyan-200',
    diagBorder: 'border-cyan-500/50',
    diagText: 'text-cyan-300',
    outerSpinSec: 7,
    gearSpinSec: 9,
    innerSpinSec: 4,
    orbCount: 4,
    showLightning: false,
    tremor: false,
  },
  200: {
    level: 200,
    label: 'SOLAR OVERCLOCK',
    diagnostic: 'SOLAR OVERCLOCK // 200%',
    outerRing: 'border-amber-400/85 shadow-[0_0_35px_rgba(251,191,36,0.55)]',
    gearRing: 'border-yellow-200/85',
    housing: 'border-amber-400 shadow-[0_0_75px_rgba(251,191,36,0.8)]',
    innerRing: 'border-yellow-300 bg-amber-950/55 shadow-[inset_0_0_30px_rgba(251,191,36,0.6)]',
    coreOuter: 'bg-yellow-50 shadow-[0_0_60px_#fbbf24] scale-[1.18]',
    coreInner: 'bg-amber-400 shadow-[0_0_32px_#fde047]',
    coilClass: 'bg-yellow-300 shadow-[0_0_14px_#fbbf24]',
    coilCount: 16,
    badgeClass: 'border-amber-400 text-amber-200 bg-amber-950/90 shadow-[0_0_24px_rgba(251,191,36,0.65)]',
    shockwaveColor: 'border-amber-400',
    diagBorder: 'border-amber-400/60',
    diagText: 'text-amber-300',
    outerSpinSec: 3.5,
    gearSpinSec: 4.5,
    innerSpinSec: 2,
    orbCount: 6,
    showLightning: true,
    tremor: false,
  },
  250: {
    level: 250,
    label: 'CRITICAL PLASMA',
    diagnostic: 'CRITICAL PLASMA // 250%',
    outerRing: 'border-red-500/90 shadow-[0_0_45px_rgba(239,68,68,0.7)]',
    gearRing: 'border-fuchsia-400/85',
    housing: 'border-red-500 shadow-[0_0_85px_rgba(239,68,68,0.9)]',
    innerRing: 'border-rose-300 bg-red-950/65 shadow-[inset_0_0_35px_rgba(239,68,68,0.75)]',
    coreOuter: 'bg-rose-50 shadow-[0_0_70px_#ef4444] scale-[1.24]',
    coreInner: 'bg-red-500 shadow-[0_0_35px_#f43f5e]',
    coilClass: 'bg-rose-400 shadow-[0_0_16px_#ef4444]',
    coilCount: 16,
    badgeClass: 'border-red-400 text-red-200 bg-red-950/95 shadow-[0_0_28px_rgba(239,68,68,0.75)]',
    shockwaveColor: 'border-red-500',
    diagBorder: 'border-red-500/70',
    diagText: 'text-red-400 animate-pulse',
    outerSpinSec: 1.8,
    gearSpinSec: 2.2,
    innerSpinSec: 1.1,
    orbCount: 8,
    showLightning: true,
    tremor: true,
  },
  300: {
    level: 300,
    label: 'MAX OVERDRIVE',
    diagnostic: '⚡ SUPERNOVA // 300% MAX',
    outerRing: 'border-white shadow-[0_0_65px_#00f0ff]',
    gearRing: 'border-amber-300 shadow-[0_0_35px_#fbbf24]',
    housing: 'border-white shadow-[0_0_110px_#00f0ff,0_0_60px_#ef4444] ring-4 ring-amber-300/70',
    innerRing: 'border-white bg-gradient-to-tr from-cyan-500/40 via-amber-400/40 to-red-500/40 shadow-[inset_0_0_45px_#ffffff]',
    coreOuter: 'bg-white shadow-[0_0_90px_#ffffff,0_0_45px_#00f0ff] scale-[1.32]',
    coreInner: 'bg-gradient-to-r from-cyan-300 via-yellow-200 to-rose-400 shadow-[0_0_40px_#ffffff]',
    coilClass: 'bg-white shadow-[0_0_18px_#00f0ff]',
    coilCount: 20,
    badgeClass: 'border-white text-slate-950 bg-gradient-to-r from-cyan-300 via-amber-300 to-rose-300 font-extrabold shadow-[0_0_35px_#00f0ff]',
    shockwaveColor: 'border-white',
    diagBorder: 'border-white/80 shadow-[0_0_25px_rgba(0,240,255,0.4)]',
    diagText: 'text-amber-300 animate-pulse',
    outerSpinSec: 0.9,
    gearSpinSec: 1.2,
    innerSpinSec: 0.6,
    orbCount: 10,
    showLightning: true,
    tremor: true,
  },
};

const formatRuntime = (totalSeconds: number) => {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return [hrs, mins, secs].map(v => String(v).padStart(2, '0')).join(':');
};

export const Hero: React.FC = () => {
  const [pulseKey, setPulseKey] = useState(0);
  const [pulseActive, setPulseActive] = useState(false);
  const [energyLevel, setEnergyLevel] = useState<number>(100);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const coreRef = useRef<HTMLDivElement>(null);

  // Session-scoped live runtime timer (starts on tab visit, stops/clears when tab closes)
  useEffect(() => {
    const storageKey = 'crixus_session_start_ts';
    let startTs = Number(sessionStorage.getItem(storageKey));
    if (!startTs || Number.isNaN(startTs)) {
      startTs = Date.now();
      sessionStorage.setItem(storageKey, String(startTs));
    }

    const updateElapsed = () => {
      setElapsedSeconds(Math.max(0, Math.floor((Date.now() - startTs) / 1000)));
    };

    updateElapsed();
    const timer = setInterval(updateElapsed, 1000);
    return () => clearInterval(timer);
  }, []);

  const stage = CORE_STAGES[energyLevel] || CORE_STAGES[100];

  const triggerArcOverload = () => {
    const nextLevel = energyLevel >= 300 ? 100 : energyLevel + 50;
    setEnergyLevel(nextLevel);
    setPulseKey(k => k + 1);
    setPulseActive(true);

    if (nextLevel === 300) {
      sound.playUnibeamBlast();
      if (coreRef.current) {
        const rect = coreRef.current.getBoundingClientRect();
        const originX = (rect.left + rect.width / 2) / window.innerWidth;
        const originY = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          particleCount: 75,
          spread: 360,
          startVelocity: 28,
          origin: { x: originX, y: originY },
          colors: ['#00f0ff', '#fbbf24', '#ef4444', '#ffffff'],
        });
      }
    } else if (nextLevel === 250) {
      sound.playRepulsorShot();
    } else if (nextLevel === 200) {
      sound.playTargetLock();
      sound.playArcPulse();
    } else if (nextLevel === 150) {
      sound.playArcPulse();
    } else {
      // Cooling down back to 100%
      sound.playJarvisChirp();
    }

    setTimeout(() => setPulseActive(false), 750);
  };

  return (
    <section id="protocol" className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Holographic Hex Grid & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,240,255,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-arc/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Mission Briefing & Title */}
        <div className="lg:col-span-7 space-y-6">
          {/* Crixus Live Session Runtime Pill */}
          <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-2 rounded-2xl sm:rounded-full bg-slate-900/95 border border-arc/45 text-xs font-mono text-cyan-200 shadow-[0_0_18px_rgba(0,240,255,0.22)]">
            <span className="w-2 h-2 rounded-full bg-arc animate-ping shrink-0" />
            <span className="text-slate-200">
              Crixus is observing. Master is busy in fixing the minimums.
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-amber-400 font-bold tracking-wider">
              Runtime: {formatRuntime(elapsedSeconds)}
            </span>
          </div>

          {/* Main Hero Header */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black font-display tracking-tight text-white leading-none">
              <span className="block text-slate-300">I AM</span>
              <span className="bg-gradient-to-r from-white via-cyan-200 to-arc bg-clip-text text-transparent text-glow-cyan">
                {portfolioData.personal.name}
              </span>
            </h1>
            <p className="text-base sm:text-lg font-mono text-amber-400 font-semibold tracking-wide flex flex-wrap items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400 fill-current animate-pulse shrink-0" />
              <span>Product and Business Analyst</span>
              <span className="text-slate-500 px-1">|</span>
              <span>Full-Stack Engineer</span>
              <span className="text-slate-500 px-1">|</span>
              <span>AI/ML Researcher</span>
            </p>
          </div>

          {/* Summary / Mission Brief */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-2xl bg-slate-950/40 p-4 rounded-xl border border-slate-800 backdrop-blur-sm">
            {portfolioData.personal.summary}
          </p>

          {/* Quick HUD Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {portfolioData.hudStats.map((stat, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-[#0c1324]/80 border border-slate-800 hover:border-arc/40 transition-all group hud-corner-box flex flex-col justify-between"
              >
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{stat.label}</div>
                <div className="text-sm sm:text-base font-display font-extrabold text-white group-hover:text-arc transition-colors leading-snug my-1">
                  {stat.value}
                </div>
                <div className="text-[11px] font-mono text-amber-400/90 leading-tight">{stat.detail}</div>
              </div>
            ))}
          </div>

          {/* Tactical Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#arc-matrix"
              onClick={() => sound.playRepulsorShot()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-mono font-bold text-xs tracking-wider shadow-[0_0_25px_rgba(220,38,38,0.5)] flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 border border-amber-300/40"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>PLAY GRID DEFENDER (GAME)</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#projects"
              onClick={() => sound.playJarvisChirp()}
              className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-mono text-xs border border-arc/40 hover:border-arc transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
            >
              <Terminal className="w-4 h-4 text-arc" />
              <span>EXPLORE PROJECTS</span>
            </a>

            <a
              href={portfolioData.personal.cvUrl}
              download="Sindid_Arafat_CV.pdf"
              onClick={() => sound.playJarvisChirp()}
              className="px-4 py-3 rounded-xl bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs border border-slate-700 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>CV (PDF)</span>
            </a>
          </div>

          {/* Social & Direct Links — Large & Highly Visible */}
          <div className="pt-4 space-y-2.5">
            <div className="text-xs font-mono text-slate-400 tracking-wider uppercase font-semibold">
              CONNECT DIRECTLY
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playJarvisChirp()}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border-2 border-slate-700 hover:border-arc shadow-[0_0_15px_rgba(0,240,255,0.12)] hover:shadow-[0_0_24px_rgba(0,240,255,0.4)] transition-all transform hover:-translate-y-0.5 group"
                title="GitHub Profile"
              >
                <GithubIcon className="w-7 h-7 text-white group-hover:text-arc transition-colors" />
                <div className="text-left">
                  <div className="text-xs font-mono font-bold tracking-wide text-white group-hover:text-arc">GITHUB</div>
                  <div className="text-[11px] font-sans text-slate-400">30 Repos</div>
                </div>
              </a>

              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playJarvisChirp()}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0a192f]/90 hover:bg-[#0d2547] text-white border-2 border-[#0a66c2]/70 hover:border-[#38bdf8] shadow-[0_0_18px_rgba(10,102,194,0.28)] hover:shadow-[0_0_28px_rgba(56,189,248,0.45)] transition-all transform hover:-translate-y-0.5 group"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-7 h-7 text-[#38bdf8] group-hover:text-white transition-colors" />
                <div className="text-left">
                  <div className="text-xs font-mono font-bold tracking-wide text-white group-hover:text-[#7dd3fc]">LINKEDIN</div>
                  <div className="text-[11px] font-sans text-slate-300">Connect</div>
                </div>
              </a>

              <a
                href={`mailto:${portfolioData.personal.email}?subject=Email%20from%20Portfolio`}
                onClick={() => sound.playJarvisChirp()}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border-2 border-amber-500/50 hover:border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.18)] hover:shadow-[0_0_24px_rgba(251,191,36,0.4)] transition-all transform hover:-translate-y-0.5 group max-w-full"
                title="Direct Email"
              >
                <Mail className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors shrink-0" />
                <div className="text-left min-w-0">
                  <div className="text-xs font-mono font-bold tracking-wide text-white group-hover:text-amber-300">EMAIL</div>
                  <div className="text-[11px] font-sans text-slate-300 truncate">{portfolioData.personal.email}</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Multi-Stage 3D Energy Core */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div
            ref={coreRef}
            className={`relative w-64 h-64 sm:w-[340px] sm:h-[340px] flex items-center justify-center ${
              stage.tremor ? 'animate-core-tremor' : ''
            }`}
          >
            {/* Expanding Discharge Shockwave Ring on Every Click */}
            {pulseActive && (
              <div
                key={pulseKey}
                className={`absolute inset-4 rounded-full border-4 pointer-events-none z-30 animate-core-shockwave ${stage.shockwaveColor}`}
              />
            )}

            {/* Supernova Secondary Halo at 300% */}
            {energyLevel === 300 && (
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-400/20 via-amber-400/25 to-red-500/25 blur-xl animate-pulse pointer-events-none" />
            )}

            {/* Outer Tech Ring — Spin Speed Scales Sequentially */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-dashed transition-all duration-500 ${stage.outerRing}`}
              style={{ animation: `spin ${stage.outerSpinSec}s linear infinite` }}
            >
              {/* Orbiting Energy Plasma Orbs (Appear from 150% → 300%) */}
              {Array.from({ length: stage.orbCount }).map((_, idx) => {
                const angle = (360 / stage.orbCount) * idx;
                const orbColor =
                  energyLevel >= 300
                    ? 'bg-white shadow-[0_0_14px_#00f0ff]'
                    : energyLevel >= 250
                      ? 'bg-red-400 shadow-[0_0_12px_#ef4444]'
                      : energyLevel >= 200
                        ? 'bg-amber-300 shadow-[0_0_12px_#fbbf24]'
                        : 'bg-cyan-300 shadow-[0_0_12px_#00f0ff]';
                return (
                  <div
                    key={idx}
                    className="absolute inset-0"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div className={`w-2.5 h-2.5 rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2 ${orbColor}`} />
                  </div>
                );
              })}
            </div>

            {/* Reverse Titanium Gear Ring — Spin Speed Scales Sequentially */}
            <div
              className={`absolute inset-4 rounded-full border-2 border-t-transparent border-b-transparent transition-all duration-500 ${stage.gearRing}`}
              style={{ animation: `spin-reverse ${stage.gearSpinSec}s linear infinite` }}
            />

            {/* Glowing Interactive Core Housing */}
            <div
              onClick={triggerArcOverload}
              title={`Stage ${energyLevel}% (${stage.label}) — Click to Power Up!`}
              className={`relative z-20 w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-slate-950 border-4 flex items-center justify-center cursor-pointer transition-all duration-500 transform hover:scale-105 active:scale-95 ${stage.housing}`}
            >
              {/* Electromagnetic Coils (8 → 12 → 16 → 20 Coils by Power Stage) */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                {Array.from({ length: stage.coilCount }).map((_, idx) => {
                  const deg = (360 / stage.coilCount) * idx;
                  return (
                    <div
                      key={`${energyLevel}-${idx}`}
                      className={`absolute w-1 h-7 sm:h-8 left-1/2 top-2 -translate-x-1/2 origin-[50%_96px] sm:origin-[50%_120px] transition-all duration-300 ${stage.coilClass}`}
                      style={{ transform: `rotate(${deg}deg)` }}
                    />
                  );
                })}
              </div>

              {/* Crackling Energy Arcs SVG (200% / 250% / 300%) */}
              {stage.showLightning && (
                <svg
                  viewBox="0 0 200 200"
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
                  style={{ animation: `spin-reverse ${stage.innerSpinSec * 1.4}s linear infinite` }}
                >
                  <polyline
                    points="100,15 92,42 106,58 100,82"
                    fill="none"
                    stroke={energyLevel >= 300 ? '#ffffff' : energyLevel >= 250 ? '#fb7185' : '#fde047'}
                    strokeWidth="2.2"
                    className="animate-pulse"
                  />
                  <polyline
                    points="185,100 158,92 142,107 118,100"
                    fill="none"
                    stroke={energyLevel >= 300 ? '#00f0ff' : energyLevel >= 250 ? '#ef4444' : '#fbbf24'}
                    strokeWidth="2.2"
                    className="animate-pulse"
                  />
                  <polyline
                    points="100,185 108,158 93,142 100,118"
                    fill="none"
                    stroke={energyLevel >= 300 ? '#fbbf24' : energyLevel >= 250 ? '#c084fc' : '#fde047'}
                    strokeWidth="2.2"
                    className="animate-pulse"
                  />
                  <polyline
                    points="15,100 42,108 58,93 82,100"
                    fill="none"
                    stroke={energyLevel >= 300 ? '#00f0ff' : energyLevel >= 250 ? '#ef4444' : '#fbbf24'}
                    strokeWidth="2.2"
                    className="animate-pulse"
                  />
                </svg>
              )}

              {/* Inner Geometric Lattice */}
              <div className={`relative w-32 h-32 sm:w-36 sm:h-36 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${stage.innerRing}`}>
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-dashed border-white/75"
                  style={{ animation: `spin ${stage.innerSpinSec}s linear infinite` }}
                />

                {/* Central Pure Glowing Plasma Core */}
                <div className={`absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 ${stage.coreOuter}`}>
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full animate-pulse transition-all duration-500 ${stage.coreInner}`} />
                </div>
              </div>

              {/* Dynamic Click Output Indicator */}
              <div className={`absolute -bottom-8 px-3.5 py-1 rounded-full border text-[10px] font-mono tracking-wider whitespace-nowrap transition-all duration-300 ${stage.badgeClass}`}>
                {energyLevel === 300
                  ? '⚡ 300% MAX OVERDRIVE // CLICK TO RESET'
                  : `CLICK TO POWER UP // ${energyLevel}% ${stage.label}`}
              </div>
            </div>

            {/* Ambient Pulse Waves */}
            <div className={`absolute -inset-6 rounded-full border animate-ping pointer-events-none ${stage.outerRing}`} />
          </div>

          {/* 5-Stage Sequential Power Meter Pills */}
          <div className="mt-11 flex items-center gap-1.5 font-mono text-[10px]">
            {[100, 150, 200, 250, 300].map(lvl => {
              const reached = energyLevel >= lvl;
              const pillColor =
                lvl === 300
                  ? 'bg-gradient-to-r from-cyan-400 via-amber-400 to-red-500 text-slate-950 font-extrabold shadow-[0_0_10px_#00f0ff]'
                  : lvl === 250
                    ? 'bg-red-500 text-white font-bold shadow-[0_0_8px_#ef4444]'
                    : lvl === 200
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_8px_#fbbf24]'
                      : lvl === 150
                        ? 'bg-cyan-300 text-slate-950 font-bold shadow-[0_0_8px_#00f0ff]'
                        : 'bg-arc/80 text-slate-950 font-bold';
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => {
                    setEnergyLevel(lvl);
                    setPulseKey(k => k + 1);
                    setPulseActive(true);
                    if (lvl === 300) sound.playUnibeamBlast();
                    else if (lvl >= 200) sound.playRepulsorShot();
                    else sound.playArcPulse();
                    setTimeout(() => setPulseActive(false), 750);
                  }}
                  className={`px-2 py-0.5 rounded transition-all ${
                    reached ? pillColor : 'bg-slate-900 text-slate-500 border border-slate-800 hover:text-slate-300'
                  }`}
                >
                  {lvl}%
                </button>
              );
            })}
          </div>

          {/* Diagnostic Readout Box below core — Reacts Live to Power Stage! */}
          <div className={`mt-4 w-full max-w-sm bg-slate-950/85 border rounded-xl p-4 font-mono text-xs text-slate-400 space-y-1.5 shadow-xl transition-all duration-500 ${stage.diagBorder}`}>
            <div className="flex justify-between text-slate-300 border-b border-slate-800 pb-1.5">
              <span>SYSTEM DIAGNOSTIC</span>
              <span className={`font-bold ${stage.diagText}`}>{stage.diagnostic}</span>
            </div>
            <div className="flex justify-between">
              <span>PRIMARY FOCUS:</span>
              <span className="text-white">Product &amp; Business Analysis</span>
            </div>
            <div className="flex justify-between">
              <span>CORE ARCHITECTURE:</span>
              <span className="text-amber-400">Full-Stack &amp; AI/ML Research</span>
            </div>
            <div className="flex justify-between">
              <span>CURRENT ROLE:</span>
              <span className="text-emerald-400">Data &amp; Strategy Intern @ CAP</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
