# Operating Systems Content Audit

Reviewed: 1 September 2026  
Scope: 12-lesson Operating Systems module against the IOCL Grade-A CS/IT domain heading and the official GATE 2026 CS syllabus.

## Scope Check

IOCL lists **Operating System** as one of the ten CS/IT domain headings. GATE CS 2026 expands it into:
- System calls, processes, threads, inter-process communication
- Concurrency and synchronization, critical sections, semaphores, monitors
- Deadlocks (characterization, prevention, avoidance, detection)
- CPU and I/O scheduling
- Memory management and virtual memory (paging, segmentation, page replacement, thrashing)
- File systems (structure, directory systems, allocation methods, disk scheduling)

The 12-lesson module strictly stays within these boundaries without adding non-syllabus material (such as full OS security sub-trees or kernel hacking specifics).

---

## Verified Lesson Outline & Key Elements Audit

| Lesson Number & Title | Syllabus Coverage & Key Concepts | Required Calculations & Diagrams | Key Comparisons | Common Exam Traps & Pitfalls | Primary Sources |
|---|---|---|---|---|---|
| **1. OS Structure, System Calls, and User/Kernel Modes** | Kernel vs user mode, dual-mode execution (trap/interrupt), system calls, dual mode switching. | Interrupt vector table flow, mode bit transition diagram (0 = kernel, 1 = user). | User Mode vs Kernel Mode; Trap (software interrupt) vs Hardware Interrupt. | Trap vs Hardware Interrupt confusion; assuming system call execution stays in user mode. | Silberschatz Ch. 1–2; POSIX standard (IEEE Std 1003.1); Linux kernel syscall docs |
| **2. Processes, Threads, Context Switching, & Transitions** | Process Control Block (PCB), 5-state model, process vs thread, kernel vs user threads, context switch overhead. | Context switch time overhead calculation; thread state diagram. | Process vs Thread; User-level threads (ULT) vs Kernel-level threads (KLT). | Confusing PCB with TCB; assuming context switch between threads of same process invalidates TLB/page directory. | Silberschatz Ch. 3–4; Stallings Ch. 3–4 |
| **3. Inter-Process Communication (Shared Memory & Message Passing)** | Shared memory, message passing (direct/indirect, synchronous/asynchronous), message queues, pipes. | Producer-consumer shared buffer index arithmetic (`(in + 1) % BUFFER_SIZE`). | Shared Memory (fast, user sync) vs Message Passing (kernel overhead, easy distributed). | Blocking send vs Non-blocking send; socket vs pipe addressing. | Silberschatz Ch. 3; POSIX shm_open / pipe documentation |
| **4. CPU Scheduling Algorithms** | FCFS, SJF (Preemptive/SRTF & Non-preemptive), Round Robin (RR), Priority Scheduling, Multi-level Queue. | Gantt chart construction; Turnaround Time ($\text{TAT} = \text{CT} - \text{AT}$), Waiting Time ($\text{WT} = \text{TAT} - \text{BT}$), Response Time ($\text{RT} = \text{First Exec Time} - \text{AT}$). | Preemptive vs Non-Preemptive; SJF (minimal avg WT) vs Round Robin (fairness). | Forgetting arrival time in TAT calculation ($\text{CT} - \text{AT}$, not $\text{CT}$); convoy effect in FCFS; starvation in Priority/SJF. | Silberschatz Ch. 5; Stallings Ch. 9 |
| **5. Process Synchronization: Critical Section & Semaphores** | Critical Section Problem (Mutual Exclusion, Progress, Bounded Waiting), Race Conditions, Peterson's Solution, TestAndSet, Semaphores (Counting & Binary/Mutex). | Peterson's solution flag/turn verification; Semaphore `wait()` ($P$) and `signal()` ($V$) atomic execution. | Counting Semaphore vs Binary Semaphore/Mutex; Busy Waiting (Spinlock) vs Block-Wakeup Semaphore. | Assuming `wait(S)` decrements after checking ($S$ decrements *inside* atomic operation); progress condition misinterpretation. | Silberschatz Ch. 6; Dijkstra (1965) Semaphore paper |
| **6. Classic Synchronization Problems** | Bounded-Buffer (Producer-Consumer), Readers-Writers (1st & 2nd variants), Dining Philosophers (Deadlock & Starvation handling). | Buffer state tracking; resource counting with semaphores. | Reader Priority vs Writer Priority; Semaphore-based vs Monitor-based synchronization. | Deadlock in Dining Philosophers when all pick left fork simultaneously; incorrect semaphore initial values (`mutex=1`, `empty=N`, `full=0`). | Silberschatz Ch. 6; Courtois et al. Readers-Writers (1971) |
| **7. Deadlocks: Characterization, Prevention, Avoidance, & Detection** | 4 Coffman conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait), Prevention, Banker's Algorithm (Safety & Resource-Request), Detection. | Banker's Need matrix ($\text{Need} = \text{Max} - \text{Allocation}$), Work/Finish vector safety sequence trace. | Deadlock Prevention (break 1 of 4 conditions) vs Deadlock Avoidance (Banker's Algorithm safe state check). | Safe state does not mean deadlock *will* occur if unsafe; Need vs Max confusion in Banker's algorithm; circular wait condition vs deadlock in single resource instances. | Silberschatz Ch. 7; Dijkstra Banker's Algorithm paper (1968) |
| **8. Memory Management: Contiguous Allocation, Paging, & Segmentation** | Single-partition, Dynamic partitioning (First-fit, Best-fit, Worst-fit), Internal/External Fragmentation, Paging, Segmentation. | Logical to physical address translation ($\text{Frame \#} \times \text{Page Size} + \text{Offset}$); Page Table size calculation. | Contiguous vs Non-contiguous Allocation; Paging (fixed size, internal frag) vs Segmentation (variable size, external frag). | Internal fragmentation occurs in fixed Paging, External fragmentation in dynamic Partitioning/Segmentation; off-by-one errors in offset bit length ($\text{Page Size} = 2^k \implies k$ offset bits). | Silberschatz Ch. 8; Stallings Ch. 7 |
| **9. Virtual Memory: Demand Paging & Page Tables** | Demand Paging, Page Fault handling sequence, Multi-level Paging, Inverted Page Table, Translation Lookaside Buffer (TLB). | Effective Access Time ($\text{EAT} = (1-p) \cdot t_{\text{mem}} + p \cdot t_{\text{page\_fault}}$); multi-level page table size computation. | Single-level vs Hierarchical Page Table vs Inverted Page Table; TLB Hit vs TLB Miss. | Effective Access Time unit mismatch (nanoseconds memory access vs milliseconds page fault penalty); page fault causes trap to kernel, not user interrupt. | Silberschatz Ch. 9; Hennessy & Patterson Computer Architecture |
| **10. Page Replacement Algorithms & Thrashing** | FIFO, Optimal (Belady's), LRU, Clock (Second Chance), Belady's Anomaly, Working Set Model, Thrashing. | Page fault trace step-by-step for a reference string given $N$ frames; Belady's anomaly check (FIFO). | LRU (optimal approximation) vs FIFO (susceptible to Belady's Anomaly) vs Optimal (theoretical lower bound). | Belady's Anomaly ONLY affects FIFO (not LRU or Optimal, which are stack algorithms); page fault rate spikes during thrashing. | Silberschatz Ch. 9; Belady (1966) Page Replacement paper |
| **11. Disk Scheduling & I/O Management** | I/O Hardware, Programmed I/O vs Interrupt-Driven I/O vs DMA, Disk Scheduling (FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK). | Total head movement calculation (sum of absolute cylinder differences); Disk Access Time ($\text{Seek Time} + \text{Rotational Latency} + \text{Transfer Time}$). | SCAN (Elevator algorithm) vs C-SCAN (Circular SCAN, uniform wait time); SSTF (susceptible to starvation) vs FCFS. | C-SCAN seek calculations must include swing to cylinder 0 (or cylinder $N-1$) without servicing; rotational latency default is $1/2 \times (1 / \text{RPM})$. | Silberschatz Ch. 10; Stallings Ch. 11 |
| **12. File Systems & Allocation Methods** | File attributes, Directory structure (Single, Two-level, Tree, DAG), Allocation methods (Contiguous, Linked, Indexed/i-node), Free Space Management. | Maximum file size calculation given direct, single indirect, double indirect, and triple indirect pointers in an i-node. | Contiguous Allocation (fast, external frag) vs Linked Allocation (no frag, slow random access) vs Indexed Allocation (fast random access, pointer overhead). | i-node block pointers count data blocks, not bytes; indirect pointer block overhead must be added to total blocks used. | Silberschatz Ch. 11–12; UNIX i-node specification |

---

## Primary Verified Sources Inspected

1. **Silberschatz, Galvin, Gagne** — *Operating System Concepts* (10th Edition)
2. **Stallings, William** — *Operating Systems: Internals and Design Principles* (9th Edition)
3. **POSIX standard (IEEE Std 1003.1-2024 / Open Group Base Specifications)**
4. **Official GATE CS 2026 Syllabus** — Section 9: Operating System
5. **IOCL Grade-A Recruitment Notification Syllabus** — CS/IT Domain Heading: Operating System
