import React, { useState, useEffect } from 'react';
import { Search, Github, Sun, Moon, Menu, X } from 'lucide-react';
import { SakuraIcon } from './SakuraIcon';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSearch: () => void;
  onOpenAbout: () => void;
  onOpenDocs: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenSearch,
  onOpenAbout,
  onOpenDocs,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'docs') {
      onOpenDocs();
    } else if (id === 'about') {
      onOpenAbout();
    } else {
      onNavigate(id);
    }
  };

  return (
    <nav
      className={`navbar-sticky ${isScrolled ? 'scrolled-shadow' : ''}`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="container navbar-inner">
        {/* Brand */}
        <a
          href="#home"
          className="nav-brand"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          aria-label="Waguri Framework Home"
        >
          <span className="brand-flower">
            <SakuraIcon size={26} fill="#F45B93" />
          </span>
          <span>
            Waguri
            <span className="brand-text-framework">Framework</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="nav-links-desktop">
          <a
            href="#home"
            className={`nav-item-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
          >
            Home
          </a>
          <button
            type="button"
            className={`nav-item-link ${activeSection === 'docs' ? 'active' : ''}`}
            onClick={() => handleLinkClick('docs')}
          >
            Documentation
          </button>
          <a
            href="#features"
            className={`nav-item-link ${activeSection === 'features' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('features');
            }}
          >
            Features
          </a>
          <a
            href="#playground"
            className={`nav-item-link ${activeSection === 'playground' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('playground');
            }}
          >
            Playground
          </a>
          <button
            type="button"
            className={`nav-item-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => handleLinkClick('about')}
          >
            About
          </button>
        </div>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Quick Search Trigger */}
          <button
            type="button"
            className="nav-search-btn"
            onClick={onOpenSearch}
            title="Search documentation (Ctrl+K)"
            aria-label="Search documentation"
          >
            <Search size={14} />
            <span>Search docs...</span>
            <span className="search-shortcut">Ctrl K</span>
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/RaihanFradita/waguri-framework"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-icon-btn"
            title="View on GitHub"
            aria-label="GitHub Repository"
          >
            <Github size={18} />
          </a>

          {/* Theme Toggle */}
          <button
            type="button"
            className="nav-icon-btn"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="nav-mobile-drawer">
          <a
            href="#home"
            className={`nav-item-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
          >
            Home
          </a>
          <button
            type="button"
            className="nav-item-link"
            style={{ textAlign: 'left' }}
            onClick={() => handleLinkClick('docs')}
          >
            Documentation
          </button>
          <a
            href="#features"
            className="nav-item-link"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('features');
            }}
          >
            Features
          </a>
          <a
            href="#playground"
            className="nav-item-link"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('playground');
            }}
          >
            Playground
          </a>
          <button
            type="button"
            className="nav-item-link"
            style={{ textAlign: 'left' }}
            onClick={() => handleLinkClick('about')}
          >
            About
          </button>
        </div>
      )}
    </nav>
  );
};

