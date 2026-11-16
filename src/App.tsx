import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { ArcGridGame } from './components/ArcGridGame';
import { FeaturedProjects } from './components/FeaturedProjects';
import { GithubReposExplorer } from './components/GithubReposExplorer';
import { ExperienceAndHonors } from './components/ExperienceAndHonors';
import { ContactTerminal } from './components/ContactTerminal';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col font-sans selection:bg-arc selection:text-black">
      {/* Sci-fi Scanline Overlay */}
      <div className="fixed inset-0 scanlines pointer-events-none z-40 opacity-30" />

      {/* Navigation HUD */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1 space-y-12">
        <Hero />
        <SkillsSection />
        <ArcGridGame />
        <FeaturedProjects />
        <GithubReposExplorer />
        <ExperienceAndHonors />
        <ContactTerminal />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
