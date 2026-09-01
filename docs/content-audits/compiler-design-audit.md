# Compiler Design Content Audit

Reviewed: 1 September 2026  
Scope: 8-lesson Compiler Design module against the IOCL Grade-A CS/IT domain heading and the official GATE 2026 CS syllabus.

## Scope Check

IOCL lists **Compiler Design** as one of the ten CS/IT domain headings. GATE CS 2026 expands it into:
- Lexical analysis and parsing
- Syntax-directed translation
- Runtime environments
- Intermediate code generation
- Local optimization
- Data-flow analyses (constant propagation, liveness analysis, common subexpression elimination)

The 8-lesson module strictly stays within these boundaries without adding non-syllabus material (such as full machine code instruction selection for specific CPU architectures or complex interprocedural pointer analysis).

---

## Verified Lesson Outline & Key Elements Audit

| Lesson Number & Title | Syllabus Coverage & Key Concepts | Required Calculations & Diagrams | Key Comparisons | Common Exam Traps & Pitfalls | Primary Sources |
|---|---|---|---|---|---|
| **1. Compiler Architecture, Lexical Analysis, & Flex/Lex** | Compiler phases (Lexical, Syntax, Semantic, ICG, Code Opt, Code Gen), Tokens, Patterns, Lexemes, Regular Expressions, DFAs for Lexical Analysis, Flex/Lex tool principles. | DFA state minimization for lexical token matching, Input buffering (two-buffer scheme with sentinel). | Compiler vs Interpreter; Lexeme vs Token vs Pattern; Front-end (Language dependent) vs Back-end (Machine dependent). | Confusing Lexeme (the actual characters in source) with Token (abstract symbol class); assuming Lexical Analysis checks nested scope or matching parentheses. | Dragon Book Ch. 1–3; Cooper & Torczon Ch. 1–2 |
| **2. Context-Free Grammars, LL(1) Parsing, & FIRST/FOLLOW** | CFG formal definition, Left Recursion (Immediate & Indirect elimination), Left Factoring, Top-Down Parsing, FIRST and FOLLOW sets, LL(1) Parsing Table construction. | $\text{FIRST}(\alpha)$ and $\text{FOLLOW}(A)$ computation steps; LL(1) conflict check ($\text{FIRST}(\alpha) \cap \text{FIRST}(\beta) \neq \emptyset$ or $\text{FOLLOW}(A)$ overlap when $\epsilon \in \text{FIRST}$). | Top-down (LL) vs Bottom-up (LR); Left Recursion (destroys top-down parsers) vs Right Recursion. | Forgetting to add $\$$ (endmarker) to $\text{FOLLOW}(S)$; including $\epsilon$ in $\text{FOLLOW}$ sets (FOLLOW sets NEVER contain $\epsilon$); applying top-down parsing to left-recursive grammars. | Dragon Book Ch. 4; Hopcroft et al. Automata Theory |
| **3. Bottom-Up Parsing & LR Parsers (LR(0), SLR(1), LALR(1), CLR(1))** | Shift-Reduce parsing, Handle pruning, Canonical LR(0) items, SLR(1) parsing tables, CLR(1) with lookaheads, LALR(1) state merging, S/R and R/R conflicts. | $I_0$ closure construction, Goto transitions, counting item sets for LR(0) vs CLR(1) vs LALR(1), parsing table lookups. | LR(0) vs SLR(1) vs LALR(1) vs CLR(1) expressive power hierarchy; Shift/Reduce Conflict vs Reduce/Reduce Conflict. | LALR(1) state merging NEVER creates Shift/Reduce conflicts, but CAN create Reduce/Reduce conflicts; SLR(1) uses $\text{FOLLOW}(A)$ for reduction entries while LR(0) places reduction across ALL action columns. | Dragon Book Ch. 4; Cooper & Torczon Ch. 3 |
| **4. Syntax-Directed Translation (SDT)** | Syntax-Directed Definitions (SDD), Synthesized Attributes (S-attributed), Inherited Attributes (L-attributed), Syntax Trees, DAGs, Evaluation order & dependency graphs. | Attribute evaluation sequence along parse tree nodes; converting SDD to translation scheme (SDT) with inline actions. | Synthesized (Bottom-up flow) vs Inherited (Top-down & Left-to-right flow); S-attributed (LR-parseable) vs L-attributed (LL-parseable). | L-attributed definitions allow inherited attributes ONLY from left siblings or parent, never from right siblings; S-attributed SDDs are a strict subset of L-attributed SDDs. | Dragon Book Ch. 5 |
| **5. Intermediate Code Generation** | Intermediate Representations (IR), Three-Address Code (TAC), Quadruples (op, arg1, arg2, result), Triples, Indirect Triples, Postfix notation, Backpatching for boolean expressions. | Quadruples vs Triples indexing calculation; TAC translation for control flow (`if-then-else`, `while` loops). | Quadruples (explicit result field) vs Triples (positional implicit result) vs Indirect Triples (pointers to triples table). | Triples require updating positional references when instructions are reordered/optimized, whereas Quadruples do not; backpatching fills target labels in a single pass. | Dragon Book Ch. 6 |
| **6. Runtime Environments & Activation Records** | Memory layout (Text, Static Data, Heap, Stack), Activation Record (Frame) structure, Control Link vs Access Link, Parameter passing (Call by Value, Reference, Name, Result). | Stack pointer offset calculation, display array access for nested scoping, static/dynamic scope variable resolution. | Call by Value (copy value) vs Call by Reference (pass address) vs Call by Name (macro expansion / call-by-need Algol-60 style); Static Scope vs Dynamic Scope. | Access link (static link) points to immediate enclosing scope in source code, Control link (dynamic link) points to caller frame on stack; Call-by-value-result differs from Call-by-reference on aliased parameters. | Dragon Book Ch. 7; Cooper & Torczon Ch. 6 |
| **7. Local Code Optimization & DAGs** | Basic Blocks (Leaders identification algorithm), Control Flow Graphs (CFG), Directed Acyclic Graph (DAG) construction for basic blocks, Value Numbering, Algebraic simplification. | Leader identification algorithm step-by-step; DAG node creation for expressions to eliminate local redundant computations. | Local Optimization (within single basic block) vs Global Optimization (across basic blocks in CFG); DAG node representation for variables vs operators. | A target of a conditional or unconditional jump is ALWAYS a leader, as is the instruction immediately FOLLOWING a jump; basic blocks contain no jumps inside, only at the end. | Dragon Book Ch. 8–9; Cooper & Torczon Ch. 8–10 |
| **8. Data-Flow Analysis & Optimizations** | Data-flow framework, Constant Propagation, Liveness Analysis (backward may analysis), Common Subexpression Elimination, Dead Code Elimination, Worklist algorithm. | $\text{IN}[B]$ and $\text{OUT}[B]$ data-flow equations calculation: $\text{IN}[B] = \text{use}_B \cup (\text{OUT}[B] - \text{def}_B)$, $\text{OUT}[B] = \bigcup_{S \in \text{succ}(B)} \text{IN}[S]$. | Forward Analysis (e.g., Reaching Definitions, Available Expressions) vs Backward Analysis (e.g., Liveness Analysis); Must Analysis vs May Analysis. | Liveness analysis is a BACKWARD MAY analysis; a variable is live at point $p$ if there is AT LEAST ONE path from $p$ to a use of $x$ along which $x$ is not redefined. | Dragon Book Ch. 9; Cooper & Torczon Ch. 9 |

---

## Primary Verified Sources Inspected

1. **Aho, Lam, Sethi, Ullman** — *Compilers: Principles, Techniques, and Tools* (2nd Edition, "Dragon Book")
2. **Cooper, Keith & Torczon, Linda** — *Engineering a Compiler* (2nd Edition)
3. **Official GATE CS 2026 Syllabus** — Section 7: Compiler Design (`sources/official/CS_2026_Syllabus.pdf`)
4. **IOCL Grade-A Recruitment Notification Syllabus** — CS/IT Domain Heading: Compiler Design (`sources/official/GradeADomainKnowledge.pdf`)
