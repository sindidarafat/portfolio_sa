import React, { useState } from 'react';
import { Briefcase, Cpu, Globe, Terminal, Palette, Sparkles, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
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

  const selectedCategoryData =
    portfolioData.skillCategories.find(c => c.id === activeCategory) ||
    portfolioData.skillCategories[0];

  return (
    <section id="skills" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto section-divider">
      {/* Clean Section Header */}
      <div className="max-w-2xl mb-12">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold mb-2">
          Capabilities &amp; Stack
        </div>
        <h2 className="text-3xl sm:text-4xl font-display text-white tracking-normal">
          Skills &amp; Technical Expertise
        </h2>
        <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400 mt-3 mb-3" />
        <p className="text-slate-400 text-sm sm:text-base font-sans leading-relaxed">
          From data analytics, PRDs, and stakeholder coordination to machine learning, full-stack web engineering, and creative direction.
        </p>
      </div>

      {/* Clean Segmented Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {portfolioData.skillCategories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                sound.playJarvisChirp();
              }}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm flex items-center gap-2 transition-all border ${
                isActive
                  ? 'bg-white text-slate-950 border-white font-bold shadow-sm'
                  : 'bg-white/[0.03] border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <span className={isActive ? 'text-slate-950' : 'text-cyan-400'}>
                {getIcon(cat.icon)}
              </span>
              <span>{cat.title}</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-slate-950/15 text-slate-900' : 'bg-white/[0.06] text-slate-400'
                }`}
              >
                {cat.skills.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Clean Skill Content Card */}
      <div className="rounded-2xl clean-surface p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/[0.08] gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              {selectedCategoryData.title}
            </h3>
            <p className="text-sm text-slate-400 mt-1 font-sans">
              {selectedCategoryData.description}
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 shrink-0">
            {selectedCategoryData.skills.length} core competencies
          </span>
        </div>

        {/* Clean 2-Column Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedCategoryData.skills.map((skill, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-cyan-400/35 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-sm font-medium text-white font-sans">
                  {skill.name}
                </span>
                <div className="flex items-center gap-2 font-mono text-xs shrink-0">
                  <span className="px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-300 text-[11px]">
                    {skill.tag}
                  </span>
                  <span className="text-cyan-300 font-semibold w-9 text-right">
                    {skill.level}%
                  </span>
                </div>
              </div>

              <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-300 transition-all duration-700"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {activeCategory === 'product-ba' && (
          <div className="mt-6 p-4 sm:p-5 rounded-xl bg-cyan-500/[0.06] border border-cyan-400/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-display font-bold text-cyan-300">
                Bridging Business Strategy &amp; Engineering Execution
              </div>
              <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed">
                Combining Computer Science engineering depth with hands-on SQL/Power BI analysis, UAT validation, stakeholder alignment, and clear PRDs that engineering teams can ship immediately.
              </p>
            </div>
            <a
              href="#contact"
              onClick={() => sound.playJarvisChirp()}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs whitespace-nowrap inline-flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>Let&apos;s Collaborate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
