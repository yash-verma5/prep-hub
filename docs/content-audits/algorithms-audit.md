# Algorithms — Content Audit

## Overview
* **Status**: IN_PROGRESS
* **Goal**: Implement the official IOCL/GATE CS syllabus for Algorithms into 12 concise, 5-8 minute lessons focusing on high-yield exam topics.

## Syllabus Coverage Verification
* **GATE CS Match**: Searching, sorting, hashing, asymptotic worst-case time and space complexity, greedy, dynamic programming, divide-and-conquer, graph traversals, minimum spanning trees, and shortest paths.
* **IOCL Scope**: Covers the core algorithm design techniques and computational bounds that frequently appear in MCQs.

## Lesson Outline (12 Lessons)
1. **Asymptotic Analysis**: Big-O, Big-$\Omega$, Big-$\Theta$, Little-o, Little-$\omega$, and Complexity Growth
2. **Recurrence Relations**: Substitution, Recursion Tree, and Master Theorem
3. **Searching Algorithms & Hashing**: Linear vs Binary Search, Hash Functions, Open/Closed Addressing
4. **Comparison-Based Sorting**: Bubble, Selection, Insertion, Merge Sort, Quick Sort, and Heap Sort
5. **Linear-Time Sorting**: Counting Sort, Radix Sort, Bucket Sort, and Lower Bounds for Sorting
6. **Divide and Conquer Strategy**: Binary Search, Merge Sort, Quick Select, and Matrix Multiplication
7. **Greedy Algorithms**: Fractional Knapsack, Job Sequencing, Huffman Coding
8. **Dynamic Programming**: 0/1 Knapsack, Longest Common Subsequence (LCS), Matrix Chain Multiplication
9. **Graph Algorithms**: Breadth-First Search (BFS) and Depth-First Search (DFS), Topological Sort
10. **Minimum Spanning Trees (MST)**: Prim's and Kruskal's Algorithms
11. **Single-Source Shortest Paths**: Dijkstra's Algorithm, Bellman-Ford Algorithm
12. **All-Pairs Shortest Paths & NP-Completeness**: Floyd-Warshall, P, NP, NP-Complete Foundations

## Key Required Elements per Lesson

### 1. Asymptotic Analysis
* **Calculations**: Limit tests for determining strict bounds (e.g., $\lim_{n \to \infty} f(n)/g(n)$).
* **Comparisons**: Big-O vs Big-$\Omega$ vs Big-$\Theta$.
* **Traps**: Confusing worst-case time complexity with Big-O (Big-O is an upper bound, not necessarily worst-case).

### 2. Recurrence Relations
* **Calculations**: Master Theorem bounds ($T(n) = aT(n/b) + f(n)$).
* **Traps**: Applying the Master Theorem when the regularity condition fails or $f(n)$ is not polynomially larger/smaller.

### 3. Searching Algorithms & Hashing
* **Calculations**: Probe sequence formulas for Linear Probing ($h(k,i) = (h'(k) + i) \bmod m$) and Quadratic Probing.
* **Comparisons**: Chaining vs. Open Addressing.
* **Traps**: Load factor $> 1$ is possible in chaining but not in open addressing.

### 4. Comparison-Based Sorting
* **Calculations**: Number of comparisons or swaps (e.g., Selection sort is always $O(n^2)$).
* **Comparisons**: Stability and in-place nature of sorting algorithms.
* **Traps**: Quick Sort worst-case ($O(n^2)$) on already sorted arrays if the pivot is poorly chosen.

### 5. Linear-Time Sorting
* **Calculations**: Time complexity calculations based on range ($k$) versus input size ($n$).
* **Comparisons**: Counting Sort vs Radix Sort vs Bucket Sort.
* **Traps**: Assuming linear sorts can be applied to arbitrary floating-point numbers without overhead.

### 6. Divide and Conquer
* **Calculations**: Time complexity of recurrence formulas for these algorithms.
* **Comparisons**: Divide & Conquer vs Dynamic Programming.
* **Traps**: Quick Select vs Quick Sort complexities.

### 7. Greedy Algorithms
* **Calculations**: Huffman tree cost/code length calculation. Fractional Knapsack optimal value.
* **Comparisons**: 0/1 Knapsack (DP) vs Fractional Knapsack (Greedy).
* **Traps**: Applying Greedy to 0/1 Knapsack.

### 8. Dynamic Programming
* **Calculations**: LCS matrix dimensions and filling sequence. MCM minimum scalar multiplications.
* **Comparisons**: Top-Down (Memoization) vs Bottom-Up (Tabulation).
* **Traps**: Redundant subproblem calculation if memoization is not used properly.

### 9. Graph Algorithms (BFS/DFS)
* **Calculations**: Edge classification (Tree, Back, Forward, Cross).
* **Comparisons**: BFS (Queues/Shortest Path on unweighted) vs DFS (Stacks/Topological Sort).
* **Traps**: Assuming a unique Topological Sort exists for all DAGs.

### 10. Minimum Spanning Trees (MST)
* **Calculations**: Minimum edge weight sum.
* **Comparisons**: Prim's vs Kruskal's (Dense vs Sparse graph suitability).
* **Traps**: Assuming MST is unique if edge weights are not distinct.

### 11. Single-Source Shortest Paths
* **Calculations**: Edge relaxation formulas ($d[v] = \min(d[v], d[u] + w(u,v))$).
* **Comparisons**: Dijkstra's vs Bellman-Ford (negative edges).
* **Traps**: Using Dijkstra on graphs with negative weight edges.

### 12. All-Pairs Shortest Paths & NP-Completeness
* **Calculations**: Floyd-Warshall DP matrix updates.
* **Comparisons**: P vs NP vs NP-Complete vs NP-Hard.
* **Traps**: Believing NP means "Non-Polynomial" (it means Nondeterministic Polynomial time).
