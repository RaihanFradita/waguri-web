import React, { useState } from 'react';
import { X, BookOpen, Terminal, Layers, Cpu, ShieldCheck, FileText, Code2, ExternalLink, Copy, Check } from 'lucide-react';
import { SakuraIcon } from './SakuraIcon';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({
  isOpen,
  onClose,
  initialTopic = 'getting-started',
}) => {
  const [activeTopic, setActiveTopic] = useState<string>(initialTopic);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyCode = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const navItems = [
    { id: 'getting-started', label: 'Getting Started', icon: BookOpen },
    { id: 'installation', label: 'Installation', icon: Terminal },
    { id: 'core-concepts', label: 'Core Concepts', icon: Layers },
    { id: 'adapters', label: 'Model Adapters', icon: Cpu },
    { id: 'validation', label: 'Evidence Validation', icon: ShieldCheck },
    { id: 'optimization', label: 'Optimization & Budget', icon: Code2 },
    { id: 'api-reference', label: 'API Reference', icon: FileText },
  ];

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Waguri Framework Documentation"
    >
      <div className="docs-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="docs-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SakuraIcon size={22} fill="#F45B93" />
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Waguri Framework Documentation
            </h2>
            <span className="badge-pill badge-pink" style={{ fontSize: '11px', padding: '3px 8px' }}>
              v0.1.0
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="https://github.com/RaihanFradita/waguri-framework"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              <span>GitHub Repo</span>
              <ExternalLink size={13} />
            </a>
            <button
              type="button"
              className="nav-icon-btn"
              onClick={onClose}
              aria-label="Close Documentation"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="docs-modal-body">
          {/* Sidebar */}
          <div className="docs-sidebar">
            {navItems.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`docs-sidebar-btn ${activeTopic === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTopic(item.id)}
                >
                  <IconComp size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="docs-content-area">
            {activeTopic === 'getting-started' && (
              <div>
                <h3 className="section-header-title" style={{ fontSize: '24px' }}>
                  Getting Started with Waguri
                </h3>
                <p style={{ marginTop: '8px' }}>
                  <strong>Waguri Framework</strong> is an experimental Python 3.11+ framework designed to improve AI response reliability through evidence-aware validation and structured verification.
                </p>

                <h4 style={{ margin: '20px 0 8px', fontSize: '16px' }}>Prerequisites</h4>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.8' }}>
                  <li>Python 3.11 or newer</li>
                  <li>Pydantic v2.8 or newer</li>
                  <li>Optional: Ollama running locally on port 11434 for local model generation</li>
                </ul>

                <h4 style={{ margin: '20px 0 8px', fontSize: '16px' }}>Quick Start Example</h4>
                <div className="code-box-wrapper" style={{ marginTop: '10px' }}>
                  <div className="code-box-header">
                    <span>quickstart.py</span>
                    <button
                      type="button"
                      className="code-copy-btn"
                      onClick={() =>
                        copyCode(
                          `from waguri import WaguriClient\nfrom waguri.adapters.ollama import OllamaAdapter\n\nclient = WaguriClient(model=OllamaAdapter(model="llama3.2"))\n\nresult = client.answer(\n    question="What is the reported revenue?",\n    context=["The report lists revenue as Rp50 million."]\n)\n\nprint(result.model_dump_json(indent=2))`,
                          'gs'
                        )
                      }
                    >
                      {copiedKey === 'gs' ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                      <span>{copiedKey === 'gs' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="code-pre-block">
                    <code>{`from waguri import WaguriClient
from waguri.adapters.ollama import OllamaAdapter

client = WaguriClient(
    model=OllamaAdapter(model="llama3.2")
)

result = client.answer(
    question="What is the reported revenue?",
    context=[
        "The report lists revenue as Rp50 million."
    ]
)

print(result.model_dump_json(indent=2))`}</code>
                  </pre>
                </div>
              </div>
            )}

            {activeTopic === 'installation' && (
              <div>
                <h3 className="section-header-title" style={{ fontSize: '24px' }}>
                  Installation Guide
                </h3>
                <p style={{ marginTop: '8px' }}>
                  Waguri requires Python 3.11+ and follows standard packaging standards defined in <code>pyproject.toml</code>.
                </p>

                <h4 style={{ margin: '20px 0 8px', fontSize: '16px' }}>1. Core Package</h4>
                <div className="code-box-wrapper">
                  <div className="code-box-header">
                    <span>bash</span>
                    <button
                      type="button"
                      className="code-copy-btn"
                      onClick={() => copyCode('pip install waguri-framework', 'pip-core')}
                    >
                      {copiedKey === 'pip-core' ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                      <span>{copiedKey === 'pip-core' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="code-pre-block">
                    <code>pip install waguri-framework</code>
                  </pre>
                </div>

                <h4 style={{ margin: '20px 0 8px', fontSize: '16px' }}>2. With Ollama Support (httpx)</h4>
                <div className="code-box-wrapper">
                  <div className="code-box-header">
                    <span>bash</span>
                    <button
                      type="button"
                      className="code-copy-btn"
                      onClick={() => copyCode('pip install "waguri-framework[ollama]"', 'pip-ollama')}
                    >
                      {copiedKey === 'pip-ollama' ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                      <span>{copiedKey === 'pip-ollama' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="code-pre-block">
                    <code>pip install "waguri-framework[ollama]"</code>
                  </pre>
                </div>

                <h4 style={{ margin: '20px 0 8px', fontSize: '16px' }}>3. Development &amp; Testing</h4>
                <div className="code-box-wrapper">
                  <div className="code-box-header">
                    <span>bash</span>
                    <button
                      type="button"
                      className="code-copy-btn"
                      onClick={() => copyCode('pip install "waguri-framework[dev]" && pytest', 'pip-dev')}
                    >
                      {copiedKey === 'pip-dev' ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                      <span>{copiedKey === 'pip-dev' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="code-pre-block">
                    <code>pip install "waguri-framework[dev]"
pytest tests/</code>
                  </pre>
                </div>
              </div>
            )}

            {activeTopic === 'core-concepts' && (
              <div>
                <h3 className="section-header-title" style={{ fontSize: '24px' }}>
                  Core Concepts
                </h3>
                <p style={{ marginTop: '8px' }}>
                  Waguri decouples <strong>response generation</strong> from <strong>evidence verification</strong>.
                </p>

                <h4 style={{ margin: '20px 0 8px', fontSize: '16px' }}>WaguriResult &amp; ClaimResult</h4>
                <p style={{ fontSize: '14px' }}>
                  Every call to <code>client.answer(...)</code> returns a strictly typed <code>WaguriResult</code> model:
                </p>
                <div className="code-box-wrapper" style={{ marginTop: '10px' }}>
                  <pre className="code-pre-block">
                    <code>{`class WaguriResult(BaseModel):
    answer: str
    status: Literal["verified", "needs_review", "rejected"]
    claims: list[ClaimResult] = Field(default_factory=list)
    metrics: dict[str, int | float] = Field(default_factory=dict)
    retries: int = 0

class ClaimResult(BaseModel):
    text: str
    status: Literal["supported", "unsupported", "uncertain"]
    evidence_ids: list[str] = Field(default_factory=list)
    reason: str | None = None`}</code>
                  </pre>
                </div>
              </div>
            )}

            {activeTopic === 'adapters' && (
              <div>
                <h3 className="section-header-title" style={{ fontSize: '24px' }}>
                  Model Adapters
                </h3>
                <p style={{ marginTop: '8px' }}>
                  Adapters implement the <code>ModelAdapter</code> protocol defined in <code>waguri.adapters.base</code>:
                </p>

                <table className="docs-api-table">
                  <thead>
                    <tr>
                      <th>Adapter</th>
                      <th>Class</th>
                      <th>Status</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ollama</td>
                      <td><code>waguri.adapters.ollama.OllamaAdapter</code></td>
                      <td><span className="badge-pill badge-mint">Implemented</span></td>
                      <td>HTTP API client for local Ollama daemon (requires <code>httpx</code>).</td>
                    </tr>
                    <tr>
                      <td>Demo</td>
                      <td><code>waguri.adapters.demo.DemoAdapter</code></td>
                      <td><span className="badge-pill badge-mint">Implemented</span></td>
                      <td>Deterministic mock adapter for zero-dependency testing.</td>
                    </tr>
                    <tr>
                      <td>Cloud (OpenAI, Anthropic, Bedrock)</td>
                      <td>—</td>
                      <td><span className="badge-pill badge-sky">Planned</span></td>
                      <td>On roadmap for future minor releases.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTopic === 'validation' && (
              <div>
                <h3 className="section-header-title" style={{ fontSize: '24px' }}>
                  Evidence Validation
                </h3>
                <p style={{ marginTop: '8px' }}>
                  Located in <code>src/waguri/validation/evidence.py</code> and <code>claims.py</code>.
                </p>

                <h4 style={{ margin: '18px 0 8px', fontSize: '15px' }}>Heuristic Rule Engine</h4>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.8' }}>
                  <li><strong>Text Normalization:</strong> Lowercases text and compresses contiguous whitespace.</li>
                  <li><strong>Contradiction Detection:</strong> Checks a 32-character context window around matching claims for negation tokens (<code>not, never, no, without, cannot, isn't, wasn't, doesn't, won't</code>).</li>
                  <li><strong>Sentence Claim Splitting:</strong> Splits candidate responses at sentence punctuation marks.</li>
                </ul>
              </div>
            )}

            {activeTopic === 'optimization' && (
              <div>
                <h3 className="section-header-title" style={{ fontSize: '24px' }}>
                  Optimization &amp; Token Budget
                </h3>
                <p style={{ marginTop: '8px' }}>
                  Utilities for managing inference token consumption and response latency in <code>src/waguri/optimization/</code>:
                </p>

                <div className="code-box-wrapper" style={{ marginTop: '12px' }}>
                  <pre className="code-pre-block">
                    <code>{`from waguri.optimization.context import fit_context
from waguri.optimization.token_budget import estimate_tokens
from waguri.optimization.cache import ResponseCache

# Fit context within token limit
docs = ["Item 1...", "Item 2...", "Item 3..."]
budget_docs = fit_context(docs, max_tokens=100)

# LRU Cache for responses
cache = ResponseCache(maxsize=128)
cache.set("question_hash", "validated response")`}</code>
                  </pre>
                </div>
              </div>
            )}

            {activeTopic === 'api-reference' && (
              <div>
                <h3 className="section-header-title" style={{ fontSize: '24px' }}>
                  API Reference
                </h3>
                <p style={{ marginTop: '8px' }}>
                  Verified public APIs exported by <code>waguri-framework 0.1.0</code>:
                </p>

                <table className="docs-api-table">
                  <thead>
                    <tr>
                      <th>Module / Class</th>
                      <th>Method / Function</th>
                      <th>Parameters</th>
                      <th>Return Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>waguri.WaguriClient</code></td>
                      <td><code>answer()</code></td>
                      <td><code>question: str, context: list[str] | None</code></td>
                      <td><code>WaguriResult</code></td>
                    </tr>
                    <tr>
                      <td><code>waguri.adapters.OllamaAdapter</code></td>
                      <td><code>generate()</code></td>
                      <td><code>prompt: str</code></td>
                      <td><code>str</code></td>
                    </tr>
                    <tr>
                      <td><code>waguri.adapters.OllamaAdapter</code></td>
                      <td><code>check_connection()</code></td>
                      <td><code>None</code></td>
                      <td><code>bool</code></td>
                    </tr>
                    <tr>
                      <td><code>waguri.validation.evidence</code></td>
                      <td><code>check_evidence()</code></td>
                      <td><code>claim: str, evidence: list[str]</code></td>
                      <td><code>EvidenceCheck</code></td>
                    </tr>
                    <tr>
                      <td><code>waguri.validation.claims</code></td>
                      <td><code>split_claims()</code></td>
                      <td><code>answer: str</code></td>
                      <td><code>list[str]</code></td>
                    </tr>
                    <tr>
                      <td><code>waguri.optimization.context</code></td>
                      <td><code>fit_context()</code></td>
                      <td><code>context: Sequence[str], max_tokens: int</code></td>
                      <td><code>list[str]</code></td>
                    </tr>
                    <tr>
                      <td><code>waguri.optimization.token_budget</code></td>
                      <td><code>estimate_tokens()</code></td>
                      <td><code>text: str</code></td>
                      <td><code>int</code></td>
                    </tr>
                    <tr>
                      <td><code>waguri.evaluation.benchmark</code></td>
                      <td><code>evaluate()</code></td>
                      <td><code>cases: Sequence[BenchmarkCase], responses: Sequence[str]</code></td>
                      <td><code>BenchmarkResult</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

