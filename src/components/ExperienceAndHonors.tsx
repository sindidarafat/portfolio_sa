import React from 'react';
import { Award, Briefcase, GraduationCap, Trophy, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface ExperienceAndHonorsProps {
  onOpenCertificates: () => void;
}

export const ExperienceAndHonors: React.FC<ExperienceAndHonorsProps> = ({ onOpenCertificates }) => {
  return (
    <section id="experience" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto section-divider">
      {/* Clean Header */}
      <div className="max-w-2xl mb-14">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold mb-2">
          Background &amp; Credentials
        </div>
        <h2 className="text-3xl sm:text-4xl font-display text-white tracking-normal">
          Experience, Education &amp; Honors
        </h2>
        <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400 mt-3 mb-3" />
        <p className="text-slate-400 text-sm sm:text-base font-sans leading-relaxed">
          Data analytics internship experience, executive leadership in technical communities, business case competitions, and academic honors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Experience Timeline + Education (7 cols) */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-base font-bold font-display text-white border-b border-white/[0.08] pb-3">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <span>Work &amp; Leadership Experience</span>
            </div>

            <div className="space-y-4">
              {portfolioData.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl clean-surface clean-surface-hover transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-400/25">
                        {exp.badge}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold font-display text-white mt-2">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-medium text-cyan-300/90 font-sans">
                        {exp.organization}
                      </div>
                    </div>

                    <div className="text-xs font-mono text-slate-400 space-y-1 sm:text-right shrink-0">
                      <div className="flex items-center sm:justify-end gap-1.5 text-slate-200">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center sm:justify-end gap-1.5 text-slate-500">
                        <MapPin className="w-3 h-3" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 mt-3 text-xs sm:text-sm text-slate-300 font-sans border-t border-white/[0.07] pt-3.5">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-base font-bold font-display text-white border-b border-white/[0.08] pb-3">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <span>Education</span>
            </div>

            <div className="space-y-3">
              {portfolioData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl clean-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="font-bold text-white text-base font-display">
                      {edu.degree}
                    </h4>
                    <div className="text-xs sm:text-sm text-slate-300 font-sans mt-0.5">
                      {edu.institution} &middot; <span className="text-slate-400">{edu.location}</span>
                    </div>
                    {edu.honors && (
                      <div className="text-xs font-mono text-amber-300 mt-1.5">
                        ★ {edu.honors}
                      </div>
                    )}
                  </div>

                  <div className="sm:text-right shrink-0">
                    <div className="text-xs sm:text-sm font-mono font-bold text-cyan-300 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 inline-block">
                      {edu.score}
                    </div>
                    <div className="text-xs font-mono text-slate-500 mt-1">
                      {edu.period}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Honors & Awards (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-2 text-base font-bold font-display text-white border-b border-white/[0.08] pb-3">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Honors, Case Competitions &amp; Awards</span>
          </div>

          <div className="space-y-4">
            {portfolioData.awards.map((award, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl clean-surface clean-surface-hover transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-400/25 font-semibold">
                    {award.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {award.date}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold font-display text-white">
                  {award.title}
                </h4>

                <div className="text-xs font-sans font-medium text-cyan-300/90 mt-0.5 mb-2">
                  {award.organization}
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clean Dedicated Certificates & Recognitions Showcase Banner */}
      <div
        onClick={() => {
          sound.playRepulsorShot();
          onOpenCertificates();
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            sound.playRepulsorShot();
            onOpenCertificates();
          }
        }}
        className="mt-12 p-6 sm:p-8 rounded-2xl clean-surface hover:border-amber-400/50 transition-all cursor-pointer group"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-xs font-mono text-amber-300 font-semibold">
              <Award className="w-4 h-4" />
              <span>Verified Gallery · {portfolioData.certificates.length} Official Credentials</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
              Certificates &amp; Recognitions
            </h3>
            <p className="text-sm font-sans text-slate-300 leading-relaxed">
              View all 7 verified certificates — UIHP Innovation Hub (World Bank / ICT Division), CUET CSE Fest 2025 Datathon (Team Crixus), HackerRank Python, VITALIZERS 2.0 Business Case Competition, Duke of Edinburgh Bronze Award, BRAC 16th Convocation, and SRHR Youth Camp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <div className="flex -space-x-3">
              {portfolioData.certificates.slice(0, 4).map((cert) => (
                <div
                  key={cert.id}
                  className="w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 border-[#090b10] bg-slate-950 shadow-md group-hover:border-cyan-400/60 transition-all"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-12 h-10 sm:w-14 sm:h-12 rounded-lg bg-slate-900 border-2 border-amber-400/50 flex items-center justify-center text-xs font-mono font-bold text-amber-300">
                +{portfolioData.certificates.length - 4}
              </div>
            </div>

            <span className="px-5 py-3 rounded-xl bg-white group-hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 transition-colors whitespace-nowrap">
              <span>Open Certificates Page</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
