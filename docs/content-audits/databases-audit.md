# Databases (DBMS) Content Audit

Reviewed: 1 September 2026  
Scope: 10-lesson Databases module against the IOCL Grade-A CS/IT domain heading and the official GATE 2026 CS syllabus.

## Scope Check

IOCL lists **Databases** as one of the ten CS/IT domain headings. GATE CS 2026 expands it into:
- ER model, relational model
- Relational algebra, tuple calculus
- SQL (DDL, DML, constraints, queries)
- Integrity constraints and normal forms (1NF, 2NF, 3NF, BCNF)
- Functional dependencies, attribute closure, candidate key derivation
- File organization and indexing (Primary, Secondary, Clustered, B and B+ trees)
- Transactions and concurrency control (ACID, serializability, 2PL, locking, deadlocks)

The 10-lesson module strictly stays within these boundaries without adding non-syllabus material (such as full NoSQL internals or vendor-specific SQL extensions).

---

## Verified Lesson Outline & Key Elements Audit

| Lesson Number & Title | Syllabus Coverage & Key Concepts | Required Calculations & Diagrams | Key Comparisons | Common Exam Traps & Pitfalls | Primary Sources |
|---|---|---|---|---|---|
| **1. ER Modeling, Entities, Relationships, & Constraints** | Entities, Attributes (Simple, Composite, Multi-valued, Derived), ER Diagrams, Mapping Cardinality (1:1, 1:N, M:N), Participation Constraints (Total/Partial), Weak Entity Sets. | Minimum tables required for ER diagram reduction to Relational Schema. | Weak Entity Set (discriminator + identifying relationship) vs Strong Entity Set; Total vs Partial Participation. | Forgetting to include identifying entity's primary key in weak entity table; over-counting tables in 1:N binary relationships (can merge into N side table). | Elmasri & Navathe Ch. 3–4; Silberschatz Ch. 6 |
| **2. Relational Model & Integrity Constraints** | Relations, Attributes, Domains, Tuples, Super Keys, Candidate Keys, Primary Keys, Foreign Keys, Referential Integrity, Domain & Key Constraints. | Candidate Key counting from attribute subsets; maximum and minimum super keys for $n$ attributes. | Primary Key vs Candidate Key; Foreign Key (referential integrity) vs Primary Key; Nullability rules. | Foreign key can be NULL unless declared `NOT NULL`; deleting parent row fails if referenced in child (unless `ON DELETE CASCADE/SET NULL`). | Elmasri & Navathe Ch. 5; Codd (1970) Relational Model paper |
| **3. Relational Algebra & Relational Calculus** | Selection ($\sigma$), Projection ($\pi$), Rename ($\rho$), Set Operations ($\cup, \cap, -$), Cartesian Product ($\times$), Joins (Natural $\bowtie$, Theta $\theta$, Outer Joins), Division ($\div$), Tuple & Domain Relational Calculus. | Maximum and Minimum tuple counts for Joins ($R \bowtie S$, $R \times S$) given $|R|=m, |S|=n$; Division operator logic ($R \div S$). | Relational Algebra (Procedural) vs Relational Calculus (Non-procedural/Declarative); Natural Join vs Equi-join. | Natural join removes duplicate join columns, Cartesian product keeps all; Division requires $S$ attributes to be a strict subset of $R$ attributes. | Elmasri & Navathe Ch. 8; Silberschatz Ch. 2 |
| **4. Structured Query Language (SQL)** | DDL (`CREATE`, `ALTER`, `DROP`), DML (`SELECT`, `INSERT`, `UPDATE`, `DELETE`), Integrity constraints, `GROUP BY`, `HAVING`, Aggregations (`COUNT`, `SUM`, `AVG`), Subqueries (`IN`, `EXISTS`, `ANY`, `ALL`), Correlated Subqueries. | SQL evaluation order (`FROM` $\to$ `WHERE` $\to$ `GROUP BY` $\to$ `HAVING` $\to$ `SELECT` $\to$ `ORDER BY`); `COUNT(*)` vs `COUNT(column)`. | `WHERE` clause (filters rows before aggregation) vs `HAVING` clause (filters groups after aggregation); `EXISTS` vs `IN`. | `NULL` in `COUNT(column)` is ignored, but `COUNT(*)` counts all rows; using non-aggregated columns in `SELECT` when `GROUP BY` is present violates standard SQL syntax. | ISO/IEC 9075 SQL Standard; Silberschatz Ch. 3–5 |
| **5. Functional Dependencies & Candidate Key Derivation** | Functional Dependency ($X \to Y$), Armstrong's Axioms (Reflexivity, Augmentation, Transitivity), Attribute Closure ($X^+$), Equivalence of FD Sets, Minimal Cover. | Attribute Closure computation ($X^+$ algorithm); Candidate Key derivation algorithm; total number of candidate keys. | Trivial FD ($Y \subseteq X$) vs Non-Trivial FD; Full Functional Dependency vs Partial Functional Dependency. | Assuming $A \to B, A \to C$ implies $B \to C$ (false); candidate key must be a *minimal* super key (no subset can be a super key). | Elmasri & Navathe Ch. 14; Ullman & Widom Ch. 3 |
| **6. Database Normalization & Decompositions** | Anomalies (Insertion, Deletion, Update), 1NF, 2NF, 3NF, BCNF, Lossless Join Decomposition, Dependency Preservation. | Checking highest Normal Form of a relation; Lossless Join test ($R_1 \cap R_2 \to R_1$ or $R_1 \cap R_2 \to R_2$); Dependency preservation check. | 3NF (always allows lossless + dependency preserving decomposition) vs BCNF (lossless guaranteed, but dependency preservation NOT always possible). | BCNF requires LHS to be a Super Key for ALL non-trivial FDs; 3NF allows RHS to be a Prime Attribute even if LHS is not a Super Key. | Elmasri & Navathe Ch. 14–15; Codd (1972) 3NF/BCNF papers |
| **7. Storage Structures, Indexing, B & B+ Trees** | File Organization (Heap, Sequential, Hashing), Primary Index, Clustering Index, Secondary Index, Dense vs Sparse Index, B-Tree & B+ Tree Order, Search, Insertion, Node Capacity. | Maximum keys in B/B+ tree of order $m$ and height $h$; Max records accessible; Node size calculation given block size, key size, and pointer size ($m \cdot P + (m-1) \cdot K \le B$). | Primary Index (sparse, ordered on key) vs Secondary Index (dense, non-key or unordered); B-Tree (data in all nodes) vs B+ Tree (data pointers only in leaf nodes). | B+ tree leaf nodes are linked sequentially (fast range queries); node pointer count is $m$, key count is $m-1$; order $m$ means max children per internal node is $m$. | Elmasri & Navathe Ch. 16–17; Comer (1979) B-Tree Ubiquitous paper |
| **8. Transaction Processing & ACID Properties** | Transaction concept, ACID properties (Atomicity, Consistency, Isolation, Durability), Transaction state diagram, Schedules, Serial vs Non-serial schedules. | Schedule execution trace; Commit/Abort state transitions. | Atomicity (all or nothing, managed by Recovery) vs Isolation (concurrency control) vs Durability (log/disk management). | Consistency is primarily the responsibility of the application writer/constraints, maintained by Atomicity + Isolation; aborting active transaction requires rollback/undo. | Silberschatz Ch. 14; Gray & Reuter Transaction Processing |
| **9. Serializability & Schedule Equivalence** | Conflict Serializability, Conflict Equivalent Schedules, Precedence (Serialization) Graph, View Serializability, Blind Writes, Recoverable & Cascadeless Schedules. | Precedence graph construction and cycle detection algorithm; number of equivalent serial schedules. | Conflict Serializability (easy to test via graph topological sort, $O(V+E)$) vs View Serializability (NP-complete, allows blind writes). | Cycle in precedence graph $\implies$ NOT Conflict Serializable; View serializable without conflict serializability REQUIRES at least one blind write ($W(X)$ without prior $R(X)$). | Silberschatz Ch. 14–15; Eswaran et al. (1976) |
| **10. Concurrency Control & Locking Protocols** | Concurrency Anomalies (Dirty Read, Unrepeatable Read, Lost Update, Phantom Read), Lock-Based Protocols (Shared/Exclusive), Two-Phase Locking (Basic 2PL, Strict 2PL, Rigorous 2PL), Timestamp Ordering (TO), Deadlock Handling (Wait-Die, Wound-Wait). | 2PL growing/shrinking phase identification; lock compatibility matrix; timestamp order validation ($TS(T) < W\_TS(X)$ check). | Basic 2PL (guarantees conflict serializability, but allows cascading aborts & deadlocks) vs Strict 2PL (holds exclusive locks till commit, avoids cascading aborts). | 2PL does NOT prevent deadlocks; Strict 2PL prevents cascading aborts by holding Exclusive locks until commit; Timestamp Ordering is deadlock-free. | Silberschatz Ch. 15; Thomas Write Rule paper |

---

## Primary Verified Sources Inspected

1. **Elmasri, Ramez, and Shamkant B. Navathe** — *Fundamentals of Database Systems* (7th Edition, Pearson)
2. **Silberschatz, Abraham, Henry F. Korth, and S. Sudarshan** — *Database System Concepts* (7th Edition, McGraw-Hill)
3. **Official GATE CS 2026 Syllabus** — Section 6: Databases
4. **IOCL Grade-A Recruitment Notification Syllabus** — CS/IT Domain Heading: Databases
5. **ISO/IEC 9075:2023** — Information technology — Database languages — SQL
