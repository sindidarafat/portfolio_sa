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

  // Lightbox keyboard navigation
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
    <div className="min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-b from-arc/10 to-transparent blur-3xl pointer-events-none" />

      {/* Top Back Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-5 border-b border-arc/25 relative z-10">
        <button
          onClick={() => {
            sound.playJarvisChirp();
            onBack();
          }}
          className="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border-2 border-arc/50 hover:border-arc text-white font-mono text-xs sm:text-sm font-bold flex items-center gap-2 shadow-[0_0_18px_rgba(0,240,255,0.2)] transition-all transform hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4 text-arc" />
          <span>BACK TO PORTFOLIO</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900/80 border border-slate-800 px-3.5 py-2 rounded-xl">
          <BadgeCheck className="w-4 h-4 text-emerald-400" />
          <span>{portfolioData.certificates.length} VERIFIED CERTIFICATES & RECOGNITIONS</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-arc/40 text-xs font-mono text-arc mb-3">
          <Award className="w-4 h-4 text-amber-400" />
          <span>VERIFIED CREDENTIALS VAULT</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
          CERTIFICATES & RECOGNITIONS
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-3 font-sans leading-relaxed">
          Official certifications, national competition credentials, technical assessments, and university recognitions earned across innovation, data science, business case competitions, and leadership.
        </p>
      </div>

      {/* Competitive Highlights Strip (UIHP + BIZCEPTION + Datathon) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 relative z-10">
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/30 to-slate-950/90 border border-amber-500/40 flex items-start gap-3">
          <Trophy className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-mono font-bold text-amber-300 uppercase">UIHP Innovation Hub</div>
            <div className="text-sm font-sans text-white font-semibold">Inter-University Winner & National Qualifier</div>
            <div className="text-xs font-sans text-slate-400 mt-0.5">ICT Division & The World Bank • Cohort 6</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/30 to-slate-950/90 border border-arc/40 flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-arc shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-mono font-bold text-arc uppercase">BIZCEPTION Case Competition</div>
            <div className="text-sm font-sans text-white font-semibold">Semi-Finalist & Regular Case Competitor</div>
            <div className="text-xs font-sans text-slate-400 mt-0.5">Business Strategy, Market & Financial Cases</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/30 to-slate-950/90 border border-emerald-500/40 flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-mono font-bold text-emerald-300 uppercase">Technical & Global Awards</div>
            <div className="text-sm font-sans text-white font-semibold">CUET Datathon, HackerRank & Duke of Edinburgh</div>
            <div className="text-xs font-sans text-slate-400 mt-0.5">Team Crixus • Bronze Standard No. 12818</div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 relative z-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              sound.playJarvisChirp();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all border ${
              selectedCategory === cat
                ? 'bg-arc/20 text-arc border-arc shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Certificates Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {filteredCerts.map((cert) => (
          <article
            key={cert.id}
            className="group rounded-2xl bg-[#0a1020]/90 border border-slate-800 hover:border-arc/60 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.16)] hud-corner-box"
          >
            {/* Certificate Visual Frame */}
            <div
              onClick={() => {
                sound.playJarvisChirp();
                setActiveCert(cert);
              }}
              className="relative aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer border-b border-slate-800 flex items-center justify-center p-3"
            >
              <img
                src={cert.image}
                alt={cert.title}
                loading="lazy"
                className="w-full h-full object-contain rounded transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-4 py-2 rounded-xl bg-arc text-black font-mono font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_#00f0ff]">
                  <ZoomIn className="w-4 h-4" />
                  <span>INSPECT FULL CERTIFICATE</span>
                </span>
              </div>
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-slate-950/90 border border-arc/40 text-[10px] font-mono font-bold text-arc">
                {cert.badge}
              </span>
            </div>

            {/* Certificate Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-slate-400 mb-2">
                  <span className="text-amber-400 font-semibold">{cert.category}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-arc" />
                    {cert.date}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-arc transition-colors leading-snug">
                  {cert.title}
                </h2>
                <div className="text-xs font-sans font-medium text-cyan-300/90 mt-1">
                  {cert.issuer}
                </div>
                <p className="text-xs font-sans text-slate-400 leading-relaxed mt-2.5">
                  {cert.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                {cert.credentialId ? (
                  <span className="text-[11px] font-mono text-slate-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
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
                  className="text-xs font-mono font-bold text-arc hover:text-white transition-colors flex items-center gap-1"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>VIEW</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Return CTA */}
      <div className="mt-14 text-center relative z-10">
        <button
          onClick={() => {
            sound.playJarvisChirp();
            onBack();
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] inline-flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO MAIN PORTFOLIO</span>
        </button>
      </div>

      {/* Full-Screen Certificate Lightbox Modal */}
      {activeCert && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh] bg-[#070c18] border border-arc/50 rounded-2xl overflow-hidden flex flex-col shadow-[0_0_60px_rgba(0,240,255,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/90">
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-display font-bold text-white truncate">
                  {activeCert.title}
                </div>
                <div className="text-[11px] font-sans text-slate-400 truncate">
                  {activeCert.issuer} • {activeCert.date}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeCert.image}
                  download={`${activeCert.id}.jpg`}
                  onClick={() => sound.playJarvisChirp()}
                  className="px-3 py-1.5 rounded-lg bg-arc/20 hover:bg-arc/30 border border-arc/50 text-arc text-xs font-mono font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">SAVE</span>
                </a>
                <button
                  onClick={() => setActiveCert(null)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-600/30 border border-slate-700 hover:border-red-500 text-slate-300 hover:text-white transition-all"
                  aria-label="Close certificate preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Canvas */}
            <div className="relative flex-1 overflow-auto bg-[#03060e] flex items-center justify-center p-4 sm:p-6 min-h-[50vh]">
              <button
                onClick={() => navigateCert(-1)}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-slate-950/85 hover:bg-arc text-white hover:text-black border border-arc/40 transition-all z-10"
                aria-label="Previous certificate"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <img
                src={activeCert.image}
                alt={activeCert.title}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-slate-800"
              />

              <button
                onClick={() => navigateCert(1)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-slate-950/85 hover:bg-arc text-white hover:text-black border border-arc/40 transition-all z-10"
                aria-label="Next certificate"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Caption Footer */}
            <div className="px-4 sm:px-6 py-3 border-t border-slate-800 bg-slate-950/90 text-xs font-sans text-slate-300 flex flex-wrap items-center justify-between gap-2">
              <p className="max-w-3xl">{activeCert.description}</p>
              {activeCert.credentialId && (
                <span className="font-mono text-amber-400 font-semibold shrink-0">
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
