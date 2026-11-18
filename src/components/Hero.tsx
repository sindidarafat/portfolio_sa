import React, { useState } from 'react';
import { Shield, Terminal, ArrowRight, Zap, Award, Sparkles, FileText, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const Hero: React.FC = () => {
  const [pulseActive, setPulseActive] = useState(false);
  const [energyLevel, setEnergyLevel] = useState(100);

  const triggerArcOverload = () => {
    sound.playArcPulse();
    setPulseActive(true);
    setEnergyLevel(prev => (prev >= 300 ? 100 : prev + 50));
    setTimeout(() => setPulseActive(false), 800);
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
          {/* Tactical Status Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-arc/40 text-xs font-mono text-arc shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-arc animate-ping" />
            <span>PORTFOLIO OS // SYSTEM ARCHITECT</span>
            <span className="text-slate-500">|</span>
            <span className="text-amber-400 font-semibold">{portfolioData.personal.status}</span>
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
                  <div className="text-[11px] font-sans text-slate-400">29 Repos</div>
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
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border-2 border-amber-500/50 hover:border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.18)] hover:shadow-[0_0_24px_rgba(251,191,36,0.4)] transition-all transform hover:-translate-y-0.5 group"
                title="Direct Email"
              >
                <Mail className="w-7 h-7 text-amber-400 group-hover:text-amber-300 transition-colors" />
                <div className="text-left">
                  <div className="text-xs font-mono font-bold tracking-wide text-white group-hover:text-amber-300">EMAIL</div>
                  <div className="text-[11px] font-sans text-slate-300">{portfolioData.personal.email}</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Energy Core */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
            
            {/* Outer Tech Ring with Markers */}
            <div className={`absolute inset-0 rounded-full border-2 border-dashed transition-all duration-700 ${
              pulseActive 
                ? 'border-white scale-110 shadow-[0_0_60px_#00f0ff]' 
                : 'border-arc/30 animate-spin-slow'
            }`} />

            {/* Reverse Titanium Gear Ring */}
            <div className="absolute inset-4 rounded-full border border-amber-400/40 animate-spin-reverse border-t-transparent border-b-transparent" />

            {/* Glowing Interactive Core Housing */}
            <div 
              onClick={triggerArcOverload}
              title="Click Energy Core to Discharge Pulse"
              className={`relative z-20 w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-slate-950 border-4 border-arc/60 flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(0,240,255,0.4)] ${
                pulseActive ? 'shadow-[0_0_90px_#00f0ff] ring-8 ring-cyan-300/40' : ''
              }`}
            >
              {/* Copper electromagnetic coils */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                  <div
                    key={deg}
                    className="absolute w-1 h-8 bg-amber-400/80 left-1/2 top-2 -translate-x-1/2 origin-[50%_120px] shadow-[0_0_5px_#fbbf24]"
                    style={{ transform: `rotate(${deg}deg)` }}
                  />
                ))}
              </div>

              {/* Inner Geometric Lattice */}
              <div className="relative w-36 h-36 rounded-full border-2 border-arc/80 flex items-center justify-center bg-cyan-950/30">
                <div className="w-24 h-24 rounded-full border border-dashed border-white/60 animate-spin" />
                
                {/* Central Pure White Glowing Core */}
                <div className="absolute w-16 h-16 rounded-full bg-white shadow-[0_0_35px_#00f0ff] flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_20px_#ffffff]" />
                </div>
              </div>

              {/* Central click indicator */}
              <div className="absolute -bottom-8 px-3 py-1 rounded-full bg-slate-900 border border-arc/40 text-[10px] font-mono text-arc shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                CLICK TO DISCHARGE // {energyLevel}% OUTPUT
              </div>
            </div>

            {/* Ambient Pulse Waves */}
            <div className="absolute -inset-6 rounded-full border border-arc/10 animate-ping pointer-events-none" />
          </div>

          {/* Diagnostic Readout Box below core */}
          <div className="mt-12 w-full max-w-sm bg-slate-950/80 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-400 space-y-1.5 shadow-xl">
            <div className="flex justify-between text-slate-300 border-b border-slate-800 pb-1.5">
              <span>SYSTEM DIAGNOSTIC</span>
              <span className="text-arc">ALL CIRCUITS NOMINAL</span>
            </div>
            <div className="flex justify-between">
              <span>PRIMARY FOCUS:</span>
              <span className="text-white">Product & Business Analysis</span>
            </div>
            <div className="flex justify-between">
              <span>CORE ARCHITECTURE:</span>
              <span className="text-amber-400">Full-Stack & AI/ML Research</span>
            </div>
            <div className="flex justify-between">
              <span>CURRENT ROLE:</span>
              <span className="text-emerald-400">Data & Strategy Intern @ CAP</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
