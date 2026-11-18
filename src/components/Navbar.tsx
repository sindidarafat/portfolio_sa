import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Download, Menu, X, Award } from 'lucide-react';
import { sound } from '../utils/audio';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  currentPage: 'home' | 'certificates';
  onNavigate: (page: 'home' | 'certificates', anchor?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
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
    { label: 'THESIS', href: '#thesis' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'REPOS', href: '#repos' },
    { label: 'GRID GAME', href: '#arc-matrix' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    sound.playJarvisChirp();
    setMobileMenuOpen(false);
    onNavigate('home', href);
  };

  const handleCertClick = () => {
    sound.playJarvisChirp();
    setMobileMenuOpen(false);
    onNavigate('certificates');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#050811]/90 border-b border-arc/20">
      {/* Top micro telemetry bar */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-slate-950/80 border-b border-slate-800 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-arc">
            <span className="w-1.5 h-1.5 rounded-full bg-arc animate-ping" />
            SYSTEM OS v4.2 ONLINE
          </span>
          <span>ASSISTANT: CRIXUS ACTIVE</span>
          <span>STATUS: 100% OPERATIONAL</span>
        </div>
        <div className="flex items-center gap-4">
          <span>COORDINATES: {portfolioData.personal.coordinates}</span>
          <span className="text-white font-bold">UTC/LOCAL: {currentTime}</span>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <a
          href="#protocol"
          onClick={(e) => handleNavClick(e, '#protocol')}
          className="flex items-center gap-2 sm:gap-3 group cursor-pointer shrink-0 min-w-0"
        >
          {/* Glowing Reactor Emblem */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-arc/60 bg-slate-950 flex items-center justify-center relative shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.8)] transition-all shrink-0">
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-dashed border-amber-400 animate-spin-slow absolute" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-arc shadow-[0_0_10px_#00f0ff] animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="font-display font-black text-sm sm:text-lg tracking-wider text-white group-hover:text-arc transition-colors flex items-center gap-1 whitespace-nowrap">
              <span>SINDID ARAFAT</span>
              <span className="hidden sm:inline text-xs font-mono text-amber-400 font-semibold">[SA]</span>
            </div>
            <div className="text-[8px] sm:text-[10px] font-mono text-slate-400 tracking-wider sm:tracking-widest uppercase whitespace-nowrap">
              PRODUCT, BA &amp; AI ENGINEER
            </div>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-2.5 py-1.5 text-xs font-mono font-semibold text-slate-300 hover:text-arc hover:bg-arc/10 rounded transition-all border border-transparent hover:border-arc/30 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}

          {/* Dedicated Certificates Page Tab */}
          <button
            type="button"
            onClick={handleCertClick}
            className={`ml-1 px-2.5 py-1.5 text-xs font-mono font-bold rounded transition-all border flex items-center gap-1.5 whitespace-nowrap ${
              currentPage === 'certificates'
                ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.35)]'
                : 'bg-slate-900/80 text-amber-300 border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/15'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>CERTIFICATES</span>
          </button>
        </nav>

        {/* Right Actions: Sound FX Toggle & CV Download */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Certificates Pill on Tablet/Mobile before Hamburger */}
          <button
            type="button"
            onClick={handleCertClick}
            className={`xl:hidden px-2.5 py-1.5 rounded-lg border font-mono text-[11px] font-bold flex items-center gap-1 transition-all whitespace-nowrap ${
              currentPage === 'certificates'
                ? 'bg-amber-500/25 border-amber-400 text-amber-200'
                : 'bg-slate-900 border-amber-500/40 text-amber-300'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CERTIFICATES</span>
            <span className="sm:hidden">CERTS</span>
          </button>

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
            <span className="hidden md:inline text-[11px]">{audioActive ? 'SFX ON' : 'SFX OFF'}</span>
          </button>

          <a
            href={portfolioData.personal.cvUrl}
            download="Sindid_Arafat_CV.pdf"
            onClick={() => sound.playRepulsorShot()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-mono font-bold text-xs tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD CV</span>
          </a>

          {/* Tablet / Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="xl:hidden p-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Tablet & Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#050811] border-b border-arc/30 px-4 pt-2 pb-6 space-y-2 font-mono text-xs animate-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-3 py-2.5 text-slate-200 hover:text-arc hover:bg-arc/10 rounded border border-transparent hover:border-arc/20 font-semibold"
            >
              {link.label}
            </a>
          ))}

          <button
            type="button"
            onClick={handleCertClick}
            className="w-full text-left px-3 py-2.5 text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 rounded border border-amber-500/40 font-bold flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>CERTIFICATES &amp; RECOGNITIONS</span>
          </button>

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
