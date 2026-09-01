# IOCL Prep Hub — CS & IT Subject Roadmap

Reviewed: 1 September 2026  
Scope: Roadmap for implementing all 10 official IOCL Computer Science & Information Technology domain subjects.  
Canonical Reference Module: **Computer Networks** (Status: `APPROVED`).

---

## Roadmap Overview & Priority Order

The official IOCL Grade-A Computer Science and IT CBT syllabus comprises 10 domain subjects. Content is developed sequentially in priority order. Each subject expands IOCL's broad domain heading using the official GATE CS 2026 syllabus without exceeding IOCL exam boundaries.

| Priority | Subject Name | Expected Lessons | Target Formulas & Calculations | Initial Status |
|---|---|---:|---|---|
| **0** | **Computer Networks** | 14 | Delays, BDP, Subnetting, Sliding Window, TCP RTT/Window | `APPROVED` |
| **1** | **Operating Systems** | 12 | CPU scheduling, Banker's Algorithm, Page tables, Page replacement | `COMPLETE` |
| **2** | **Databases** | 10 | Relational algebra, Normalization closure, B+ tree order/height | `COMPLETE` |
| **3** | **Theory of Computation** | 10 | Pumping lemma bounds, DFA minimization, Closure properties | `COMPLETE` |
| **4** | **Compiler Design** | 8 | FIRST/FOLLOW sets, Parsing tables, Liveness analysis | `COMPLETE` |
| **5** | **Programming and Data Structures** | 10 | Recursion depth, Tree traversals, BST operations, Heapify | `NOT_STARTED` |
| **6** | **Algorithms** | 12 | Asymptotic bounds, Recurrences, MST/Shortest path weights | `NOT_STARTED` |
| **7** | **Digital Logic** | 8 | K-map minimization, Multiplexer realization, FLOP propagation | `NOT_STARTED` |
| **8** | **Computer Organization & Architecture** | 10 | Pipeline speedup/stalls, Cache mapping & hit ratios, IEEE 754 | `NOT_STARTED` |
| **9** | **Engineering Mathematics** | 12 | Matrix rank/eigenvalues, Bayes theorem, Combinatorics, Recurrences | `NOT_STARTED` |

---

## Detailed Subject Specifications

### 1. Operating Systems (Priority 1)

* **Status**: `COMPLETE`
* **Official Syllabus Coverage**:
  * IOCL Broad Heading: Operating System
  * GATE CS Detailed Expansion: System calls, processes, threads, inter-process communication, concurrency and synchronization, deadlock, CPU and I/O scheduling, memory management and virtual memory, file systems.
