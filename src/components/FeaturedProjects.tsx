import React, { useState } from 'react';
import { ExternalLink, Zap, Shield, Sparkles, Filter, ChevronRight, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import { portfolioData, Project } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const FeaturedProjects: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Full-Stack' | 'AI / ML' | 'Product' | 'Systems & Hardware' | 'Graphics'>('All');

  const categories = ['All', 'Full-Stack', 'AI / ML', 'Product', 'Systems & Hardware', 'Graphics'] as const;

  const filtered = filter === 'All'
    ? portfolioData.featuredProjects
    : portfolioData.featuredProjects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-red-600/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-arc/30 text-xs font-mono text-arc mb-3">
            <Layers className="w-3.5 h-3.5 text-arc" />
            <span>MISSION PORTFOLIO // FLAGSHIP BUILDS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
            FEATURED ENGINEERING & PRODUCT ARCHITECTURES
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            Detailed case studies across Machine Learning algorithms, Full-Stack applications, low-level graphics engines, and product operational platforms.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                sound.playJarvisChirp();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                filter === cat
                  ? 'bg-arc/20 text-arc border-arc shadow-[0_0_12px_rgba(0,240,255,0.3)] font-bold'
                  : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((proj, idx) => (
          <div
            key={proj.title}
            className="group rounded-2xl bg-[#090e1c]/90 border border-slate-800 hover:border-arc/50 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-md shadow-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.12)] hud-corner-box"
          >
            {/* Top Armor Badge & Category */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="px-2.5 py-1 rounded text-[11px] font-mono font-bold tracking-wider bg-red-950/60 text-red-300 border border-red-500/40">
                  {proj.markLevel}
                </span>

                <span className="text-xs font-mono text-amber-400/90 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {proj.category}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl font-bold font-display text-white group-hover:text-arc transition-colors">
                {proj.title}
              </h3>
              <p className="text-xs font-mono text-cyan-300/80 mt-1 mb-3">
                {proj.tagline}
              </p>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed font-sans mb-4">
                {proj.description}
              </p>

              {/* Business Analysis Impact Note */}
              {proj.businessImpact && (
                <div className="mb-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-400">
                  <span className="text-amber-400 font-bold block mb-1">
                    [BA INSIGHT & PRODUCT IMPACT]
                  </span>
                  <span>{proj.businessImpact}</span>
                </div>
              )}

              {/* Key Highlights */}
              <div className="space-y-1.5 mb-6">
                {proj.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <ChevronRight className="w-3.5 h-3.5 text-arc shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Tech Badges & GitHub Links */}
            <div>
              <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-slate-800/80">
                {proj.tech.map(t => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-700/60"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playJarvisChirp()}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-arc/40 hover:border-arc text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_10px_rgba(0,240,255,0.1)]"
                >
                  <GithubIcon className="w-4 h-4 text-arc" />
                  <span>VIEW REPO ON GITHUB</span>
                </a>

                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playRepulsorShot()}
                    className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-black text-xs font-mono font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>LAUNCH</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
