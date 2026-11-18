import React, { useEffect, useState } from 'react';
import { ArrowRight, Terminal, Sparkles, X, Shield } from 'lucide-react';
import { sound } from '../utils/audio';

interface CrixusWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToCrixus: () => void;
}

export const CrixusWelcomeModal: React.FC<CrixusWelcomeModalProps> = ({
  isOpen,
  onClose,
  onJumpToCrixus,
}) => {
  const fullGreeting =
    "Welcome to Sindid Arafat's portfolio! I'm Crixus, Sindid's Iron-Man personal assistant. You can find me at the very end of this website for queries and help.";
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setTypedText('');
    let idx = 0;
    const interval = setInterval(() => {
      idx += 2;
      if (idx >= fullGreeting.length) {
        setTypedText(fullGreeting);
        clearInterval(interval);
      } else {
        setTypedText(fullGreeting.slice(0, idx));
      }
    }, 18);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] bg-[#02050d]/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome from Crixus"
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#0b1224] via-[#070b17] to-[#050811] border-2 border-arc/50 shadow-[0_0_80px_rgba(0,240,255,0.28)] p-5 sm:p-10 hud-corner-box">
        {/* Ambient Red/Gold/Cyan Glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-48 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-0 w-72 h-48 bg-arc/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playJarvisChirp();
            onClose();
          }}
          aria-label="Dismiss welcome modal"
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-arc text-slate-400 hover:text-white transition-all z-20"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-amber-400/50 text-xs font-mono text-amber-300 tracking-wider uppercase font-bold">
            <span className="w-2 h-2 rounded-full bg-arc animate-ping" />
            <span>INCOMING TRANSMISSION // CRIXUS AI</span>
          </div>

          {/* Custom Iron-Man Helmet / Crixus Hologram Avatar */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-arc/40 animate-spin-slow" />
            <div className="absolute inset-2 rounded-full border border-amber-400/50 animate-spin-reverse" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-red-950/80 to-slate-950 border-2 border-amber-400/60 flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.45)]">
              {/* Stylized Iron-Man Helmet SVG */}
              <svg
                viewBox="0 0 120 120"
                className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_0_12px_rgba(0,240,255,0.5)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer Crimson Helmet Shell */}
                <path
                  d="M60 10C37 10 24 25 22 48L26 78L42 104C47 109 53 111 60 111C67 111 73 109 78 104L94 78L98 48C96 25 83 10 60 10Z"
                  fill="#991B1B"
                  stroke="#EF4444"
                  strokeWidth="2.5"
                />
                {/* Gold Faceplate */}
                <path
                  d="M42 26L48 34H72L78 26L87 42L84 68L72 95L60 101L48 95L36 68L33 42L42 26Z"
                  fill="#F59E0B"
                  stroke="#FDE68A"
                  strokeWidth="1.8"
                />
                {/* Forehead Ridge */}
                <path
                  d="M50 18L53 33H67L70 18"
                  fill="#7F1D1D"
                  stroke="#FCA5A5"
                  strokeWidth="1.5"
                />
                {/* Cheek Contours */}
                <path d="M36 66L48 74L46 92" stroke="#92400E" strokeWidth="2" />
                <path d="M84 66L72 74L74 92" stroke="#92400E" strokeWidth="2" />
                {/* Glowing Cyan Iron-Man Eyes */}
                <polygon
                  points="38,52 54,55 51,61 40,59"
                  fill="#00F0FF"
                  className="animate-pulse"
                />
                <polygon
                  points="82,52 66,55 69,61 80,59"
                  fill="#00F0FF"
                  className="animate-pulse"
                />
                {/* Jaw / Chin Vent */}
                <path
                  d="M48 84H72L68 92H52L48 84Z"
                  fill="#7F1D1D"
                  stroke="#FDE68A"
                  strokeWidth="1.3"
                />
                <line x1="53" y1="88" x2="67" y2="88" stroke="#00F0FF" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Crixus Title */}
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-wide">
              HELLO! I&apos;M <span className="text-arc text-glow-cyan">CRIXUS</span>
            </h2>
            <p className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>IRON-MAN PERSONAL ASSISTANT FOR SINDID ARAFAT</span>
            </p>
          </div>

          {/* Speech Hologram Box */}
          <div className="w-full rounded-2xl bg-slate-950/90 border border-arc/35 p-4 sm:p-5 text-left relative shadow-inner">
            <div className="flex items-center gap-2 text-[11px] font-mono text-arc mb-2">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>CRIXUS VOICE LOG:</span>
            </div>
            <p className="text-sm sm:text-base font-sans text-slate-100 leading-relaxed min-h-[4.5rem]">
              &ldquo;{typedText}&rdquo;
              <span className="inline-block w-2 h-4 bg-arc ml-1 align-middle animate-pulse" />
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full pt-1">
            <button
              onClick={() => {
                sound.playRepulsorShot();
                onClose();
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-cyan-400 hover:from-red-500 hover:to-cyan-300 text-slate-950 font-mono font-extrabold text-xs sm:text-sm tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
            >
              <span>ENTER PORTFOLIO</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playJarvisChirp();
                onJumpToCrixus();
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border-2 border-arc/50 hover:border-arc text-white font-mono font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <Terminal className="w-4 h-4 text-arc" />
              <span>TALK TO CRIXUS AT BOTTOM</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
