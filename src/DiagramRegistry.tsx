import React from "react";

export type DiagramId =
  | "osi-tcp-mapping"
  | "tcp-handshake"
  | "sliding-window"
  | "subnetting-hierarchy"
  | "process-states"
  | "address-translation"
  | "transaction-states"
  | "precedence-graph"
  | "dfa-transition"
  | "pda-stack"
  | "compiler-phases"
  | "parse-tree-vs-ast";

interface DiagramRegistryProps {
  id: DiagramId | string;
  title?: string;
  caption?: string;
}

export const DiagramRegistry: React.FC<DiagramRegistryProps> = ({ id, title, caption }) => {
  switch (id) {
    case "osi-tcp-mapping":
      return (
        <div className="diagram-card" aria-label="OSI versus TCP/IP Layer Mapping Diagram">
          <div className="diagram-header">
            <span className="diagram-badge">CN Protocol Architecture</span>
            <h4>{title || "OSI 7-Layer vs TCP/IP 4-Layer Architecture Mapping"}</h4>
          </div>
          <div className="svg-wrapper">
            <svg viewBox="0 0 540 220" className="diagram-svg">
              {/* OSI Side */}
              <text x="120" y="22" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">OSI 7-Layer Model</text>
              <rect x="30" y="32" width="180" height="24" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
              <text x="120" y="48" textAnchor="middle" fill="#991b1b" fontSize="11">7. Application</text>
              <rect x="30" y="58" width="180" height="24" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
              <text x="120" y="74" textAnchor="middle" fill="#991b1b" fontSize="11">6. Presentation</text>
              <rect x="30" y="84" width="180" height="24" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
              <text x="120" y="100" textAnchor="middle" fill="#991b1b" fontSize="11">5. Session</text>

              <rect x="30" y="112" width="180" height="24" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="120" y="128" textAnchor="middle" fill="#92400e" fontSize="11">4. Transport</text>

              <rect x="30" y="138" width="180" height="24" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="120" y="154" textAnchor="middle" fill="#1e40af" fontSize="11">3. Network</text>

              <rect x="30" y="164" width="180" height="24" rx="4" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
              <text x="120" y="180" textAnchor="middle" fill="#166534" fontSize="11">2. Data Link</text>
              <rect x="30" y="190" width="180" height="24" rx="4" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
              <text x="120" y="206" textAnchor="middle" fill="#166534" fontSize="11">1. Physical</text>

              {/* Connector Arrows */}
              <path d="M 215 68 L 325 68" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 215 124 L 325 124" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 215 150 L 325 150" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 215 192 L 325 192" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />

              {/* TCP/IP Side */}
              <text x="420" y="22" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">TCP/IP Suite (4 Layers)</text>
              <rect x="330" y="32" width="180" height="76" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
              <text x="420" y="74" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">Application Layer</text>
              <text x="420" y="90" textAnchor="middle" fill="#b91c1c" fontSize="10">(HTTP, DNS, SMTP)</text>

              <rect x="330" y="112" width="180" height="24" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
              <text x="420" y="128" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">Transport (TCP / UDP)</text>

              <rect x="330" y="138" width="180" height="24" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
              <text x="420" y="154" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">Internet Layer (IP, ICMP)</text>

              <rect x="330" y="164" width="180" height="50" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
              <text x="420" y="193" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">Network Access Layer</text>
            </svg>
          </div>
          <div className="diagram-footer">
            <p>{caption || "OSI Application, Presentation, and Session layers map directly into the single TCP/IP Application layer."}</p>
          </div>
        </div>
      );

    case "tcp-handshake":
      return (
        <div className="diagram-card" aria-label="TCP 3-Way Handshake Flow Diagram">
          <div className="diagram-header">
            <span className="diagram-badge">TCP Connection Setup</span>
            <h4>{title || "TCP 3-Way Handshake Connection Establishment"}</h4>
          </div>
          <div className="svg-wrapper">
            <svg viewBox="0 0 520 180" className="diagram-svg">
              {/* Client & Server Boxes */}
              <rect x="40" y="15" width="100" height="32" rx="6" fill="#0f172a" />
              <text x="90" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Client</text>
              <line x1="90" y1="47" x2="90" y2="165" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />

              <rect x="380" y="15" width="100" height="32" rx="6" fill="#0f172a" />
              <text x="430" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Server</text>
              <line x1="430" y1="47" x2="430" y2="165" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />

              {/* Step 1: SYN */}
              <line x1="90" y1="65" x2="420" y2="90" stroke="#ef6c24" strokeWidth="2.5" />
              <polygon points="425,90 415,84 417,94" fill="#ef6c24" />
              <text x="255" y="70" textAnchor="middle" fill="#c2410c" fontSize="11" fontWeight="bold">1. SYN (seq = x)</text>

              {/* Step 2: SYN-ACK */}
              <line x1="430" y1="95" x2="100" y2="125" stroke="#16856b" strokeWidth="2.5" />
              <polygon points="95,125 105,119 103,129" fill="#16856b" />
              <text x="255" y="103" textAnchor="middle" fill="#08705b" fontSize="11" fontWeight="bold">2. SYN-ACK (seq = y, ack = x + 1)</text>

              {/* Step 3: ACK */}
              <line x1="90" y1="130" x2="420" y2="155" stroke="#2563eb" strokeWidth="2.5" />
              <polygon points="425,155 415,149 417,159" fill="#2563eb" />
              <text x="255" y="138" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="bold">3. ACK (ack = y + 1, ESTABLISHED)</text>
            </svg>
          </div>
          <div className="diagram-footer">
            <p>{caption || "Three-way handshake synchronizes sequence numbers (x, y) before data transfer commences."}</p>
          </div>
        </div>
      );

    case "sliding-window":
      return (
        <div className="diagram-card" aria-label="Sliding Window Flow Control Comparison Diagram">
          <div className="diagram-header">
            <span className="diagram-badge">Flow Control Protocol</span>
            <h4>{title || "Sliding Window Protocols: Go-Back-N vs Selective Repeat"}</h4>
          </div>
          <div className="svg-wrapper">
            <svg viewBox="0 0 540 210" className="diagram-svg">
              {/* Go-Back-N Section */}
              <text x="20" y="24" fill="#0f172a" fontSize="13" fontWeight="bold">Go-Back-N (GBN) — Window Size N = 4 (Receiver Window = 1)</text>
              <g transform="translate(20, 35)">
                {/* Frames */}
                <rect x="0" y="0" width="36" height="30" rx="4" fill="#cbd5e1" stroke="#64748b" />
                <text x="18" y="20" textAnchor="middle" fill="#334155" fontSize="11">0 (ACK)</text>

                <rect x="42" y="0" width="36" height="30" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
                <text x="60" y="20" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">1 (LOST)</text>

                <rect x="84" y="0" width="36" height="30" rx="4" fill="#fef3c7" stroke="#f59e0b" />
                <text x="102" y="20" textAnchor="middle" fill="#92400e" fontSize="11">2</text>

                <rect x="126" y="0" width="36" height="30" rx="4" fill="#fef3c7" stroke="#f59e0b" />
                <text x="144" y="20" textAnchor="middle" fill="#92400e" fontSize="11">3</text>

                <rect x="168" y="0" width="36" height="30" rx="4" fill="#f1f5f9" stroke="#94a3b8" />
                <text x="186" y="20" textAnchor="middle" fill="#64748b" fontSize="11">4</text>

                <rect x="210" y="0" width="36" height="30" rx="4" fill="#f1f5f9" stroke="#94a3b8" />
                <text x="228" y="20" textAnchor="middle" fill="#64748b" fontSize="11">5</text>

                {/* Sender Window Box */}
                <rect x="38" y="-4" width="128" height="38" rx="6" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 3" />
                <text x="102" y="52" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="bold">Sender Window [1..4]</text>

                {/* Retransmit note */}
                <text x="320" y="20" fill="#dc2626" fontSize="11" fontWeight="bold">timeout on frame 1 → Retransmits 1, 2, 3, 4</text>
              </g>

              {/* Selective Repeat Section */}
              <text x="20" y="124" fill="#0f172a" fontSize="13" fontWeight="bold">Selective Repeat (SR) — Window Size N = 4 (Receiver Window = 4)</text>
              <g transform="translate(20, 135)">
                {/* Frames */}
                <rect x="0" y="0" width="36" height="30" rx="4" fill="#cbd5e1" stroke="#64748b" />
                <text x="18" y="20" textAnchor="middle" fill="#334155" fontSize="11">0 (ACK)</text>

                <rect x="42" y="0" width="36" height="30" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
                <text x="60" y="20" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">1 (LOST)</text>

                <rect x="84" y="0" width="36" height="30" rx="4" fill="#dcfce7" stroke="#22c55e" />
                <text x="102" y="20" textAnchor="middle" fill="#166534" fontSize="11">2 (Buf)</text>

                <rect x="126" y="0" width="36" height="30" rx="4" fill="#dcfce7" stroke="#22c55e" />
                <text x="144" y="20" textAnchor="middle" fill="#166534" fontSize="11">3 (Buf)</text>

                <rect x="168" y="0" width="36" height="30" rx="4" fill="#f1f5f9" stroke="#94a3b8" />
                <text x="186" y="20" textAnchor="middle" fill="#64748b" fontSize="11">4</text>

                <rect x="210" y="0" width="36" height="30" rx="4" fill="#f1f5f9" stroke="#94a3b8" />
                <text x="228" y="20" textAnchor="middle" fill="#64748b" fontSize="11">5</text>

                {/* Sender Window Box */}
                <rect x="38" y="-4" width="128" height="38" rx="6" fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="3 3" />
                <text x="102" y="52" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">Sender & Rx Window [1..4]</text>

                {/* Retransmit note */}
                <text x="320" y="20" fill="#059669" fontSize="11" fontWeight="bold">timeout on frame 1 → Retransmits ONLY frame 1</text>
              </g>
            </svg>
          </div>
          <div className="diagram-footer">
            <p>{caption || "Go-Back-N discards out-of-order frames and retransmits all. Selective Repeat buffers out-of-order frames and retransmits only lost frames."}</p>
          </div>
        </div>
      );

    case "subnetting-hierarchy":
      return (
        <div className="diagram-card" aria-label="IPv4 Subnetting and Address Space Breakdown Diagram">
          <div className="diagram-header">
            <span className="diagram-badge">IPv4 CIDR Addressing</span>
            <h4>{title || "CIDR IPv4 Subnetting & Address Range Decomposition"}</h4>
          </div>
          <div className="svg-wrapper">
            <svg viewBox="0 0 540 200" className="diagram-svg">
              {/* Top bar: 32-bit IP representation */}
              <text x="270" y="22" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">IP Block: 192.0.2.77 /26 (Subnet Mask 255.255.255.192)</text>

              {/* Bit bar */}
              <g transform="translate(30, 35)">
                <rect x="0" y="0" width="340" height="30" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
                <text x="170" y="20" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">Network / Subnet Prefix (26 bits)</text>

                <rect x="345" y="0" width="135" height="30" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
                <text x="412" y="20" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">Host Bits (6 bits)</text>
              </g>

              {/* Range Cards */}
              <g transform="translate(30, 85)">
                {/* Network ID Card */}
                <rect x="0" y="0" width="150" height="65" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                <text x="75" y="22" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">NETWORK ID</text>
                <text x="75" y="44" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">192.0.2.64</text>

                {/* Usable Hosts Card */}
                <rect x="165" y="0" width="150" height="65" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
                <text x="240" y="22" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">USABLE HOST RANGE</text>
                <text x="240" y="44" textAnchor="middle" fill="#14532d" fontSize="12" fontWeight="bold">192.0.2.65 – .126</text>

                {/* Broadcast Card */}
                <rect x="330" y="0" width="150" height="65" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
                <text x="405" y="22" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">DIRECTED BROADCAST</text>
                <text x="405" y="44" textAnchor="middle" fill="#7f1d1d" fontSize="13" fontWeight="bold">192.0.2.127</text>
              </g>

              <text x="270" y="180" textAnchor="middle" fill="#475569" fontSize="11">Total IPs: 2^6 = 64 | Usable Hosts: 2^6 - 2 = 62 addresses</text>
            </svg>
          </div>
          <div className="diagram-footer">
            <p>{caption || "A /26 prefix reserves 26 bits for the network and 6 bits for hosts, giving a block size of 64 with 62 usable host addresses."}</p>
          </div>
        </div>
      );

    case "process-states":
      return (
        <div className="diagram-card" aria-label="OS Process State Transition Diagram">
          <div className="diagram-header">
            <span className="diagram-badge">OS Process Lifecycle</span>
            <h4>{title || "Process State Transition Diagram"}</h4>
          </div>
          <div className="svg-wrapper">
            <svg viewBox="0 0 540 160" className="diagram-svg">
              {/* New State */}
              <rect x="20" y="60" width="75" height="36" rx="18" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
              <text x="57" y="82" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">NEW</text>

              {/* Arrow New -> Ready */}
              <line x1="95" y1="78" x2="135" y2="78" stroke="#64748b" strokeWidth="2" />

              {/* Ready State */}
              <rect x="140" y="60" width="85" height="36" rx="18" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
              <text x="182" y="82" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">READY</text>

              {/* Arrow Ready -> Running */}
              <path d="M 225 70 L 305 70" stroke="#0284c7" strokeWidth="2" />
              <text x="265" y="64" textAnchor="middle" fill="#0284c7" fontSize="9">Scheduler Dispatch</text>

              {/* Running State */}
              <rect x="310" y="60" width="95" height="36" rx="18" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
              <text x="357" y="82" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">RUNNING</text>

              {/* Arrow Running -> Ready (Interrupt) */}
              <path d="M 340 60 C 310 30 210 30 190 60" fill="none" stroke="#ea580c" strokeWidth="1.5" />
              <text x="265" y="24" textAnchor="middle" fill="#c2410c" fontSize="9">Interrupt / Time Quantum Expired</text>

              {/* Waiting State */}
              <rect x="220" y="115" width="90" height="36" rx="18" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
              <text x="265" y="137" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">WAITING</text>

              {/* Running -> Waiting (I/O) */}
              <path d="M 360 96 C 360 133 320 133 310 133" fill="none" stroke="#d97706" strokeWidth="1.5" />
              <text x="365" y="120" textAnchor="middle" fill="#b45309" fontSize="9">I/O Event Wait</text>

              {/* Waiting -> Ready (I/O Complete) */}
              <path d="M 220 133 C 160 133 160 106 160 96" fill="none" stroke="#0284c7" strokeWidth="1.5" />
              <text x="150" y="120" textAnchor="middle" fill="#0369a1" fontSize="9">I/O Complete</text>

              {/* Arrow Running -> Terminated */}
              <line x1="405" y1="78" x2="445" y2="78" stroke="#16a34a" strokeWidth="2" />

              {/* Terminated State */}
              <rect x="450" y="60" width="80" height="36" rx="18" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
              <text x="490" y="82" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="bold">TERMINATED</text>
            </svg>
          </div>
          <div className="diagram-footer">
            <p>{caption || "Five primary process states: New, Ready, Running, Waiting (Blocked), and Terminated."}</p>
          </div>
        </div>
      );

    case "address-translation":
      return (
        <div className="diagram-card" aria-label="Virtual to Physical Address Translation Diagram">
          <div className="diagram-header">
            <span className="diagram-badge">OS Memory Management</span>
            <h4>{title || "Paging Address Translation: Logical to Physical Address"}</h4>
          </div>
          <div className="svg-wrapper">
            <svg viewBox="0 0 520 160" className="diagram-svg">
              {/* Logical Address Box */}
              <rect x="20" y="25" width="160" height="34" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
              <text x="60" y="46" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">Page # p</text>
              <line x1="100" y1="25" x2="100" y2="59" stroke="#0284c7" strokeWidth="1.5" />
              <text x="140" y="46" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">Offset d</text>
              <text x="100" y="16" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">Virtual Address</text>

              {/* Page Table Box */}
              <rect x="210" y="35" width="100" height="90" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
              <text x="260" y="52" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">Page Table</text>
              <line x1="210" y1="60" x2="310" y2="60" stroke="#cbd5e1" strokeWidth="1" />
              <rect x="220" y="70" width="80" height="20" rx="3" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
              <text x="260" y="84" textAnchor="middle" fill="#15803d" fontSize="10" fontWeight="bold">Frame # f</text>

              {/* Line Page # p -> Page Table */}
              <path d="M 60 59 L 60 80 L 210 80" stroke="#0284c7" strokeWidth="2" />

              {/* Physical Address Box */}
              <rect x="340" y="25" width="160" height="34" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
              <text x="380" y="46" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">Frame # f</text>
              <line x1="420" y1="25" x2="420" y2="59" stroke="#16a34a" strokeWidth="1.5" />
              <text x="460" y="46" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">Offset d</text>
              <text x="420" y="16" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">Physical Address</text>

              {/* Line Frame # f -> Physical Address */}
              <path d="M 300 80 L 380 80 L 380 59" stroke="#16a34a" strokeWidth="2" />

              {/* Line Offset d direct copy */}
              <path d="M 140 59 L 140 140 L 460 140 L 460 59" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
              <text x="300" y="152" textAnchor="middle" fill="#b45309" fontSize="10">Offset d copied unchanged</text>
            </svg>
          </div>
          <div className="diagram-footer">
            <p>{caption || "Logical page number (p) is looked up in the page table to get physical frame number (f); offset (d) is copied directly."}</p>
          </div>
        </div>
      );

    case "transaction-states":
      return (
        <div className="diagram-card" aria-label="DBMS Transaction State Lifecycle Diagram">
          <div className="diagram-header">
            <span className="diagram-badge">DBMS ACID Transactions</span>
            <h4>{title || "DBMS Transaction State Transition Diagram"}</h4>
          </div>
          <div className="svg-wrapper">
            <svg viewBox="0 0 520 160" className="diagram-svg">
              {/* Active State */}
              <rect x="30" y="60" width="90" height="36" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
              <text x="75" y="82" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">ACTIVE</text>

              {/* Active -> Partially Committed */}
              <line x1="120" y1="78" x2="195" y2="78" stroke="#0284c7" strokeWidth="2" />

              {/* Partially Committed */}
              <rect x="200" y="60" width="130" height="36" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
              <text x="265" y="82" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">PARTIALLY COMMITTED</text>

              {/* Partially Committed -> Committed */}
              <line x1="330" y1="78" x2="395" y2="78" stroke="#16a34a" strokeWidth="2" />

              {/* Committed */}
              <rect x="400" y="60" width="95" height="36" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
              <text x="447" y="82" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">COMMITTED</text>

              {/* Failed State */}
              <rect x="200" y="115" width="90" height="32" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
              <text x="245" y="135" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="bold">FAILED</text>

              {/* Active -> Failed */}
              <path d="M 75 96 C 75 131 160 131 195 131" fill="none" stroke="#dc2626" strokeWidth="1.5" />

              {/* Aborted State */}
              <rect x="340" y="115" width="90" height="32" rx="8" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
              <text x="385" y="135" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold">ABORTED</text>

              {/* Failed -> Aborted */}
              <line x1="290" y1="131" x2="335" y2="131" stroke="#dc2626" strokeWidth="2" />
            </svg>
          </div>
          <div className="diagram-footer">
            <p>{caption || "Transactions transition from Active to Partially Committed before final Commit or Rollback to Aborted."}</p>
          </div>
        </div>
      );

    case "precedence-graph":
      return (
        <div className="diagram-card" aria-label="DBMS Precedence Graph Example">
          <div className="diagram-header">
            <span className="diagram-badge">Conflict Serializability</span>
            <h4>{title || "Precedence Graph (Serialization Graph) Testing"}</h4>
          </div>
          <div className="svg-wrapper">
            <svg viewBox="0 0 460 140" className="diagram-svg">
              <defs>
                <marker id="pg-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#0284c7" />
                </marker>
              </defs>

              {/* T1 */}
              <circle cx="80" cy="70" r="26" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
              <text x="80" y="75" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">T₁</text>

              {/* T1 -> T2 */}
              <line x1="106" y1="70" x2="204" y2="70" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#pg-arrow)" />
              <text x="155" y="60" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="bold">W₁(A) ➔ R₂(A)</text>

              {/* T2 */}
              <circle cx="230" cy="70" r="26" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
              <text x="230" y="75" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">T₂</text>

              {/* T2 -> T3 */}
              <line x1="256" y1="70" x2="354" y2="70" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#pg-arrow)" />
              <text x="305" y="60" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="bold">W₂(B) ➔ W₃(B)</text>

              {/* T3 */}
              <circle cx="380" cy="70" r="26" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" />
              <text x="380" y="75" textAnchor="middle" fill="#15803d" fontSize="13" fontWeight="bold">T₃</text>
            </svg>
          </div>
          <div className="diagram-footer">
            <p>{caption || "No cycles in the precedence graph implies the schedule is Conflict Serializable (equivalent serial order: T₁ ➔ T₂ ➔ T₃)."}</p>
          </div>
        </div>
      );

    case "compiler-phases":
      return (
        <div className="diagram-card" aria-label="Compiler Phases Flow Architecture Diagram">
          <div className="diagram-header">
            <span className="diagram-badge">Compiler Architecture</span>
            <h4>{title || "Phases of a Compiler (Analysis & Synthesis)"}</h4>
          </div>
          <div className="svg-wrapper">
            <svg viewBox="0 0 540 280" className="diagram-svg">
              <defs>
                <marker id="cp-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
                </marker>
              </defs>

              {/* Symbol Table & Error Handler Side Blocks */}
              <rect x="20" y="40" width="100" height="200" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="70" y="145" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold" transform="rotate(-90 70 145)">Symbol Table & Error Handler</text>

              {/* Analysis Phases (Front End) */}
              <rect x="150" y="20" width="160" height="34" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
              <text x="230" y="41" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">1. Lexical Analyzer</text>

              <line x1="230" y1="54" x2="230" y2="70" stroke="#475569" strokeWidth="2" markerEnd="url(#cp-arrow)" />

              <rect x="150" y="72" width="160" height="34" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
              <text x="230" y="93" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">2. Syntax Analyzer</text>

              <line x1="230" y1="106" x2="230" y2="122" stroke="#475569" strokeWidth="2" markerEnd="url(#cp-arrow)" />

              <rect x="150" y="124" width="160" height="34" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
              <text x="230" y="145" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">3. Semantic Analyzer</text>

              <line x1="230" y1="158" x2="230" y2="174" stroke="#475569" strokeWidth="2" markerEnd="url(#cp-arrow)" />

              {/* Synthesis Phases (Back End) */}
              <rect x="350" y="124" width="160" height="34" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
              <text x="430" y="145" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="bold">4. Intermediate Code Gen</text>

              <line x1="430" y1="158" x2="430" y2="174" stroke="#475569" strokeWidth="2" markerEnd="url(#cp-arrow)" />

              <rect x="350" y="176" width="160" height="34" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
              <text x="430" y="197" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="bold">5. Code Optimizer</text>

              <line x1="430" y1="210" x2="430" y2="226" stroke="#475569" strokeWidth="2" markerEnd="url(#cp-arrow)" />

              <rect x="350" y="228" width="160" height="34" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
              <text x="430" y="249" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="bold">6. Target Code Gen</text>

              {/* Bridge Arrow Front-end to Back-end */}
              <path d="M 310 141 L 350 141" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#cp-arrow)" />
            </svg>
          </div>
          <div className="diagram-footer">
            <p>{caption || "Front-end (Analysis: Lexical, Syntax, Semantic) produces Intermediate Code; Back-end (Synthesis: Optimization, Target Code) yields machine instructions."}</p>
          </div>
        </div>
      );

    case "parse-tree-vs-ast":
      return (
        <div className="diagram-card" aria-label="Concrete Parse Tree vs Abstract Syntax Tree Comparison">
          <div className="diagram-header">
            <span className="diagram-badge">Syntax Representation</span>
            <h4>{title || "Concrete Parse Tree vs Abstract Syntax Tree (AST)"}</h4>
          </div>
          <div className="svg-wrapper">
            <svg viewBox="0 0 520 220" className="diagram-svg">
              {/* Parse Tree Side */}
              <text x="130" y="22" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">Concrete Parse Tree (Full Syntax)</text>
              <circle cx="130" cy="45" r="16" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
              <text x="130" y="50" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">E</text>

              <line x1="118" y1="58" x2="80" y2="85" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="130" y1="61" x2="130" y2="85" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="142" y1="58" x2="180" y2="85" stroke="#94a3b8" strokeWidth="1.5" />

              <circle cx="80" cy="100" r="14" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="80" y="104" textAnchor="middle" fill="#1e40af" fontSize="11">E</text>
              <circle cx="130" cy="100" r="14" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="130" y="104" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">+</text>
              <circle cx="180" cy="100" r="14" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="180" y="104" textAnchor="middle" fill="#1e40af" fontSize="11">T</text>

              <line x1="80" y1="114" x2="80" y2="135" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="180" y1="114" x2="180" y2="135" stroke="#94a3b8" strokeWidth="1.5" />

              <circle cx="80" cy="150" r="14" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
              <text x="80" y="154" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">id(a)</text>
              <circle cx="180" cy="150" r="14" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
              <text x="180" y="154" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">id(b)</text>

              {/* AST Side */}
              <text x="390" y="22" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">Abstract Syntax Tree (AST)</text>
              <circle cx="390" cy="65" r="18" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
              <text x="390" y="70" textAnchor="middle" fill="#92400e" fontSize="15" fontWeight="bold">+</text>

              <line x1="376" y1="78" x2="340" y2="115" stroke="#0284c7" strokeWidth="2" />
              <line x1="404" y1="78" x2="440" y2="115" stroke="#0284c7" strokeWidth="2" />

              <circle cx="340" cy="130" r="16" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
              <text x="340" y="135" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="bold">a</text>
              <circle cx="440" cy="130" r="16" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
              <text x="440" y="135" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="bold">b</text>
            </svg>
          </div>
          <div className="diagram-footer">
            <p>{caption || "Parse trees include all non-terminal grammar productions; ASTs abstract away redundant non-terminals into essential operator nodes."}</p>
          </div>
        </div>
      );

    case "dfa-transition":
    case "pda-stack":
    default:
      // Fallback to TOC Diagram renderer
      return null;
  }
};
