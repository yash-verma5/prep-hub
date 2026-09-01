import type { LearningModule } from "../types";

export const NETWORK_TOPIC_ORDER = [
  "Network fundamentals and performance terms",
  "OSI and TCP/IP models",
  "Hub, repeater, bridge, switch, router and gateway",
  "Ethernet, MAC addressing and switching",
  "Error detection, flow control and sliding-window protocols",
  "IPv4 addressing",
  "Subnetting, CIDR and route aggregation",
  "ARP, DHCP, ICMP and NAT",
  "Routing algorithms and routing protocols",
  "TCP and UDP",
  "TCP connection establishment and termination",
  "Flow control and congestion control",
  "DNS, HTTP/HTTPS, FTP, SMTP and email",
  "Network security fundamentals",
] as const;

const text = (value: unknown) => typeof value === "string" && Boolean(value.trim());
const strings = (value: unknown) => Array.isArray(value) && value.length > 0 && value.every(text);
const validUrl = (value: unknown) => {
  try { return typeof value === "string" && new URL(value).protocol === "https:"; } catch { return false; }
};

export function validateLearningModule(value: unknown): LearningModule {
  if (!value || typeof value !== "object") throw new Error("Learning module must be an object.");
  const module = value as Record<string, unknown>;
  if (module.id !== "computer-networks" || module.title !== "Computer Networks" || module.provenance !== "original") throw new Error("Learning module has invalid metadata.");
  const syllabus = module.syllabusSource as Record<string, unknown> | undefined;
  if (!syllabus || !text(syllabus.title) || !validUrl(syllabus.url)) throw new Error("Learning module has an invalid syllabus source.");
  if (!Array.isArray(module.topics) || module.topics.length !== NETWORK_TOPIC_ORDER.length) throw new Error("Learning module must contain the 14 required topics.");

  module.topics.forEach((raw, index) => {
    if (!raw || typeof raw !== "object") throw new Error(`Learning topic ${index + 1} must be an object.`);
    const topic = raw as Record<string, unknown>;
    if (topic.order !== index + 1 || topic.title !== NETWORK_TOPIC_ORDER[index]) throw new Error(`Learning topic ${index + 1} has invalid order or title.`);
    for (const field of ["oneLine", "whyItMatters"] as const) if (!text(topic[field])) throw new Error(`Learning topic ${index + 1} requires ${field}.`);
    for (const field of ["understandSimply", "technicalExplanation", "formulasAndMethods", "traps"] as const) if (!strings(topic[field])) throw new Error(`Learning topic ${index + 1} requires ${field}.`);
    if (!Array.isArray(topic.comparisons)) throw new Error(`Learning topic ${index + 1} requires comparisons.`);
    if (!Array.isArray(topic.definitions) || !topic.definitions.length || (topic.definitions as unknown[]).some((item) => !item || typeof item !== "object" || !text((item as Record<string, unknown>).term) || !text((item as Record<string, unknown>).definition))) throw new Error(`Learning topic ${index + 1} has invalid definitions.`);
    if (!Array.isArray(topic.steps) || !topic.steps.length || (topic.steps as unknown[]).some((item) => !item || typeof item !== "object" || !text((item as Record<string, unknown>).title) || !text((item as Record<string, unknown>).description))) throw new Error(`Learning topic ${index +1} has invalid steps.`);
    if (!Array.isArray(topic.solvedExamples) || topic.solvedExamples.length !== 2 || (topic.solvedExamples as unknown[]).some((item) => !item || typeof item !== "object" || !text((item as Record<string, unknown>).question) || !text((item as Record<string, unknown>).solution))) throw new Error(`Learning topic ${index + 1} requires two valid solved examples.`);
    if (!Array.isArray(topic.takeaways) || topic.takeaways.length !== 5 || !(topic.takeaways as unknown[]).every(text)) throw new Error(`Learning topic ${index + 1} requires five takeaways.`);
    if (!Array.isArray(topic.quickRecall) || topic.quickRecall.length !== 3 || topic.quickRecall.some((item) => !item || typeof item !== "object" || !text((item as Record<string, unknown>).question) || !text((item as Record<string, unknown>).answer))) throw new Error(`Learning topic ${index + 1} requires three quick-recall prompts.`);
    if (!Array.isArray(topic.sources) || !topic.sources.length || topic.sources.some((item) => !item || typeof item !== "object" || !text((item as Record<string, unknown>).title) || !validUrl((item as Record<string, unknown>).url) || !strings((item as Record<string, unknown>).usedFor))) throw new Error(`Learning topic ${index + 1} has invalid sources.`);
  });
  return module as LearningModule;
}
