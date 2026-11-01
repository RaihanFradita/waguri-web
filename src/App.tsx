import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureCards } from './components/FeatureCards';
import { Workflow } from './components/Workflow';
import { CodeExample } from './components/CodeExample';
import { DocumentationPreview } from './components/DocumentationPreview';
import { CallToAction } from './components/CallToAction';
import { Playground } from './components/Playground';
import { Footer } from './components/Footer';
import { DocumentationModal } from './components/DocumentationModal';
import { SearchModal } from './components/SearchModal';
import { AboutModal } from './components/AboutModal';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('waguri-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [activeSection, setActiveSection] = useState<string>('home');
  const [isDocsOpen, setIsDocsOpen] = useState<boolean>(false);
  const [initialDocTopic, setInitialDocTopic] = useState<string>('getting-started');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('waguri-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'workflow', 'code-example', 'playground'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDocsWithTopic = (topicId?: string) => {
    if (topicId) {
      setInitialDocTopic(topicId);
    }
    setIsDocsOpen(true);
  };

  return (
    <div className="app-root">
      {/* Top Sticky Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenDocs={() => handleOpenDocsWithTopic('getting-started')}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onGetStarted={() => scrollToSection('code-example')}
          onReadDocs={() => handleOpenDocsWithTopic('getting-started')}
        />

        {/* Key Features Section */}
        <FeatureCards
          onExploreFeatures={() => scrollToSection('features')}
          onSelectFeature={(featureId) => {
            if (featureId === 'validation' || featureId === 'evidence') {
              handleOpenDocsWithTopic('validation');
            } else if (featureId === 'adapters') {
              handleOpenDocsWithTopic('adapters');
            } else if (featureId === 'optimization') {
              handleOpenDocsWithTopic('optimization');
            } else {
              handleOpenDocsWithTopic('getting-started');
            }
          }}
        />

        {/* How It Works (Validation Pipeline) */}
        <Workflow onLearnMore={() => handleOpenDocsWithTopic('core-concepts')} />

        {/* Code Example, Documentation Preview & CTA Grid */}
        <section id="code-example" className="section-wrapper">
          <div className="container">
            <div className="tri-section-grid">
              <CodeExample />
              <DocumentationPreview onOpenDocs={handleOpenDocsWithTopic} />
              <CallToAction onGetStarted={() => scrollToSection('code-example')} />
            </div>
          </div>
        </section>

        {/* Interactive Playground Simulator */}
        <Playground />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenDocs={() => handleOpenDocsWithTopic('getting-started')}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Modals */}
      <DocumentationModal
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
        initialTopic={initialDocTopic}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDoc={(topic) => handleOpenDocsWithTopic(topic)}
        onNavigateSection={scrollToSection}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
};

export default App;
