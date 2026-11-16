import React, { useState } from 'react';
import { Briefcase, Cpu, Globe, Terminal, Palette, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { portfolioData, SkillCategory } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('product-ba');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Globe': return <Globe className="w-4 h-4" />;
      case 'Terminal': return <Terminal className="w-4 h-4" />;
      case 'Palette': return <Palette className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const selectedCategoryData = portfolioData.skillCategories.find(c => c.id === activeCategory) || portfolioData.skillCategories[0];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Section Ambient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-arc/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-arc/30 text-xs font-mono text-arc mb-3">
          <Shield className="w-3.5 h-3.5 text-arc" />
          <span>TECHNICAL ARSENAL // ALL CV SPECIFICATIONS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
          CORE CAPABILITIES & SPECIALIZATIONS
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 font-sans">
          From high-level product strategy, PRDs, and user acceptance testing (UAT) to deep-learning architectures, full-stack systems, and creative direction.
        </p>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {portfolioData.skillCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              sound.playJarvisChirp();
            }}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs flex items-center gap-2.5 transition-all border ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-arc text-white shadow-[0_0_20px_rgba(0,240,255,0.3)] ring-1 ring-arc/50'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <span className={activeCategory === cat.id ? 'text-arc' : 'text-slate-500'}>
              {getIcon(cat.icon)}
            </span>
            <span className="font-semibold">{cat.title}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
              {cat.skills.length}
            </span>
          </button>
        ))}
      </div>

      {/* Active Category Display Panel */}
      <div className="bg-[#0b101f]/90 border border-arc/30 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-[0_0_35px_rgba(0,240,255,0.08)] hud-corner-box">
        {/* Module Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="text-xs font-mono text-amber-400 flex items-center gap-2 mb-1">
              <span>MODULE: {selectedCategoryData.code}</span>
              <span className="text-slate-600">//</span>
              <span className="text-arc">DIAGNOSTIC STATUS: VERIFIED</span>
            </div>
            <h3 className="text-2xl font-bold font-display text-white">
              {selectedCategoryData.title}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {selectedCategoryData.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPERATIONAL READINESS: 100%</span>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {selectedCategoryData.skills.map((skill, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-arc/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-arc group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold text-white group-hover:text-arc transition-colors">
                    {skill.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                    {skill.tag}
                  </span>
                  <span className="text-amber-400 font-bold">{skill.level}%</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-arc transition-all duration-700 group-hover:shadow-[0_0_10px_#00f0ff]"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Highlight note for Product & Business Analyst */}
        {activeCategory === 'product-ba' && (
          <div className="mt-8 p-4 rounded-xl bg-cyan-950/20 border border-arc/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-300">
            <div className="space-y-1">
              <div className="text-arc font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>THE PRODUCT & TECHNICAL INTERSECTION ADVANTAGE</span>
              </div>
              <p className="text-slate-400">
                Sindid combines rigorous Computer Science systems engineering with the ability to articulate user requirements, run UAT validation, lead stakeholder syncs, and document PRDs that development teams can execute immediately without ambiguity.
              </p>
            </div>
            <a
              href="#contact"
              onClick={() => sound.playJarvisChirp()}
              className="px-4 py-2 rounded-lg bg-arc hover:bg-cyan-300 text-black font-bold text-xs whitespace-nowrap shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              DISCUSS A PROJECT &rarr;
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
