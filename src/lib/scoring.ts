import type { Attempt } from "../types";

export type Score = { attempted: number; correct: number; incorrect: number; skipped: number; marks: number; accuracy: number };

export function scoreAttempts(attempts: Pick<Attempt, "correct" | "skipped">[]): Score {
  const correct = attempts.filter((attempt) => attempt.correct).length;
  const skipped = attempts.filter((attempt) => attempt.skipped).length;
  const incorrect = attempts.length - correct - skipped;
  const attempted = correct + incorrect;
  return {
    attempted,
    correct,
    incorrect,
    skipped,
    marks: correct - incorrect * 0.25,
    accuracy: attempted ? (correct / attempted) * 100 : 0,
  };
}
