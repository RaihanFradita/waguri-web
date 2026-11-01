import React from 'react';
import { ShieldCheck, Search, Cpu, Sliders, Code2, Sparkles, ArrowRight } from 'lucide-react';

interface FeatureCardsProps {
  onExploreFeatures?: () => void;
  onSelectFeature?: (featureId: string) => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({
  onExploreFeatures,
  onSelectFeature,
}) => {
  const features = [
    {
      id: 'validation',
      title: 'Output Validation',
      desc: 'Validate AI responses with structured rules and strict Pydantic schemas, classifying response status into verified, needs_review, or rejected.',
      icon: ShieldCheck,
      iconClass: 'icon-pink',
      status: 'Implemented v0.1.0',
      statusClass: 'badge-pink',
    },
    {
      id: 'evidence',
      title: 'Evidence Checking',
      desc: 'Check claims against supplied context using deterministic text normalization and contradiction/negation detection.',
      icon: Search,
      iconClass: 'icon-lavender',
      status: 'Experimental Baseline',
      statusClass: 'badge-lavender',
    },
    {
      id: 'adapters',
      title: 'Model Adapters',
      desc: 'Modular adapter interface supporting local Ollama (httpx) and mock Demo adapters; cloud provider integrations are planned.',
      icon: Cpu,
      iconClass: 'icon-sky',
      status: 'Local Implemented · Cloud Planned',
      statusClass: 'badge-sky',
    },
    {
      id: 'optimization',
      title: 'Context Optimization',
      desc: 'Fit context documents efficiently within token limits using greedy prefix estimation and LRU response caching.',
      icon: Sliders,
      iconClass: 'icon-mint',
      status: 'Implemented v0.1.0',
      statusClass: 'badge-mint',
    },
    {
      id: 'developer',
      title: 'Developer Friendly',
      desc: 'Simple, typed Python 3.11+ API with Pydantic v2 models, predictable JSON serialization, and minimal dependencies.',
      icon: Code2,
      iconClass: 'icon-cream',
      status: 'Python 3.11+ · Pydantic v2',
      statusClass: 'badge-cream',
    },
    {
      id: 'opensource',
      title: 'Open Source',
      desc: 'Permissive Apache-2.0 license. Developed transparently on GitHub for open community contribution and research.',
      icon: Sparkles,
      iconClass: 'icon-lavender',
      status: 'Apache-2.0 License',
      statusClass: 'badge-lavender',
    },
  ];

  return (
    <section id="features" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="features-header-row">
          <div>
            <div className="section-header-badge">— KEY FEATURES</div>
            <h2 className="section-header-title">Powerful Features for Reliable AI</h2>
            <p className="section-header-desc">
              Waguri Framework provides essential tools to build more trustworthy and grounded AI applications.
            </p>
          </div>

          {onExploreFeatures && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onExploreFeatures}
              aria-label="Explore All Features"
            >
              <span>Explore Features</span>
              <ArrowRight size={15} />
            </button>
          )}
        </div>

        {/* Feature Cards Grid (3x2) */}
        <div className="features-grid">
          {features.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="feature-card"
                onClick={() => onSelectFeature?.(item.id)}
                role={onSelectFeature ? 'button' : undefined}
                tabIndex={onSelectFeature ? 0 : undefined}
                onKeyDown={(e) => {
                  if (onSelectFeature && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onSelectFeature(item.id);
                  }
                }}
              >
                <div className={`feature-icon-wrapper ${item.iconClass}`}>
                  <IconComponent size={24} />
                </div>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-desc">{item.desc}</p>
                <span className={`feature-status-chip ${item.statusClass}`}>
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

