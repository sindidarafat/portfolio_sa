import React, { useState } from 'react';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const FeaturedProjects: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Full-Stack' | 'AI / ML' | 'Product' | 'Systems & Hardware' | 'Graphics'>('All');

  const categories = ['All', 'Full-Stack', 'AI / ML', 'Product', 'Systems & Hardware', 'Graphics'] as const;

  const filtered = filter === 'All'
    ? portfolioData.featuredProjects
    : portfolioData.featuredProjects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto section-divider">
      {/* Clean Header & Filters */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold mb-2">
            Selected Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-display text-white tracking-normal">
            Featured Projects &amp; Case Studies
          </h2>
          <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400 mt-3 mb-3" />
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans leading-relaxed">
            End-to-end builds spanning AI/ML models, MERN &amp; PHP full-stack platforms, product architectures, and 3D/embedded systems.
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                sound.playJarvisChirp();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                filter === cat
                  ? 'bg-white text-slate-950 border-white font-bold'
                  : 'bg-white/[0.03] text-slate-400 border-white/10 hover:text-white hover:bg-white/[0.07]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Clean 2-Column Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((proj) => (
          <div
            key={proj.title}
            className="group rounded-2xl clean-surface clean-surface-hover transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-400/25">
                  {proj.category}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                {proj.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-amber-300/90 mt-1 mb-3">
                {proj.tagline}
              </p>

              <p className="text-sm text-slate-300 leading-relaxed font-sans mb-4">
                {proj.description}
              </p>

              {proj.businessImpact && (
                <div className="mb-4 p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.07] text-xs font-sans text-slate-300 leading-relaxed">
                  <span className="text-amber-300 font-mono font-semibold block mb-0.5">
                    Business &amp; Product Impact
                  </span>
                  <span>{proj.businessImpact}</span>
                </div>
              )}

              <div className="space-y-1.5 mb-5">
                {proj.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-400 font-sans">
                    <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-5 pt-4 border-t border-white/[0.07]">
                {proj.tech.map(t => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.07]"
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
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-white hover:text-slate-950 border border-white/15 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View on GitHub</span>
                </a>

                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playRepulsorShot()}
                    className="py-2.5 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-mono font-bold flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch</span>
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
