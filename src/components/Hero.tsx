import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Zap, FileText, Mail, Gamepad2 } from 'lucide-react';
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
    label: 'Nominal',
    diagnostic: 'All Circuits Nominal',
    outerRing: 'border-cyan-400/35',
    gearRing: 'border-amber-400/40',
    housing: 'border-cyan-400/55 shadow-[0_0_32px_rgba(34,211,238,0.22)]',
    innerRing: 'border-cyan-400/70 bg-cyan-950/25',
    coreOuter: 'bg-white shadow-[0_0_24px_#22d3ee] scale-100',
    coreInner: 'bg-cyan-400 shadow-[0_0_12px_#ffffff]',
    coilClass: 'bg-amber-400/80',
    coilCount: 8,
    badgeClass: 'border-white/15 text-cyan-300 bg-[#11151e]/95',
    shockwaveColor: 'border-cyan-400',
    diagBorder: 'border-white/[0.08]',
    diagText: 'text-cyan-300',
    outerSpinSec: 20,
    gearSpinSec: 24,
    innerSpinSec: 12,
    orbCount: 0,
    showLightning: false,
    tremor: false,
  },
  150: {
    level: 150,
    label: 'Charged Surge',
    diagnostic: 'Surge Active · 150%',
    outerRing: 'border-cyan-300/75 shadow-[0_0_25px_rgba(0,240,255,0.35)]',
    gearRing: 'border-cyan-200/75',
    housing: 'border-cyan-300 shadow-[0_0_55px_rgba(0,240,255,0.6)]',
    innerRing: 'border-cyan-200 bg-cyan-900/45 shadow-[inset_0_0_20px_rgba(0,240,255,0.4)]',
    coreOuter: 'bg-white shadow-[0_0_45px_#38f9ff] scale-110',
    coreInner: 'bg-cyan-200 shadow-[0_0_24px_#00f0ff]',
    coilClass: 'bg-cyan-300 shadow-[0_0_10px_#00f0ff]',
    coilCount: 12,
    badgeClass: 'border-cyan-300/60 text-cyan-200 bg-cyan-950/90',
    shockwaveColor: 'border-cyan-200',
    diagBorder: 'border-cyan-400/40',
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
    label: 'Solar Overclock',
    diagnostic: 'Solar Overclock · 200%',
    outerRing: 'border-amber-400/85 shadow-[0_0_30px_rgba(251,191,36,0.45)]',
    gearRing: 'border-yellow-200/85',
    housing: 'border-amber-400 shadow-[0_0_65px_rgba(251,191,36,0.7)]',
    innerRing: 'border-yellow-300 bg-amber-950/50 shadow-[inset_0_0_25px_rgba(251,191,36,0.5)]',
    coreOuter: 'bg-yellow-50 shadow-[0_0_55px_#fbbf24] scale-[1.18]',
    coreInner: 'bg-amber-400 shadow-[0_0_28px_#fde047]',
    coilClass: 'bg-yellow-300 shadow-[0_0_12px_#fbbf24]',
    coilCount: 16,
    badgeClass: 'border-amber-400/60 text-amber-200 bg-amber-950/90',
    shockwaveColor: 'border-amber-400',
    diagBorder: 'border-amber-400/45',
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
    label: 'Critical Plasma',
    diagnostic: 'Critical Plasma · 250%',
    outerRing: 'border-red-500/90 shadow-[0_0_40px_rgba(239,68,68,0.6)]',
    gearRing: 'border-fuchsia-400/85',
    housing: 'border-red-500 shadow-[0_0_75px_rgba(239,68,68,0.8)]',
    innerRing: 'border-rose-300 bg-red-950/60 shadow-[inset_0_0_30px_rgba(239,68,68,0.65)]',
    coreOuter: 'bg-rose-50 shadow-[0_0_65px_#ef4444] scale-[1.24]',
    coreInner: 'bg-red-500 shadow-[0_0_32px_#f43f5e]',
    coilClass: 'bg-rose-400 shadow-[0_0_14px_#ef4444]',
    coilCount: 16,
    badgeClass: 'border-red-400/70 text-red-200 bg-red-950/95',
    shockwaveColor: 'border-red-500',
    diagBorder: 'border-red-500/55',
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
    label: 'Max Overdrive',
    diagnostic: '⚡ Supernova · 300% Max',
    outerRing: 'border-white shadow-[0_0_55px_#00f0ff]',
    gearRing: 'border-amber-300 shadow-[0_0_30px_#fbbf24]',
    housing: 'border-white shadow-[0_0_95px_#00f0ff,0_0_50px_#ef4444] ring-4 ring-amber-300/65',
    innerRing: 'border-white bg-gradient-to-tr from-cyan-500/35 via-amber-400/35 to-red-500/35 shadow-[inset_0_0_40px_#ffffff]',
    coreOuter: 'bg-white shadow-[0_0_80px_#ffffff,0_0_40px_#00f0ff] scale-[1.32]',
    coreInner: 'bg-gradient-to-r from-cyan-300 via-yellow-200 to-rose-400 shadow-[0_0_35px_#ffffff]',
    coilClass: 'bg-white shadow-[0_0_16px_#00f0ff]',
    coilCount: 20,
    badgeClass: 'border-white text-slate-950 bg-gradient-to-r from-cyan-300 via-amber-300 to-rose-300 font-bold',
    shockwaveColor: 'border-white',
    diagBorder: 'border-white/50 shadow-[0_0_24px_rgba(34,211,238,0.28)]',
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
      sound.playJarvisChirp();
    }

    setTimeout(() => setPulseActive(false), 750);
  };

  return (
    <section id="protocol" className="relative pt-8 pb-20 sm:pt-12 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-center lg:items-start lg:pt-2">
        
        {/* Left Column: Breathable Editorial Profile */}
        <div className="lg:col-span-7 space-y-7">
          {/* Crixus Live Session Runtime Pill */}
          <div className="inline-flex flex-wrap items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span>Crixus is observing. Master is busy in fixing the minimums.</span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span className="text-amber-300 font-semibold">Runtime: {formatRuntime(elapsedSeconds)}</span>
          </div>

          {/* Archivo Black Hero Title & Role Line */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl xl:text-[66px] font-display tracking-normal text-white leading-[1.06]">
              Sindid Arafat
            </h1>
            <p className="text-base sm:text-lg font-mono text-slate-200 font-medium flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-cyan-300">Product and Business Analyst</span>
              <span className="text-slate-600">|</span>
              <span className="text-amber-300">Full-Stack Engineer</span>
              <span className="text-slate-600">|</span>
              <span className="text-red-400">AI/ML Researcher</span>
            </p>
            <div className="h-[2px] w-28 rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400" />
          </div>

          {/* Spacious Georgia Summary */}
          <p className="text-slate-300 text-[15px] sm:text-base leading-[1.85] font-sans max-w-2xl">
            {portfolioData.personal.summary}
          </p>

          {/* Unified Key Highlights Bar (Calm & Scannable) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl bg-white/[0.025] border border-white/[0.08] divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
            {portfolioData.hudStats.map((stat, i) => (
              <div key={i} className="p-3.5 sm:p-5 space-y-1.5">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-sm sm:text-base font-display text-white leading-snug">
                  {stat.value}
                </div>
                <div className="text-xs font-sans text-amber-300/90 leading-snug">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#projects"
              onClick={() => sound.playJarvisChirp()}
              className="px-6 py-3 rounded-xl bg-white hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#arc-matrix"
              onClick={() => sound.playRepulsorShot()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-600/20 to-amber-500/20 hover:from-red-600/35 hover:to-amber-500/35 text-amber-200 font-mono font-semibold text-xs sm:text-sm border border-amber-400/40 hover:border-amber-300 flex items-center gap-2 transition-all"
            >
              <Gamepad2 className="w-4 h-4 text-amber-400" />
              <span>Play Grid Defender</span>
            </a>

            <a
              href={portfolioData.personal.cvUrl}
              download="Sindid_Arafat_CV.pdf"
              onClick={() => sound.playJarvisChirp()}
              className="px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 hover:text-white font-mono font-medium text-xs sm:text-sm border border-white/10 flex items-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>CV (PDF)</span>
            </a>
          </div>

          {/* Large & Prominent Direct Social Buttons */}
          <div className="pt-2 space-y-2.5">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Connect Directly
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playJarvisChirp()}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] text-white border border-white/15 hover:border-cyan-400/50 transition-all group"
                title="GitHub Profile"
              >
                <GithubIcon className="w-7 h-7 text-white group-hover:text-cyan-300 transition-colors shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-mono font-bold text-white">GitHub</div>
                  <div className="text-[11px] font-sans text-slate-400">30 Repos</div>
                </div>
              </a>

              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playJarvisChirp()}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0a66c2]/15 hover:bg-[#0a66c2]/25 text-white border border-[#38bdf8]/40 hover:border-[#38bdf8] transition-all group"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-7 h-7 text-[#38bdf8] shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-mono font-bold text-white">LinkedIn</div>
                  <div className="text-[11px] font-sans text-slate-300">Connect</div>
                </div>
              </a>

              <a
                href={`mailto:${portfolioData.personal.email}?subject=Email%20from%20Portfolio`}
                onClick={() => sound.playJarvisChirp()}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-white border border-amber-400/35 hover:border-amber-400 transition-all group max-w-full"
                title="Direct Email"
              >
                <Mail className="w-7 h-7 text-amber-400 shrink-0" />
                <div className="text-left min-w-0">
                  <div className="text-xs font-mono font-bold text-white">Email</div>
                  <div className="text-[11px] font-sans text-slate-300 truncate">{portfolioData.personal.email}</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 5-Stage Energy Core */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div
            ref={coreRef}
            className={`relative w-64 h-64 sm:w-[320px] sm:h-[320px] flex items-center justify-center ${
              stage.tremor ? 'animate-core-tremor' : ''
            }`}
          >
            {pulseActive && (
              <div
                key={pulseKey}
                className={`absolute inset-4 rounded-full border-4 pointer-events-none z-30 animate-core-shockwave ${stage.shockwaveColor}`}
              />
            )}

            {energyLevel === 300 && (
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-400/20 via-amber-400/25 to-red-500/25 blur-xl animate-pulse pointer-events-none" />
            )}

            <div
              className={`absolute inset-0 rounded-full border-2 border-dashed transition-all duration-500 pointer-events-none ${stage.outerRing}`}
              style={{ animation: `spin ${stage.outerSpinSec}s linear infinite` }}
            >
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
                  <div key={idx} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
                    <div className={`w-2.5 h-2.5 rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2 ${orbColor}`} />
                  </div>
                );
              })}
            </div>

            <div
              className={`absolute inset-4 rounded-full border-2 border-t-transparent border-b-transparent transition-all duration-500 pointer-events-none ${stage.gearRing}`}
              style={{ animation: `spin-reverse ${stage.gearSpinSec}s linear infinite` }}
            />

            <button
              type="button"
              onClick={triggerArcOverload}
              aria-label={`Arc Reactor Core at ${energyLevel}% (${stage.label}). Click to power up.`}
              title={`Stage ${energyLevel}% (${stage.label}) — Click to Power Up!`}
              className={`relative z-20 w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-[#090d16] border-4 flex items-center justify-center cursor-pointer select-none transition-all duration-500 transform hover:scale-105 active:scale-95 ${stage.housing}`}
            >
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                {Array.from({ length: stage.coilCount }).map((_, idx) => {
                  const deg = (360 / stage.coilCount) * idx;
                  return (
                    <div
                      key={`${energyLevel}-${idx}`}
                      className={`absolute w-1 h-7 sm:h-8 left-1/2 top-2 -translate-x-1/2 origin-[50%_92px] sm:origin-[50%_116px] transition-all duration-300 ${stage.coilClass}`}
                      style={{ transform: `rotate(${deg}deg)` }}
                    />
                  );
                })}
              </div>

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

              <div className={`relative w-32 h-32 sm:w-36 sm:h-36 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${stage.innerRing}`}>
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-dashed border-white/75"
                  style={{ animation: `spin ${stage.innerSpinSec}s linear infinite` }}
                />
                {/* Subtle Iron-Man Triangular Arc Lattice */}
                <svg viewBox="0 0 100 100" className="absolute w-24 h-24 sm:w-28 sm:h-28 pointer-events-none opacity-65">
                  <polygon
                    points="50,18 82,74 18,74"
                    fill="none"
                    stroke={energyLevel >= 300 ? '#ffffff' : energyLevel >= 250 ? '#fb7185' : energyLevel >= 200 ? '#fbbf24' : '#22d3ee'}
                    strokeWidth="1.8"
                  />
                </svg>
                <div className={`absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500 ${stage.coreOuter}`}>
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full animate-pulse transition-all duration-500 ${stage.coreInner}`} />
                </div>
              </div>

              <div className={`absolute -bottom-8 px-3.5 py-1 rounded-full border text-[10px] font-mono tracking-wide whitespace-nowrap transition-all duration-300 ${stage.badgeClass}`}>
                {energyLevel === 300
                  ? '⚡ 300% Max Overdrive · Click to Reset'
                  : `Click Core · ${energyLevel}% ${stage.label}`}
              </div>
            </button>
          </div>

          {/* Sequential Power Stage Selector Pills */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-1.5 font-mono text-[11px]">
            {[100, 150, 200, 250, 300].map(lvl => {
              const reached = energyLevel >= lvl;
              const pillColor =
                lvl === 300
                  ? 'bg-gradient-to-r from-cyan-400 via-amber-400 to-red-500 text-slate-950 font-bold'
                  : lvl === 250
                    ? 'bg-red-500 text-white font-semibold'
                    : lvl === 200
                      ? 'bg-amber-400 text-slate-950 font-semibold'
                      : lvl === 150
                        ? 'bg-cyan-300 text-slate-950 font-semibold'
                        : 'bg-cyan-400/80 text-slate-950 font-semibold';
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
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    reached ? pillColor : 'bg-white/[0.04] text-slate-400 border border-white/10 hover:text-white'
                  }`}
                >
                  {lvl}%
                </button>
              );
            })}
          </div>

          {/* Clean Diagnostic Card */}
          <div className={`mt-4 w-full max-w-sm bg-white/[0.03] border rounded-2xl p-4 font-mono text-xs text-slate-400 space-y-2 transition-all duration-500 ${stage.diagBorder}`}>
            <div className="flex justify-between gap-2 text-slate-200 border-b border-white/[0.08] pb-2">
              <span>System Status</span>
              <span className={`font-semibold text-right ${stage.diagText}`}>{stage.diagnostic}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="shrink-0">Primary Focus</span>
              <span className="text-white text-right">Product &amp; Business Analysis</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="shrink-0">Core Architecture</span>
              <span className="text-amber-300 text-right">Full-Stack &amp; AI/ML Research</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="shrink-0">Current Role</span>
              <span className="text-emerald-400 text-right">Data &amp; Strategy Intern @ CAP</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
