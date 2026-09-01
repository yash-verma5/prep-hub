# Content Audit: Computer Organization and Architecture

**Status**: `REVIEW_NEEDED`
**Date**: 2 September 2026
**Auditor**: Antigravity

## Syllabus Verification
- **IOCL Broad Heading**: Computer Organization and Architecture
- **GATE CS Detailed Expansion**: Machine instructions and addressing modes, ALU, datapath and control unit, instruction pipelining and pipeline hazards, memory hierarchy (cache, main memory, secondary storage), I/O interface, interrupts, and DMA.

## Lesson Outline (10 Lessons)
1. **Machine Instructions, Instruction Formats, and Addressing Modes**
2. **Control Unit Design: Hardwired vs Microprogrammed**
3. **Datapath & ALU Organization**
4. **Instruction Pipelining: Stages, Throughput, Speedup**
5. **Pipeline Hazards: Structural, Data, and Control Hazards**
6. **Memory Hierarchy & Main Memory**
7. **Cache Memory Organization: Direct, Associative, Set-Associative**
8. **Cache Policies and Hit/Miss Ratios**
9. **Input/Output Organization: Programmed & Interrupt-Driven I/O**
10. **Direct Memory Access (DMA)**

## Critical Formulas & Calculations Identified
- Speedup: $S = \frac{T_n}{T_k} = \frac{n \cdot k}{k + (n-1)}$ (for $n$ instructions, $k$ stages)
- Effective Access Time (EAT): $\text{EAT} = h \cdot t_c + (1-h) \cdot t_m$
- Cache Mapping Bit Widths: $\text{Physical Address} = \text{Tag} + \text{Index} + \text{Block Offset}$
- DMA Transfer Rates & CPU Cycle Stealing

## Exam Traps & Common Pitfalls Identified
- Confusing cache tag size calculations for set-associative vs direct mapping.
- Failing to distinguish between RAW, WAR, and WAW data hazards.
- Miscalculating pipeline execution time by ignoring the $(k-1)$ cycles needed to fill the pipeline.
- Misunderstanding Endianness (Big Endian vs Little Endian) in memory addressing.
- Confusing cycle stealing mode with burst mode in DMA operations.

## Formatting Guidelines Enforced
- Mathematical expressions must use KaTeX delimiters (`$...$` for inline, `$$...$$` for blocks). No raw LaTeX allowed.
- Markdown tables will be used for comparing Cache mapping techniques, Pipeline Hazards, and I/O modes.
- Diagrams (if any complex visual diagrams are needed) will be registered in `DiagramRegistry.tsx`. Simple text representations or markdown tables are preferred where possible to minimize rendering dependencies.
