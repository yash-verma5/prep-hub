import React, { useState } from "react";

interface TocDiagramProps {
  topicOrder: number;
}

export const TocDiagram: React.FC<TocDiagramProps> = ({ topicOrder }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [pumpI, setPumpI] = useState<number>(2);

  if (topicOrder === 1) {
    // Topic 1: Finite Automata (DFA vs NFA)
    return (
      <div className="toc-diagram-card">
        <div className="diagram-header">
          <span className="badge">Visual Concept</span>
          <h4>Deterministic Finite Automaton (DFA) State Machine</h4>
        </div>
        <div className="svg-container">
          <svg viewBox="0 0 520 140" className="toc-svg">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#16856b" />
              </marker>
              <marker id="arrow-start" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef6c24" />
              </marker>
            </defs>

            {/* Start Arrow */}
            <line x1="20" y1="70" x2="65" y2="70" stroke="#ef6c24" strokeWidth="2.5" markerEnd="url(#arrow-start)" />
            <text x="35" y="60" fill="#ef6c24" fontSize="11" fontWeight="bold">Start</text>

            {/* State q0 */}
            <circle cx="90" cy="70" r="24" fill={activeStep === 0 ? "#e3f3ee" : "#f8fafc"} stroke={activeStep === 0 ? "#16856b" : "#94a3b8"} strokeWidth="2.5" />
            <text x="90" y="74" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">q₀</text>

            {/* Transition q0 -> q1 (label a) */}
            <path d="M 114 70 Q 180 40 246 70" fill="none" stroke="#16856b" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="180" y="45" textAnchor="middle" fill="#08705b" fontSize="12" fontWeight="bold">a</text>

            {/* State q1 */}
            <circle cx="270" cy="70" r="24" fill={activeStep === 1 ? "#e3f3ee" : "#f8fafc"} stroke={activeStep === 1 ? "#16856b" : "#94a3b8"} strokeWidth="2.5" />
            <text x="270" y="74" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">q₁</text>

            {/* Loop on q1 (label b) */}
            <path d="M 260 47 C 250 15 290 15 280 47" fill="none" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="270" y="18" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">b</text>

            {/* Transition q1 -> q2 (label a) */}
            <line x1="294" y1="70" x2="426" y2="70" stroke="#16856b" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="360" y="62" textAnchor="middle" fill="#08705b" fontSize="12" fontWeight="bold">a</text>

            {/* Accepting State q2 (Double Circle) */}
            <circle cx="450" cy="70" r="24" fill={activeStep === 2 ? "#dcfce7" : "#f8fafc"} stroke={activeStep === 2 ? "#15803d" : "#059669"} strokeWidth="2.5" />
            <circle cx="450" cy="70" r="19" fill="none" stroke={activeStep === 2 ? "#15803d" : "#059669"} strokeWidth="2" />
            <text x="450" y="74" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">q₂</text>
          </svg>
        </div>
        <div className="diagram-caption">
          <span><b>Language Accepted:</b> Strings over &#123;a, b&#125; starting with <b>a</b> and ending with <b>a</b>.</span>
          <div className="diagram-actions">
            <button className={activeStep === 0 ? "active-btn" : ""} onClick={() => setActiveStep(0)}>State q₀ (Start)</button>

            <button className={activeStep === 1 ? "active-btn" : ""} onClick={() => setActiveStep(1)}>Read 'a' ➔ q₁</button>
            <button className={activeStep === 2 ? "active-btn" : ""} onClick={() => setActiveStep(2)}>Read 'a' ➔ q₂ (Accept)</button>
          </div>
        </div>
      </div>
    );
  }

  if (topicOrder === 2) {
    // Topic 2: Regular Expressions & Arden's Theorem
    return (
      <div className="toc-diagram-card">
        <div className="diagram-header">
          <span className="badge">Algebraic Rule</span>
          <h4>Arden's Theorem & Transition Equation Solver</h4>
        </div>
        <div className="arden-box">
          <div className="arden-equation-card">
            <div className="eq-row">
              <span className="eq-label">Standard Form:</span>
              <code className="eq-code">R = Q + R · P</code>
            </div>
            <div className="eq-arrow">⇓ (if ε ∉ L(P))</div>
            <div className="eq-row solution-row">
              <span className="eq-label">Unique Solution:</span>
              <code className="eq-code highlight">R = Q · P*</code>
            </div>
          </div>
          <div className="arden-explanation">
            <p><b>State Equation:</b> For any state qᵢ in an automaton:</p>
            <div className="formula-badge">
              <code>qᵢ = Σ (qⱼ · aⱼᵢ) [+ ε if qᵢ is start state]</code>
            </div>
            <p className="subtext">
              Each state is written as the sum of incoming transitions from predecessor states qⱼ labeled with symbol aⱼᵢ.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (topicOrder === 3) {
    // Topic 3: DFA Minimization & Myhill-Nerode
    return (
      <div className="toc-diagram-card">
        <div className="diagram-header">
          <span className="badge">State Reduction</span>
          <h4>DFA Minimization via Table Filling & Partitioning</h4>
        </div>
        <div className="minimization-grid">
          <div className="partition-step">
            <h5>1. Initial Partition P₀</h5>
            <div className="p-box">
              <span className="group non-final">Group 1 (Non-Accepting): &#123; q₀, q₁ &#125;</span>
              <span className="group final">Group 2 (Accepting): &#123; q₂ &#125;</span>
            </div>
          </div>
          <div className="partition-step">
            <h5>2. Equivalence Test</h5>
            <div className="p-box">
              <p className="test-line">δ(q₀, 0) = q₁, δ(q₁, 0) = q₁ ➔ Same Group</p>
              <p className="test-line">δ(q₀, 1) = q₂, δ(q₁, 1) = q₂ ➔ Same Group</p>
              <div className="result-badge">q₀ ≡ q₁ (States are Equivalent!)</div>
            </div>
          </div>
          <div className="partition-step">
            <h5>3. Minimal States</h5>
            <div className="p-box merged">
              <span>Merged State <b>[q₀, q₁]</b></span>
              <span>Accepting State <b>[q₂]</b></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (topicOrder === 4 || topicOrder === 7) {
    // Topic 4 & 7: Pumping Lemma (Regular & CFL)
    return (
      <div className="toc-diagram-card">
        <div className="diagram-header">
          <span className="badge">Pumping Lemma</span>
          <h4>String Decomposition: w = x yⁱ z (where |xy| ≤ p, |y| ≥ 1)</h4>
        </div>
        <div className="pumping-visual">
          <div className="string-segments">
            <div className="segment prefix">
              <span className="seg-label">x (Prefix)</span>
              <span className="seg-val">a a</span>
            </div>
            <div className="segment loop">
              <span className="seg-label">y (Pumped i={pumpI})</span>
              <span className="seg-val">{"b ".repeat(pumpI).trim() || "ε"}</span>
            </div>
            <div className="segment suffix">
              <span className="seg-label">z (Suffix)</span>
              <span className="seg-val">c c</span>
            </div>
          </div>
          <div className="pump-controls">
            <span>Try Pumping Factor (i):</span>
            <button className={pumpI === 0 ? "active-btn" : ""} onClick={() => setPumpI(0)}>i = 0 (Pump Down: xz)</button>
            <button className={pumpI === 1 ? "active-btn" : ""} onClick={() => setPumpI(1)}>i = 1 (Original: xyz)</button>
            <button className={pumpI === 2 ? "active-btn" : ""} onClick={() => setPumpI(2)}>i = 2 (Pump Up: xy²z)</button>
            <button className={pumpI === 3 ? "active-btn" : ""} onClick={() => setPumpI(3)}>i = 3 (xy³z)</button>
          </div>
        </div>
      </div>
    );
  }

  if (topicOrder === 5) {
    // Topic 5: CFG & Parse Trees
    return (
      <div className="toc-diagram-card">
        <div className="diagram-header">
          <span className="badge">Grammar Derivation</span>
          <h4>Context-Free Grammar Parse Tree Structure</h4>
        </div>
        <div className="svg-container">
          <svg viewBox="0 0 360 150" className="toc-svg">
            {/* Root S */}
            <circle cx="180" cy="25" r="16" fill="#e2f2ed" stroke="#16856b" strokeWidth="2" />
            <text x="180" y="29" textAnchor="middle" fill="#08705b" fontSize="13" fontWeight="bold">S</text>

            {/* Branches S -> A B */}
            <line x1="168" y1="37" x2="100" y2="75" stroke="#94a3b8" strokeWidth="2" />
            <line x1="192" y1="37" x2="260" y2="75" stroke="#94a3b8" strokeWidth="2" />

            {/* Node A */}
            <circle cx="100" cy="85" r="16" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
            <text x="100" y="89" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="bold">A</text>

            {/* Node B */}
            <circle cx="260" cy="85" r="16" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
            <text x="260" y="89" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="bold">B</text>

            {/* Leaf a from A */}
            <line x1="100" y1="101" x2="100" y2="125" stroke="#94a3b8" strokeWidth="2" />
            <rect x="88" y="125" width="24" height="20" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="100" y="139" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">a</text>

            {/* Leaf b from B */}
            <line x1="260" y1="101" x2="260" y2="125" stroke="#94a3b8" strokeWidth="2" />
            <rect x="248" y="125" width="24" height="20" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="260" y="139" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">b</text>
          </svg>
        </div>
        <div className="diagram-caption">
          <span><b>Production Rules:</b> S ➔ A B, A ➔ a, B ➔ b. Yield string: <b>ab</b>.</span>
        </div>
      </div>
    );
  }

  if (topicOrder === 6) {
    // Topic 6: Pushdown Automata (PDA)
    return (
      <div className="toc-diagram-card">
        <div className="diagram-header">
          <span className="badge">Memory Model</span>
          <h4>Pushdown Automaton (PDA): Input Tape + Finite State + LIFO Stack</h4>
        </div>
        <div className="pda-layout">
          <div className="pda-tape">
            <span className="pda-label">Input Tape:</span>
            <div className="tape-cells">
              <span className="cell read">a</span>
              <span className="cell">a</span>
              <span className="cell">b</span>
              <span className="cell">b</span>
            </div>
          </div>
          <div className="pda-control">
            <div className="state-bubble">Control: <b>q₀</b></div>
            <div className="op-text">Transition: δ(q₀, a, Z₀) = (q₀, aZ₀)</div>
          </div>
          <div className="pda-stack">
            <span className="pda-label">LIFO Stack:</span>
            <div className="stack-items">
              <span className="stack-cell top">a (Top)</span>
              <span className="stack-cell">a</span>
              <span className="stack-cell bottom">Z₀ (Start Symbol)</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (topicOrder === 8) {
    // Topic 8: Turing Machines
    return (
      <div className="toc-diagram-card">
        <div className="diagram-header">
          <span className="badge">Computational Model</span>
          <h4>Turing Machine: Infinite Tape & Read/Write Head Movement</h4>
        </div>
        <div className="tm-layout">
          <div className="tm-head-indicator">
            <div className="head-arrow">▼ Read/Write Head (State q₀)</div>
          </div>
          <div className="tm-tape">
            <span className="blank-cell">... B</span>
            <span className="tape-cell active">a</span>
            <span className="tape-cell">b</span>
            <span className="tape-cell">a</span>
            <span className="tape-cell">B</span>
            <span className="blank-cell">B ...</span>
          </div>
          <div className="tm-rules">
            <span><b>Transition Rule:</b> δ(q₀, a) = (q₁, b, R)</span>
            <small>Replace 'a' with 'b', move head Right (R), change state to q₁.</small>
          </div>
        </div>
      </div>
    );
  }

  if (topicOrder === 9) {
    // Topic 9: Chomsky Hierarchy
    return (
      <div className="toc-diagram-card">
        <div className="diagram-header">
          <span className="badge">Language Classification</span>
          <h4>Chomsky Hierarchy of Languages & Automata Power</h4>
        </div>
        <div className="chomsky-concentric">
          <div className="ring type0">
            <span className="ring-title">Type 0: Recursively Enumerable (Turing Machine)</span>
            <div className="ring type1">
              <span className="ring-title">Type 1: Context-Sensitive (Linear Bounded Automaton)</span>
              <div className="ring type2">
                <span className="ring-title">Type 2: Context-Free (Pushdown Automaton)</span>
                <div className="ring type3">
                  <span className="ring-title">Type 3: Regular (Finite Automaton)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (topicOrder === 10) {
    // Topic 10: Undecidability & Halting Problem
    return (
      <div className="toc-diagram-card">
        <div className="diagram-header">
          <span className="badge">Decidability Boundary</span>
          <h4>Halting Problem & Decision Hierarchy</h4>
        </div>
        <div className="undecidable-grid">
          <div className="decision-box recursive">
            <h5>Recursive Languages (Decidable)</h5>
            <p>Turing Machine <b>always halts</b> on every input string w (Accepts or Rejects).</p>
          </div>
          <div className="decision-box re">
            <h5>Recursively Enumerable (Semi-Decidable)</h5>
            <p>Turing Machine halts & accepts if w ∈ L, but may <b>loop infinitely</b> if w ∉ L.</p>
          </div>
          <div className="decision-box non-re">
            <h5>Non-RE (Undecidable)</h5>
            <p>No Turing Machine can recognize or decide the language (e.g. Complement of Halting Problem H_ALL).</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
