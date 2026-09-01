# Programming and Data Structures — Content Audit

## Overview
* **Status**: REVIEW_NEEDED
* **Goal**: Implement the official IOCL/GATE CS syllabus for Programming and Data Structures into 10 concise, 5-8 minute lessons focusing on high-yield exam topics.

## Syllabus Coverage Verification
* **GATE CS Match**: Programming in C, recursion, arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, and graphs.
* **IOCL Scope**: Covers C programming fundamentals, memory layout, linear and non-linear data structures, and their core operations that frequently appear in MCQs.

## Lesson Outline (10 Lessons)
1. **C Language Fundamentals**: Control Flow, Operators, Pointers, Arrays, and Memory Layout
2. **Functions and Recursion**: Parameter Passing (Value vs Reference/Pointer), and Recursion Stack Analysis
3. **Structures and Dynamic Memory**: Structures, Unions, Dynamic Memory Allocation (`malloc`, `calloc`, `free`), and Pointer Arithmetic
4. **Linear Data Structures (Arrays & Linked Lists)**: 1D/2D address mapping, Singly, Doubly, and Circular Linked Lists
5. **Stacks**: Array & Linked Implementation, Infix/Postfix/Prefix Conversions, Evaluation
6. **Queues**: Linear, Circular Queues, Priority Queues, and Deques
7. **Trees and Traversals**: Terminology, Binary Trees, Preorder, Inorder, Postorder, Level-order
8. **Binary Search Trees (BST)**: Insertion, Deletion, Search, and BST Properties
9. **Binary Heaps**: Max-Heap, Min-Heap, Heapify Algorithm, and Priority Queue Implementation
10. **Graph Representations**: Adjacency Matrix, Adjacency List, and Structural Properties

## Key Required Elements per Lesson

### 1. C Language Fundamentals
* **Calculations**: Pointer arithmetic steps, array indexing.
* **Comparisons**: Pointers vs Arrays.
* **Traps**: Uninitialized pointers, array out-of-bounds, pre-increment vs post-increment in expressions.

### 2. Functions and Recursion
* **Calculations**: Recursion tree depth, stack frame count.
* **Comparisons**: Pass by value vs pass by reference.
* **Traps**: Missing base cases causing stack overflow, static variables in recursive functions.

### 3. Structures and Dynamic Memory
* **Calculations**: Structure padding and size calculation.
* **Comparisons**: Structure vs Union memory allocation.
* **Traps**: Accessing freed memory (dangling pointers), memory leaks.

### 4. Linear Data Structures (Arrays & Linked Lists)
* **Calculations**: 2D Array Address Mapping formulas (Row-major vs Column-major).
* **Comparisons**: Array vs Linked List (access time, memory overhead).
* **Traps**: Losing head pointer in linked list insertion/deletion, assuming contiguous memory for linked lists.

### 5. Stacks
* **Calculations**: Stack depth during expression evaluation.
* **Comparisons**: Infix vs Prefix vs Postfix.
* **Traps**: Operator associativity rules in conversion algorithms.

### 6. Queues
* **Calculations**: Circular queue full/empty conditions (`(rear + 1) % N == front`).
* **Comparisons**: Linear vs Circular Queue.
* **Traps**: "Queue Full" condition mistakenly identified in a linear queue when front space is available.

### 7. Trees and Traversals
* **Calculations**: Max/Min nodes at height $h$ ($N_{\max} = 2^{h+1}-1$).
* **Comparisons**: Preorder vs Inorder vs Postorder usage.
* **Traps**: Assuming unique tree reconstruction without Inorder traversal.

### 8. Binary Search Trees (BST)
* **Calculations**: Search/Insert worst-case time complexity $O(n)$ for skewed trees.
* **Comparisons**: BST vs regular Binary Tree.
* **Traps**: Deletion of a node with two children (finding inorder successor/predecessor).

### 9. Binary Heaps
* **Calculations**: Parent/Child index formulas (1-based: Left = $2i$, Right = $2i+1$, Parent = $\lfloor i/2 \rfloor$).
* **Comparisons**: Min-Heap vs Max-Heap.
* **Traps**: Assuming a heap is a sorted array (only partial order is maintained).

### 10. Graph Representations
* **Calculations**: Degree sum formula ($\sum \text{deg}(V) = 2E$).
* **Comparisons**: Adjacency Matrix vs Adjacency List (Space and Time trade-offs).
* **Traps**: Self-loops contributing 2 to degree in undirected graphs.
