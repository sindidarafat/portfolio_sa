import React, { useState } from 'react';
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

  const toggleSound = () => {
    const next = sound.toggle();
    setAudioActive(next);
  };

  const navLinks = [
    { label: 'About', href: '#protocol' },
    { label: 'Skills', href: '#skills' },
    { label: 'Thesis', href: '#thesis' },
    { label: 'Projects', href: '#projects' },
    { label: 'Repos', href: '#repos' },
    { label: 'Grid Game', href: '#arc-matrix' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#080a0f]/85 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Clean Brand Identity with Subtle Mini Arc Emblem */}
        <a
          href="#protocol"
          onClick={(e) => handleNavClick(e, '#protocol')}
          className="flex items-center gap-3 group cursor-pointer shrink-0 min-w-0"
        >
          <div className="w-9 h-9 rounded-full bg-[#0b101b] border border-cyan-400/50 flex items-center justify-center relative shadow-[0_0_12px_rgba(34,211,238,0.22)] group-hover:border-amber-400/70 transition-colors shrink-0">
            <div className="w-6 h-6 rounded-full border border-dashed border-amber-400/70 animate-spin-slow absolute" />
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          </div>
          <div className="min-w-0">
            <div className="font-display text-sm sm:text-base tracking-normal text-white group-hover:text-cyan-300 transition-colors whitespace-nowrap">
              Sindid Arafat
            </div>
            <div className="text-[11px] font-mono text-slate-400 whitespace-nowrap">
              Product, BA &amp; AI Engineer
            </div>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-2.5 py-1.5 text-[13px] font-mono font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}

          <button
            type="button"
            onClick={handleCertClick}
            className={`ml-1 px-3 py-1.5 text-[13px] font-mono font-semibold rounded-lg transition-all border flex items-center gap-1.5 whitespace-nowrap ${
              currentPage === 'certificates'
                ? 'bg-amber-500/15 text-amber-300 border-amber-400/50'
                : 'bg-white/[0.04] text-amber-300 border-white/10 hover:border-amber-400/40 hover:bg-amber-500/10'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Certificates</span>
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCertClick}
            className={`xl:hidden px-2.5 py-1.5 rounded-lg border font-mono text-xs font-semibold flex items-center gap-1 transition-all whitespace-nowrap ${
              currentPage === 'certificates'
                ? 'bg-amber-500/20 border-amber-400/50 text-amber-200'
                : 'bg-white/[0.04] border-white/10 text-amber-300'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Certificates</span>
            <span className="sm:hidden">Certs</span>
          </button>

          <button
            onClick={toggleSound}
            title={audioActive ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            aria-label={audioActive ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            className={`p-2 rounded-lg border font-mono text-xs flex items-center gap-1.5 transition-colors ${
              audioActive
                ? 'bg-cyan-500/10 border-cyan-400/35 text-cyan-300'
                : 'bg-white/[0.03] border-white/10 text-slate-500 hover:text-slate-300'
            }`}
          >
            {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <a
            href={portfolioData.personal.cvUrl}
            download="Sindid_Arafat_CV.pdf"
            onClick={() => sound.playRepulsorShot()}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs transition-all whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Toggle navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="xl:hidden p-2 rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Tablet & Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0b0e16]/98 border-b border-white/10 px-4 pt-2 pb-6 space-y-1.5 font-mono text-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-3 py-2.5 text-slate-200 hover:text-white hover:bg-white/[0.06] rounded-lg font-medium"
            >
              {link.label}
            </a>
          ))}

          <button
            type="button"
            onClick={handleCertClick}
            className="w-full text-left px-3 py-2.5 text-amber-300 bg-amber-500/10 hover:bg-amber-500/15 rounded-lg border border-amber-400/30 font-semibold flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>Certificates &amp; Recognitions</span>
          </button>

          <div className="pt-2">
            <a
              href={portfolioData.personal.cvUrl}
              download="Sindid_Arafat_CV.pdf"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white text-slate-950 font-bold text-xs"
            >
              <Download className="w-4 h-4" />
              Download CV (PDF)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
