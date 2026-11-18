import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { ThesisResearchSection } from './components/ThesisResearchSection';
import { ArcGridGame } from './components/ArcGridGame';
import { FeaturedProjects } from './components/FeaturedProjects';
import { GithubReposExplorer } from './components/GithubReposExplorer';
import { ExperienceAndHonors } from './components/ExperienceAndHonors';
import { ContactTerminal } from './components/ContactTerminal';
import { CertificatesPage } from './components/CertificatesPage';
import { CrixusWelcomeModal } from './components/CrixusWelcomeModal';
import { Footer } from './components/Footer';

export function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'certificates'>(() => {
    if (typeof window !== 'undefined' && window.location.pathname.includes('certificates')) {
      return 'certificates';
    }
    return 'home';
  });

  const [welcomeOpen, setWelcomeOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !sessionStorage.getItem('crixus_welcomed_session');
  });

  // Sync browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.includes('certificates')) {
        setCurrentPage('certificates');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = useCallback((page: 'home' | 'certificates', anchor?: string) => {
    setCurrentPage(page);

    if (page === 'certificates') {
      if (!window.location.pathname.includes('certificates')) {
        window.history.pushState({ page: 'certificates' }, '', '/certificates');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (window.location.pathname !== '/') {
        window.history.pushState({ page: 'home' }, '', '/' + (anchor || ''));
      }
      if (anchor) {
        setTimeout(() => {
          const el = document.querySelector(anchor);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  const dismissWelcome = () => {
    sessionStorage.setItem('crixus_welcomed_session', 'true');
    setWelcomeOpen(false);
  };

  const handleJumpToCrixus = () => {
    sessionStorage.setItem('crixus_welcomed_session', 'true');
    setWelcomeOpen(false);
    navigateTo('home', '#crixus-terminal');
  };

  return (
    <>
      {/* Compact Bottom-Left Flying Iron-Man Crixus Assistant (outside overflow-x-hidden so full flight path is never clipped!) */}
      <CrixusWelcomeModal
        isOpen={welcomeOpen}
        onClose={dismissWelcome}
        onJumpToCrixus={handleJumpToCrixus}
        onReopen={() => setWelcomeOpen(true)}
      />

      <div className="relative min-h-screen text-slate-100 flex flex-col font-sans selection:bg-arc selection:text-black overflow-x-hidden">
        {/* Sci-fi Scanline Overlay */}
        <div className="fixed inset-0 scanlines pointer-events-none z-40 opacity-30" />

        {/* Navigation HUD */}
        <Navbar currentPage={currentPage} onNavigate={navigateTo} />

        {/* Main Content Switcher */}
        {currentPage === 'certificates' ? (
          <main className="flex-1">
            <CertificatesPage onBack={() => navigateTo('home', '#experience')} />
          </main>
        ) : (
          <main className="flex-1 space-y-8 sm:space-y-12">
            <Hero />
            <SkillsSection />
            <ThesisResearchSection />
            <ArcGridGame />
            <FeaturedProjects />
            <GithubReposExplorer />
            <ExperienceAndHonors onOpenCertificates={() => navigateTo('certificates')} />
            <ContactTerminal
              onOpenCertificates={() => navigateTo('certificates')}
              onReplayWelcome={() => setWelcomeOpen(true)}
            />
          </main>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
