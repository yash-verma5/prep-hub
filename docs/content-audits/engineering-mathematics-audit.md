# Content Audit: Engineering Mathematics

**Date**: 2 September 2026
**Subject**: Engineering Mathematics
**Status**: IN_PROGRESS

## 1. Syllabus Verification
**IOCL Broad Heading**: Engineering Mathematics
**GATE CS Detailed Expansion**:
- Discrete Mathematics: Propositional and first order logic. Sets, relations, functions, partial orders and lattices. Monoids, Groups. Graphs: connectivity, matching, colouring. Combinatorics: counting, recurrence relations, generating functions.
- Linear Algebra: Matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition.
- Calculus: Limits, continuity and differentiability, Maxima and minima, Mean value theorem, Integration.
- Probability and Statistics: Random variables, Uniform, normal, exponential, Poisson and binomial distributions. Mean, median, mode and standard deviation. Conditional probability and Bayes theorem.

## 2. Topic Coverage & Mapping
| Lesson Title | Concepts Covered | GATE Syllabus Alignment |
|---|---|---|
| 1. Propositional Logic, First-Order Predicate Logic, Logical Equivalence | Propositional logic, Predicates, Equivalence, Inference | Discrete Mathematics |
| 2. Sets, Relations, Lattices, and Functions | Sets, Equivalence relations, Posets, Functions | Discrete Mathematics |
| 3. Algebraic Structures: Monoids, Groups | Monoids, Groups, Subgroups, Lagrange's Theorem | Discrete Mathematics |
| 4. Graph Theory I: Connectivity, Paths, Cycles | Connectivity, Eulerian/Hamiltonian graphs | Discrete Mathematics (Graphs) |
| 5. Graph Theory II: Planar Graphs, Graph Coloring, Matching, Trees | Planar graphs, Chromatic number, Matching, Trees | Discrete Mathematics (Graphs) |
| 6. Combinatorics: Permutations, Combinations, Pigeonhole Principle | Permutations, Combinations, Inclusion-Exclusion | Discrete Mathematics (Combinatorics) |
| 7. Generating Functions & Recurrence Relations | Generating functions, Homogeneous/Non-homogeneous relations | Discrete Mathematics (Combinatorics) |
| 8. Linear Algebra I: Matrices, Determinants, Systems of Linear Equations | Matrices, Determinants, Gaussian Elimination, LU Decomposition | Linear Algebra |
| 9. Linear Algebra II: Vector Spaces, Rank, Eigenvalues, Eigenvectors | Rank, Eigenvalues, Eigenvectors, Cayley-Hamilton Theorem | Linear Algebra |
| 10. Calculus: Limits, Continuity, Differentiability, Maxima/Minima | Limits, Continuity, Differentiability, Maxima/Minima, Mean Value Theorem | Calculus |
| 11. Integral Calculus: Definite/Indefinite Integrals | Integration basics, double integrals | Calculus |
| 12. Probability & Statistics: Bayes Theorem, Random Variables, Distributions | Conditional probability, Bayes theorem, Distributions (Uniform, Normal, Exponential, Poisson, Binomial), Mean & Variance | Probability and Statistics |

## 3. Required Calculations & Formulas
- **Graph Euler's Formula**: $V - E + F = 2$ for planar graphs.
- **Linear Algebra**: Characteristic equation $\det(A - \lambda I) = 0$ for eigenvalues.
- **Probability (Bayes' Theorem)**: $P(A|B) = \frac{P(B|A) P(A)}{P(B)}$
- **Combinatorics**: $\binom{n}{r} = \frac{n!}{r!(n-r)!}$ and variations.
- **Distributions**: Mean ($\mu$) and variance ($\sigma^2$) formulas for Binomial, Poisson, Normal, Uniform, Exponential.

## 4. Key Diagrams and Renderings
- **Venn Diagrams**: Sets and subsets, inclusion-exclusion principle.
- **Graphs**: Eulerian/Hamiltonian circuits, Trees, Matchings.
- **Normal Distribution Curve**: Standard normal bell curve.
- **Hasse Diagrams**: Partially ordered sets and lattices.

## 5. Common Exam Traps
- **Logic**: Confusing the direction of implication ($P \implies Q$ vs $Q \implies P$) or applying De Morgan's laws incorrectly to quantifiers.
- **Graphs**: Assuming all planar graphs are trees, or miscounting connected components.
- **Linear Algebra**: Failing to check for linearly independent eigenvectors when determining diagonalizability.
- **Probability**: Forgetting to use the Law of Total Probability in Bayes Theorem denominators, or confusing binomial trials with hypergeometric ones (with/without replacement).
- **Calculus**: Applying L'Hopital's rule when the limit is not an indeterminate form.

## 6. Sources Used
- **Primary**: Kenneth H. Rosen — *Discrete Mathematics and Its Applications*
- **Primary**: Gilbert Strang — *Linear Algebra and Its Applications*
- **Primary**: Erwin Kreyszig — *Advanced Engineering Mathematics*
- **Reference**: GATE CS 2026 Official Syllabus
