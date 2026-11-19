import React from 'react';
import { ArrowUp, Mail, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playRepulsorShot();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#06080d] pt-10 pb-24 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          </div>
          <div>
            <div className="font-display font-bold text-white text-sm">
              Sindid Arafat
            </div>
            <div className="text-[11px] text-slate-500 font-sans">
              Product, Business Analysis &amp; AI Engineering &bull; 2026
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs">
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 text-white hover:text-cyan-300 transition-colors flex items-center gap-2 font-semibold"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-[#0a66c2]/15 border border-[#38bdf8]/40 hover:border-[#38bdf8] text-white hover:text-[#38bdf8] transition-colors flex items-center gap-2 font-semibold"
          >
            <LinkedinIcon className="w-4 h-4 text-[#38bdf8]" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${portfolioData.personal.email}?subject=Email%20from%20Portfolio`}
            className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 text-white hover:text-cyan-300 transition-colors flex items-center gap-2 font-semibold"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Email</span>
          </a>
          <a
            href={portfolioData.personal.cvUrl}
            download="Sindid_Arafat_CV.pdf"
            className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-400/35 hover:border-amber-400 text-amber-300 transition-colors flex items-center gap-2 font-semibold"
          >
            <FileText className="w-4 h-4" />
            <span>CV</span>
          </a>
        </div>

        <button
          onClick={scrollToTop}
          className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-white flex items-center gap-2 transition-colors group"
          title="Return to top"
        >
          <span className="text-xs">Back to Top</span>
          <ArrowUp className="w-4 h-4 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
