import React from 'react';
import { BookOpen, Terminal, Layers, Cpu, ShieldCheck, FileText, Code2, ArrowRight } from 'lucide-react';

interface DocumentationPreviewProps {
  onOpenDocs: (topicId?: string) => void;
}

export const DocumentationPreview: React.FC<DocumentationPreviewProps> = ({ onOpenDocs }) => {
  const topics = [
    { id: 'getting-started', label: 'Getting Started', icon: BookOpen },
    { id: 'installation', label: 'Installation', icon: Terminal },
    { id: 'core-concepts', label: 'Core Concepts', icon: Layers },
    { id: 'adapters', label: 'Model Adapters', icon: Cpu },
    { id: 'validation', label: 'Evidence Validation', icon: ShieldCheck },
    { id: 'api-reference', label: 'API Reference', icon: FileText },
    { id: 'examples', label: 'Examples', icon: Code2 },
  ];

  return (
    <div className="docs-preview-panel">
      <div>
        <div className="section-header-badge" style={{ color: '#6350B5' }}>
          DOCUMENTATION PREVIEW
        </div>
        <h3 className="section-header-title" style={{ fontSize: '24px', marginBottom: '6px' }}>
          Read the Docs
        </h3>
        <p className="section-header-desc" style={{ fontSize: '13.5px' }}>
          Explore comprehensive documentation from getting started to API reference.
        </p>
      </div>

      <div className="docs-topics-list">
        {topics.map((t) => {
          const IconComp = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              className="docs-topic-item"
              onClick={() => onOpenDocs(t.id)}
              aria-label={`Open Documentation for ${t.label}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <IconComp size={16} color="#F45B93" />
                <span>{t.label}</span>
              </div>
              <ArrowRight size={14} color="#8E9BAE" />
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
        <button
          type="button"
          className="btn btn-outline"
          style={{ width: '100%' }}
          onClick={() => onOpenDocs()}
        >
          <span>View Documentation</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

