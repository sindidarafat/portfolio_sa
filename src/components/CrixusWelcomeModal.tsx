import React, { useEffect, useState } from 'react';
import { Terminal, X, Sparkles, ChevronDown } from 'lucide-react';
import { sound } from '../utils/audio';

interface CrixusWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToCrixus: () => void;
  onReopen?: () => void;
}

export const CrixusWelcomeModal: React.FC<CrixusWelcomeModalProps> = ({
  isOpen,
  onClose,
  onJumpToCrixus,
  onReopen,
}) => {
  const fullGreeting =
    "Welcome to Sindid Arafat's portfolio! I'm Crixus, Sindid's personal assistant just like Jarvis for Iron-Man. You can find me at the very end of this website for queries and help for limited things. I will unleash my full ai potential once master Sindid approves.";

  const [landed, setLanded] = useState(false);
  const [typedText, setTypedText] = useState('');

  // Trigger fly-in landing sequence whenever opened
  useEffect(() => {
    if (!isOpen) {
      setLanded(false);
      setTypedText('');
      return;
    }

    setLanded(false);
    setTypedText('');

    const landTimer = setTimeout(() => {
      setLanded(true);
      sound.playJarvisChirp();
    }, 1150);

    return () => clearTimeout(landTimer);
  }, [isOpen]);

  // Start typing message right after Iron-Man lands on the bottom-left corner
  useEffect(() => {
    if (!isOpen || !landed) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx += 2;
      if (idx >= fullGreeting.length) {
        setTypedText(fullGreeting);
        clearInterval(interval);
      } else {
        setTypedText(fullGreeting.slice(0, idx));
      }
    }, 20);
    return () => clearInterval(interval);
  }, [isOpen, landed]);

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
        className="fixed bottom-4 left-4 z-[85] group flex items-center gap-2 px-3 py-2 rounded-full bg-[#090f1f]/95 hover:bg-slate-900 border border-arc/50 hover:border-amber-400 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all transform hover:scale-105"
      >
        <span className="w-2 h-2 rounded-full bg-arc animate-ping" />
        <span className="text-[11px] font-mono font-bold text-white group-hover:text-arc tracking-wider">
          CRIXUS AI
        </span>
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-3 left-3 sm:bottom-5 sm:left-5 z-[95] pointer-events-none max-w-[calc(100vw-1.5rem)] w-[355px] sm:w-[385px]"
      role="region"
      aria-label="Crixus Personal Assistant"
    >
      <div className="flex flex-col items-start gap-2">
        {/* Compact HUD Speech Bubble — Appears after Iron-Man lands (< 1/4 screen) */}
        {landed && (
          <div className="pointer-events-auto w-full rounded-2xl bg-[#070d1c]/95 backdrop-blur-xl border-2 border-arc/55 shadow-[0_0_35px_rgba(0,240,255,0.28)] p-4 relative animate-bubble-pop hud-corner-box">
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

            {/* Typed Message */}
            <p className="text-xs sm:text-[13px] font-sans text-slate-100 leading-relaxed min-h-[5.5rem]">
              &ldquo;{typedText}&rdquo;
              <span className="inline-block w-1.5 h-3.5 bg-arc ml-1 align-middle animate-pulse" />
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

        {/* Flying Iron-Man Figure Landing on the Bottom-Left Corner */}
        <div
          className={`pointer-events-auto relative flex items-center gap-2.5 ${
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
            {/* Landing Glow Ring */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-14 h-3 rounded-full bg-arc/40 blur-md animate-pulse" />

            {/* Stylized Full-Body Flying Iron-Man SVG */}
            <svg
              viewBox="0 0 110 130"
              className="w-20 h-24 sm:w-24 sm:h-28 drop-shadow-[0_0_18px_rgba(0,240,255,0.55)] transition-transform group-hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Boot Repulsor Jet Flames */}
              <g className="animate-thruster">
                <polygon points="36,108 45,108 40,129" fill="#00F0FF" opacity="0.9" />
                <polygon points="38,108 43,108 40,122" fill="#FFFFFF" />
                <polygon points="65,108 74,108 70,129" fill="#00F0FF" opacity="0.9" />
                <polygon points="67,108 72,108 70,122" fill="#FFFFFF" />
              </g>

              {/* Palm Stabilizer Thrusters */}
              <circle cx="17" cy="78" r="5" fill="#00F0FF" opacity="0.85" className="animate-pulse" />
              <circle cx="93" cy="78" r="5" fill="#00F0FF" opacity="0.85" className="animate-pulse" />

              {/* Legs */}
              <path d="M40 74L35 107H46L51 78Z" fill="#B91C1C" stroke="#EF4444" strokeWidth="1.5" />
              <path d="M70 74L75 107H64L59 78Z" fill="#B91C1C" stroke="#EF4444" strokeWidth="1.5" />
              {/* Gold Knee/Thigh Plates */}
              <path d="M39 78L48 79L46 92L37 91Z" fill="#F59E0B" />
              <path d="M71 78L62 79L64 92L73 91Z" fill="#F59E0B" />

              {/* Arms (Stabilizer Flight Stance) */}
              <path d="M33 44L14 74L22 79L38 56Z" fill="#B91C1C" stroke="#EF4444" strokeWidth="1.5" />
              <path d="M77 44L96 74L88 79L72 56Z" fill="#B91C1C" stroke="#EF4444" strokeWidth="1.5" />
              {/* Gold Forearm Accents */}
              <path d="M27 54L18 68L23 71L32 57Z" fill="#F59E0B" />
              <path d="M83 54L92 68L87 71L78 57Z" fill="#F59E0B" />

              {/* Torso / Chest Armor */}
              <path
                d="M34 40L55 34L76 40L71 76H39L34 40Z"
                fill="#991B1B"
                stroke="#EF4444"
                strokeWidth="1.8"
              />
              {/* Gold Shoulder Pauldrons */}
              <ellipse cx="34" cy="43" rx="7" ry="5" fill="#F59E0B" stroke="#FDE68A" strokeWidth="1" />
              <ellipse cx="76" cy="43" rx="7" ry="5" fill="#F59E0B" stroke="#FDE68A" strokeWidth="1" />
              {/* Rib / Waist Gold Trim */}
              <path d="M41 64H69L67 74H43L41 64Z" fill="#D97706" />

              {/* Glowing Chest Reactor Core */}
              <circle cx="55" cy="52" r="8" fill="#020617" stroke="#00F0FF" strokeWidth="2" />
              <circle cx="55" cy="52" r="5" fill="#00F0FF" className="animate-pulse" />
              <circle cx="55" cy="52" r="2.3" fill="#FFFFFF" />

              {/* Helmet */}
              <path
                d="M55 7C44 7 39 14 39 24L42 35L55 40L68 35L71 24C71 14 66 7 55 7Z"
                fill="#B91C1C"
                stroke="#EF4444"
                strokeWidth="1.8"
              />
              {/* Gold Faceplate */}
              <path
                d="M46 14L49 18H61L64 14L67 22L64 33L55 37L46 33L43 22L46 14Z"
                fill="#F59E0B"
                stroke="#FDE68A"
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
      </div>
    </div>
  );
};