* **Proposed Lesson Sequence** (12 Lessons):
  1. Operating System Structure, System Calls, and User/Kernel Modes
  2. Processes, Threads, Context Switching, and Process State Transitions
  3. Inter-Process Communication (Shared Memory & Message Passing)
  4. CPU Scheduling Algorithms (FCFS, SJF, SRTF, Round Robin, Priority)
  5. Process Synchronization: Critical Section Problem, Semaphores, and Mutex
  6. Classic Synchronization Problems (Producer-Consumer, Readers-Writers, Dining Philosophers)
  7. Deadlocks: Characterization, Prevention, Avoidance (Banker's Algorithm), and Detection
  8. Memory Management: Contiguous Allocation, Paging, and Segmentation
  9. Virtual Memory: Demand Paging and Page Table Structures (Multi-level, Inverted)
  10. Page Replacement Algorithms (FIFO, Optimal, LRU, Clock) and Thrashing
  11. Disk Scheduling (FCFS, SSTF, SCAN, C-SCAN, LOOK) and I/O Management
  12. File System Structure, Allocation Methods (Contiguous, Linked, Indexed), and Directory Systems
* **Important Formulas & Calculations**:
  * Average Turnaround Time ($\text{TAT} = \text{Completion Time} - \text{Arrival Time}$)
  * Average Waiting Time ($\text{WT} = \text{TAT} - \text{Burst Time}$)
  * Banker's Safety Algorithm ($\text{Need} = \text{Max} - \text{Allocation}$)
  * Page Table Size calculations & Effective Access Time ($\text{EAT} = (1-p) \cdot t_{\text{mem}} + p \cdot t_{\text{page\_fault}}$)
  * Disk Access Time ($\text{Access Time} = \text{Seek Time} + \text{Rotational Latency} + \text{Transfer Time}$)
* **Expected MCQ Categories**:
  * Numerical: CPU turnaround/wait time computation, Banker's algorithm safe sequence verification, Paging memory address translation, Page fault count comparison.
  * Conceptual: Process states, Semaphore wait/signal semantics, Deadlock necessary conditions, Virtual memory thrashing causes.
* **Recommended Primary Sources**:
  * Silberschatz, Galvin, Gagne — *Operating System Concepts*
  * Stallings — *Operating Systems: Internals and Design Principles*
  * POSIX IEEE Standard 1003.1 (System Calls & Threads)

---

### 2. Databases (Priority 2)

* **Status**: `COMPLETE`
* **Official Syllabus Coverage**:
  * IOCL Broad Heading: Databases
  * GATE CS Detailed Expansion: ER model, relational model, relational algebra, tuple calculus, SQL, integrity constraints and normal forms, file organization and indexing (including B and B+ trees), transactions and concurrency control.
* **Proposed Lesson Sequence** (10 Lessons):
  1. Entity-Relationship (ER) Modeling, Entities, Relationships, and Cardinality Constraints
  2. Relational Model Fundamentals: Keys (Candidate, Primary, Super, Foreign) and Integrity Constraints
  3. Relational Algebra (Select, Project, Join, Set Operations, Division) & Relational Calculus
  4. Structured Query Language (SQL): DDL, DML, Nested Queries, Aggregations, and Joins
  5. Functional Dependencies, Attribute Closure, and Candidate Key Derivation
  6. Database Normalization: 1NF, 2NF, 3NF, BCNF, Lossless Join, and Dependency Preservation
  7. Storage Structures & Indexing: Primary, Secondary, Clustered Indexes, B-Trees and B+ Trees
  8. Transaction Processing: ACID Properties, Transaction States, and Schedules
  9. Serializability: Conflict Serializability, Precedence Graphs, and View Serializability
  10. Concurrency Control: Two-Phase Locking (2PL, Strict 2PL), Timestamp Ordering, and Deadlocks
* **Important Formulas & Calculations**:
  * Functional Dependency Closures ($X^+$)
  * B/B+ Tree Order, Max/Min Keys per Node, Tree Height & Max Records
  * Maximum and Minimum Rows in Relational Joins ($\bowtie$)
  * Precedence Graph Cycle Detection for Conflict Serializability
* **Expected MCQ Categories**:
  * Numerical: Candidate key counting from FDs, Highest Normal Form identification, B+ Tree node capacity & fan-out calculation.
  * Conceptual: SQL query equivalence, Conflict vs View serializability, 2PL lock compatibility, ER to Relational schema reduction.
* **Recommended Primary Sources**:
  * Elmasri, Navathe — *Fundamentals of Database Systems*
  * Silberschatz, Korth, Sudarshan — *Database System Concepts*
  * ISO/IEC 9075 SQL Standard Specification

---

### 3. Theory of Computation (Priority 3)

* **Status**: `COMPLETE`
* **Official Syllabus Coverage**:
  * IOCL Broad Heading: Theory of Computation
  * GATE CS Detailed Expansion: Regular expressions and finite automata, context-free grammars and push-down automata, regular and context-free languages, pumping lemma, Turing machines and undecidability.
* **Proposed Lesson Sequence** (10 Lessons):
  1. Finite Automata: Deterministic (DFA) and Nondeterministic (NFA), NFA to DFA Conversion
  2. Regular Expressions, Equivalence with Finite Automata, and Arden's Theorem
  3. Minimization of DFA (State Equivalence & Myhill-Nerode Theorem)
  4. Pumping Lemma for Regular Languages and Non-regularity Proofs
  5. Context-Free Grammars (CFG): Derivations, Parse Trees, Ambiguity, and Normal Forms (CNF, GNF)
  6. Pushdown Automata (PDA): Deterministic vs Nondeterministic, Equivalence with CFG
  7. Pumping Lemma for Context-Free Languages and Closure Properties of Language Families
  8. Turing Machines (TM): Model Variants, Language Acceptance (Decidable vs Recognizable)
  9. Chomsky Hierarchy of Languages and Automata Summary
  10. Undecidability: Halting Problem, Rice's Theorem, Post Correspondence Problem (PCP), and Reductions
* **Important Formulas & Calculations**:
  * Minimum DFA States for Specific Language Conditions (e.g. divisible by $k$, ending in pattern)
  * Pumping Lemma String Splitting Bounds ($|xy| \le p, |y| \ge 1$)
  * Closure Property Matrix (Union, Intersection, Complement, Concatenation, Kleene Star)
* **Expected MCQ Categories**:
  * Conceptual: Language classification within Chomsky Hierarchy, Decidability status of specific properties, Closure property verification.
  * Numerical/Structural: DFA state minimization count, Regular expression matching identification, Ambiguous grammar detection.
* **Recommended Primary Sources**:
  * Hopcroft, Motwani, Ullman — *Introduction to Automata Theory, Languages, and Computation*
  * Michael Sipser — *Introduction to the Theory of Computation*

---

### 4. Compiler Design (Priority 4)

* **Status**: `IN_PROGRESS`
* **Official Syllabus Coverage**:
  * IOCL Broad Heading: Compiler Design
  * GATE CS Detailed Expansion: Lexical analysis and parsing, syntax-directed translation, runtime environments, intermediate code generation, local optimization, data-flow analyses (constant propagation, liveness analysis, common subexpression elimination).
* **Proposed Lesson Sequence** (8 Lessons):
  1. Compiler Architecture, Phases of Compilation, and Lexical Analysis (Tokens, Flex/Lex)
  2. Top-Down Parsing: LL(1) Grammars, FIRST and FOLLOW Set Computation, Recursive Descent
  3. Bottom-Up Parsing: Shift-Reduce, Operator Precedence, LR(0), SLR(1), LALR(1), and CLR(1)
  4. Syntax-Directed Translation (SDT): Synthesized & Inherited Attributes, S-attributed & L-attributed SDDs
  5. Intermediate Code Generation: Three-Address Code (TAC), Quadruples, Triples, Postfix
  6. Runtime Environments: Storage Organization, Activation Records, Stack Allocation, Parameter Passing
  7. Local Code Optimization: Basic Blocks, Control Flow Graphs (CFG), DAG Representation, Loop Optimization
  8. Data-Flow Analysis: Constant Propagation, Liveness Analysis, and Common Subexpression Elimination
* **Important Formulas & Calculations**:
  * FIRST and FOLLOW set construction algorithms
  * LL(1) and SLR(1) Parsing Table Conflict Detection (Shift/Reduce, Reduce/Reduce)
  * Basic Block boundaries and Directed Acyclic Graph (DAG) construction for expression optimization
* **Expected MCQ Categories**:
  * Numerical/Algorithmic: Computation of FIRST/FOLLOW for a grammar, LR item set counts, TAC optimization reduction.
  * Conceptual: LL(1) vs LR(1) grammar capability hierarchy, Inherited vs Synthesized attribute rules, Liveness analysis direction (backward/may).
* **Recommended Primary Sources**:
  * Aho, Lam, Sethi, Ullman — *Compilers: Principles, Techniques, and Tools* ("Dragon Book")
  * Cooper, Torczon — *Engineering a Compiler*

---

### 5. Programming and Data Structures (Priority 5)

* **Status**: `NOT_STARTED`
* **Official Syllabus Coverage**:
  * IOCL Broad Heading: Programming and Data Structures
  * GATE CS Detailed Expansion: Programming in C, recursion, arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, and graphs.
* **Proposed Lesson Sequence** (10 Lessons):
  1. C Language Fundamentals: Control Flow, Operators, Pointers, Arrays, and Memory Layout
  2. Functions, Parameter Passing (Value vs Reference/Pointer), and Recursion Stack Analysis
  3. Structures, Unions, Dynamic Memory Allocation (`malloc`, `calloc`, `free`), and Pointer Arithmetic
  4. Linear Data Structures: Arrays (1D, 2D address mapping) and Linked Lists (Singly, Doubly, Circular)
  5. Stacks: Array & Linked Implementation, Infix/Postfix/Prefix Conversions, Evaluation
  6. Queues: Linear, Circular Queues, Priority Queues, and Deques
  7. Trees: Terminology, Binary Trees, Traversals (Preorder, Inorder, Postorder, Level-order)
  8. Binary Search Trees (BST): Insertion, Deletion, Search, and BST Properties
  9. Binary Heaps: Max-Heap, Min-Heap, Heapify Algorithm, and Priority Queue Implementation
  10. Graph Representations: Adjacency Matrix, Adjacency List, and Structural Properties
* **Important Formulas & Calculations**:
  * 2D Array Address Mapping: $\text{Loc}(A[i][j]) = \text{Base} + [(i - LB_1) \cdot N + (j - LB_2)] \cdot w$ (Row Major)
  * Tree Height vs Node Bounds ($N_{\min} = h+1, N_{\max} = 2^{h+1}-1$)
  * Infix to Postfix/Prefix conversion rules & Stack depth calculation
  * Recursive Call Stack Frame Count and Space Complexity
* **Expected MCQ Categories**:
  * Code Snippet Output: C pointer manipulation, recursive execution tracing, post-increment vs pre-increment subtleties.
  * Conceptual/Structural: BST insertion/deletion outcome, Tree traversal reconstruction (Inorder + Preorder $\rightarrow$ Postorder).
* **Recommended Primary Sources**:
  * Kernighan, Ritchie — *The C Programming Language* (ANSI C)
  * Mark Allen Weiss — *Data Structures and Algorithm Analysis in C*

---

### 6. Algorithms (Priority 6)

* **Status**: `NOT_STARTED`
* **Official Syllabus Coverage**:
  * IOCL Broad Heading: Algorithms
  * GATE CS Detailed Expansion: Searching, sorting, and hashing; asymptotic worst-case time and space complexity; greedy, dynamic programming, and divide-and-conquer techniques; graph traversals, minimum spanning trees, and shortest paths.
* **Proposed Lesson Sequence** (12 Lessons):
  1. Asymptotic Analysis: Big-O, Big-$\Omega$, Big-$\Theta$, Little-o, Little-$\omega$, and Complexity Growth
  2. Recurrence Relations: Substitution, Recursion Tree, and Master Theorem
  3. Searching Algorithms (Linear, Binary Search) & Hashing (Hash Functions, Open/Closed Addressing)
  4. Comparison-Based Sorting: Bubble, Selection, Insertion, Merge Sort, Quick Sort, and Heap Sort
  5. Linear-Time Sorting: Counting Sort, Radix Sort, Bucket Sort, and Lower Bounds for Sorting
  6. Divide and Conquer Strategy: Binary Search, Merge Sort, Quick Select, and Matrix Multiplication
  7. Greedy Algorithms: Fractional Knapsack, Job Sequencing, Huffman Coding
  8. Dynamic Programming: 0/1 Knapsack, Longest Common Subsequence (LCS), Matrix Chain Multiplication
  9. Graph Algorithms: Breadth-First Search (BFS) and Depth-First Search (DFS), Topological Sort
  10. Minimum Spanning Trees (MST): Prim's and Kruskal's Algorithms
  11. Single-Source Shortest Paths: Dijkstra's Algorithm, Bellman-Ford Algorithm
  12. All-Pairs Shortest Paths (Floyd-Warshall) & NP-Completeness Foundations (P, NP, NP-Complete)
* **Important Formulas & Calculations**:
  * Master Theorem: $T(n) = a T(n/b) + f(n)$ case evaluations
  * Worst-case vs Average-case comparison counts for sorting algorithms
  * Hash table collision probability & probe sequence formulas (Linear/Quadratic probing, Double hashing)
  * Minimum Spanning Tree edge weights and shortest path triangle inequality
* **Expected MCQ Categories**:
  * Numerical: Recurrence solving, Array sorting step-by-step trace, Shortest path distance calculations.
  * Conceptual: Time/Space complexity bounds, Greedy choice property vs Optimal Substructure, Graph cycle detection criteria.
* **Recommended Primary Sources**:
  * Cormen, Leiserson, Rivest, Stein — *Introduction to Algorithms* (CLRS)
  * Kleinberg, Tardos — *Algorithm Design*

---

### 7. Digital Logic (Priority 7)

* **Status**: `NOT_STARTED`
* **Official Syllabus Coverage**:
  * IOCL Broad Heading: Digital Logic
  * GATE CS Detailed Expansion: Boolean algebra, combinational and sequential circuits, minimization, number representations, fixed- and floating-point computer arithmetic.
* **Proposed Lesson Sequence** (8 Lessons):
  1. Number Systems, Base Conversions, Signed Representation (1's & 2's Complement)
  2. Floating-Point Representation (IEEE 754 Single & Double Precision Standards)
  3. Boolean Algebra, Logic Gates (NAND/NOR Universality), Duality, and Canonical Forms (SOP, POS)
  4. Gate-Level Minimization: Karnaugh Maps (K-Maps) up to 4 variables, Don't Care conditions
  5. Combinational Circuits I: Adders (Half/Full, Ripple Carry, Lookahead), Subtractors, Multipliers
  6. Combinational Circuits II: Multiplexers, Demultiplexers, Decoders, Encoders, Priority Encoders
  7. Sequential Circuits I: Latches, Flip-Flops (SR, JK, D, T), Triggering, Setup & Hold Times
  8. Sequential Circuits II: Registers, Counters (Asynchronous/Ripple, Synchronous, Ring, Johnson), Finite State Machines (Mealy & Moore)
* **Important Formulas & Calculations**:
  * IEEE 754 Value: $V = (-1)^s \times (1.M) \times 2^{E - 127}$
  * 2's Complement Range: $-2^{n-1} \text{ to } 2^{n-1}-1$
  * Propagation Delay & Maximum Clock Frequency ($f_{\max} = 1 / (t_{\text{prop}} + t_{\text{setup}})$)
  * MUX Implementation equation derivation
* **Expected MCQ Categories**:
  * Numerical: IEEE 754 binary conversion, K-map minimal SOP expression count, Counter MOD number calculation.
  * Conceptual: Mealy vs Moore state machine output dependency, Setup/Hold time violation causes, Universal gate implementations.
* **Recommended Primary Sources**:
  * M. Morris Mano, Michael D. Ciletti — *Digital Design*
  * IEEE Standard 754-2019 for Floating-Point Arithmetic

---

### 8. Computer Organization and Architecture (Priority 8)

* **Status**: `NOT_STARTED`
* **Official Syllabus Coverage**:
  * IOCL Broad Heading: Computer Organization and Architecture
  * GATE CS Detailed Expansion: Machine instructions and addressing modes, ALU, datapath and control unit, instruction pipelining and pipeline hazards, memory hierarchy (cache, main memory, secondary storage), I/O interface, interrupts, and DMA.
* **Proposed Lesson Sequence** (10 Lessons):
  1. Machine Instructions, Instruction Formats (0, 1, 2, 3-address), and Addressing Modes
  2. Control Unit Design: Hardwired vs Microprogrammed Control Units, Horizontal vs Vertical Microinstructions
  3. Datapath & ALU Organization: Register Transfer Language, Arithmetic & Logic Unit Operations
  4. Instruction Pipelining: Pipeline Stages, Throughput, Speedup, Efficiency
  5. Pipeline Hazards: Structural, Data (RAW, WAR, WAW), and Control Hazards; Hazard Resolution
  6. Memory Hierarchy & Main Memory (RAM, ROM, DRAM vs SRAM timing)
  7. Cache Memory Organization: Direct Mapping, Associative Mapping, Set-Associative Mapping
  8. Cache Write Policies (Write-Through, Write-Back), Replacement Policies, and Hit/Miss Ratios
  9. Input/Output Organization: Programmed I/O, Interrupt-Driven I/O, Interrupt Vectoring
  10. Direct Memory Access (DMA): Controller Architecture, Burst Mode vs Cycle Stealing Mode, I/O Bus
* **Important Formulas & Calculations**:
  * Speedup ($S = \frac{T_n}{T_k} = \frac{n \cdot k}{k + (n-1)}$ for $n$ instructions, $k$ stages)
  * Effective Access Time ($\text{EAT} = h \cdot t_c + (1-h) \cdot t_m$)
  * Cache Tag, Index, and Block Offset Bit Width Calculations
  * DMA Data Transfer Rate & CPU Cycle Stealing Percentage
* **Expected MCQ Categories**:
  * Numerical: Cache bit field sizing (Tag/Index/Offset), Pipeline speedup with stalls, Average memory access time.
  * Conceptual: Addressing mode identification (Indexed, Auto-increment, Indirect), Hardwired vs Microprogrammed trade-offs, RAW hazard detection.
* **Recommended Primary Sources**:
  * Carl Hamacher, Zvonko Vranesic, Safwat Zaky — *Computer Organization*
  * David A. Patterson, John L. Hennessy — *Computer Organization and Design: The Hardware/Software Interface*

---

### 9. Engineering Mathematics (Priority 9)

* **Status**: `NOT_STARTED`
* **Official Syllabus Coverage**:
  * IOCL Broad Heading: Engineering Mathematics
  * GATE CS Detailed Expansion: Discrete mathematics (logic, sets, relations, functions, partial orders, lattices, groups, graph theory, combinatorics, recurrences); Linear algebra; Calculus; Probability and statistics.
* **Proposed Lesson Sequence** (12 Lessons):
  1. Propositional Logic, First-Order Predicate Logic, Logical Equivalence, and Rules of Inference
  2. Sets, Relations (Equivalence, Partial Order, Posets), Lattices, and Functions
  3. Algebraic Structures: Monoids, Groups, Subgroups, Cosets, and Lagrange's Theorem
  4. Graph Theory I: Connectivity, Paths, Cycles, Eulerian and Hamiltonian Graphs
  5. Graph Theory II: Planar Graphs, Graph Coloring (Chromatic Number), Matching, and Trees
  6. Combinatorics: Permutations, Combinations, Pigeonhole Principle, Inclusion-Exclusion
  7. Generating Functions & Recurrence Relations (Homogeneous & Non-Homogeneous)
  8. Linear Algebra I: Matrices, Determinants, Systems of Linear Equations, Gaussian Elimination, LU Decomposition
  9. Linear Algebra II: Vector Spaces, Basis, Rank, Eigenvalues, Eigenvectors, and Cayley-Hamilton Theorem
  10. Calculus: Limits, Continuity, Differentiability, Maxima and Minima, Mean Value Theorems
  11. Integral Calculus: Definite/Indefinite Integrals, Double Integrals
  12. Probability & Statistics: Conditional Probability, Bayes Theorem, Random Variables, Distributions (Uniform, Normal, Exponential, Poisson, Binomial), Mean & Variance
* **Important Formulas & Calculations**:
  * Euler's Formula for Planar Graphs ($V - E + F = 2$)
  * Characteristic Equation & Eigenvalues ($\det(A - \lambda I) = 0$)
  * Bayes' Theorem ($P(A|B) = \frac{P(B|A) P(A)}{P(B)}$)
  * Binomial, Poisson, and Normal Distribution Expectation ($\mu$) and Variance ($\sigma^2$)
* **Expected MCQ Categories**:
  * Numerical: Matrix Eigenvalue computation, Bayes probability calculation, Combinatorial counting, Graph chromatic number.
  * Conceptual: Equivalence relation verification, Planar graph properties, Logical deduction validity.
* **Recommended Primary Sources**:
  * Kenneth H. Rosen — *Discrete Mathematics and Its Applications*
  * Gilbert Strang — *Linear Algebra and Its Applications*
  * Erwin Kreyszig — *Advanced Engineering Mathematics*

---

## Content Integrity & Governance Rules

1. **Sequential Implementation**: Content modules and question banks for remaining subjects must be authored one subject at a time.
2. **Quality & Provenance Gate**: Every enabled question must pass `docs/CONTENT_POLICY.md` validation before publishing.
3. **No Placeholders**: If a subject's content module is not yet published, the application MUST gracefully display "Coming next" rather than synthetic or incomplete dummy content.
4. **Data Isolation**: Attempt metrics, bookmarks, wrong answers, and progress tokens must be keyed per subject to maintain strict subject separation in `localStorage`.
