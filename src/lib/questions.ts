import { SUBJECTS, type Question } from "../types";

const sections = ["quant", "reasoning", "english", "domain"];
const difficulties = ["Easy", "Medium", "Hard"];
const provenances = ["official", "adapted", "original"];

export function validateQuestions(value: unknown, sourceIds: Set<string>): Question[] {
  if (!Array.isArray(value)) throw new Error("Question bank must be an array.");
  const ids = new Set<string>();
  return value.map((raw, index) => {
    if (!raw || typeof raw !== "object") throw new Error(`Question ${index + 1} must be an object.`);
    const q = raw as Record<string, unknown>;
    for (const field of ["id", "attribution", "sourceId", "sourceLocator", "subject", "topic", "stem", "correctOptionId", "explanation", "reviewNote"]) {
      if (typeof q[field] !== "string" || !(q[field] as string).trim()) throw new Error(`Question ${index + 1} is missing ${field}.`);
    }
    if (ids.has(q.id as string)) throw new Error(`Duplicate question id: ${q.id}`);
    ids.add(q.id as string);
    if (q.status !== "approved") throw new Error(`Question ${q.id} is not approved.`);
    if (!provenances.includes(q.provenance as string) || !sections.includes(q.section as string) || !difficulties.includes(q.difficulty as string)) throw new Error(`Question ${q.id} has invalid metadata.`);
    if (!SUBJECTS.includes(q.subject as (typeof SUBJECTS)[number])) throw new Error(`Question ${q.id} has an unknown subject.`);
    if (!sourceIds.has(q.sourceId as string)) throw new Error(`Question ${q.id} has an unknown source.`);
    if (!Array.isArray(q.options) || q.options.length !== 4) throw new Error(`Question ${q.id} must have four options.`);
    const options = q.options as { id?: unknown; text?: unknown }[];
    const optionIds = options.map((option) => option.id);
    if (options.some((option) => typeof option.id !== "string" || typeof option.text !== "string" || !option.text.trim()) || new Set(optionIds).size !== 4) throw new Error(`Question ${q.id} has invalid options.`);
    if (!optionIds.includes(q.correctOptionId)) throw new Error(`Question ${q.id} has an invalid correct option.`);
    if (q.subject === "Computer Networks") {
      for (const field of ["question", "correctOption", "closestDistractorExplanation", "sourceTitle", "sourceUrl"]) {
        if (typeof q[field] !== "string" || !(q[field] as string).trim()) throw new Error("Network question is missing " + field + ".");
      }
      if (q.question !== q.stem || q.correctOption !== q.correctOptionId) throw new Error("Network question has inconsistent compatibility fields.");
      try { if (new URL(q.sourceUrl as string).protocol !== "https:") throw new Error(); } catch { throw new Error("Network question has an invalid source URL."); }
    }
    if (!Array.isArray(q.verificationSources) || !q.verificationSources.length || q.verificationSources.some((source) => !source || typeof source !== "object" || typeof (source as { sourceId?: unknown }).sourceId !== "string" || typeof (source as { locator?: unknown }).locator !== "string" || !sourceIds.has((source as { sourceId: string }).sourceId))) throw new Error(`Question ${q.id} has invalid verification sources.`);
    return q as Question;
  });
}
