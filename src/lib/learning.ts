import type { LearningModule } from "../types";

export const NETWORK_TOPIC_ORDER = [
  "Network fundamentals and performance terms",
  "OSI and TCP/IP models",
  "Hub, repeater, bridge, switch, router and gateway",
  "Ethernet, MAC addressing and switching",
  "Error detection, flow control and sliding-window protocols",
  "IPv4 addressing",
  "Subnetting, CIDR and route aggregation",
  "ARP, DHCP, ICMP and NAT",
  "Routing algorithms and routing protocols",
  "TCP and UDP",
  "TCP connection establishment and termination",
  "Flow control and congestion control",
  "DNS, HTTP/HTTPS, FTP, SMTP and email",
  "Network security fundamentals",
] as const;

export const OS_TOPIC_ORDER = [
  "Operating System Structure, System Calls, and User/Kernel Modes",
  "Processes, Threads, Context Switching, and Process State Transitions",
  "Inter-Process Communication (Shared Memory & Message Passing)",
  "CPU Scheduling Algorithms (FCFS, SJF, SRTF, Round Robin, Priority)",
  "Process Synchronization: Critical Section Problem, Semaphores, and Mutex",
  "Classic Synchronization Problems (Producer-Consumer, Readers-Writers, Dining Philosophers)",
  "Deadlocks: Characterization, Prevention, Avoidance, and Detection",
  "Memory Management: Contiguous Allocation, Paging, and Segmentation",
  "Virtual Memory: Demand Paging, Page Table Structures, and TLB",
  "Page Replacement Algorithms (FIFO, Optimal, LRU, Clock) and Thrashing",
  "Disk Scheduling (FCFS, SSTF, SCAN, C-SCAN, LOOK) and I/O Management",
  "File System Structure, Allocation Methods, and Directory Systems",
] as const;

export const DBMS_TOPIC_ORDER = [
  "Entity-Relationship (ER) Modeling, Entities, Relationships, and Constraints",
  "Relational Model Fundamentals: Keys and Integrity Constraints",
  "Relational Algebra & Relational Calculus",
  "Structured Query Language (SQL): DDL, DML, Aggregations, and Joins",
  "Functional Dependencies, Attribute Closure, and Candidate Key Derivation",
  "Database Normalization: 1NF, 2NF, 3NF, BCNF, and Decompositions",
  "Storage Structures, Indexing, B-Trees and B+ Trees",
  "Transaction Processing and ACID Properties",
  "Serializability: Conflict & View Serializability, Precedence Graphs",
  "Concurrency Control: Two-Phase Locking (2PL) and Timestamp Ordering",
] as const;

export const TOC_TOPIC_ORDER = [
  "Finite Automata: Deterministic (DFA), Nondeterministic (NFA), and Equivalence",
  "Regular Expressions, Regular Languages, and Arden's Theorem",
  "DFA Minimization and Myhill-Nerode Theorem",
  "Pumping Lemma for Regular Languages and Non-Regularity Proofs",
  "Context-Free Grammars (CFG), Parse Trees, and Ambiguity",
  "Pushdown Automata (PDA) and Context-Free Languages (CFL)",
  "Pumping Lemma for CFLs and Closure Properties",
  "Turing Machines (TM) and Language Acceptance",
  "Chomsky Hierarchy of Languages",
  "Undecidability, Halting Problem, and Rice's Theorem",
] as const;

export const COMPILER_DESIGN_TOPIC_ORDER = [
  "Compiler Architecture, Lexical Analysis, and Tokenization",
  "Context-Free Grammars, LL(1) Parsing, and FIRST & FOLLOW Sets",
  "Bottom-Up Parsing and LR Parsers: LR(0), SLR(1), LALR(1), and CLR(1)",
  "Syntax-Directed Translation (SDT): Synthesized & Inherited Attributes",
  "Intermediate Code Generation (ICG): Three-Address Code, Quadruples, and Triples",
  "Runtime Environments, Memory Layout, and Activation Records",
  "Local Code Optimization, Basic Blocks, and Directed Acyclic Graphs (DAGs)",
  "Data-Flow Analysis: Constant Propagation, Liveness Analysis, and CSE",
] as const;

export const COA_TOPIC_ORDER = [
  "Machine Instructions, Instruction Formats, and Addressing Modes",
  "Control Unit Design: Hardwired vs Microprogrammed",
  "Datapath & ALU Organization",
  "Instruction Pipelining: Stages, Throughput, Speedup",
  "Pipeline Hazards: Structural, Data, and Control Hazards",
  "Memory Hierarchy & Main Memory",
  "Cache Memory Organization: Direct, Associative, Set-Associative",
  "Cache Policies and Hit/Miss Ratios",
  "Input/Output Organization: Programmed & Interrupt-Driven I/O",
  "Direct Memory Access (DMA)",
] as const;

