import React from 'react';
import { MessageSquare, FileCheck2, ShieldCheck, CheckCircle2, ArrowRight, Info } from 'lucide-react';

interface WorkflowProps {
  onLearnMore?: () => void;
}

export const Workflow: React.FC<WorkflowProps> = ({ onLearnMore }) => {
  const steps = [
    {
      step: '1',
      title: 'AI Response',
      desc: 'Model generates a raw candidate response via OllamaAdapter or custom ModelAdapter.',
      icon: MessageSquare,
      iconBg: 'var(--soft-pink)',
      iconColor: 'var(--primary-pink)',
    },
    {
      step: '2',
      title: 'Evidence Checking',
      desc: 'Answer is split into claims and checked against context using text normalization and negation detection.',
      icon: FileCheck2,
      iconBg: 'var(--lavender)',
      iconColor: '#6350B5',
    },
    {
      step: '3',
      title: 'Validation Result',
      desc: 'Statuses ("supported", "unsupported", "uncertain") and evidence links are compiled into WaguriResult.',
      icon: ShieldCheck,
      iconBg: 'var(--mint)',
      iconColor: '#15803D',
    },
    {
      step: '4',
      title: 'More Reliable AI Output',
      desc: 'Structured, verifiable response ready for client consumption with transparent confidence metrics.',
      icon: CheckCircle2,
      iconBg: 'var(--soft-pink)',
      iconColor: 'var(--primary-pink)',
      highlight: true,
    },
  ];

  return (
    <section id="workflow" className="section-wrapper">
      <div className="container">
        <div className="workflow-section">
          <div className="workflow-header">
            <div className="section-header-badge">— HOW IT WORKS</div>
            <h2 className="section-header-title">Validation Pipeline in Waguri</h2>
            <p className="section-header-desc" style={{ margin: '0 auto' }}>
              From AI response to reliable output, with structured validation steps.
            </p>
            {onLearnMore && (
              <div style={{ marginTop: '16px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onLearnMore}
                  aria-label="Learn More About Waguri Architecture"
                >
                  <span>Learn More</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>

          {/* Workflow Steps Horizontal Pipeline */}
          <div className="pipeline-cards-row">
            {steps.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <React.Fragment key={item.step}>
                  <div className={`pipeline-step-card ${item.highlight ? 'pipeline-step-highlight' : ''}`}>
                    <div className="step-number-badge">{item.step}</div>
                    <div className="step-icon-box" style={{ backgroundColor: item.iconBg, color: item.iconColor }}>
                      <IconComp size={22} />
                    </div>
                    <h3 className="step-title">{item.title}</h3>
                    <p className="step-desc">{item.desc}</p>
                  </div>

                  {/* Connecting Arrow between steps */}
                  {idx < steps.length - 1 && (
                    <div className="pipeline-arrow" aria-hidden="true">
                      <ArrowRight size={22} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Important Conceptual Disclaimer */}
          <div className="workflow-disclaimer">
            <Info size={18} color="#F45B93" style={{ flexShrink: 0 }} />
            <span>
              <strong>Conceptual Workflow Note:</strong> This diagram illustrates the verification flow. Waguri is under active development; its heuristic baseline checks do not guarantee hallucination-free outputs or replace domain-specific human review.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

