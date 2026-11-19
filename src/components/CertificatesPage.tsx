import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, ShieldCheck, ZoomIn, X, ChevronLeft, ChevronRight, Download, Sparkles, Trophy, Calendar, BadgeCheck } from 'lucide-react';
import { portfolioData, CertificateItem } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface CertificatesPageProps {
  onBack: () => void;
}

export const CertificatesPage: React.FC<CertificatesPageProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Innovation & Business' | 'Data & Technical' | 'Leadership & Service'>('All');
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(null);

  const categories = ['All', 'Innovation & Business', 'Data & Technical', 'Leadership & Service'] as const;

  const filteredCerts = selectedCategory === 'All'
    ? portfolioData.certificates
    : portfolioData.certificates.filter(c => c.category === selectedCategory);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!activeCert) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCert(null);
      if (e.key === 'ArrowRight') navigateCert(1);
      if (e.key === 'ArrowLeft') navigateCert(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeCert, filteredCerts]);

  const navigateCert = (dir: number) => {
    if (!activeCert) return;
    const idx = filteredCerts.findIndex(c => c.id === activeCert.id);
    if (idx === -1) return;
    const nextIdx = (idx + dir + filteredCerts.length) % filteredCerts.length;
    sound.playJarvisChirp();
    setActiveCert(filteredCerts[nextIdx]);
  };

  return (
    <div className="min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-5 border-b border-white/[0.08]">
        <button
          onClick={() => {
            sound.playJarvisChirp();
            onBack();
          }}
          className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white hover:text-slate-950 border border-white/15 text-white font-mono text-xs sm:text-sm font-bold flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-white/[0.03] border border-white/10 px-3.5 py-2 rounded-xl">
          <BadgeCheck className="w-4 h-4 text-emerald-400" />
          <span>{portfolioData.certificates.length} Verified Certificates</span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-amber-300 mb-3">
          <Award className="w-3.5 h-3.5" />
          <span>Credentials &amp; Achievements</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          Certificates &amp; Recognitions
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-3 font-sans leading-relaxed">
          Official certifications, national competition credentials, technical assessments, and university recognitions across innovation, data science, business case competitions, and leadership.
        </p>
      </div>

      {/* Key Highlights Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="p-4 rounded-2xl clean-surface flex items-start gap-3">
          <Trophy className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-mono font-semibold text-amber-300">UIHP Innovation Hub</div>
            <div className="text-sm font-sans text-white font-semibold mt-0.5">Inter-University Winner &amp; National Qualifier</div>
            <div className="text-xs font-sans text-slate-400 mt-0.5">ICT Division &amp; The World Bank · Cohort 6</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl clean-surface flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-mono font-semibold text-cyan-300">BIZCEPTION Case Competition</div>
            <div className="text-sm font-sans text-white font-semibold mt-0.5">Semi-Finalist &amp; Regular Case Competitor</div>
            <div className="text-xs font-sans text-slate-400 mt-0.5">Business Strategy, Market &amp; Financial Cases</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl clean-surface flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-mono font-semibold text-emerald-300">Technical &amp; Global Awards</div>
            <div className="text-sm font-sans text-white font-semibold mt-0.5">CUET Datathon, HackerRank &amp; Duke of Edinburgh</div>
            <div className="text-xs font-sans text-slate-400 mt-0.5">Team Crixus · Bronze Standard No. 12818</div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              sound.playJarvisChirp();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all border ${
              selectedCategory === cat
                ? 'bg-white text-slate-950 border-white'
                : 'bg-white/[0.03] text-slate-400 border-white/10 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert) => (
          <article
            key={cert.id}
            className="group rounded-2xl clean-surface clean-surface-hover overflow-hidden flex flex-col justify-between transition-all duration-300"
          >
            <div
              onClick={() => {
                sound.playJarvisChirp();
                setActiveCert(cert);
              }}
              className="relative aspect-[4/3] bg-black/40 overflow-hidden cursor-pointer border-b border-white/[0.07] flex items-center justify-center p-3"
            >
              <img
                src={cert.image}
                alt={cert.title}
                loading="lazy"
                className="w-full h-full object-contain rounded transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="px-4 py-2 rounded-xl bg-white text-slate-950 font-mono font-bold text-xs flex items-center gap-2">
                  <ZoomIn className="w-4 h-4" />
                  <span>Inspect Certificate</span>
                </span>
              </div>
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-black/80 border border-white/15 text-[10px] font-mono font-semibold text-cyan-300 pointer-events-none">
                {cert.badge}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-400 mb-2">
                  <span className="text-amber-300 font-medium">{cert.category}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    {cert.date}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {cert.title}
                </h2>
                <div className="text-xs font-sans font-medium text-cyan-300/90 mt-1">
                  {cert.issuer}
                </div>
                <p className="text-xs font-sans text-slate-400 leading-relaxed mt-2.5">
                  {cert.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.07] flex items-center justify-between gap-2">
                {cert.credentialId ? (
                  <span className="text-[11px] font-mono text-slate-300 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.07]">
                    {cert.credentialId}
                  </span>
                ) : (
                  <span />
                )}

                <button
                  onClick={() => {
                    sound.playJarvisChirp();
                    setActiveCert(cert);
                  }}
                  className="text-xs font-mono font-semibold text-cyan-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Return CTA */}
      <div className="mt-14 text-center">
        <button
          onClick={() => {
            sound.playJarvisChirp();
            onBack();
          }}
          className="px-6 py-3 rounded-xl bg-white hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs inline-flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Portfolio</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      {activeCert && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh] bg-[#0b0e16] border border-white/15 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 sm:px-6 py-3.5 border-b border-white/[0.08] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-display font-bold text-white truncate">
                  {activeCert.title}
                </div>
                <div className="text-xs font-sans text-slate-400 truncate">
                  {activeCert.issuer} · {activeCert.date}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeCert.image}
                  download={`${activeCert.id}.jpg`}
                  onClick={() => sound.playJarvisChirp()}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white text-xs font-mono font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Save</span>
                </a>
                <button
                  onClick={() => setActiveCert(null)}
                  className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-red-500/25 border border-white/15 text-slate-300 hover:text-white transition-all"
                  aria-label="Close certificate preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 overflow-auto bg-[#06080d] flex items-center justify-center p-4 sm:p-6 min-h-[50vh]">
              <button
                onClick={() => navigateCert(-1)}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/80 hover:bg-white text-white hover:text-slate-950 border border-white/20 transition-all z-10"
                aria-label="Previous certificate"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <img
                src={activeCert.image}
                alt={activeCert.title}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
              />

              <button
                onClick={() => navigateCert(1)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/80 hover:bg-white text-white hover:text-slate-950 border border-white/20 transition-all z-10"
                aria-label="Next certificate"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="px-4 sm:px-6 py-3 border-t border-white/[0.08] text-xs font-sans text-slate-300 flex flex-wrap items-center justify-between gap-2">
              <p className="max-w-3xl">{activeCert.description}</p>
              {activeCert.credentialId && (
                <span className="font-mono text-amber-300 font-semibold shrink-0">
                  {activeCert.credentialId}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
