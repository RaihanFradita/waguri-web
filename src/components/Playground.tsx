import React, { useState, useMemo } from 'react';
import { Terminal } from 'lucide-react';

const NEGATION_REGEX = /(?<!\w)(not|never|no|without|cannot|can't|isn't|wasn't|doesn't|didn't|don't|won't|aren't|weren't|hardly)(?!\w)/i;

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

function stripNegationWords(text: string): string {
  return text.replace(new RegExp(NEGATION_REGEX.source, 'gi'), '');
}

interface SimulatedEvidenceCheck {
  status: 'supported' | 'unsupported' | 'uncertain';
  matchedEvidence: string | null;
  reason: string;
}

function checkEvidenceClient(claim: string, evidenceList: string[]): SimulatedEvidenceCheck {
  const normalizedClaim = normalizeText(claim);
  if (!normalizedClaim) {
    return {
      status: 'uncertain',
      matchedEvidence: null,
      reason: 'Claim is empty.',
    };
  }

  const usableEvidence = evidenceList.map((e) => e.trim()).filter(Boolean);
  if (usableEvidence.length === 0) {
    return {
      status: 'uncertain',
      matchedEvidence: null,
      reason: 'No usable evidence was provided.',
    };
  }

  for (const item of usableEvidence) {
    const normalizedEvidence = normalizeText(item);
    if (!normalizedEvidence) continue;

    const matchIndex = normalizedEvidence.indexOf(normalizedClaim);
    if (matchIndex !== -1) {
      const start = Math.max(0, matchIndex - 32);
      const end = matchIndex + normalizedClaim.length + 32;
      const contextSnippet = normalizedEvidence.slice(start, end);
      if (NEGATION_REGEX.test(contextSnippet)) {
        return {
          status: 'unsupported',
          matchedEvidence: item,
          reason: 'Claim is contradicted by a negated statement in the evidence.',
        };
      }
      return {
        status: 'supported',
        matchedEvidence: item,
        reason: 'Exact normalized text match found.',
      };
    }

    if (stripNegationWords(normalizedEvidence).includes(normalizedClaim)) {
      return {
        status: 'unsupported',
        matchedEvidence: item,
        reason: 'Claim appears only in a negated or contradicted statement.',
      };
    }
  }

  return {
    status: 'uncertain',
    matchedEvidence: null,
    reason: 'No exact text match; semantic support is unknown.',
  };
}

export const Playground: React.FC = () => {
  const [claimInput, setClaimInput] = useState<string>('The reported revenue is Rp50 million.');
  const [evidenceInput, setEvidenceInput] = useState<string>(
    'The report lists revenue as Rp50 million.\nOperational overhead decreased by 12% in Q3.'
  );

  const presets = [
    {
      name: 'Supported Claim',
      claim: 'The report lists revenue as Rp50 million.',
      evidence: 'The report lists revenue as Rp50 million.\nCompany headcount grew to 45 engineers.',
    },
    {
      name: 'Contradicted Claim',
      claim: 'The project is ready for release.',
      evidence: 'The project is not ready for release until Q4 security audits finish.',
    },
    {
      name: 'Uncertain Claim',
      claim: 'The team raised $15 million in series A funding.',
      evidence: 'The report lists revenue as Rp50 million.\nNo funding records were noted.',
    },
  ];

  const validationResult = useMemo(() => {
    const evidenceList = evidenceInput.split('\n').filter((l) => l.trim().length > 0);
    const check = checkEvidenceClient(claimInput, evidenceList);

    const evidenceIndex =
      check.matchedEvidence !== null ? evidenceList.indexOf(check.matchedEvidence) : -1;

    const waguriResultShape = {
      answer: claimInput,
      status: check.status === 'unsupported' ? 'rejected' : 'needs_review',
      claims: [
        {
          text: claimInput,
          status: check.status,
          evidence_ids: evidenceIndex !== -1 ? [String(evidenceIndex)] : [],
          reason: check.reason,
        },
      ],
      metrics: {
        evidence_match: check.status === 'supported' ? 1 : 0,
      },
      retries: 0,
    };

    return { check, json: JSON.stringify(waguriResultShape, null, 2) };
  }, [claimInput, evidenceInput]);

  return (
    <section id="playground" className="section-wrapper">
      <div className="container">
        <div className="playground-section">
          <div>
            <div className="section-header-badge">— INTERACTIVE PLAYGROUND</div>
            <h2 className="section-header-title">Test Waguri Validation Live</h2>
            <p className="section-header-desc">
              Test Waguri's deterministic evidence check rule in your browser. This simulator runs the exact
              logic of <code>waguri.validation.evidence.check_evidence</code> client-side.
            </p>
          </div>

          {/* Presets */}
          <div style={{ marginTop: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginRight: '10px' }}>
              Load Test Presets:
            </span>
            <div className="preset-buttons-row" style={{ display: 'inline-flex' }}>
              {presets.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  className="preset-btn"
                  onClick={() => {
                    setClaimInput(p.claim);
                    setEvidenceInput(p.evidence);
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="playground-grid">
            {/* Input Form */}
            <div className="playground-input-panel">
              <div>
                <label className="input-label" htmlFor="claim-input">
                  <span>Candidate AI Claim / Answer:</span>
                </label>
                <input
                  id="claim-input"
                  type="text"
                  className="playground-input"
                  value={claimInput}
                  onChange={(e) => setClaimInput(e.target.value)}
                  placeholder="Enter a claim or generated sentence..."
                />
              </div>

              <div>
                <label className="input-label" htmlFor="evidence-input">
                  <span>Context Documents / Evidence (One per line):</span>
                </label>
                <textarea
                  id="evidence-input"
                  className="playground-textarea"
                  rows={4}
                  value={evidenceInput}
                  onChange={(e) => setEvidenceInput(e.target.value)}
                  placeholder="Enter verified reference facts or source documents..."
                />
              </div>

              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '4px',
                }}
              >
                <Terminal size={14} color="#F45B93" />
                <span>
                  For full LLM generation via Ollama, run <code>pip install waguri-framework[ollama]</code> locally.
                </span>
              </div>
            </div>

            {/* Validation Result Box */}
            <div className="playground-result-panel">
              <div className="result-status-badge-row">
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--code-text)' }}>
                  Simulated WaguriResult
                </span>
                <span
                  className={`result-status-badge ${
                    validationResult.check.status === 'supported'
                      ? 'status-supported'
                      : validationResult.check.status === 'unsupported'
                      ? 'status-unsupported'
                      : 'status-uncertain'
                  }`}
                >
                  Status: {validationResult.check.status.toUpperCase()}
                </span>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--code-text)', opacity: 0.85 }}>
                <strong>Reason:</strong> {validationResult.check.reason}
              </div>

              <pre className="result-json-view">
                <code>{validationResult.json}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
