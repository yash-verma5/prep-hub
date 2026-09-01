# Content Audit: Digital Logic

**Date**: 2 September 2026
**Subject**: Digital Logic
**Status**: IN_PROGRESS

## 1. Syllabus Verification
**IOCL Broad Heading**: Digital Logic
**GATE CS Detailed Expansion**:
- Boolean algebra.
- Combinational and sequential circuits.
- Minimization.
- Number representations and computer arithmetic (fixed and floating point).

## 2. Topic Coverage & Mapping
| Lesson Title | Concepts Covered | GATE Syllabus Alignment |
|---|---|---|
| 1. Number Systems & Base Conversions | Binary, Octal, Hex, 1's/2's complement | Number representations |
| 2. Floating-Point Representation (IEEE 754) | Single & Double Precision, fixed vs floating point | Computer arithmetic (floating point) |
| 3. Boolean Algebra & Logic Gates | Universal gates, SOP/POS, duality | Boolean algebra |
| 4. Gate-Level Minimization (K-Maps) | K-maps up to 4 variables, don't cares | Minimization |
| 5. Combinational Circuits I | Adders, subtractors, multipliers | Combinational circuits |
| 6. Combinational Circuits II | MUX, DEMUX, Encoders, Decoders | Combinational circuits |
| 7. Sequential Circuits I | Latches, Flip-Flops (SR, JK, D, T), timing | Sequential circuits |
| 8. Sequential Circuits II | Registers, Counters, FSM (Mealy/Moore) | Sequential circuits |

## 3. Required Calculations & Formulas
- **2's Complement Range**: $-2^{n-1} \text{ to } 2^{n-1}-1$
- **IEEE 754 Value**: $V = (-1)^s \times (1.M) \times 2^{E - 127}$
- **Propagation Delay**: Maximum Clock Frequency ($f_{\max} = \frac{1}{t_{\text{prop}} + t_{\text{setup}}}$)
- **Counter Modulus**: Calculating sequence states for synchronous/asynchronous counters.

## 4. Key Diagrams and Renderings
- **K-Maps**: Visual matrices mapping minterms.
- **Logic Gates**: MUX, Decoders, Flip-Flops represented through text tables or SVG components where applicable.
- **State Diagrams**: Mealy/Moore FSMs.

## 5. Common Exam Traps
- Misinterpreting 1's complement vs 2's complement for zero representation (positive/negative zero).
- Confusing single precision (bias 127) with double precision (bias 1023) in IEEE 754.
- Setup and hold time violations in Flip-Flops.
- Mixing up active-low vs active-high signals in Decoders/MUX.
- Overlooking "don't care" conditions in K-Map minimization leading to non-minimal SOPs.

## 6. Sources Used
- **Primary**: M. Morris Mano, Michael D. Ciletti — *Digital Design*
- **Primary**: IEEE Standard 754-2019 for Floating-Point Arithmetic
- **Reference**: GATE CS Previous Year Question concepts
