import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Shield, Terminal, Download, Menu, X, Cpu } from 'lucide-react';
import { sound } from '../utils/audio';
import { portfolioData } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [audioActive, setAudioActive] = useState(sound.enabled);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleSound = () => {
    const next = sound.toggle();
    setAudioActive(next);
  };

  const navLinks = [
    { label: 'ABOUT', href: '#protocol' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'REPOS', href: '#repos' },
    { label: 'GRID GAME', href: '#arc-matrix' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#050811]/85 border-b border-arc/20">
      {/* Top micro telemetry bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-slate-950/80 border-b border-slate-800 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-arc">
            <span className="w-1.5 h-1.5 rounded-full bg-arc animate-ping" />
            SYSTEM OS v4.2 ONLINE
          </span>
          <span>BUILD: PRODUCTION v2.8</span>
          <span>STATUS: 100% OPERATIONAL</span>
        </div>
        <div className="flex items-center gap-4">
          <span>COORDINATES: {portfolioData.personal.coordinates}</span>
          <span className="text-white font-bold">UTC/LOCAL: {currentTime}</span>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <a 
          href="#protocol" 
          onClick={() => sound.playJarvisChirp()}
          className="flex items-center gap-3 group cursor-pointer shrink-0"
        >
          {/* Glowing Reactor Emblem */}
          <div className="w-10 h-10 rounded-full border border-arc/60 bg-slate-950 flex items-center justify-center relative shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] transition-all shrink-0">
            <div className="w-6 h-6 rounded-full border border-dashed border-amber-400 animate-spin-slow absolute" />
            <div className="w-3 h-3 rounded-full bg-arc shadow-[0_0_10px_#00f0ff] animate-pulse" />
          </div>
          <div>
            <div className="font-display font-black text-lg tracking-wider text-white group-hover:text-arc transition-colors flex items-center gap-1 whitespace-nowrap">
              <span>SINDID ARAFAT</span>
              <span className="text-xs font-mono text-amber-400 font-semibold">[SA]</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 tracking-widest uppercase whitespace-nowrap">
              PRODUCT, BA & AI ENGINEER
            </div>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => sound.playJarvisChirp()}
              className="px-2.5 py-1.5 text-xs font-mono text-slate-300 hover:text-arc hover:bg-arc/10 rounded transition-all border border-transparent hover:border-arc/30 whitespace-nowrap"
            >
              <span className="text-arc/60 text-[10px] mr-1">0{idx + 1}.</span>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Sound FX Toggle & CV Download */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={toggleSound}
            title={audioActive ? 'Mute Interface Audio' : 'Enable Interface Sound Effects'}
            className={`p-2 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition-all whitespace-nowrap ${
              audioActive
                ? 'bg-cyan-950/40 border-arc text-arc shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                : 'bg-slate-900 border-slate-700 text-slate-500'
            }`}
          >
            {audioActive ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline text-[11px]">{audioActive ? 'SFX ON' : 'SFX OFF'}</span>
          </button>

          <a
            href={portfolioData.personal.cvUrl}
            download="Sindid_Arafat_CV.pdf"
            onClick={() => sound.playRepulsorShot()}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-mono font-bold text-xs tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD CV</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050811] border-b border-arc/30 px-4 pt-2 pb-6 space-y-2 font-mono text-xs animate-in slide-in-from-top-4">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                sound.playJarvisChirp();
                setMobileMenuOpen(false);
              }}
              className="block px-3 py-2 text-slate-300 hover:text-arc hover:bg-arc/10 rounded border border-transparent hover:border-arc/20"
            >
              <span className="text-arc mr-2">0{idx + 1}.</span>
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href={portfolioData.personal.cvUrl}
              download="Sindid_Arafat_CV.pdf"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold"
            >
              <Download className="w-4 h-4" />
              DOWNLOAD CV (PDF)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