export const DIGITAL_LOGIC_TOPIC_ORDER = [
  "Number Systems, Base Conversions, Signed Representation",
  "Floating-Point Representation (IEEE 754)",
  "Boolean Algebra & Logic Gates",
  "Gate-Level Minimization (K-Maps)",
  "Combinational Circuits I: Arithmetic",
  "Combinational Circuits II: Data Routing",
  "Sequential Circuits I: Latches & Flip-Flops",
  "Sequential Circuits II: Registers & Counters",
] as const;

export const ENGINEERING_MATHEMATICS_TOPIC_ORDER = [
  "Propositional & First-Order Logic",
  "Sets, Relations, Lattices & Functions",
  "Algebraic Structures: Monoids & Groups",
  "Graph Theory I: Connectivity, Paths & Cycles",
  "Graph Theory II: Planarity, Coloring & Matching",
  "Combinatorics: Permutations & Combinations",
  "Generating Functions & Recurrence Relations",
  "Linear Algebra I: Matrices & Systems of Equations",
  "Linear Algebra II: Vector Spaces & Eigenvalues",
  "Calculus: Limits, Continuity & Maxima/Minima",
  "Integral Calculus: Integration",
  "Probability & Statistics: Distributions & Bayes",
] as const;

const text = (value: unknown) => typeof value === "string" && Boolean(value.trim());
const strings = (value: unknown) => Array.isArray(value) && value.length > 0 && value.every(text);
const validUrl = (value: unknown) => {
  try { return typeof value === "string" && new URL(value).protocol === "https:"; } catch { return false; }
};

export function validateLearningModule(value: unknown): LearningModule {
  if (!value || typeof value !== "object") throw new Error("Learning module must be an object.");
  const module = value as Record<string, unknown>;
  if (!text(module.id) || !text(module.title) || module.provenance !== "original") throw new Error("Learning module has invalid metadata.");
  const syllabus = module.syllabusSource as Record<string, unknown> | undefined;
  if (!syllabus || !text(syllabus.title) || !validUrl(syllabus.url)) throw new Error("Learning module has an invalid syllabus source.");
  if (!Array.isArray(module.topics) || module.topics.length === 0) throw new Error("Learning module must contain topics.");

  module.topics.forEach((raw, index) => {
    if (!raw || typeof raw !== "object") throw new Error(`Learning topic ${index + 1} must be an object.`);
    const topic = raw as Record<string, unknown>;
    if (typeof topic.order !== "number" || !text(topic.title)) throw new Error(`Learning topic ${index + 1} has invalid order or title.`);
    for (const field of ["oneLine", "whyItMatters"] as const) if (!text(topic[field])) throw new Error(`Learning topic ${index + 1} requires ${field}.`);
    for (const field of ["understandSimply", "technicalExplanation", "formulasAndMethods", "traps"] as const) if (!strings(topic[field])) throw new Error(`Learning topic ${index + 1} requires ${field}.`);
    if (!Array.isArray(topic.comparisons) || (topic.comparisons as unknown[]).some((item) => !item || typeof item !== "object" || !text((item as Record<string, unknown>).title) || !strings((item as Record<string, unknown>).columns) || !Array.isArray((item as Record<string, unknown>).rows))) throw new Error(`Learning topic ${index + 1} requires valid comparisons with title, columns, and rows.`);
    if (!Array.isArray(topic.definitions) || !topic.definitions.length || (topic.definitions as unknown[]).some((item) => !item || typeof item !== "object" || !text((item as Record<string, unknown>).term) || !text((item as Record<string, unknown>).definition))) throw new Error(`Learning topic ${index + 1} has invalid definitions.`);
    if (!Array.isArray(topic.steps) || !topic.steps.length || (topic.steps as unknown[]).some((item) => !item || typeof item !== "object" || !text((item as Record<string, unknown>).title) || !text((item as Record<string, unknown>).description))) throw new Error(`Learning topic ${index + 1} has invalid steps.`);
    if (!Array.isArray(topic.solvedExamples) || topic.solvedExamples.length < 1 || (topic.solvedExamples as unknown[]).some((item) => !item || typeof item !== "object" || !text((item as Record<string, unknown>).question) || !text((item as Record<string, unknown>).solution))) throw new Error(`Learning topic ${index + 1} requires valid solved examples.`);
    if (!Array.isArray(topic.takeaways) || topic.takeaways.length < 1 || !(topic.takeaways as unknown[]).every(text)) throw new Error(`Learning topic ${index + 1} requires takeaways.`);
    if (!Array.isArray(topic.quickRecall) || topic.quickRecall.length < 1 || topic.quickRecall.some((item) => !item || typeof item !== "object" || !text((item as Record<string, unknown>).question) || !text((item as Record<string, unknown>).answer))) throw new Error(`Learning topic ${index + 1} requires quick-recall prompts.`);
    if (!Array.isArray(topic.sources) || !topic.sources.length || topic.sources.some((item) => !item || typeof item !== "object" || !text((item as Record<string, unknown>).title) || !validUrl((item as Record<string, unknown>).url) || !strings((item as Record<string, unknown>).usedFor))) throw new Error(`Learning topic ${index + 1} has invalid sources.`);
  });
  return module as unknown as LearningModule;
}
