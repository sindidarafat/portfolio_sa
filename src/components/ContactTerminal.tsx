import React, { useState, useRef, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  Terminal as TerminalIcon,
  FileText,
  Sparkles,
  Loader2,
  AlertCircle,
  Award,
  RotateCcw,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

interface TerminalEntry {
  cmd: string;
  title?: string;
  lines: string[];
  accent?: 'cyan' | 'amber' | 'emerald';
}

interface ContactTerminalProps {
  onOpenCertificates?: () => void;
  onReplayWelcome?: () => void;
}

export const ContactTerminal: React.FC<ContactTerminalProps> = ({
  onOpenCertificates,
  onReplayWelcome,
}) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const terminalScrollRef = useRef<HTMLDivElement>(null);

  // Upgraded Crixus Interactive CLI state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<TerminalEntry[]>([
    {
      cmd: 'system --status',
      title: 'CRIXUS ASSISTANT ONLINE // PORTFOLIO OS v4.2',
      lines: [
        'Welcome! I am Crixus — Sindid Arafat’s personal assistant.',
        'Subject: Sindid Arafat | Product & Business Analyst | Data & Strategy Intern @ CAP (Dhaka)',
        'LinkedIn: linkedin.com/in/sindid-arafat-1a593233b | GitHub: github.com/sindidarafat (29 Repos)',
      ],
      accent: 'cyan',
    },
    {
      cmd: 'help',
      title: 'AVAILABLE COMMANDS (CLICK A CHIP OR TYPE ANY QUESTION)',
      lines: [
        'Core: about | experience | education | skills | strengths | projects | repos',
        'Honors & Links: awards | bizception | certificates | linkedin | contact | hire | cv',
        'System: crixus | all | overdrive | clear',
      ],
      accent: 'amber',
    },
  ]);

  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [terminalHistory]);

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

  const runCommand = (rawInput: string) => {
    const cmd = rawInput.trim().toLowerCase();
    if (!cmd) return;

    sound.playJarvisChirp();

    if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    }

    let entry: TerminalEntry;

    if (cmd === 'help' || cmd.includes('command')) {
      entry = {
        cmd: rawInput,
        title: 'CRIXUS COMMAND DIRECTORY',
        lines: [
          '• about / bio        — Full profile summary, current role & background',
          '• experience / cap   — CAP Internship, BRAC Computer Club (BUCC) & One Academy',
          '• education / cgpa   — BRAC University CSE (3.69/4.00), HSC & SSC (5.00/5.00)',
          '• skills / strengths — SQL, Excel, Power BI, Python, AI/ML, MERN, Figma, BA & Leadership',
          '• projects / repos   — Featured builds & all 29 GitHub repositories',
          '• awards / bizception— UIHP Inter-Uni Winner, BIZCEPTION Semi-Finalist, Scholarships',
          '• certificates       — View all 7 verified certificates & recognitions',
          '• linkedin / contact — Direct LinkedIn, GitHub, Email, Phone & CV download',
          '• overdrive / clear  — Trigger system overdrive pulse or clear console',
        ],
        accent: 'amber',
      };
    } else if (cmd === 'about' || cmd === 'bio' || cmd.includes('who is') || cmd === 'who') {
      entry = {
        cmd: rawInput,
        title: 'EXECUTIVE PROFILE — SINDID ARAFAT',
        lines: [
          'Role Focus: Product and Business Analyst | Full-Stack Engineer | AI/ML Researcher',
          'Current Position: Data and Strategy Intern at CAP (Content, Analytics & Production Ltd.), Dhaka (Nov 2026 – Present)',
          'Education: BSc in Computer Science & Engineering, BRAC University (Sep 2022 – Sep 2026 | CGPA 3.69/4.00)',
          'Location: Dhaka, Bangladesh | Phone: +880 1735807816 | Email: sindidarafat275@gmail.com',
          'Summary: Combines analytical depth (SQL, Excel, Power BI, AI/ML) with full-stack engineering, PRD/requirements gathering, and proven cross-functional team leadership.',
        ],
        accent: 'cyan',
      };
    } else if (cmd === 'experience' || cmd === 'work' || cmd.includes('cap') || cmd.includes('intern') || cmd.includes('bucc')) {
      entry = {
        cmd: rawInput,
        title: 'LEADERSHIP & WORK EXPERIENCE (CV + LINKEDIN)',
        lines: [
          '1. CAP (Content, Analytics & Production Ltd.), Dhaka — Data & Strategy Intern (Nov 2026 – Present)',
          '   → Analyzes audience & campaign performance data for media planning, optimization & client reporting.',
          '2. BRAC University Computer Club (BUCC) — Assistant Director (Dec 2022 – Dec 2025)',
          '   → Led 10+ member team for IntraHacktive 1.0 (250+ participants); ran 3 design/motion workshops training 60+ members.',
          '3. One Academy — Content Head & Strategy Officer, Part-Time (Sep 2024 – Mar 2025)',
          '   → Managed 5 contributors & content calendar; grew social engagement by ~30% over 6 months.',
          '4. Faridpur Debate Forum — ICT Coordinator & Active Debater (Mar 2021 – Apr 2024)',
        ],
        accent: 'emerald',
      };
    } else if (cmd === 'education' || cmd.includes('cgpa') || cmd.includes('brac') || cmd.includes('school') || cmd.includes('college')) {
      entry = {
        cmd: rawInput,
        title: 'ACADEMIC CREDENTIALS',
        lines: [
          '• BRAC University, Dhaka — BSc in Computer Science & Engineering (Sep 2022 – Sep 2026)',
          '  CGPA: 3.69 / 4.00 | Dean’s List & VC’s List | Merit-based scholarship for 4 semesters.',
          '• Govt. Rajendra College, Faridpur — HSC Science (2021) | GPA: 5.00 / 5.00',
          '• Faridpur Zilla School, Faridpur — SSC Science (2019) | GPA: 5.00 / 5.00',
        ],
        accent: 'cyan',
      };
    } else if (cmd === 'skills' || cmd.includes('power bi') || cmd.includes('python') || cmd.includes('sql') || cmd.includes('excel')) {
      entry = {
        cmd: rawInput,
        title: 'COMPLETE SKILLS MATRIX',
        lines: [
          '• Data & Business: SQL, Excel, Power BI, Python (Pandas, NumPy, Scikit-learn), Jira, Google Workspace, PowerPoint, Word, PRDs, UAT',
          '• AI / ML & Research: PyTorch, TensorFlow, Scikit-learn, Matplotlib, Seaborn, KAN (Kolmogorov-Arnold Networks), Transformers',
          '• Technical & Web: JavaScript, TypeScript, React, Node.js, Express, PHP, C#, .NET, C/C++, Java, MongoDB, MySQL, REST APIs, Git, Docker',
          '• Design & Motion: Figma, Adobe Photoshop, Illustrator, After Effects, Premiere Pro',
        ],
        accent: 'cyan',
      };
    } else if (cmd === 'strengths') {
      entry = {
        cmd: rawInput,
        title: 'CORE PROFESSIONAL STRENGTHS',
        lines: [
          '• Problem Solving & Structured Analytical Thinking',
          '• Requirements Gathering, PRD Authoring & Business Analysis',
          '• Cross-Functional Stakeholder Coordination & Executive Presentation',
          '• Team Leadership (Led 10+ creative team & 5-contributor content team)',
        ],
        accent: 'amber',
      };
    } else if (cmd === 'projects') {
      entry = {
        cmd: rawInput,
        title: 'FLAGSHIP PROJECTS',
        lines: [
          '• Bank Loan Approval Prediction (Python, Scikit-learn) — ~85% accuracy classification model & key factor analysis',
          '• SkillSwap (MERN Stack, TypeScript) — Peer skill-exchange platform with profiles, matching & messaging',
          '• Electrician Finder (PHP, MySQL) — On-demand nearby electrician booking app modeled on ride-hailing apps',
          '• Kolmogorov-Arnold Transformer (KAT) & HybridCLKAN — Deep learning research in PyTorch',
          '• Weather Predictor AI & Heart Disease Predictor AI — Predictive ML models',
          '• MADMAX Fury Road (3D OpenGL) & Simon Says 3x3 LED Arduino Matrix',
        ],
        accent: 'cyan',
      };
    } else if (cmd === 'repos' || cmd === 'github') {
      entry = {
        cmd: rawInput,
        title: 'GITHUB REPOSITORY REGISTRY',
        lines: [
          '29 Public Repositories live at: https://github.com/sindidarafat',
          'Coverage: TypeScript, Python, Jupyter Notebooks, PHP, C/C++, Assembly & Systems.',
          'Contributions: 336+ All-Time commits across 2024–2026.',
        ],
        accent: 'emerald',
      };
    } else if (cmd === 'bizception' || cmd.includes('case')) {
      entry = {
        cmd: rawInput,
        title: 'BUSINESS CASE COMPETITIONS & INNOVATION TRACK',
        lines: [
          '• BIZCEPTION — Semi-Finalist (National Business Case Competition)',
          '• UIHP Innovation Hub — Inter-University Winner (BRAC IC6) & Ranked for National Round (ICT Div & World Bank)',
          '• VITALIZERS 2.0 (2024) — Club Partner Recognition (BRAC University Business & Economics Forum — BUBEF)',
          '• CUET CSE Fest 2025 Datathon — Team Crixus (Data Analysis & Solution Engineering)',
          'Regular participant in competitive business strategy, product pitch, and data case competitions.',
        ],
        accent: 'amber',
      };
    } else if (cmd === 'awards') {
      entry = {
        cmd: rawInput,
        title: 'HONORS, AWARDS & RECOGNITIONS',
        lines: [
          '• UIHP Innovation Hub Inter-University Winner & National Round Qualifier (ICT Division & The World Bank, Jul 2025)',
          '• BIZCEPTION Business Case Competition — Semi-Finalist',
          '• Dean’s List & Vice Chancellor’s List — 4 Semesters Merit-Based Scholarships (BRAC University)',
          '• Bronze Standard Awardee — The Duke of Edinburgh’s International Award (No. 12818, Mar 2024)',
          '• 16th Convocation Volunteer Recognition (16CN072) & 3-Year Official Volunteer, BRAC University',
        ],
        accent: 'amber',
      };
    } else if (cmd === 'certificates' || cmd === 'certs' || cmd.includes('cert')) {
      entry = {
        cmd: rawInput,
        title: '7 VERIFIED CERTIFICATES & CREDENTIALS',
        lines: [
          '1. University Innovation Hub Program (UIHP) — Cohort 6 Completion (ID: 0201063329, Jul 2025)',
          '2. Datathon | CUET CSE Fest 2025 — Team Crixus',
          '3. HackerRank — Python (Basic) Skill Certification (ID: FAF13CDEF274, Jan 2025)',
          '4. VITALIZERS 2.0 — Business Case Competition Club Partner (BUBEF, 2024)',
          '5. Duke of Edinburgh’s International Award — Bronze Standard (No. 12818, Mar 2024)',
          '6. BRAC University 16th Convocation — Certificate of Recognition (16CN072, 2025)',
          '7. Empowering Tomorrow’s Leaders — SRHR Youth Camp Bangladesh (Mar 2024)',
          '→ Click "OPEN CERTIFICATES PAGE" below or in the top navbar to inspect every certificate visually!',
        ],
        accent: 'emerald',
      };
    } else if (cmd === 'linkedin') {
      entry = {
        cmd: rawInput,
        title: 'LINKEDIN PROFILE SHOWCASE',
        lines: [
          'URL: https://www.linkedin.com/in/sindid-arafat-1a593233b/',
          'Headline: Product & Business Analyst | Data & Strategy Intern @ CAP | BRAC University CSE',
          'Highlights: Data & Campaign Analytics at CAP Agency, Assistant Director at BUCC, UIHP Innovation Hub Winner, BIZCEPTION Semi-Finalist, HackerRank Certified.',
        ],
        accent: 'cyan',
      };
    } else if (cmd === 'cv' || cmd === 'resume') {
      window.open(portfolioData.personal.cvUrl, '_blank');
      entry = {
        cmd: rawInput,
        title: 'CV DOCUMENT DISPATCHED',
        lines: ['Opening Sindid_Arafat_CV.pdf in a new tab...'],
        accent: 'emerald',
      };
    } else if (cmd === 'overdrive') {
      sound.playUnibeamBlast();
      entry = {
        cmd: rawInput,
        title: '⚡ OVERDRIVE PULSE EXECUTED',
        lines: ['System energy at 300% peak output. All portfolio diagnostics nominal!'],
        accent: 'amber',
      };
    } else if (cmd === 'crixus' || cmd === 'hi' || cmd === 'hello') {
      entry = {
        cmd: rawInput,
        title: 'CRIXUS — PERSONAL ASSISTANT',
        lines: [
          'Hello! I’m Crixus, Sindid Arafat’s Iron-Man personal assistant (also named after Sindid’s CUET Datathon squad, Team Crixus!).',
          'Ask me anything about Sindid’s experience, skills, projects, BIZCEPTION, UIHP, certificates, or how to hire him.',
        ],
        accent: 'cyan',
      };
    } else if (cmd === 'hire' || cmd === 'contact' || cmd.includes('email') || cmd.includes('phone')) {
      entry = {
        cmd: rawInput,
        title: 'DIRECT CONTACT CHANNELS',
        lines: [
          `• Email: ${portfolioData.personal.email} (Form above delivers straight to inbox with subject "Email from Portfolio")`,
          `• Phone / WhatsApp: ${portfolioData.personal.phone}`,
          `• LinkedIn: ${portfolioData.personal.linkedin}`,
          `• GitHub: ${portfolioData.personal.github}`,
        ],
        accent: 'emerald',
      };
    } else if (cmd === 'all' || cmd === 'profile') {
      entry = {
        cmd: rawInput,
        title: 'FULL DOSSIER SNAPSHOT — SINDID ARAFAT',
        lines: [
          'Current Role: Data & Strategy Intern @ CAP (Nov 2026 – Present)',
          'Education: BSc CSE, BRAC University (CGPA 3.69/4.00 | 4x Dean’s/VC List)',
          'Top Honors: UIHP Innovation Hub Inter-Uni Winner (National Qualifier) | BIZCEPTION Semi-Finalist | Duke of Edinburgh Bronze',
          'Core Stack: SQL, Excel, Power BI, Python, Scikit-learn, PyTorch, React, Node.js, PHP, Figma, Jira',
          'Portfolio: 29 GitHub Repos | 7 Verified Certificates | Direct Email: sindidarafat275@gmail.com',
        ],
        accent: 'cyan',
      };
    } else {
      entry = {
        cmd: rawInput,
        title: 'CRIXUS QUERY HINT',
        lines: [
          `I didn't recognize "${rawInput}". Try typing or tapping one of these:`,
          'about | experience | education | skills | projects | bizception | awards | certificates | linkedin | contact | cv | overdrive',
        ],
        accent: 'amber',
      };
    }

    setTerminalHistory(prev => [...prev, entry]);
    setTerminalInput('');
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(terminalInput);
  };

  const quickCommands = [
    'about',
    'experience',
    'education',
    'skills',
    'projects',
    'bizception',
    'awards',
    'certificates',
    'linkedin',
    'contact',
    'cv',
    'overdrive',
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background radial */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-arc/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-arc/30 text-xs font-mono text-arc mb-3">
          <TerminalIcon className="w-3.5 h-3.5 text-arc" />
          <span>TRANSMISSION CHANNEL // DIRECT CONTACT & CRIXUS AI</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
          INITIALIZE DIRECT CONTACT PROTOCOL
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 font-sans">
          Have an engineering venture, product/analyst role, AI research partnership, or collaboration? Send a direct email below or ask <strong>Crixus</strong> at the terminal!
        </p>
      </div>

      {/* Row 1: Direct Info + Email Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Direct Information & Social Cards (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="p-6 rounded-2xl bg-[#090e1c]/90 border border-slate-800 backdrop-blur-md hud-corner-box space-y-5 flex-1 flex flex-col justify-between">
            <div className="space-y-5">
              <h3 className="text-xl font-bold font-display text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-arc" />
                <span>DIRECT CONTACT DOSSIER</span>
              </h3>

              {/* Email item with copy button */}
              <div className="flex items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-arc/40 transition-all">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-arc/10 border border-arc/30 flex items-center justify-center text-arc shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">DIRECT EMAIL</div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-white select-all truncate">
                      {portfolioData.personal.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-arc transition-all shrink-0"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone item */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Phone className="w-5 h-5" />
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
                <div className="w-10 h-10 rounded-lg bg-red-400/10 border border-red-400/30 flex items-center justify-center text-red-400 shrink-0">
                  <MapPin className="w-5 h-5" />
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
        </div>

        {/* Right Column: Encrypted Transmission Form (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0b1021]/90 border border-arc/30 backdrop-blur-md hud-corner-box shadow-[0_0_30px_rgba(0,240,255,0.08)] flex-1 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-800">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
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
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-sans text-white placeholder-slate-600 focus:outline-none focus:border-arc transition-colors disabled:opacity-50"
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
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-sans text-white placeholder-slate-600 focus:outline-none focus:border-arc transition-colors disabled:opacity-50"
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
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-sans text-white placeholder-slate-600 focus:outline-none focus:border-arc transition-colors resize-none disabled:opacity-50"
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

      {/* Row 2: BIGGER, VISUALLY APPEALING CRIXUS INTERACTIVE CLI TERMINAL (AT THE VERY END OF THE WEBSITE) */}
      <div id="crixus-terminal" className="mt-12 rounded-2xl bg-[#040711] border-2 border-arc/50 shadow-[0_0_45px_rgba(0,240,255,0.16)] overflow-hidden hud-corner-box">
        {/* Terminal Header Bar */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-slate-950 via-[#0a1328] to-slate-950 border-b border-arc/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
              <span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </div>
            <div className="h-4 w-px bg-slate-700 hidden sm:block" />
            <div>
              <div className="text-sm sm:text-base font-display font-bold text-white tracking-wider flex items-center gap-2">
                <span className="text-arc">CRIXUS</span>
                <span className="text-slate-400 text-xs font-mono">// INTERACTIVE ASSISTANT CLI</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onOpenCertificates && (
              <button
                type="button"
                onClick={() => {
                  sound.playJarvisChirp();
                  onOpenCertificates();
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/50 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
              >
                <Award className="w-3.5 h-3.5" />
                <span>OPEN CERTIFICATES PAGE</span>
              </button>
            )}
            {onReplayWelcome && (
              <button
                type="button"
                onClick={() => {
                  sound.playJarvisChirp();
                  onReplayWelcome();
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-arc/40 text-arc text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>CRIXUS INTRO</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick-Tap Command Bar */}
        <div className="px-5 py-3 bg-slate-950/90 border-b border-slate-800/90 flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mr-1">
            QUICK QUERIES:
          </span>
          {quickCommands.map(cmd => (
            <button
              key={cmd}
              type="button"
              onClick={() => runCommand(cmd)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-arc/20 border border-slate-700 hover:border-arc text-xs font-mono text-slate-200 hover:text-arc transition-all"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Expanded Scrollable Terminal Output Area */}
        <div
          ref={terminalScrollRef}
          className="h-[340px] sm:h-[400px] overflow-y-auto p-5 sm:p-6 space-y-4 bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.05),transparent_70%)]"
        >
          {terminalHistory.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-slate-950/80 border border-slate-800/90 p-4 space-y-2 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono">
                <span className="text-amber-400 font-bold">crixus@sindid-portfolio:~$</span>
                <span className="text-arc font-semibold break-all">{item.cmd}</span>
              </div>

              {item.title && (
                <div
                  className={`text-xs sm:text-sm font-display font-bold tracking-wide pt-1 ${
                    item.accent === 'amber'
                      ? 'text-amber-400'
                      : item.accent === 'emerald'
                        ? 'text-emerald-400'
                        : 'text-arc'
                  }`}
                >
                  {item.title}
                </div>
              )}

              <div className="pl-3 border-l-2 border-arc/40 space-y-1.5 text-xs sm:text-sm font-sans text-slate-200 leading-relaxed break-words">
                {item.lines.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Command Input Row */}
        <form
          onSubmit={handleCommandSubmit}
          className="px-5 py-4 bg-slate-950 border-t border-arc/30 flex items-center gap-3"
        >
          <span className="text-amber-400 font-mono font-bold text-sm shrink-0">
            crixus &gt;
          </span>
          <input
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            placeholder="Ask Crixus anything or type a command (e.g. about, experience, bizception, certificates, linkedin)..."
            className="w-full bg-transparent text-white focus:outline-none placeholder-slate-500 text-sm font-sans"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-arc hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs tracking-wider transition-all shrink-0"
          >
            RUN
          </button>
        </form>
      </div>
    </section>
  );
};
