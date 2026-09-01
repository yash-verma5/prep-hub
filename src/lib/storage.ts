import { SUBJECTS, type Attempt, type Progress } from "../types";

export const STORAGE_KEY = "iocl-prep-progress-v1";
export const EMPTY_PROGRESS: Progress = { version: 1, attempts: [], bookmarks: [], reports: [], syllabus: {}, learning: {} };

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const strings = (value: unknown): value is string[] => Array.isArray(value) && value.every((item) => typeof item === "string");
const validLearningKey = (key: string) => {
  const order = Number(key.replace("network-topic-", ""));
  return key.startsWith("network-topic-") && Number.isInteger(order) && order >= 1 && order <= 14;
};

export function parseProgress(value: unknown): Progress {
  if (!value || typeof value !== "object") throw new Error("Progress must be an object.");
  const data = value as Partial<Progress>;
  if (data.version !== 1 || !Array.isArray(data.attempts) || !strings(data.bookmarks) || !strings(data.reports)) throw new Error("Unsupported or malformed progress file.");
  if (!data.attempts.every(validAttempt)) throw new Error("Progress contains a malformed attempt.");
  const syllabus = data.syllabus && typeof data.syllabus === "object" ? data.syllabus : {};
  const learning = data.learning && typeof data.learning === "object" ? data.learning : {};
  if (Object.keys(syllabus).some((subject) => !SUBJECTS.includes(subject as (typeof SUBJECTS)[number]))) throw new Error("Progress contains an unknown syllabus subject.");
  if (Object.entries(learning).some(([key, item]) => !validLearningKey(key) || typeof item !== "boolean")) throw new Error("Progress contains malformed learning progress.");
  return { version: 1, attempts: data.attempts, bookmarks: [...new Set(data.bookmarks)], reports: [...new Set(data.reports)], syllabus, learning: { ...learning } };
}

function validAttempt(value: unknown): value is Attempt {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<Attempt>;
  return typeof item.id === "string" && typeof item.questionId === "string" &&
    (typeof item.selectedOptionId === "string" || item.selectedOptionId === null) &&
    (item.confidence === "Sure" || item.confidence === "Doubtful" || item.confidence === "Guess" || item.confidence === null) &&
    typeof item.correct === "boolean" && typeof item.skipped === "boolean" &&
    SUBJECTS.includes(item.subject as (typeof SUBJECTS)[number]) && typeof item.topic === "string" &&
    (item.difficulty === "Easy" || item.difficulty === "Medium" || item.difficulty === "Hard") &&
    (item.mode === "practice" || item.mode === "exam") && typeof item.elapsedSeconds === "number" && typeof item.createdAt === "string";
}

export function loadProgress(storage: StorageLike = localStorage): Progress {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    return raw ? parseProgress(JSON.parse(raw)) : structuredClone(EMPTY_PROGRESS);
  } catch {
    return structuredClone(EMPTY_PROGRESS);
  }
}

export function saveProgress(progress: Progress, storage: StorageLike = localStorage): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(parseProgress(progress)));
}

export function clearProgress(storage: StorageLike = localStorage): void {
  storage.removeItem(STORAGE_KEY);
}
