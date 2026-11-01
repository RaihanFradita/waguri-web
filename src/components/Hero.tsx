import React from 'react';
import { ArrowRight, BookOpen, ShieldCheck, Check, Terminal, Scale, Heart } from 'lucide-react';
import { SakuraIcon, FloatingPetal } from './SakuraIcon';

interface HeroProps {
  onGetStarted: () => void;
  onReadDocs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onReadDocs }) => {
  return (
    <header id="home" className="section-wrapper" style={{ paddingTop: '40px', position: 'relative' }}>
      {/* Ambient background pastel glows */}
      <div className="ambient-glow glow-pink" style={{ width: '420px', height: '420px', top: '-60px', right: '5%' }} />
      <div className="ambient-glow glow-lavender" style={{ width: '380px', height: '380px', top: '80px', left: '-50px' }} />
      <div className="ambient-glow glow-blue" style={{ width: '300px', height: '300px', bottom: '0', right: '35%' }} />

      {/* Floating decorative petals */}
      <FloatingPetal className="floating-anim-1" style={{ top: '80px', left: '12%' }} />
      <FloatingPetal className="floating-anim-2" style={{ top: '240px', right: '15%' }} />
      <FloatingPetal className="floating-anim-3" style={{ bottom: '40px', left: '45%' }} />

      <div className="container hero-grid">
        {/* Left Column: Hero Content */}
        <div className="hero-left">
          {/* Eyebrow Badge */}
          <div className="hero-eyebrow">
            <span>&lt;/&gt;</span>
            <span>Python Framework for AI Reliability</span>
          </div>

          {/* Main Title */}
          <div>
            <h1 className="hero-title">
              Waguri
              <span className="title-framework">Framework</span>
            </h1>
            <div className="hero-subheading">
              Make AI More <span className="highlight-pink">Reliable.</span>
            </div>
          </div>

          {/* Description */}
          <p className="hero-desc">
            Waguri is an experimental Python framework designed to improve AI response reliability
            through evidence-aware validation and structured verification.
          </p>

          {/* Action Buttons */}
          <div className="hero-buttons">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onGetStarted}
              aria-label="Get Started with Waguri"
            >
              <span>Get Started</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onReadDocs}
              aria-label="Read Waguri Documentation"
            >
              <BookOpen size={16} />
              <span>Read Documentation</span>
            </button>
          </div>

          {/* Meta Badges */}
          <div className="hero-meta-badges">
            <div className="hero-meta-item">
              <Terminal size={15} color="#F45B93" />
              <span>Python 3.11+</span>
            </div>
            <div className="hero-meta-item">
              <Scale size={15} color="#6350B5" />
              <span>Apache-2.0</span>
            </div>
            <div className="hero-meta-item">
              <Heart size={15} color="#F45B93" />
              <span>Open Source</span>
            </div>
          </div>
        </div>

        {/* Right Column: Code Editor & Floating Status Card */}
        <div className="hero-visual-container">
          <div className="hero-code-window" role="region" aria-label="Interactive Python Code Preview">
            <div className="hero-code-header">
              <div className="window-dots">
                <span className="window-dot dot-red" />
                <span className="window-dot dot-yellow" />
                <span className="window-dot dot-green" />
              </div>
              <div className="window-title-badge">
                <SakuraIcon size={14} fill="#F45B93" />
                <span>Waguri</span>
              </div>
            </div>

            <pre className="hero-code-content">
              <code>
                <span style={{ color: 'var(--code-keyword)' }}>from</span> waguri <span style={{ color: 'var(--code-keyword)' }}>import</span> WaguriClient{'\n'}
                <span style={{ color: 'var(--code-keyword)' }}>from</span> waguri.adapters.ollama <span style={{ color: 'var(--code-keyword)' }}>import</span> OllamaAdapter{'\n\n'}
                client = <span style={{ color: 'var(--code-function)' }}>WaguriClient</span>({'\n'}
                {'    '}model=<span style={{ color: 'var(--code-function)' }}>OllamaAdapter</span>(model=<span style={{ color: 'var(--code-string)' }}>"llama3.2"</span>){'\n'}
                ){'\n\n'}
                result = client.<span style={{ color: 'var(--code-function)' }}>answer</span>({'\n'}
                {'    '}question=<span style={{ color: 'var(--code-string)' }}>"What is the reported revenue?"</span>,{'\n'}
                {'    '}context=[{'\n'}
                {'        '}<span style={{ color: 'var(--code-string)' }}>"The report lists revenue as Rp50 million."</span>{'\n'}
                {'    '}],{'\n'}
                ){'\n\n'}
                <span style={{ color: 'var(--code-function)' }}>print</span>(result.<span style={{ color: 'var(--code-function)' }}>model_dump_json</span>(indent=<span style={{ color: 'var(--code-param)' }}>2</span>))
              </code>
            </pre>
          </div>

          {/* Floating Validation Status Card */}
          <div className="floating-verification-card">
            <div className="verification-card-header">
              <div className="verification-icon-badge">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="verification-title">Reliability Pipeline</div>
                <div className="verification-subtitle">Evidence &amp; Claim Status</div>
              </div>
            </div>

            <div className="verification-list">
              <div className="verification-item">
                <Check size={15} className="check-green" />
                <span>Validate Output</span>
              </div>
              <div className="verification-item">
                <Check size={15} className="check-green" />
                <span>Check Evidence</span>
              </div>
              <div className="verification-item">
                <Check size={15} className="check-green" />
                <span>Reduce Hallucinations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

