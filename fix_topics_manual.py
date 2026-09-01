import json
import os
import glob

base_dir = "/home/yashverma/Personal/iocl-prep/src/content"

topic_mapping = {
    # DBMS
    "Concurrency Control (2PL, Strict 2PL, Timestamp Ordering)": "Concurrency Control: Two-Phase Locking (2PL) and Timestamp Ordering",
    "Conflict & View Serializability, Recoverability": "Serializability: Conflict & View Serializability, Precedence Graphs",
    "Database Recovery Techniques (WAL, Checkpoints, ARIES)": "Transaction Processing and ACID Properties",
    "ER Model, Relational Model, Constraints, and Keys": "Entity-Relationship (ER) Modeling, Entities, Relationships, and Constraints",
    "File Organization & Indexing (B-Tree, B+ Tree)": "Storage Structures, Indexing, B-Trees and B+ Trees",
    "Functional Dependencies, Keys, and Attribute Closure": "Functional Dependencies, Attribute Closure, and Candidate Key Derivation",
    "Indexing": "Storage Structures, Indexing, B-Trees and B+ Trees",
    "Normalization": "Database Normalization: 1NF, 2NF, 3NF, BCNF, and Decompositions",
    "Normalization (1NF, 2NF, 3NF, BCNF, 4NF)": "Database Normalization: 1NF, 2NF, 3NF, BCNF, and Decompositions",
    "Relational Algebra (Tuple & Domain Relational Calculus)": "Relational Algebra & Relational Calculus",
    "Relational model": "Relational Model Fundamentals: Keys and Integrity Constraints",
    "SQL": "Structured Query Language (SQL): DDL, DML, Aggregations, and Joins",
    "Structured Query Language (SQL) & Subqueries": "Structured Query Language (SQL): DDL, DML, Aggregations, and Joins",
    "Transaction Processing & ACID Properties": "Transaction Processing and ACID Properties",
    "Transactions": "Transaction Processing and ACID Properties",

    # Compiler Design
    "Bottom-Up Parsing and LR Parsers (LR(0), SLR(1), LALR(1), and CLR(1))": "Bottom-Up Parsing and LR Parsers: LR(0), SLR(1), LALR(1), and CLR(1)",
    "Context-Free Grammars, LL(1) Parsing, and FIRST/FOLLOW Sets": "Context-Free Grammars, LL(1) Parsing, and FIRST & FOLLOW Sets",
    "Data-flow analysis": "Data-Flow Analysis: Constant Propagation, Liveness Analysis, and CSE",
    "Intermediate code": "Intermediate Code Generation (ICG): Three-Address Code, Quadruples, and Triples",
    "Lexical analysis": "Compiler Architecture, Lexical Analysis, and Tokenization",
    "Local Code Optimization: Basic Blocks and Directed Acyclic Graphs (DAGs)": "Local Code Optimization, Basic Blocks, and Directed Acyclic Graphs (DAGs)",
    "Parsing": "Context-Free Grammars, LL(1) Parsing, and FIRST & FOLLOW Sets",
    "Runtime environments": "Runtime Environments, Memory Layout, and Activation Records",
    "Runtime Environments: Memory Layout and Activation Records": "Runtime Environments, Memory Layout, and Activation Records",

    # Operating Systems
    "Deadlock": "Deadlocks: Characterization, Prevention, Avoidance, and Detection",
    "Deadlocks: Characterization, Prevention, Avoidance (Banker's Algorithm), and Detection": "Deadlocks: Characterization, Prevention, Avoidance, and Detection",
    "Memory management": "Memory Management: Contiguous Allocation, Paging, and Segmentation",
    "Processes and threads": "Processes, Threads, Context Switching, and Process State Transitions",
    "Synchronization": "Process Synchronization: Critical Section Problem, Semaphores, and Mutex"
}

files_to_process = glob.glob(os.path.join(base_dir, "*-questions.json")) + glob.glob(os.path.join(base_dir, "domain-*.json"))

for file_path in files_to_process:
    if os.path.basename(file_path) == "questions.json":
        continue
    
    with open(file_path, 'r') as f:
        try:
            data = json.load(f)
        except Exception as e:
            print(f"Error loading {file_path}: {e}")
            continue

    changed = False
    for q in data:
        current_topic = q.get("topic")
        if current_topic in topic_mapping:
            q["topic"] = topic_mapping[current_topic]
            changed = True
    
    if changed:
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"Updated {os.path.basename(file_path)}")

print("Done.")
