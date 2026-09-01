# Computer Networks content audit

Reviewed: 1 September 2026  
Scope: the existing 14-topic Computer Networks module against the IOCL Grade-A CS/IT heading and the detailed GATE 2026 CS syllabus.

## Scope check

IOCL lists **Computer Networks** as one of the ten CS/IT headings. GATE expands it into layering; packet/circuit/virtual-circuit switching; framing, error detection, MAC and Ethernet bridging; shortest-path, flooding, distance-vector and link-state routing; fragmentation, IPv4 and CIDR; ARP, DHCP, ICMP and NAT; UDP, TCP, sockets, flow and congestion control; DNS, SMTP, HTTP, FTP and email. The revised module stays inside that scope. Security remains a clearly marked low-priority foundation add-on, not an asserted IOCL sub-heading.

| Current topic | Missing concepts / issues found | Duplicated or overly compressed material | Planned correction | Sources used |
| --- | --- | --- | --- | --- |
| 1. Network fundamentals and performance terms | Components; packet/circuit/virtual-circuit switching; multi-hop delay; goodput meaning; data in flight; jitter explanation. “Only queueing varies strongly” was too absolute. | Delay formula was repeated without a whole-path method. | Teach the four delays, then a hop-by-hop calculation and bandwidth-delay product as data that can fill a path. | GATE CS syllabus; RFC 1242; NPTEL course page |
| 2. OSI and TCP/IP models | Why layering exists; protocol vs service; headers/trailers; PDU names and TCP/UDP distinction. | Layer names were a list rather than a usable model. | Add a message journey and explicit PDU caveat: TCP segment, UDP datagram, IP packet/datagram. | GATE CS syllabus; RFC 1122 |
| 3. Networking devices and domains | Device-by-device forwarding basis; VLAN basics; full-duplex collision caveat; gateway context. | Switch/router boundary appeared again in Topic 4 without domain reasoning. | Separate device/domain logic from Ethernet forwarding; explain exam convention versus modern Ethernet. | GATE CS syllabus; RFC 1122; IEEE 802.3 |
| 4. Ethernet, framing and MAC | Frame fields, same-ingress filtering, FCS purpose, CSMA/CD relevance. | Learning/forwarding rule was stated but not walked through. | Add source-learning → destination-lookup sequence and all three forwarding outcomes. | GATE CS syllabus; IEEE 802.3 |
| 5. Error and flow control | Parity, checksum, CRC intuition, Stop-and-Wait ARQ, link-layer versus TCP flow control. | GBN/SR comparison lacked the earlier “why”. | Build from error detection to ACK/retransmission to windows, then compare GBN/SR. | GATE CS syllabus; RFC 1122; NPTEL course page |
| 6. IPv4 | Header fields, TTL, fragmentation fields, loopback/private/special addresses. | Address arithmetic overlapped Topic 7. | Keep address structure/header/fragmentation here; move detailed subnet calculation to Topic 7. | GATE CS syllabus; RFC 791; RFC 1918 |
| 7. Subnetting, CIDR and route aggregation | VLSM, usable-range method, several worked examples, longest-prefix lookup. | CIDR and aggregation were only formula-level. | Add repeatable subnetting procedure, VLSM allocation and table lookup method. | GATE CS syllabus; RFC 4632; Cisco subnetting documentation |
| 8. IP support protocols | ICMP message examples, PAT distinction, layer/address mapping and confusion checks. | ARP and default-gateway point appeared without the full path. | Explain the exact problem solved by each protocol and trace a remote-subnet send. | GATE CS syllabus; RFCs 826, 2131, 792, 3022 |
| 9. Routing | Forwarding vs routing; flooding; count-to-infinity; routing table lookup. | Protocol names were memorisation-only. | Start with a router’s lookup, then introduce algorithm families and RIP/OSPF/BGP roles. | GATE CS syllabus; RFCs 2328, 2453, 4271 |
| 10. TCP, UDP, ports and sockets | Header-level concepts, sockets, multiplexing/demultiplexing, selection of protocol by application. | TCP reliability was duplicated in Topic 11. | Keep service choice and addressing here; keep handshake/recovery mechanics in Topic 11. | GATE CS syllabus; RFCs 768, 9293 |
| 11. TCP connection and reliability | Timeout, cumulative ACK, duplicate ACK and their purpose. | Handshake/close had no recovery narrative. | Show sequence arithmetic, handshake, close and ACK/retransmission outcomes. | GATE CS syllabus; RFC 9293 |
| 12. Flow and congestion control | Advertised/effective window, AIMD, timeout versus triple duplicate ACK. | rwnd/cwnd distinction was good but too short. | Contrast receiver protection with network protection; work one effective-window example. | GATE CS syllabus; RFC 5681; RFC 9293 |
| 13. Application-layer protocols | DNS hierarchy, persistent/non-persistent HTTP, HTTPS, FTP channels, POP3/IMAP, email path and relevant ports. | DNS and mail facts were isolated rather than connected. | Add a browser/mail flow and a role-based comparison table. | GATE CS syllabus; RFCs 1034, 9110, 959, 5321; MDN HTTP overview |
| 14. Network security fundamentals | Firewall, IDS/IPS and basic attack vocabulary. | It risked sounding like a full cryptography syllabus. | Keep it short, explicitly lower priority and limited to CIA, crypto primitives, TLS and controls. | NIST SP 800-12 Rev. 1; RFC 8446 |

## Corrections carried into the rewrite

- Bandwidth, throughput and goodput are distinct: capacity, delivered rate, and useful application payload rate.
- Whole-path delay counts relevant links and intermediate processing/queueing; queueing is often the most variable delay, not the only variable one.
- A transport PDU is not always called a segment: TCP uses segments; UDP commonly uses datagrams.
- A switch learns from the source MAC and forwards by destination MAC, including filtering when the destination maps to the ingress port.
- Switch-port collision-domain questions are taught with the full-duplex caveat; VLANs split broadcast domains at Layer 2.
- Data-link flow control and TCP receiver flow control are explicitly separated.

## Sources inspected

- `sources/official/GradeADomainKnowledge.pdf`, page 7 — IOCL CS/IT scope.
- `sources/official/CS_2026_Syllabus.pdf`, Section 10 — detailed permitted topic expansion.
- NPTEL course landing pages: [Computer Networks and Internet Protocol](https://nptel.ac.in/courses/106105183) and [Computer Networks](https://nptel.ac.in/courses/106106003) — teaching-source availability.
- IETF/RFC Editor: [RFC 791](https://www.rfc-editor.org/rfc/rfc791), [RFC 826](https://www.rfc-editor.org/rfc/rfc826), [RFC 2131](https://www.rfc-editor.org/rfc/rfc2131), [RFC 792](https://www.rfc-editor.org/rfc/rfc792), [RFC 4632](https://www.rfc-editor.org/rfc/rfc4632), [RFC 9293](https://www.rfc-editor.org/rfc/rfc9293), [RFC 5681](https://www.rfc-editor.org/rfc/rfc5681), [RFC 5321](https://www.rfc-editor.org/rfc/rfc5321), and [RFC 8446](https://www.rfc-editor.org/rfc/rfc8446).
- [IEEE 802.3 Ethernet Working Group](https://www.ieee802.org/3/) and [MDN HTTP overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview).

The current NPTEL landing pages are usable as institutional course references but expose little lesson text in this environment. Protocol-specific claims therefore use the corresponding RFC or standard, rather than attributing them vaguely to NPTEL.
