import React, { useState } from 'react';
import { Search, ExternalLink, GitBranch, Star, Code, Terminal } from 'lucide-react';
import { GithubIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const GithubReposExplorer: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  const repos = portfolioData.allGithubRepos;

  const languages = ['All', 'TypeScript', 'Python', 'Jupyter Notebook', 'PHP', 'C++', 'C', 'JavaScript', 'Assembly'];

  const filteredRepos = repos.filter(repo => {
    const matchesSearch = 
      repo.name.toLowerCase().includes(search.toLowerCase()) ||
      repo.description.toLowerCase().includes(search.toLowerCase()) ||
      repo.category.toLowerCase().includes(search.toLowerCase());

    const matchesLanguage = 
      selectedLanguage === 'All' || 
      (selectedLanguage === 'Python' && (repo.language === 'Python' || repo.language.includes('Jupyter'))) ||
      repo.language.toLowerCase().includes(selectedLanguage.toLowerCase());

    return matchesSearch && matchesLanguage;
  });

  return (
    <section id="repos" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* HUD Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-arc/30 text-xs font-mono text-arc mb-3">
            <GitBranch className="w-3.5 h-3.5 text-arc" />
            <span>STARK REPO REGISTRY // 29 PUBLIC REPOSITORIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
            COMPLETE GITHUB CODE REPOSITORY
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            Every repository, research notebook, and system architecture authored on <a href="https://github.com/sindidarafat" target="_blank" rel="noopener noreferrer" className="text-arc underline">github.com/sindidarafat</a>.
          </p>
        </div>

        {/* Total stats pill */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            TOTAL REPOSITORIES: <strong className="text-white text-sm">29</strong>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
            PUBLIC STATUS: <strong className="text-emerald-400 text-sm">ACTIVE</strong>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-xl bg-[#090d19]/90 border border-slate-800 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search all 29 repositories..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-arc transition-colors"
          />
        </div>

        {/* Language Filter Chips */}
        <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
          {languages.map(lang => (
            <button
              key={lang}
              onClick={() => {
                setSelectedLanguage(lang);
                sound.playJarvisChirp();
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all border ${
                selectedLanguage === lang
                  ? 'bg-arc/20 text-arc border-arc font-bold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Repos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRepos.map((repo, i) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playJarvisChirp()}
            className="group p-5 rounded-xl bg-[#0b1021]/80 border border-slate-800 hover:border-arc/50 transition-all duration-200 flex flex-col justify-between hover:bg-[#0e162d]/90 shadow-sm hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] relative overflow-hidden"
          >
            {/* Top row */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-arc shrink-0" />
                  <h4 className="font-mono text-sm font-bold text-white group-hover:text-arc transition-colors truncate max-w-[200px]">
                    {repo.name}
                  </h4>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-arc transition-colors shrink-0" />
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-2 mb-4">
                {repo.description || "Experimental engineering codebase and algorithmic trial."}
              </p>
            </div>

            {/* Bottom metadata */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-arc" />
                <span>{repo.language}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700/60 text-amber-400">
                  {repo.category}
                </span>
                {repo.stars > 0 && (
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{repo.stars}</span>
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>

      {filteredRepos.length === 0 && (
        <div className="text-center py-16 bg-slate-950/60 border border-slate-800 rounded-xl font-mono text-xs text-slate-400">
          No repositories match query "{search}". Try searching for "KAN", "SkillSwap", or "Electrician".
        </div>
      )}
    </section>
  );
};
