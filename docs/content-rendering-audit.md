# Content Rendering & Mathematical Notation Audit

## Executive Summary
This audit inspects how lesson content, practice questions, formulas, tables, and technical expressions are stored, formatted, and rendered across all four completed subjects: **Computer Networks (CN)**, **Operating Systems (OS)**, **Databases (DBMS)**, and **Theory of Computation (TOC)**.

---

## 1. Storage & Rendering Architecture

- **Storage Format:** Standard JSON files (`src/content/[subject]-module.json` and `src/content/[subject]-questions.json`).
- **Render Engine:** Native HTML tags (`<p>`, `<span>`, `<li>`, `<td>`, `<dd>`) rendered directly inside React components (`Learning.tsx`, `Practice.tsx`, `QuestionCard.tsx`).
- **Defects Identified:**
  1. Plain-text rendering of LaTeX commands (`\sum`, `\sigma`, `\pi`, `\bowtie`, `\to`, `\delta`).
  2. Unrendered subscripts (`_`) and superscripts (`^`) (e.g. `2^n`, `q_i`, `R_1`).
  3. Inconsistent delimiter usage: some strings use `$math$`, while others contain raw math without delimiters.
  4. JSON backslash escaping artifacts (e.g., `\n` in text like `\nStep` or `\nCT` misinterpreted as line breaks).
  5. Mobile responsiveness issues for wider formulas and tables.

---

## 2. Subject-by-Subject Math & Formatting Audit

### A. Computer Networks (CN)
- **Formulas Audited:**
  - Transmission Delay: $T_d = \frac{L}{B}$
  - Propagation Delay: $T_p = \frac{d}{v}$
  - Bandwidth-Delay Product (BDP): $\text{BDP} = B \times T_p$
  - Efficiency of Stop-and-Wait: $\eta = \frac{1}{1 + 2a}$ where $a = \frac{T_p}{T_d}$
  - Efficiency of Sliding Window (GBN / SR): $\eta = \frac{W}{1 + 2a}$
- **Formatting Defect:** Exponents like `2^m` and `2^32` were stored without math delimiters.

### B. Operating Systems (OS)
- **Formulas Audited:**
  - Turnaround Time: $\text{TAT} = \text{Completion Time} - \text{Arrival Time}$
  - Waiting Time: $\text{WT} = \text{TAT} - \text{Burst Time}$
  - Effective Access Time (EAT): $\text{EAT} = h \cdot t_c + (1 - h) \cdot (t_c + t_m)$
  - Page Table Size: $\text{Entries} = \frac{2^m}{\text{Page Size}}$
- **Formatting Defect:** JSON escaping of `\n` in `\nCT`, `\nTAT`, `\nWT` created malformed strings; `\to` appeared as raw `\to`.

### C. Databases (DBMS)
- **Formulas & Relational Algebra Audited:**
  - Selection: $\sigma_{\text{condition}}(R)$
  - Projection: $\pi_{\text{attributes}}(R)$
  - Natural Join: $R_1 \bowtie R_2$
  - Functional Dependencies & Closure: $\alpha \rightarrow \beta$, $X^+$
  - Cost models: $B(R)$, $V(R, A)$
- **Formatting Defect:** Raw LaTeX commands like `\sigma`, `\pi`, `\bowtie`, `\rho` were printed directly into DOM text without KaTeX rendering.

### D. Theory of Computation (TOC)
- **Formulas & Automata Notation Audited:**
  - Arden's Theorem: $q_i = \sum_{j} q_j \cdot a_{ji}$ $\implies$ $R = Q + R \cdot P \implies R = Q \cdot P^*$ (where $\epsilon \notin L(P)$)
  - Pumping Lemma for Regular Languages: $w = xyz$, $|xy| \le p$, $|y| \ge 1$, $xy^i z \in L$
  - Pumping Lemma for CFLs: $w = uvxyz$, $|vxy| \le p$, $|vy| \ge 1$, $u v^i x y^i z \in L$
  - DFA 5-tuple: $M = (Q, \Sigma, \delta, q_0, F)$
  - Transition Function: $\delta: Q \times \Sigma \rightarrow Q$
- **Formatting Defect:** Summation bounds and superscript/subscript indices appeared as unrendered raw strings (`q_i = \sum q_j \cdot a_{ji}`).

---

## 3. Recommended Remediation Plan
1. Install `react-markdown`, `remark-gfm`, `remark-math`, `rehype-katex`, `katex`.
2. Create a unified `<RichContent />` component with math pre-processing for legacy dollar-less formulas.
3. Add global KaTeX CSS import and custom styling for responsive display math blocks.
4. Implement a centralized SVG Diagram Registry (`DiagramRegistry`) with 2 high-impact diagrams per subject.
5. Create an automated content audit script and update `docs/CONTENT_POLICY.md` & `AGENTS.md`.
