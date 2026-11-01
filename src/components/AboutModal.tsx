import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { SakuraIcon } from './SakuraIcon';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="About Waguri Framework"
    >
      <div
        className="search-dialog-box"
        style={{ maxWidth: '520px', padding: '28px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SakuraIcon size={26} fill="#F45B93" />
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                About Waguri Framework
              </h2>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Version 0.1.0 · Apache-2.0
              </span>
            </div>
          </div>
          <button type="button" className="nav-icon-btn" onClick={onClose} aria-label="Close About">
            <X size={16} />
          </button>
        </div>

        <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p>
            <strong>Waguri Framework</strong> is an experimental open-source Python framework designed to improve AI response reliability through evidence-aware validation, structured claim verification, and token budget optimization.
          </p>

          <p>
            Unlike tools that claim to magically eliminate all hallucinations, Waguri focuses on transparent, deterministic checks: normalizing text, extracting discrete claims, detecting direct contradictions, and producing verifiable Pydantic models.
          </p>

          <div style={{ background: 'var(--bg-secondary)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Project Philosophy
            </div>
            <div>
              Reliability is not a single binary toggle — it is a verifiable pipeline. Provide evidence, verify claims, record uncertainty, and keep developers in full control.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Created by</span>
              <a
                href="https://github.com/RaihanFradita"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--primary-pink)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <span>Raihan Fradita</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Repository</span>
              <a
                href="https://github.com/RaihanFradita/waguri-framework"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--primary-pink)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <span>github.com/RaihanFradita/waguri-framework</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>License</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Apache License 2.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
