import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  category: 'Documentation' | 'API' | 'Feature';
  description: string;
  action: () => void;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDoc: (topicId: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDoc,
  onNavigateSection,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const allItems: SearchResult[] = [
    {
      id: 'quickstart',
      title: 'Quickstart & Installation',
      category: 'Documentation',
      description: 'How to install waguri-framework with pip and run your first validation.',
      action: () => {
        onSelectDoc('installation');
        onClose();
      },
    },
    {
      id: 'waguri-client',
      title: 'WaguriClient',
      category: 'API',
      description: 'Core client class for answering questions and verifying claims against evidence.',
      action: () => {
        onSelectDoc('api-reference');
        onClose();
      },
    },
    {
      id: 'ollama-adapter',
      title: 'OllamaAdapter',
      category: 'API',
      description: 'Model adapter integrating local Ollama LLMs with Waguri via HTTP.',
      action: () => {
        onSelectDoc('adapters');
        onClose();
      },
    },
    {
      id: 'check-evidence',
      title: 'check_evidence()',
      category: 'API',
      description: 'Deterministic evidence verification and contradiction detection algorithm.',
      action: () => {
        onSelectDoc('validation');
        onClose();
      },
    },
    {
      id: 'fit-context',
      title: 'fit_context() & estimate_tokens()',
      category: 'API',
      description: 'Context budget fitting and token estimation utilities.',
      action: () => {
        onSelectDoc('optimization');
        onClose();
      },
    },
    {
      id: 'core-models',
      title: 'WaguriResult & ClaimResult',
      category: 'API',
      description: 'Pydantic schemas for verified responses and claim status details.',
      action: () => {
        onSelectDoc('core-concepts');
        onClose();
      },
    },
    {
      id: 'feat-validation',
      title: 'Output Validation Feature',
      category: 'Feature',
      description: 'Structured rule verification and response classification.',
      action: () => {
        onNavigateSection('features');
        onClose();
      },
    },
    {
      id: 'feat-playground',
      title: 'Interactive Playground',
      category: 'Feature',
      description: 'Test claims and evidence live in browser using client-side heuristic engine.',
      action: () => {
        onNavigateSection('playground');
        onClose();
      },
    },
  ];

  const filteredItems = allItems.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search Documentation"
    >
      <div className="search-dialog-box" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <div className="search-input-header">
          <Search size={18} color="#F45B93" />
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search documentation, classes, methods..."
            aria-label="Search Query"
          />
          <button type="button" className="nav-icon-btn" onClick={onClose} aria-label="Close Search">
            <X size={16} />
          </button>
        </div>

        <div className="search-results-list">
          {filteredItems.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              No results found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className={`search-result-item ${idx === selectedIndex ? 'highlighted' : ''}`}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="result-item-title">{item.title}</span>
                    <span className="badge-pill badge-pink" style={{ fontSize: '10px', padding: '2px 8px' }}>
                      {item.category}
                    </span>
                  </div>
                  <div className="result-item-desc">{item.description}</div>
                </div>
                <ArrowRight size={14} color="#8E9BAE" />
              </div>
            ))
          )}
        </div>

        <div className="search-modal-footer">
          <span>Navigate with ↑ ↓, select with Enter</span>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
};
