import React, { useState } from 'react';
import {
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
    <section id="thesis" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto section-divider">
      {/* Clean Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 font-semibold mb-2">
            Undergraduate Thesis · Deep Learning &amp; Tabular SSL
          </div>
          <h2 className="text-3xl sm:text-4xl font-display text-white tracking-normal">
            Thesis <span className="text-cyan-400">&harr;</span> Research Lab
          </h2>
          <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400 mt-3 mb-3" />
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans leading-relaxed">
            Investigating how <strong>Kolmogorov-Arnold Networks (KAN)</strong> improve self-supervised representation learning on multi-label tabular data compared to parameter-matched MLPs and spline-basis baselines.
          </p>
        </div>

        <a
          href="https://github.com/sindidarafat/Spark"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playRepulsorShot()}
          className="px-5 py-2.5 rounded-xl bg-white hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors shrink-0"
        >
          <GithubIcon className="w-4 h-4" />
          <span>Open SPARK Repo</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Research Card */}
      <div className="rounded-2xl clean-surface overflow-hidden">
        {/* Top Paper Summary & 4 Clean Metrics */}
        <div className="p-6 sm:p-8 border-b border-white/[0.08]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-400/30 font-semibold">
                  SPARK Thesis Reproduction
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-white/[0.05] text-slate-300 border border-white/10">
                  PyTorch · Scikit-Multilearn · CUDA
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-snug">
                Parameter-Matched KAN vs. MLP &amp; BEMLP Encoders for Self-Supervised Multi-Label Tabular Learning
              </h3>

              <p className="text-sm font-sans text-slate-300 leading-relaxed">
                Evaluates frozen-encoder representations across <strong>SCARF contrastive learning</strong>, <strong>VIME</strong>, and <strong>SubTab</strong> alongside label-cardinality controls, robustness sweeps, projection head-swaps, encoder depth ablations, and representation geometry.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 shrink-0 lg:w-72">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                <div className="text-[11px] font-mono text-slate-400">Experimental Runs</div>
                <div className="text-xl font-display font-bold text-cyan-300 mt-0.5">2,600+</div>
                <div className="text-[11px] font-sans text-slate-400">Versioned CSV outputs</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                <div className="text-[11px] font-mono text-slate-400">SubTab Wins</div>
                <div className="text-xl font-display font-bold text-amber-300 mt-0.5">7 / 7</div>
                <div className="text-[11px] font-sans text-slate-400">KAN beats MLP on all</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                <div className="text-[11px] font-mono text-slate-400">Benchmarks</div>
                <div className="text-xl font-display font-bold text-white mt-0.5">12 Suites</div>
                <div className="text-[11px] font-sans text-slate-400">10+ multi-label datasets</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                <div className="text-[11px] font-mono text-slate-400">BibTeX Rank</div>
                <div className="text-xl font-display font-bold text-emerald-400 mt-0.5">1.90x</div>
                <div className="text-[11px] font-sans text-slate-400">Higher Eff. Rank vs MLP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Tab Bar */}
        <div className="px-3 sm:px-8 py-2.5 md:py-0 bg-white/[0.02] border-b border-white/[0.08] grid grid-cols-2 md:flex md:flex-wrap items-stretch md:items-center gap-1.5 md:gap-1">
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
                className={`px-3 sm:px-4 py-2.5 md:py-3.5 text-left text-[11px] sm:text-xs md:text-sm font-mono font-medium rounded-lg md:rounded-none md:border-b-2 flex items-center gap-2 transition-colors ${
                  active
                    ? 'bg-white/[0.06] md:bg-transparent md:border-cyan-400 text-white font-semibold border border-cyan-400/40 md:border-t-0 md:border-x-0'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent md:border-b-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="leading-snug">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {activeTab === 'scarf' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">
                    SCARF Contrastive Learning — Mean Test Macro-AUROC
                  </h4>
                  <p className="text-xs sm:text-sm font-sans text-slate-400 mt-1">
                    Verified from <code className="text-cyan-300 font-mono">results/controls.csv</code> (160 runs). Parameter-matched <strong>KAN</strong> consistently beats fixed spline <strong>BEMLP</strong> and 2x-parameter <strong>MLP-2x</strong>.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> KAN
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> BEMLP
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> MLP-2x
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {scarfControls.map((row) => {
                  const gain = ((row.kan - row.mlp2x) * 100).toFixed(2);
                  return (
                    <div
                      key={row.dataset}
                      className="p-5 rounded-xl bg-white/[0.025] border border-white/[0.07] space-y-3.5"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-base font-display font-bold text-white">{row.dataset}</span>
                          <span className="ml-2 text-xs font-mono text-slate-400">({row.cards})</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 text-xs font-mono font-semibold">
                          +{gain}% vs MLP-2x
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-cyan-300 font-semibold">KAN Encoder</span>
                          <span className="text-white font-bold">{row.kan.toFixed(4)}</span>
                        </div>
                        <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-cyan-400"
                            style={{ width: `${row.kan * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-amber-300">BEMLP (Fixed Spline)</span>
                          <span className="text-slate-300">{row.bemlp.toFixed(4)}</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-amber-400/80"
                            style={{ width: `${row.bemlp * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-400">MLP-2x (2x Params)</span>
                          <span className="text-slate-400">{row.mlp2x.toFixed(4)}</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
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

          {activeTab === 'geometry' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base sm:text-lg font-display font-bold text-white">
                  Mechanistic Geometry — Why KAN Learns Richer Tabular Embeddings
                </h4>
                <p className="text-xs sm:text-sm font-sans text-slate-400 mt-1">
                  From <code className="text-cyan-300 font-mono">results/geometry.csv</code> (90 runs): KAN encoders resist dimensional collapse, achieving substantially <strong>higher Effective Rank</strong> and <strong>tighter Positive-Pair Alignment</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {geometryData.map((g) => (
                  <div
                    key={g.dataset}
                    className="p-5 rounded-xl bg-white/[0.025] border border-white/[0.07] space-y-4"
                  >
                    <div className="text-lg font-display font-bold text-white border-b border-white/[0.08] pb-2">
                      {g.dataset}
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">
                        Effective Rank (Higher = Richer)
                      </div>
                      <div className="flex items-baseline justify-between font-mono">
                        <span className="text-cyan-300 font-semibold text-sm">KAN</span>
                        <span className="text-2xl font-display font-bold text-cyan-300">{g.kanRank.toFixed(2)}</span>
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

                    <div className="pt-3 border-t border-white/[0.08] space-y-1">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">
                        Alignment (Lower = Tighter)
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-emerald-400 font-semibold">KAN Alignment</span>
                        <span className="text-emerald-300 font-semibold">{g.kanAlign.toFixed(3)}</span>
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

          {activeTab === 'frameworks' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-base sm:text-lg font-display font-bold text-white">
                  Cross-Framework Generalization — SubTab &amp; VIME (7 Datasets)
                </h4>
                <p className="text-xs sm:text-sm font-sans text-slate-400 mt-1">
                  Verified mean Macro-AUROC from <code className="text-cyan-300 font-mono">results/subtab.csv</code> &amp; <code className="text-cyan-300 font-mono">results/vime.csv</code>. KAN wins <strong>7 / 7</strong> SubTab benchmarks and excels on large multi-label VIME datasets.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
                <table className="w-full text-left border-collapse text-xs sm:text-sm whitespace-nowrap">
                  <thead>
                    <tr className="bg-white/[0.03] border-b border-white/[0.08] font-mono text-xs text-slate-400">
                      <th className="py-3 px-4">Dataset</th>
                      <th className="py-3 px-4 text-cyan-300">SubTab (KAN)</th>
                      <th className="py-3 px-4">SubTab (MLP)</th>
                      <th className="py-3 px-4 text-amber-300">VIME (KAN)</th>
                      <th className="py-3 px-4">VIME (MLP)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06] font-mono">
                    {crossFrameworkData.map((row) => (
                      <tr key={row.dataset} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-2.5 px-4 font-semibold text-white">{row.dataset}</td>
                        <td className="py-2.5 px-4 text-cyan-300 font-semibold">
                          {row.subtabKan.toFixed(4)}
                          {row.subtabKan > row.subtabMlp && (
                            <span className="ml-1.5 text-[10px] text-emerald-400">★</span>
                          )}
                        </td>
                        <td className="py-2.5 px-4 text-slate-400">{row.subtabMlp.toFixed(4)}</td>
                        <td
                          className={`py-2.5 px-4 ${
                            row.vimeKan >= row.vimeMlp ? 'text-amber-300 font-semibold' : 'text-slate-300'
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

          {activeTab === 'architecture' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-3">
                <h4 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Modular Repository Architecture</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {repoModules.map((mod) => (
                    <div
                      key={mod.path}
                      className="p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.07] space-y-1"
                    >
                      <div className="text-xs font-mono font-semibold text-cyan-300 flex items-center gap-1.5">
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

              <div className="lg:col-span-5 space-y-4">
                <h4 className="text-base font-display font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Reproducibility Protocol</span>
                </h4>
                <div className="p-4 rounded-xl bg-white/[0.025] border border-white/[0.07] space-y-2.5 text-xs sm:text-sm font-sans text-slate-300">
                  <div>&bull; <strong>Fixed Data Split:</strong> 60 / 20 / 20 train-val-test split (seed <code className="text-cyan-300 font-mono">42</code>).</div>
                  <div>&bull; <strong>Leakage-Free Scaling:</strong> Scaler fit strictly on training split only.</div>
                  <div>&bull; <strong>Optimization:</strong> Batch <code className="text-cyan-300 font-mono">256</code>, LR <code className="text-cyan-300 font-mono">1e-3</code>, Weight Decay <code className="text-cyan-300 font-mono">1e-4</code>, NT-Xent <code className="text-cyan-300 font-mono">τ=0.5</code>.</div>
                  <div>&bull; <strong>Capacity Matching:</strong> Automated parameter-count check vs KAN reference.</div>
                  <div>&bull; <strong>Resume-Safe Runners:</strong> 10 scripts append CSV rows incrementally.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Quick Environment Check</span>
                    <button
                      type="button"
                      onClick={copyCommand}
                      className="text-cyan-300 hover:text-white flex items-center gap-1 font-semibold"
                    >
                      {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap break-all">
                    {sampleCmd}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
