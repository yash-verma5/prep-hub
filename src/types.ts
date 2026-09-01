export const SUBJECTS = [
  "Engineering Mathematics",
  "Digital Logic",
  "Computer Organization and Architecture",
  "Programming and Data Structures",
  "Algorithms",
  "Theory of Computation",
  "Compiler Design",
  "Operating Systems",
  "Databases",
  "Computer Networks",
  "Quantitative Aptitude",
  "Logical Reasoning",
  "English",
] as const;

export type Subject = (typeof SUBJECTS)[number];
export type Section = "quant" | "reasoning" | "english" | "domain";
export type Confidence = "Sure" | "Doubtful" | "Guess";
export type Difficulty = "Easy" | "Medium" | "Hard";

export type Question = {
  id: string;
  status: "approved";
  provenance: "official" | "adapted" | "original";
  attribution: string;
  sourceId: string;
  sourceLocator: string;
  section: Section;
  subject: Subject;
  topic: string;
  difficulty: Difficulty;
  stem: string;
  question?: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  correctOption?: string;
  explanation: string;
  closestDistractorExplanation?: string;
  sourceTitle?: string;
  sourceUrl?: string;
  verificationSources: { sourceId: string; locator: string }[];
  reviewNote: string;
};

export type LearningModule = {
  id: string;
  title: Subject;
  provenance: "original";
  syllabusSource: { title: string; url: string };
  topics: LearningTopic[];
};

export type LearningTopic = {
  order: number;
  title: string;
  oneLine: string;
  whyItMatters: string;
  understandSimply: string[];
  analogy?: { title: string; text: string };
  technicalExplanation: string[];
  definitions: { term: string; definition: string }[];
  steps: { title: string; description: string }[];
  formulasAndMethods: string[];
  comparisons: { title: string; columns: string[]; rows: string[][] }[];
  solvedExamples: { question: string; solution: string }[];
  traps: string[];
  takeaways: string[];
  quickRecall: { question: string; answer: string }[];
  sources: { title: string; url: string; usedFor: string[] }[];
};

export type Attempt = {
  id: string;
  questionId: string;
  selectedOptionId: string | null;
  confidence: Confidence | null;
  correct: boolean;
  skipped: boolean;
  subject: Subject;
  topic: string;
  difficulty: Difficulty;
  mode: "practice" | "exam";
  elapsedSeconds: number;
  createdAt: string;
};

export type Progress = {
  version: 1;
  attempts: Attempt[];
  bookmarks: string[];
  reports: string[];
  syllabus: Partial<Record<Subject, boolean>>;
  learning: Record<string, boolean>;
};

export type RevisionFilters = {
  subject?: string;
  topic?: string;
  difficulty?: string;
  confidence?: string;
};
