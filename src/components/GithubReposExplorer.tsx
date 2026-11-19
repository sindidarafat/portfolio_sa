import React, { useState } from 'react';
import { Search, ExternalLink, Star, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';

export const GithubReposExplorer: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [showAll, setShowAll] = useState(false);

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

  const isFiltered = search.trim() !== '' || selectedLanguage !== 'All';
  const displayedRepos = isFiltered || showAll ? filteredRepos : filteredRepos.slice(0, 9);

  return (
    <section id="repos" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto section-divider">
      {/* Clean Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 font-semibold mb-2">
            Open Source · {repos.length} Repositories
          </div>
          <h2 className="text-3xl sm:text-4xl font-display text-white tracking-normal">
            GitHub Code Archive
          </h2>
          <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400 mt-3 mb-3" />
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans leading-relaxed">
            Every repository, research notebook, and codebase authored on{' '}
            <a
              href="https://github.com/sindidarafat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:underline"
            >
              github.com/sindidarafat
            </a>
            .
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300">
            Total Public Repos: <strong className="text-white">{repos.length}</strong>
          </div>
        </div>
      </div>

      {/* Search & Language Filter Toolbar */}
      <div className="p-4 rounded-2xl clean-surface mb-6 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search all ${repos.length} repositories...`}
            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs sm:text-sm font-sans text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap w-full lg:w-auto">
          {languages.map(lang => (
            <button
              key={lang}
              onClick={() => {
                setSelectedLanguage(lang);
                sound.playJarvisChirp();
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all border ${
                selectedLanguage === lang
                  ? 'bg-white text-slate-950 border-white font-bold'
                  : 'bg-white/[0.03] text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Clean 3-Column Repos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedRepos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playJarvisChirp()}
            className="group p-5 rounded-2xl clean-surface clean-surface-hover transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                  <h4 className="font-mono text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                    {repo.name}
                  </h4>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-300 transition-colors shrink-0 mt-0.5" />
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans line-clamp-2 mb-4">
                {repo.description || 'Experimental engineering codebase and algorithmic trial.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/[0.07] text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>{repo.language}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.07] text-amber-300">
                  {repo.category}
                </span>
                {repo.stars > 0 && (
                  <span className="flex items-center gap-1 text-amber-300">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{repo.stars}</span>
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Expand / Collapse All 30 Button */}
      {!isFiltered && filteredRepos.length > 9 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => {
              sound.playJarvisChirp();
              setShowAll(!showAll);
            }}
            className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-cyan-400/50 text-white font-mono text-xs font-semibold inline-flex items-center gap-2 transition-all"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4 text-cyan-400" />
                <span>Show Fewer Repositories</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 text-cyan-400" />
                <span>Show All {filteredRepos.length} Repositories</span>
              </>
            )}
          </button>
        </div>
      )}

      {filteredRepos.length === 0 && (
        <div className="text-center py-14 rounded-2xl clean-surface font-mono text-xs text-slate-400">
          No repositories match query &ldquo;{search}&rdquo;. Try searching for &ldquo;Spark&rdquo;, &ldquo;KAN&rdquo;, &ldquo;SkillSwap&rdquo;, or &ldquo;Electrician&rdquo;.
        </div>
      )}
    </section>
  );
};
