import React from 'react';
import { ArrowUp, Mail, FileText, Zap, Shield } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playRepulsorShot();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-arc/20 bg-[#03060d] py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-400 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-arc/50 bg-slate-950 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-arc shadow-[0_0_8px_#00f0ff] animate-pulse" />
          </div>
          <div>
            <div className="font-display font-bold text-white text-sm tracking-wider">
              SINDID ARAFAT // PORTFOLIO
            </div>
            <div className="text-[10px] text-slate-500">
              PRODUCT, BUSINESS ANALYSIS & AI ENGINEERING &bull; 2026
            </div>
          </div>
        </div>

        {/* Center Links — Large & Visible */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-arc text-white hover:text-arc transition-all flex items-center gap-2 font-semibold"
          >
            <GithubIcon className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-[#0a192f]/90 border border-[#0a66c2]/70 hover:border-[#38bdf8] text-white hover:text-[#38bdf8] transition-all flex items-center gap-2 font-semibold"
          >
            <LinkedinIcon className="w-5 h-5 text-[#38bdf8]" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${portfolioData.personal.email}?subject=Email%20from%20Portfolio`}
            className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-arc text-white hover:text-arc transition-all flex items-center gap-2 font-semibold"
          >
            <Mail className="w-5 h-5 text-arc" />
            <span>Email</span>
          </a>
          <a
            href={portfolioData.personal.cvUrl}
            download="Sindid_Arafat_CV.pdf"
            className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-amber-200 transition-all flex items-center gap-2 font-semibold"
          >
            <FileText className="w-5 h-5 text-amber-400" />
            <span>CV</span>
          </a>
        </div>

        {/* Right Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="px-3 py-2 rounded-xl bg-slate-900 border border-arc/30 hover:border-arc text-slate-300 hover:text-white flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,240,255,0.1)] group"
          title="Return to top"
        >
          <span className="text-[11px] group-hover:text-arc">BACK TO TOP</span>
          <ArrowUp className="w-4 h-4 text-arc group-hover:-translate-y-0.5 transition-transform" />
        </button>

      </div>
    </footer>
  );
};
