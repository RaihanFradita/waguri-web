import React, { useState } from 'react';
import { Copy, Check, FileCode, CheckCircle2 } from 'lucide-react';

export const CodeExample: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ollama' | 'demo' | 'evidence' | 'context' | 'json'>('ollama');
  const [copied, setCopied] = useState(false);

  const snippets = {
    ollama: {
      fileName: 'examples/ollama_example.py',
      language: 'python',
      code: `from waguri import WaguriClient
from waguri.adapters.ollama import OllamaAdapter

# Initialize Waguri client with local Ollama adapter
client = WaguriClient(
    model=OllamaAdapter(model="llama3.2")
)

# Run evidence-aware answer generation and validation
result = client.answer(
    question="What is the reported revenue?",
    context=[
        "The report lists revenue as Rp50 million."
    ],
)

# Output structured Pydantic result
print(result.model_dump_json(indent=2))`,
      explanation:
        'Connects to a local Ollama instance (default port 11434), prompts the model with context, extracts claims, verifies them deterministically against the context, and returns a structured WaguriResult object.',
    },
    demo: {
      fileName: 'examples/demo_quickstart.py',
      language: 'python',
      code: `from waguri import WaguriClient
from waguri.adapters.demo import DemoAdapter

# Use DemoAdapter for testing without running an external LLM
client = WaguriClient(model=DemoAdapter())

result = client.answer(
    question="What is the reported revenue?",
    context=["The report lists revenue as Rp50 million."],
)

print(f"Status: {result.status}")
print(f"Answer: {result.answer}")
for claim in result.claims:
    print(f"- Claim: {claim.text} -> {claim.status}")`,
      explanation:
        'DemoAdapter is built into waguri.adapters.demo for unit testing and CI pipelines. It generates predetermined responses without requiring network requests or GPU resources.',
    },
    evidence: {
      fileName: 'scripts/validate_claims.py',
      language: 'python',
      code: `from waguri.validation.evidence import check_evidence
from waguri.validation.claims import split_claims

answer = "Revenue reached Rp50 million. Profit was not disclosed."
claims = split_claims(answer)

evidence_corpus = [
    "The report lists revenue as Rp50 million.",
    "Profit margin details remain confidential."
]

for claim in claims:
    check = check_evidence(claim, evidence_corpus)
    print(f"Claim: '{claim}' -> Status: {check.status} ({check.reason})")`,
      explanation:
        'check_evidence performs exact normalized text matching and inspects adjacent words for negation patterns (e.g. not, never, cannot) to flag contradictions deterministically.',
    },
    context: {
      fileName: 'scripts/optimize_context.py',
      language: 'python',
      code: `from waguri.optimization.context import fit_context
from waguri.optimization.token_budget import estimate_tokens

docs = [
    "Document A: Preliminary Q3 earnings analysis.",
    "Document B: Detailed breakdown of operational expenses.",
    "Document C: Long-term strategic forecast for 2027."
]

# Budget: allow up to 25 estimated tokens
budget = 25
selected_docs = fit_context(docs, max_tokens=budget)

print(f"Selected {len(selected_docs)} documents within {budget} token budget:")
for doc in selected_docs:
    print(f"- ({estimate_tokens(doc)} tokens): {doc}")`,
      explanation:
        'fit_context selects the longest source-order prefix of context items that fit within an approximate token limit, using conservative 4-character token estimation.',
    },
    json: {
      fileName: 'waguri_result.json',
      language: 'json',
      code: `{
  "answer": "The reported revenue is Rp50 million.",
  "status": "needs_review",
  "claims": [
    {
      "text": "The reported revenue is Rp50 million.",
      "status": "supported",
      "evidence_ids": [
        "0"
      ],
      "reason": "Exact normalized text match found."
    }
  ],
  "metrics": {
    "evidence_match": 1
  },
  "retries": 0
}`,
      explanation:
        'Actual WaguriResult serialized with model_dump_json(indent=2). The status is "needs_review" because automated heuristic checks mark non-empty results for verification.',
    },
  };

  const currentSnippet = snippets[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-example-panel">
      {/* Header with Title */}
      <div>
        <div className="section-header-badge">— CODE EXAMPLE</div>
        <h3 className="section-header-title" style={{ fontSize: '24px', marginBottom: '6px' }}>
          Get Started with Waguri
        </h3>
        <p className="section-header-desc" style={{ fontSize: '13.5px' }}>
          A simple example to validate AI responses using Waguri Framework.
        </p>
      </div>

      {/* Tabs */}
      <div className="code-tabs-nav" role="tablist" aria-label="Code Examples">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'ollama'}
          className={`code-tab-btn ${activeTab === 'ollama' ? 'active' : ''}`}
          onClick={() => setActiveTab('ollama')}
        >
          ollama_example.py
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'demo'}
          className={`code-tab-btn ${activeTab === 'demo' ? 'active' : ''}`}
          onClick={() => setActiveTab('demo')}
        >
          demo_quickstart.py
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'evidence'}
          className={`code-tab-btn ${activeTab === 'evidence' ? 'active' : ''}`}
          onClick={() => setActiveTab('evidence')}
        >
          check_evidence.py
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'context'}
          className={`code-tab-btn ${activeTab === 'context' ? 'active' : ''}`}
          onClick={() => setActiveTab('context')}
        >
          fit_context.py
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'json'}
          className={`code-tab-btn ${activeTab === 'json' ? 'active' : ''}`}
          onClick={() => setActiveTab('json')}
        >
          waguri_result.json
        </button>
      </div>

      {/* Code Box */}
      <div className="code-box-wrapper">
        <div className="code-box-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileCode size={14} color="#F45B93" />
            <span>{currentSnippet.fileName}</span>
          </div>
          <button
            type="button"
            className="code-copy-btn"
            onClick={handleCopy}
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check size={12} color="#10B981" />
                <span style={{ color: '#10B981' }}>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <pre className="code-pre-block">
          <code>{currentSnippet.code}</code>
        </pre>
      </div>

      {/* Explanation Box */}
      <div className="code-explanation-box">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <CheckCircle2 size={16} color="#F45B93" style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{currentSnippet.explanation}</span>
        </div>
      </div>
    </div>
  );
};
