import type { Attempt, Question, RevisionFilters } from "../types";

export type RevisionItem = { attempt: Attempt; question: Question };

export function filterWrongAnswers(attempts: Attempt[], questions: Question[], filters: RevisionFilters = {}): RevisionItem[] {
  const byId = new Map(questions.map((question) => [question.id, question]));
  return attempts
    .filter((attempt) => !attempt.correct && !attempt.skipped)
    .map((attempt) => ({ attempt, question: byId.get(attempt.questionId) }))
    .filter((item): item is RevisionItem => Boolean(item.question))
    .filter(({ attempt, question }) =>
      (!filters.subject || question.subject === filters.subject) &&
      (!filters.topic || question.topic === filters.topic) &&
      (!filters.difficulty || question.difficulty === filters.difficulty) &&
      (!filters.confidence || attempt.confidence === filters.confidence),
    );
}
