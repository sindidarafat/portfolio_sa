import React from 'react';
import { Award, Briefcase, GraduationCap, Trophy, Medal, CheckCircle, Calendar, MapPin, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const ExperienceAndHonors: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Ambient background */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-arc/30 text-xs font-mono text-arc mb-3">
          <Medal className="w-3.5 h-3.5 text-arc" />
          <span>DOSSIER // PROFESSIONAL & ACADEMIC MERIT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
          LEADERSHIP, HONORS & EDUCATION
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 font-sans">
          Proven leadership in technical club direction, competitive innovation programs backed by The World Bank, and sustained academic excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Leadership & Professional Experience (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-base font-bold font-display text-white border-b border-slate-800 pb-3">
            <Briefcase className="w-5 h-5 text-arc" />
            <span>EXECUTIVE & STRATEGIC EXPERIENCE</span>
          </div>

          <div className="space-y-6">
            {portfolioData.experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#090e1c]/80 border border-slate-800 hover:border-arc/40 transition-all backdrop-blur-md relative hud-corner-box group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/40 uppercase">
                      {exp.badge}
                    </span>
                    <h3 className="text-xl font-bold font-display text-white mt-1 group-hover:text-arc transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-slate-300">
                      {exp.organization}
                    </div>
                  </div>

                  <div className="text-xs font-mono text-slate-400 space-y-1 sm:text-right">
                    <div className="flex items-center sm:justify-end gap-1.5 text-arc">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center sm:justify-end gap-1.5 text-slate-500">
                      <MapPin className="w-3 h-3" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 mt-4 text-xs sm:text-sm text-slate-400 font-sans border-t border-slate-800/80 pt-4">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-arc mt-1 font-mono font-bold">&#9658;</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education Block */}
          <div className="pt-8">
            <div className="flex items-center gap-2 text-base font-bold font-display text-white border-b border-slate-800 pb-3 mb-6">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <span>ACADEMIC FOUNDATION</span>
            </div>

            <div className="space-y-4">
              {portfolioData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-400/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="font-bold text-white text-base font-display">
                      {edu.degree}
                    </h4>
                    <div className="text-xs text-slate-300 font-medium">
                      {edu.institution} &bull; <span className="text-slate-400">{edu.location}</span>
                    </div>
                    {edu.honors && (
                      <div className="text-xs font-mono text-amber-400/90 mt-1">
                        ★ {edu.honors}
                      </div>
                    )}
                  </div>

                  <div className="sm:text-right shrink-0">
                    <div className="text-sm font-mono font-bold text-arc px-2.5 py-1 rounded bg-slate-900 border border-arc/30 inline-block">
                      {edu.score}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 mt-1">
                      {edu.period}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Honors, Awards & Distinctions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 text-base font-bold font-display text-white border-b border-slate-800 pb-3">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span>HONORS & RECOGNITION</span>
          </div>

          <div className="space-y-4">
            {portfolioData.awards.map((award, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1426] to-[#070b16] border border-slate-800 hover:border-yellow-400/40 transition-all shadow-md group relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-950/60 text-yellow-300 border border-yellow-500/30 uppercase font-bold">
                    {award.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {award.date}
                  </span>
                </div>

                <h4 className="text-lg font-bold font-display text-white group-hover:text-yellow-400 transition-colors">
                  {award.title}
                </h4>

                <div className="text-xs font-semibold text-slate-300 mb-2 font-sans">
                  {award.organization}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {award.description}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Highlight Box: The Duke of Edinburgh's & Volunteerism */}
          <div className="p-5 rounded-2xl bg-cyan-950/20 border border-arc/30 text-xs font-mono text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-arc font-bold">
              <Sparkles className="w-4 h-4 text-arc" />
              <span>STARK CITIZENSHIP & SOCIAL INITIATIVE</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              3 consecutive years of volunteer coordination at BRAC University and recipient of The Duke of Edinburgh's International Award (Bronze, May 2024), demonstrating perseverance, community engagement, and team discipline.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
