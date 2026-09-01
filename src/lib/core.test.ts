import { describe, expect, it } from "vitest";
import { dbmsModule, networkModule, osModule, tocModule, compilerDesignModule, questions } from "../content";
import { SUBJECTS, type Attempt, type Question } from "../types";
import { filterWrongAnswers } from "./revision";
import { scoreAttempts } from "./scoring";
import { EMPTY_PROGRESS, loadProgress, parseProgress, saveProgress, STORAGE_KEY } from "./storage";
import { validateQuestions } from "./questions";
import { DBMS_TOPIC_ORDER, NETWORK_TOPIC_ORDER, OS_TOPIC_ORDER, TOC_TOPIC_ORDER, COMPILER_DESIGN_TOPIC_ORDER, validateLearningModule } from "./learning";

const memoryStorage = () => {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
    removeItem: (key: string) => { values.delete(key); },
    values,
  };
};

const attempt = (overrides: Partial<Attempt> = {}): Attempt => ({
  id: "attempt-1", questionId: "cn-003", selectedOptionId: "a", confidence: "Sure",
  correct: false, skipped: false, subject: "Computer Networks", topic: "OSI and TCP/IP models",
  difficulty: "Easy", mode: "practice", elapsedSeconds: 12, createdAt: "2026-09-01T00:00:00.000Z",
  ...overrides,
});

describe("IOCL scoring", () => {
  it("scores 8 correct and 2 incorrect as 7.5 marks", () => {
    const result = scoreAttempts([
      ...Array.from({ length: 8 }, () => ({ correct: true, skipped: false })),
      ...Array.from({ length: 2 }, () => ({ correct: false, skipped: false })),
    ]);
    expect(result).toMatchObject({ correct: 8, incorrect: 2, skipped: 0, marks: 7.5, accuracy: 80 });
  });

  it("gives skipped questions zero marks", () => {
    expect(scoreAttempts([{ correct: false, skipped: true }]).marks).toBe(0);
  });
});

describe("progress persistence", () => {
  it("round-trips valid progress and ignores corrupt storage", () => {
    const storage = memoryStorage();
    const progress = { ...EMPTY_PROGRESS, attempts: [attempt()], bookmarks: ["cn-003"], learning: { "network-topic-1": true } };
    saveProgress(progress, storage);
    expect(loadProgress(storage)).toEqual(progress);
    expect(parseProgress({ ...progress, learning: undefined })).toEqual({ ...progress, learning: {} });
    storage.values.set(STORAGE_KEY, "not json");
    expect(loadProgress(storage)).toEqual(EMPTY_PROGRESS);
  });
});

describe("question validation", () => {
  it("accepts the expanded bank and preserves the exact mock section pools", () => {
    expect(questions).toHaveLength(191);
    expect(questions.filter((q) => q.section === "quant")).toHaveLength(20);
    expect(questions.filter((q) => q.section === "reasoning")).toHaveLength(15);
    expect(questions.filter((q) => q.section === "english")).toHaveLength(15);
    expect(questions.filter((q) => q.section === "domain")).toHaveLength(141);
    expect(questions.filter((q) => q.subject === "Computer Networks")).toHaveLength(20);
    expect(questions.filter((q) => q.subject === "Operating Systems")).toHaveLength(25);
    expect(questions.filter((q) => q.subject === "Databases")).toHaveLength(25);
    expect(questions.filter((q) => q.subject === "Theory of Computation")).toHaveLength(25);
    expect(questions.filter((q) => q.subject === "Compiler Design")).toHaveLength(21);
    expect(questions.filter((q) => q.id.startsWith("toc-"))).toHaveLength(25);
    expect(questions.filter((q) => q.id.startsWith("cd-"))).toHaveLength(16);
    expect(questions.filter((q) => q.id.startsWith("compiler-"))).toHaveLength(5);
    const mockDomain = SUBJECTS.slice(0, 10).flatMap((subject) => questions.filter((q) => q.subject === subject).slice(0, 5));
    expect(mockDomain).toHaveLength(50);
  });

  it("rejects a question without an explanation", () => {
    const invalid = { ...questions[0], explanation: "" } as Question;
    expect(() => validateQuestions([invalid], new Set([invalid.sourceId, ...invalid.verificationSources.map((source) => source.sourceId)]))).toThrow(/explanation/);
  });

  it("validates all learning topics and their required study blocks", () => {
    expect(validateLearningModule(networkModule)).toBe(networkModule);
    expect(networkModule.topics.map((topic) => topic.title)).toEqual([...NETWORK_TOPIC_ORDER]);
    expect(networkModule.topics.every((topic) => topic.solvedExamples.length === 2 && topic.takeaways.length === 5 && topic.quickRecall.length === 3)).toBe(true);

    expect(validateLearningModule(osModule)).toBe(osModule);
    expect(osModule.topics.map((topic) => topic.title)).toEqual([...OS_TOPIC_ORDER]);
    expect(osModule.topics.every((topic) => topic.solvedExamples.length === 2 && topic.takeaways.length === 5 && topic.quickRecall.length === 3)).toBe(true);

    expect(validateLearningModule(dbmsModule)).toBe(dbmsModule);
    expect(dbmsModule.topics.map((topic) => topic.title)).toEqual([...DBMS_TOPIC_ORDER]);
    expect(dbmsModule.topics.every((topic) => topic.solvedExamples.length === 2 && topic.takeaways.length === 5 && topic.quickRecall.length === 3)).toBe(true);

    expect(validateLearningModule(tocModule)).toBe(tocModule);
    expect(tocModule.topics.map((topic) => topic.title)).toEqual([...TOC_TOPIC_ORDER]);
    expect(tocModule.topics.every((topic) => topic.solvedExamples.length === 2 && topic.takeaways.length >= 2 && topic.quickRecall.length === 3)).toBe(true);

    expect(validateLearningModule(compilerDesignModule)).toBe(compilerDesignModule);
    expect(compilerDesignModule.topics.map((topic) => topic.title)).toEqual([...COMPILER_DESIGN_TOPIC_ORDER]);
    expect(compilerDesignModule.topics.every((topic) => topic.solvedExamples.length === 2 && topic.takeaways.length >= 2 && topic.quickRecall.length === 3)).toBe(true);
  });

  it("requires Network-specific source and distractor fields", () => {
    const networkQuestions = questions.filter((question) => question.subject === "Computer Networks");
    expect(networkQuestions.every((question) => question.options.length === 4 && question.closestDistractorExplanation && question.sourceTitle && question.sourceUrl?.startsWith("https://"))).toBe(true);
  });
});

describe("wrong-answer filtering", () => {
  it("filters incorrect answers by subject, topic, difficulty and confidence", () => {
    const attempts = [
      attempt(),
      attempt({ id: "attempt-2", questionId: "cn-012", topic: "ARP, DHCP, ICMP and NAT", confidence: "Guess" }),
      attempt({ id: "attempt-3", questionId: "cn-005", correct: true }),
    ];
    const result = filterWrongAnswers(attempts, questions, { subject: "Computer Networks", topic: "OSI and TCP/IP models", difficulty: "Easy", confidence: "Sure" });
    expect(result.map((item) => item.question.id)).toEqual(["cn-003"]);
  });
});
