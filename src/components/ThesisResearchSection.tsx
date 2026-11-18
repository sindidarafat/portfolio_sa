import React, { useState } from 'react';
import {
  FlaskConical,
  BarChart3,
  Cpu,
  Layers,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  GitBranch,
  Database,
  CheckCircle2,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { sound } from '../utils/audio';

const scarfControls = [
  { dataset: 'BibTeX', cards: '159 labels', kan: 0.8856, bemlp: 0.8710, mlp2x: 0.8552 },
  { dataset: 'Delicious', cards: '983 labels', kan: 0.7672, bemlp: 0.7460, mlp2x: 0.7412 },
  { dataset: 'Mediamill', cards: '101 labels', kan: 0.7520, bemlp: 0.7014, mlp2x: 0.7043 },
  { dataset: 'Enron', cards: '53 labels', kan: 0.6927, bemlp: 0.6590, mlp2x: 0.6436 },
];

const geometryData = [
  {
    dataset: 'BibTeX',
    kanRank: 33.89,
    bemlpRank: 25.52,
    mlpRank: 17.82,
    kanAlign: 0.375,
    mlpAlign: 0.526,
  },
  {
    dataset: 'Enron',
    kanRank: 30.50,
    bemlpRank: 23.32,
    mlpRank: 22.45,
    kanAlign: 0.228,
    mlpAlign: 0.431,
  },
  {
    dataset: 'Delicious',
    kanRank: 27.60,
    bemlpRank: 20.95,
    mlpRank: 18.64,
    kanAlign: 0.351,
    mlpAlign: 0.723,
  },
];

const crossFrameworkData = [
  { dataset: 'BibTeX', subtabKan: 0.8492, subtabMlp: 0.8056, vimeKan: 0.8834, vimeMlp: 0.8876 },
  { dataset: 'Emotions', subtabKan: 0.8265, subtabMlp: 0.8245, vimeKan: 0.8134, vimeMlp: 0.8158 },
  { dataset: 'Delicious', subtabKan: 0.7223, subtabMlp: 0.7063, vimeKan: 0.7686, vimeMlp: 0.7259 },
  { dataset: 'Yeast', subtabKan: 0.6948, subtabMlp: 0.6921, vimeKan: 0.6680, vimeMlp: 0.6844 },
  { dataset: 'Enron', subtabKan: 0.6762, subtabMlp: 0.6604, vimeKan: 0.6933, vimeMlp: 0.6848 },
  { dataset: 'Corel5k', subtabKan: 0.5992, subtabMlp: 0.5942, vimeKan: 0.6689, vimeMlp: 0.6429 },
  { dataset: 'CAL500', subtabKan: 0.5833, subtabMlp: 0.5720, vimeKan: 0.5659, vimeMlp: 0.5727 },
];

const repoModules = [
  { path: 'src/models/kan_layer.py', role: 'Learnable B-spline KAN encoder architecture' },
  { path: 'src/models/bemlp.py', role: 'Fixed spline-basis MLP control (parameter-matched)' },
  { path: 'src/models/encoder.py & head.py', role: 'Unified encoders & swappable projection heads' },
  { path: 'src/augmenters/scarf.py', role: 'SCARF marginal feature corruption pipeline' },
  { path: 'src/losses/nt_xent.py', role: 'NT-Xent contrastive objective (temperature τ = 0.5)' },
  { path: 'src/metrics/linear_probe.py', role: 'Frozen-encoder Macro-AUROC evaluation probe' },
  { path: 'src/utils/param_count.py', role: 'Automated parameter-matching verification vs KAN' },
  { path: 'experiments/run_*.py (10 runners)', role: 'VIME, SubTab, Depth, Headswap, Robustness, Geometry & Protocols' },
];

export const ThesisResearchSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scarf' | 'geometry' | 'frameworks' | 'architecture'>('scarf');
  const [copiedCmd, setCopiedCmd] = useState(false);

  const sampleCmd =
    'python experiments/run_synthetic.py --feature_types continuous --arms kan mlp --seeds 0 --epochs 1';

  const copyCommand = () => {
    navigator.clipboard.writeText(sampleCmd);
    sound.playJarvisChirp();
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <section id="thesis" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-2/3 h-64 bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-arc/40 text-xs font-mono text-arc mb-3">
            <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
            <span>UNDERGRADUATE THESIS // DEEP LEARNING & TABULAR SSL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
            THESIS <span className="text-arc">&harr;</span> RESEARCH LAB
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl font-sans leading-relaxed">
            Exploring how <strong>Kolmogorov-Arnold Networks (KAN)</strong> transform self-supervised representation learning on high-dimensional multi-label tabular data compared to parameter-matched MLPs and spline-basis baselines.
          </p>
        </div>

        <a
          href="https://github.com/sindidarafat/Spark"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playRepulsorShot()}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-extrabold text-xs tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.4)] inline-flex items-center justify-center gap-2.5 transition-all transform hover:scale-105 shrink-0"
        >
          <GithubIcon className="w-5 h-5" />
          <span>OPEN SPARK THESIS REPO</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Main SPARK Research Showcase Container */}
      <div className="rounded-2xl bg-[#090e1d]/95 border border-arc/35 shadow-[0_0_40px_rgba(0,240,255,0.1)] overflow-hidden hud-corner-box">
        {/* Top Paper Overview Strip */}
        <div className="p-6 sm:p-8 border-b border-slate-800 bg-gradient-to-r from-[#0b1329] via-[#090e1d] to-[#0f172a]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40 font-bold">
                  SPARK THESIS REPRODUCTION
                </span>
                <span className="px-2.5 py-0.5 rounded bg-cyan-500/15 text-arc border border-arc/40 font-semibold">
                  PYTORCH • SCIKIT-MULTILEARN • CUDA
                </span>
                <span className="text-slate-400">github.com/sindidarafat/Spark</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white leading-snug">
                Parameter-Matched KAN vs. MLP &amp; BEMLP Encoders for Self-Supervised Multi-Label Tabular Learning
              </h3>

              <p className="text-xs sm:text-sm font-sans text-slate-300 leading-relaxed">
                Evaluates frozen-encoder representations across <strong>SCARF contrastive learning</strong>, <strong>VIME</strong>, and <strong>SubTab</strong> alongside label-cardinality controls, corruption robustness sweeps, projection head-swaps, encoder depth ablations, representation geometry (alignment, uniformity, effective rank), and few-label / kNN protocols.
              </p>
            </div>

            {/* 4 Key Thesis Numbers */}
            <div className="grid grid-cols-2 gap-3 shrink-0 lg:w-72">
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">EXPERIMENTAL RUNS</div>
                <div className="text-xl font-display font-black text-arc">2,600+</div>
                <div className="text-[10px] font-sans text-slate-400">Versioned CSV outputs</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">SUBTAB WINS</div>
                <div className="text-xl font-display font-black text-amber-400">7 / 7</div>
                <div className="text-[10px] font-sans text-slate-400">KAN beats MLP on all</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">BENCHMARKS</div>
                <div className="text-xl font-display font-black text-white">12 Suites</div>
                <div className="text-[10px] font-sans text-slate-400">10+ multi-label datasets</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">BIBTEX RANK</div>
                <div className="text-xl font-display font-black text-emerald-400">1.90x</div>
                <div className="text-[10px] font-sans text-slate-400">Higher Eff. Rank vs MLP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Tab Selector */}
        <div className="px-4 sm:px-8 pt-4 bg-slate-950/70 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'scarf', label: 'SCARF Controls (AUROC)', icon: BarChart3 },
            { id: 'geometry', label: 'Representation Geometry', icon: Sparkles },
            { id: 'frameworks', label: 'SubTab & VIME (7 Datasets)', icon: Database },
            { id: 'architecture', label: 'Codebase & Reproducibility', icon: Cpu },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab);
                  sound.playJarvisChirp();
                }}
                className={`px-4 py-2.5 text-xs font-mono font-bold rounded-t-xl border-t border-x flex items-center gap-2 whitespace-nowrap transition-all ${
                  active
                    ? 'bg-[#090e1d] border-arc/50 text-arc -mb-px'
                    : 'bg-transparent border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Tab Content */}
        <div className="p-6 sm:p-8">
          {/* TAB 1: SCARF Parameter-Matched Controls */}
          {activeTab === 'scarf' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-display font-bold text-white">
                    SCARF Contrastive Learning — Mean Test Macro-AUROC (Frozen Linear Probe)
                  </h4>
                  <p className="text-xs sm:text-sm font-sans text-slate-400 mt-1">
                    Verified results from <code className="text-arc font-mono">results/controls.csv</code> (160 runs). Parameter-matched <strong>KAN</strong> consistently outperforms both fixed spline-basis <strong>BEMLP</strong> and 2x-parameter <strong>MLP-2x</strong>.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-arc font-bold">
                    <span className="w-3 h-3 rounded bg-arc" /> KAN
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <span className="w-3 h-3 rounded bg-amber-400" /> BEMLP
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-3 h-3 rounded bg-slate-500" /> MLP-2x
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {scarfControls.map((row) => {
                  const gain = ((row.kan - row.mlp2x) * 100).toFixed(2);
                  return (
                    <div
                      key={row.dataset}
                      className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-base font-display font-bold text-white">{row.dataset}</span>
                          <span className="ml-2 text-[11px] font-mono text-slate-400">({row.cards})</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-[11px] font-mono font-bold">
                          +{gain}% vs MLP-2x
                        </span>
                      </div>

                      {/* KAN Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-arc font-bold">KAN Encoder</span>
                          <span className="text-white font-bold">{row.kan.toFixed(4)}</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-arc shadow-[0_0_10px_#00f0ff]"
                            style={{ width: `${row.kan * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* BEMLP Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-amber-300">BEMLP (Fixed Spline)</span>
                          <span className="text-slate-300">{row.bemlp.toFixed(4)}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-amber-400/80"
                            style={{ width: `${row.bemlp * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* MLP-2x Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-400">MLP-2x (2x Params)</span>
                          <span className="text-slate-400">{row.mlp2x.toFixed(4)}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-slate-500"
                            style={{ width: `${row.mlp2x * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: Representation Geometry */}
          {activeTab === 'geometry' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-display font-bold text-white">
                  Mechanistic Geometry Analysis — Why KAN Learns Better Tabular Embeddings
                </h4>
                <p className="text-xs sm:text-sm font-sans text-slate-400 mt-1">
                  From <code className="text-arc font-mono">results/geometry.csv</code> (90 runs): KAN encoders resist dimensional collapse, achieving substantially <strong>higher Effective Rank</strong> and <strong>lower (tighter) Positive-Pair Alignment</strong> across all tested datasets.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {geometryData.map((g) => (
                  <div
                    key={g.dataset}
                    className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-arc/40 transition-all space-y-4"
                  >
                    <div className="text-lg font-display font-bold text-white border-b border-slate-800 pb-2">
                      {g.dataset}
                    </div>

                    {/* Effective Rank */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">
                        Effective Rank (Higher = Richer)
                      </div>
                      <div className="flex items-baseline justify-between font-mono">
                        <span className="text-arc font-bold text-sm">KAN</span>
                        <span className="text-2xl font-display font-black text-arc">{g.kanRank.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono text-amber-300">
                        <span>BEMLP</span>
                        <span>{g.bemlpRank.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>MLP</span>
                        <span>{g.mlpRank.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Alignment */}
                    <div className="pt-3 border-t border-slate-800/80 space-y-1">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">
                        Alignment (Lower = Tighter)
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-emerald-400 font-bold">KAN Alignment</span>
                        <span className="text-emerald-300 font-bold">{g.kanAlign.toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono text-slate-400">
                        <span>MLP Alignment</span>
                        <span>{g.mlpAlign.toFixed(3)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SubTab & VIME Cross-Framework */}
          {activeTab === 'frameworks' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-lg font-display font-bold text-white">
                  Cross-Framework Generalization — SubTab &amp; VIME (7 Multi-Label Datasets)
                </h4>
                <p className="text-xs sm:text-sm font-sans text-slate-400 mt-1">
                  Verified mean Macro-AUROC from <code className="text-arc font-mono">results/subtab.csv</code> (140 runs) &amp; <code className="text-arc font-mono">results/vime.csv</code> (140 runs). KAN wins <strong>7 out of 7</strong> SubTab benchmarks and outperforms MLP on large multi-label VIME tasks (Delicious +4.27%, Corel5k +2.60%).
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800 font-mono text-[11px] text-slate-400 uppercase">
                      <th className="py-3 px-4">Dataset</th>
                      <th className="py-3 px-4 text-arc">SubTab (KAN)</th>
                      <th className="py-3 px-4">SubTab (MLP)</th>
                      <th className="py-3 px-4 text-amber-400">VIME (KAN)</th>
                      <th className="py-3 px-4">VIME (MLP)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70 font-mono">
                    {crossFrameworkData.map((row) => (
                      <tr key={row.dataset} className="hover:bg-slate-900/50 transition-colors">
                        <td className="py-2.5 px-4 font-bold text-white">{row.dataset}</td>
                        <td className="py-2.5 px-4 text-arc font-bold">
                          {row.subtabKan.toFixed(4)}
                          {row.subtabKan > row.subtabMlp && (
                            <span className="ml-1.5 text-[10px] text-emerald-400">★</span>
                          )}
                        </td>
                        <td className="py-2.5 px-4 text-slate-400">{row.subtabMlp.toFixed(4)}</td>
                        <td
                          className={`py-2.5 px-4 ${
                            row.vimeKan >= row.vimeMlp ? 'text-amber-300 font-bold' : 'text-slate-300'
                          }`}
                        >
                          {row.vimeKan.toFixed(4)}
                          {row.vimeKan > row.vimeMlp && (
                            <span className="ml-1.5 text-[10px] text-emerald-400">★</span>
                          )}
                        </td>
                        <td className="py-2.5 px-4 text-slate-400">{row.vimeMlp.toFixed(4)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: Codebase & Reproducibility */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Modules Grid */}
                <div className="lg:col-span-7 space-y-3">
                  <h4 className="text-base font-display font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-arc" />
                    <span>MODULAR RESEARCH REPOSITORY LAYOUT</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {repoModules.map((mod) => (
                      <div
                        key={mod.path}
                        className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1"
                      >
                        <div className="text-xs font-mono font-bold text-arc flex items-center gap-1.5">
                          <GitBranch className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{mod.path}</span>
                        </div>
                        <div className="text-xs font-sans text-slate-400 leading-snug">
                          {mod.role}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reproducibility Standards */}
                <div className="lg:col-span-5 space-y-4">
                  <h4 className="text-base font-display font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>REPRODUCIBILITY PROTOCOL</span>
                  </h4>
                  <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2.5 text-xs font-sans text-slate-300">
                    <div>&bull; <strong>Fixed Data Split:</strong> 60 / 20 / 20 train-val-test split with fixed seed <code className="text-arc font-mono">42</code>.</div>
                    <div>&bull; <strong>Leakage-Free Scaling:</strong> Scaler statistics fit strictly on training split only.</div>
                    <div>&bull; <strong>Optimization:</strong> Batch size <code className="text-arc font-mono">256</code>, LR <code className="text-arc font-mono">1e-3</code>, Weight Decay <code className="text-arc font-mono">1e-4</code>, NT-Xent <code className="text-arc font-mono">τ=0.5</code>.</div>
                    <div>&bull; <strong>Fair Capacity Matching:</strong> Automated parameter-count check against KAN reference.</div>
                    <div>&bull; <strong>Resume-Safe Runners:</strong> All 10 experiment scripts append CSV rows incrementally and skip completed configs.</div>
                  </div>

                  {/* Copyable Quick-Start Command */}
                  <div className="p-3.5 rounded-xl bg-black border border-arc/35 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>QUICK SYNTHETIC ENVIRONMENT CHECK</span>
                      <button
                        type="button"
                        onClick={copyCommand}
                        className="text-arc hover:text-white flex items-center gap-1 font-bold"
                      >
                        {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCmd ? 'COPIED' : 'COPY'}</span>
                      </button>
                    </div>
                    <pre className="text-[11px] font-mono text-cyan-200 overflow-x-auto whitespace-pre-wrap break-all">
                      {sampleCmd}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
