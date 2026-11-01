import React from 'react';
import { ArrowRight, Github } from 'lucide-react';
import { SakuraIcon } from './SakuraIcon';

interface CallToActionProps {
  onGetStarted: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onGetStarted }) => {
  return (
    <div className="cta-compact-card">
      <div className="cta-flower-large">
        <SakuraIcon size={42} fill="#F45B93" />
      </div>

      <div>
        <h3 className="cta-title">Build AI You Can Trust More.</h3>
        <p className="cta-desc" style={{ marginTop: '8px' }}>
          Start building reliable AI applications with Waguri Framework today.
        </p>
      </div>

      <div className="cta-actions">
        <button
          type="button"
          className="btn btn-primary"
          style={{ width: '100%' }}
          onClick={onGetStarted}
        >
          <span>Get Started</span>
          <ArrowRight size={15} />
        </button>

        <a
          href="https://github.com/RaihanFradita/waguri-framework"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ width: '100%' }}
        >
          <Github size={16} />
          <span>View on GitHub</span>
        </a>
      </div>
    </div>
  );
};

