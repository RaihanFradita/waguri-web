import React from 'react';
import { Github } from 'lucide-react';
import { SakuraIcon } from './SakuraIcon';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenDocs: () => void;
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDocs, onOpenAbout }) => {
  return (
    <footer className="footer-wrapper" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SakuraIcon size={24} fill="#F45B93" />
              <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Waguri<span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Framework</span>
              </span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: '1.6' }}>
              An experimental Python framework designed to improve AI response reliability through evidence-aware validation and structured verification.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer-links-group">
            <a
              href="#home"
              className="footer-link-item"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
            >
              Home
            </a>
            <button
              type="button"
              className="footer-link-item"
              onClick={onOpenDocs}
            >
              Documentation
            </button>
            <a
              href="#features"
              className="footer-link-item"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('features');
              }}
            >
              Features
            </a>
            <a
              href="#playground"
              className="footer-link-item"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('playground');
              }}
            >
              Playground
            </a>
            <button
              type="button"
              className="footer-link-item"
              onClick={onOpenAbout}
            >
              About
            </button>
            <a
              href="https://github.com/RaihanFradita/waguri-framework"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link-item"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Github size={15} />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            &copy; {new Date().getFullYear()} Waguri Framework. Created by Raihan Fradita. Built for reliable AI.
          </div>

          <div className="footer-badges">
            <span className="badge-pill badge-pink" style={{ fontSize: '11px', padding: '3px 8px' }}>
              v0.1.0
            </span>
            <span className="badge-pill badge-lavender" style={{ fontSize: '11px', padding: '3px 8px' }}>
              Apache-2.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
