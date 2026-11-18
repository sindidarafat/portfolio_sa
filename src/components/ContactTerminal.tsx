import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, Terminal as TerminalIcon, FileText, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const ContactTerminal: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Mini interactive CLI state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; resp: string }>>([
    { cmd: 'system --status', resp: 'PORTFOLIO OS ONLINE // SINDID ARAFAT — SYSTEM ARCHITECT' },
    { cmd: 'help', resp: 'COMMANDS AVAILABLE: help | skills | projects | cv | contact | overdrive | clear' }
  ]);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    sound.playJarvisChirp();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg(null);
    sound.playRepulsorShot();

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${portfolioData.personal.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: 'Email from Portfolio',
          _replyto: formData.email,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true)) {
        sound.playJarvisChirp();
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Email gateway returned an error.');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to reach email service.';
      setErrorMsg(
        `Transmission issue (${message}). You can click below to send directly via your email app.`
      );
    } finally {
      setSending(false);
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    sound.playJarvisChirp();
    let resp = '';

    switch (cmd) {
      case 'help':
        resp = 'Available commands: skills | projects | repos | awards | cv | overdrive | hire | clear';
        break;
      case 'skills':
        resp = 'Core: Product/BA (PRD, UAT, Jira) | AI/ML (PyTorch, KAN, Scikit-learn) | Full-Stack (React, Node, PHP)';
        break;
      case 'projects':
        resp = 'Flagships: SkillSwap (MERN) | Electrician Finder (PHP) | Bank Loan AI | KAT Transformer | MadMax OpenGL';
        break;
      case 'repos':
        resp = '29 Public Repositories indexed on github.com/sindidarafat. Status: ACTIVE';
        break;
      case 'awards':
        resp = 'UIHP Innovation Hub Inter-University Winner & National Round Qualifier (World Bank / ICT Div) | 4x Dean’s List | Duke of Edinburgh Bronze';
        break;
      case 'cv':
        window.open(portfolioData.personal.cvUrl, '_blank');
        resp = 'Opening Sindid_Arafat_CV.pdf in secure window...';
        break;
      case 'overdrive':
        sound.playUnibeamBlast();
        resp = '⚡ OVERDRIVE PULSE EXECUTED! SYSTEM RUNNING AT PEAK OUTPUT.';
        break;
      case 'hire':
      case 'contact':
        resp = `Direct Comm: ${portfolioData.personal.email} | Phone: ${portfolioData.personal.phone}`;
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        resp = `Command '${cmd}' not recognized. Type 'help' for available directives.`;
    }

    setTerminalHistory(prev => [...prev, { cmd: terminalInput, resp }]);
    setTerminalInput('');
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background radial */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-arc/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-arc/30 text-xs font-mono text-arc mb-3">
          <TerminalIcon className="w-3.5 h-3.5 text-arc" />
          <span>TRANSMISSION CHANNEL // ENCRYPTED COMMS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
          INITIALIZE DIRECT CONTACT PROTOCOL
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 font-sans">
          Have an engineering venture, product role, AI research partnership, or business analysis requirement? Send an encrypted transmission below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Information & Social Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#090e1c]/90 border border-slate-800 backdrop-blur-md hud-corner-box space-y-6">
            <h3 className="text-xl font-bold font-display text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-arc" />
              <span>DIRECT CONTACT DOSSIER</span>
            </h3>

            {/* Email item with copy button */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-arc/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-arc/10 border border-arc/30 flex items-center justify-center text-arc">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">DIRECT EMAIL</div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-white select-all">
                    {portfolioData.personal.email}
                  </div>
                </div>
              </div>
              <button
                onClick={copyEmail}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-arc transition-all"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone item */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">TELEMETRY VOICE / WHATSAPP</div>
                <div className="text-xs sm:text-sm font-mono font-bold text-white">
                  {portfolioData.personal.phone}
                </div>
              </div>
            </div>

            {/* Coordinates / Location */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div className="w-9 h-9 rounded-lg bg-red-400/10 border border-red-400/30 flex items-center justify-center text-red-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">LOCATION & BASE</div>
                <div className="text-xs sm:text-sm font-mono font-bold text-white">
                  {portfolioData.personal.location}
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  {portfolioData.personal.coordinates}
                </div>
              </div>
            </div>

            {/* External Portals — Prominent Icons */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playJarvisChirp()}
                className="p-4 rounded-xl bg-slate-950 hover:bg-slate-900 border-2 border-slate-700 hover:border-arc shadow-[0_0_12px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] text-center flex flex-col items-center gap-2 transition-all text-white group"
              >
                <GithubIcon className="w-8 h-8 text-white group-hover:text-arc transition-colors" />
                <span className="text-xs font-mono font-bold tracking-wider">GITHUB</span>
              </a>

              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playJarvisChirp()}
                className="p-4 rounded-xl bg-[#0a192f] hover:bg-[#0d2547] border-2 border-[#0a66c2]/70 hover:border-[#38bdf8] shadow-[0_0_12px_rgba(10,102,194,0.2)] hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] text-center flex flex-col items-center gap-2 transition-all text-white group"
              >
                <LinkedinIcon className="w-8 h-8 text-[#38bdf8] group-hover:text-white transition-colors" />
                <span className="text-xs font-mono font-bold tracking-wider">LINKEDIN</span>
              </a>

              <a
                href={portfolioData.personal.cvUrl}
                download="Sindid_Arafat_CV.pdf"
                onClick={() => sound.playJarvisChirp()}
                className="p-4 rounded-xl bg-slate-950 hover:bg-slate-900 border-2 border-amber-500/50 hover:border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.12)] hover:shadow-[0_0_20px_rgba(251,191,36,0.35)] text-center flex flex-col items-center gap-2 transition-all text-white group"
              >
                <FileText className="w-8 h-8 text-amber-400 group-hover:text-amber-300 transition-colors" />
                <span className="text-xs font-mono font-bold tracking-wider">CV (PDF)</span>
              </a>
            </div>
          </div>

          {/* Interactive CLI Terminal */}
          <div className="p-4 rounded-2xl bg-black border border-arc/40 shadow-inner font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-slate-400">INTERACTIVE CLI TERMINAL</span>
              </div>
              <span className="text-arc">TYPE: 'help'</span>
            </div>

            <div className="h-32 overflow-y-auto space-y-1.5 text-[11px] text-slate-300 pr-1">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-arc">
                    <span className="text-amber-400">sindid@portfolio:~$</span> {item.cmd}
                  </div>
                  <div className="text-slate-400 pl-2 border-l border-slate-800">
                    {item.resp}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleCommandSubmit} className="mt-2 pt-2 border-t border-slate-800 flex items-center gap-2">
              <span className="text-amber-400">&gt;</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type a command (e.g. skills, projects, overdrive)..."
                className="w-full bg-transparent text-white focus:outline-none placeholder-slate-600 text-xs"
              />
            </form>
          </div>
        </div>

        {/* Right Column: Encrypted Transmission Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0b1021]/90 border border-arc/30 backdrop-blur-md hud-corner-box shadow-[0_0_30px_rgba(0,240,255,0.08)]">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
              <div>
                <h3 className="text-2xl font-bold font-display text-white">
                  TRANSMIT DIRECT MESSAGE
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  DISPATCH PROTOCOL // DELIVERS DIRECTLY TO SINDID ARAFAT
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-arc/30 text-arc">
                SECURE 256-BIT
              </span>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4 font-mono">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <Check className="w-7 h-7 animate-pulse" />
                </div>
                <h4 className="text-lg font-bold font-display text-white">
                  EMAIL SENT TO SINDID ARAFAT!
                </h4>
                <p className="text-xs font-sans text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your message has been delivered to <strong className="text-arc">{portfolioData.personal.email}</strong> with subject <strong>&ldquo;Email from Portfolio&rdquo;</strong>. Thank you for reaching out!
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-arc/40 text-arc text-xs font-mono font-bold transition-all"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/50 text-xs font-sans text-red-200 space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                    <a
                      href={`mailto:${portfolioData.personal.email}?subject=${encodeURIComponent('Email from Portfolio')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      OPEN IN EMAIL APP INSTEAD
                    </a>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">
                      IDENTIFIER / YOUR NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      disabled={sending}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Rahman / Sarah Jenkins"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-sans text-white placeholder-slate-600 focus:outline-none focus:border-arc transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">
                      COMM CHANNEL / YOUR EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      disabled={sending}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. collaborator@enterprise.com"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-sans text-white placeholder-slate-600 focus:outline-none focus:border-arc transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">
                    TRANSMISSION PAYLOAD / MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    required
                    disabled={sending}
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, role, requirements, or proposed collaboration..."
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-sans text-white placeholder-slate-600 focus:outline-none focus:border-arc transition-colors resize-none disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-cyan-500 hover:from-red-500 hover:to-cyan-400 text-white font-mono font-bold text-xs tracking-wider shadow-[0_0_25px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] border border-amber-300/40 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>SENDING TO {portfolioData.personal.email.toUpperCase()}...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>TRANSMIT ENCRYPTED MESSAGE // DISPATCH</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
