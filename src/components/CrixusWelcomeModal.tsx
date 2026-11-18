import React, { useEffect, useState, useMemo } from 'react';
import { Terminal, X, Sparkles, ChevronDown } from 'lucide-react';
import { sound } from '../utils/audio';

interface CrixusWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToCrixus: () => void;
  onReopen?: () => void;
}

const FULL_GREETING =
  "Welcome to Sindid Arafat's portfolio! I'm Crixus, Sindid's personal assistant just like Jarvis for Iron-Man. You can find me at the very end of this website for queries and help for limited things. I will unleash my full ai potential once master Sindid approves.";

export const CrixusWelcomeModal: React.FC<CrixusWelcomeModalProps> = ({
  isOpen,
  onClose,
  onJumpToCrixus,
  onReopen,
}) => {
  const words = useMemo(() => FULL_GREETING.split(' '), []);
  const [landed, setLanded] = useState(false);
  const [visibleWords, setVisibleWords] = useState(0);

  // Trigger Iron-Man fly-in landing sequence whenever opened
  useEffect(() => {
    if (!isOpen) {
      setLanded(false);
      setVisibleWords(0);
      return;
    }

    setLanded(false);
    setVisibleWords(0);

    const landTimer = setTimeout(() => {
      setLanded(true);
      sound.playJarvisChirp();
    }, 1150);

    return () => clearTimeout(landTimer);
  }, [isOpen]);

  // Buttery-smooth word-by-word opacity reveal — 0px layout shift, 0 shake!
  useEffect(() => {
    if (!isOpen || !landed) return;
    let rafId = 0;
    const startTime = performance.now();
    const wordsPerSecond = 11;

    const tick = (now: number) => {
      const elapsedSec = (now - startTime) / 1000;
      const nextCount = Math.min(words.length, Math.floor(elapsedSec * wordsPerSecond) + 1);
      setVisibleWords(nextCount);
      if (nextCount < words.length) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isOpen, landed, words.length]);

  // Minimized floating Iron-Man dock button in bottom-left when closed
  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => {
          sound.playJarvisChirp();
          onReopen?.();
        }}
        title="Summon Crixus Assistant"
        aria-label="Summon Crixus Assistant"
        className="fixed bottom-4 left-4 z-[90] group flex items-center gap-2 px-3 py-2 rounded-full bg-[#090f1f]/95 hover:bg-slate-900 border-2 border-arc/55 hover:border-amber-400 shadow-[0_0_22px_rgba(0,240,255,0.35)] transition-all transform hover:scale-105"
      >
        {/* Mini Iron-Man Helmet Emblem */}
        <svg viewBox="0 0 40 40" className="w-6 h-6 shrink-0" fill="none">
          <path d="M20 4C12 4 8 10 8 18L10 28L20 35L30 28L32 18C32 10 28 4 20 4Z" fill="#B91C1C" stroke="#EF4444" strokeWidth="1.5" />
          <path d="M13 10L15 13H25L27 10L29 17L27 26L20 31L13 26L11 17L13 10Z" fill="#F59E0B" />
          <polygon points="12,18 18,19.5 17,22 13,21" fill="#00F0FF" />
          <polygon points="28,18 22,19.5 23,22 27,21" fill="#00F0FF" />
        </svg>
        <span className="text-[11px] font-mono font-bold text-white group-hover:text-arc tracking-wider">
          CRIXUS AI
        </span>
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-3 left-3 sm:bottom-5 sm:left-5 z-[95] pointer-events-none max-w-[calc(100vw-1.5rem)]"
      role="region"
      aria-label="Crixus Personal Assistant"
    >
      <div className="flex flex-col-reverse sm:flex-row items-start sm:items-end gap-2.5 sm:gap-3">
        {/* Flying Iron-Man Figure Landing on the Bottom-Left Corner */}
        <div
          className={`pointer-events-auto relative flex items-center gap-2 shrink-0 ${
            landed ? 'animate-ironman-hover' : 'animate-ironman-fly'
          }`}
        >
          <div
            onClick={() => {
              sound.playArcPulse();
              onJumpToCrixus();
            }}
            title="Crixus — Click to jump to Crixus Terminal"
            className="relative cursor-pointer group"
          >
            {/* Glowing Cyan Landing Pad Aura */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-3.5 rounded-full bg-arc/50 blur-md animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-red-600/15 blur-xl pointer-events-none" />

            {/* Stylized Full-Body Flying Iron-Man SVG */}
            <svg
              viewBox="0 0 110 132"
              className="w-20 h-24 sm:w-24 sm:h-28 drop-shadow-[0_0_20px_rgba(0,240,255,0.65)] transition-transform group-hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Boot Repulsor Jet Flames */}
              <g className="animate-thruster">
                <polygon points="36,108 45,108 40,131" fill="#00F0FF" opacity="0.95" />
                <polygon points="38,108 43,108 40,123" fill="#FFFFFF" />
                <polygon points="65,108 74,108 70,131" fill="#00F0FF" opacity="0.95" />
                <polygon points="67,108 72,108 70,123" fill="#FFFFFF" />
              </g>

              {/* Palm Stabilizer Thrusters */}
              <circle cx="17" cy="78" r="5.5" fill="#00F0FF" opacity="0.9" className="animate-pulse" />
              <circle cx="17" cy="78" r="2.5" fill="#FFFFFF" />
              <circle cx="93" cy="78" r="5.5" fill="#00F0FF" opacity="0.9" className="animate-pulse" />
              <circle cx="93" cy="78" r="2.5" fill="#FFFFFF" />

              {/* Legs */}
              <path d="M40 74L35 107H46L51 78Z" fill="#DC2626" stroke="#FCA5A5" strokeWidth="1.4" />
              <path d="M70 74L75 107H64L59 78Z" fill="#DC2626" stroke="#FCA5A5" strokeWidth="1.4" />
              {/* Gold Knee/Thigh Plates */}
              <path d="M39 78L48 79L46 92L37 91Z" fill="#FBBF24" />
              <path d="M71 78L62 79L64 92L73 91Z" fill="#FBBF24" />

              {/* Arms (Stabilizer Flight Stance) */}
              <path d="M33 44L14 74L22 79L38 56Z" fill="#DC2626" stroke="#FCA5A5" strokeWidth="1.4" />
              <path d="M77 44L96 74L88 79L72 56Z" fill="#DC2626" stroke="#FCA5A5" strokeWidth="1.4" />
              {/* Gold Forearm Accents */}
              <path d="M27 54L18 68L23 71L32 57Z" fill="#FBBF24" />
              <path d="M83 54L92 68L87 71L78 57Z" fill="#FBBF24" />

              {/* Torso / Chest Armor */}
              <path
                d="M34 40L55 34L76 40L71 76H39L34 40Z"
                fill="#B91C1C"
                stroke="#F87171"
                strokeWidth="1.8"
              />
              {/* Gold Shoulder Pauldrons */}
              <ellipse cx="34" cy="43" rx="7" ry="5" fill="#FBBF24" stroke="#FEF08A" strokeWidth="1" />
              <ellipse cx="76" cy="43" rx="7" ry="5" fill="#FBBF24" stroke="#FEF08A" strokeWidth="1" />
              {/* Rib / Waist Gold Trim */}
              <path d="M41 64H69L67 74H43L41 64Z" fill="#F59E0B" />

              {/* Glowing Chest Reactor Core */}
              <circle cx="55" cy="52" r="8.5" fill="#020617" stroke="#00F0FF" strokeWidth="2.2" />
              <circle cx="55" cy="52" r="5.5" fill="#00F0FF" className="animate-pulse" />
              <circle cx="55" cy="52" r="2.5" fill="#FFFFFF" />

              {/* Helmet */}
              <path
                d="M55 7C44 7 39 14 39 24L42 35L55 40L68 35L71 24C71 14 66 7 55 7Z"
                fill="#DC2626"
                stroke="#FCA5A5"
                strokeWidth="1.6"
              />
              {/* Gold Faceplate */}
              <path
                d="M46 14L49 18H61L64 14L67 22L64 33L55 37L46 33L43 22L46 14Z"
                fill="#FBBF24"
                stroke="#FEF08A"
                strokeWidth="1"
              />
              {/* Glowing Cyan Eyes */}
              <polygon points="45,23 52,24.5 51,27 46,26" fill="#00F0FF" className="animate-pulse" />
              <polygon points="65,23 58,24.5 59,27 64,26" fill="#00F0FF" className="animate-pulse" />
            </svg>
          </div>

          {!landed && (
            <div className="px-2.5 py-1 rounded-lg bg-slate-950/90 border border-arc/50 text-[10px] font-mono text-arc flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              <Sparkles className="w-3 h-3 animate-spin" />
              <span>CRIXUS INBOUND...</span>
            </div>
          )}
        </div>

        {/* Compact HUD Speech Bubble — Zero-Shake Per-Word Smooth Opacity Reveal */}
        {landed && (
          <div className="pointer-events-auto w-[320px] sm:w-[355px] max-w-[calc(100vw-1.5rem)] rounded-2xl bg-[#070d1c]/95 backdrop-blur-xl border-2 border-arc/55 shadow-[0_0_35px_rgba(0,240,255,0.28)] p-3.5 sm:p-4 relative animate-bubble-pop hud-corner-box">
            {/* Close / Minimize */}
            <button
              type="button"
              onClick={() => {
                sound.playJarvisChirp();
                onClose();
              }}
              aria-label="Minimize Crixus"
              className="absolute top-2.5 right-2.5 p-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-arc text-slate-400 hover:text-white transition-all"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-2 pr-7">
              <span className="w-2 h-2 rounded-full bg-arc animate-ping shrink-0" />
              <span className="text-[11px] font-display font-bold text-arc tracking-wider">
                CRIXUS
              </span>
              <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold">
                // PERSONAL ASSISTANT
              </span>
            </div>

            {/* 100% Zero-Shake Smooth Word-by-Word Fade Reveal */}
            <p className="text-xs sm:text-[13px] font-sans text-slate-100 leading-relaxed">
              <span className="transition-opacity duration-300 opacity-100">&ldquo;</span>
              {words.map((word, idx) => (
                <React.Fragment key={idx}>
                  <span
                    className={`transition-opacity duration-300 ${
                      idx < visibleWords ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {word}
                  </span>
                  {idx < words.length - 1 ? ' ' : ''}
                </React.Fragment>
              ))}
              <span
                className={`transition-opacity duration-300 ${
                  visibleWords >= words.length ? 'opacity-100' : 'opacity-0'
                }`}
              >
                &rdquo;
              </span>
            </p>

            {/* Compact Action Row */}
            <div className="mt-3 pt-2.5 border-t border-slate-800/90 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playRepulsorShot();
                  onJumpToCrixus();
                }}
                className="flex-1 px-3 py-2 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-cyan-400 hover:from-red-500 hover:to-cyan-300 text-slate-950 font-mono font-extrabold text-[11px] tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>GO TO CRIXUS CLI</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playJarvisChirp();
                  onClose();
                }}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-arc text-slate-300 hover:text-white font-mono text-[11px] font-bold transition-all"
              >
                GOT IT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
