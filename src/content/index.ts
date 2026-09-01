import rawQuestions from "./questions.json";
import domain1 from "./domain-1.json";
import domain2 from "./domain-2.json";
import domain3 from "./domain-3.json";
import domain4 from "./domain-4.json";
import domain5 from "./domain-5.json";
import networkQuestions from "./network-questions.json";
import rawNetworkModule from "./network-module.json";
import sources from "./sources.json";
import { validateQuestions } from "../lib/questions";
import { validateLearningModule } from "../lib/learning";

export const contentSources = sources;
export const questions = validateQuestions([...rawQuestions, ...domain1, ...domain2, ...domain3, ...domain4, ...domain5, ...networkQuestions], new Set(sources.map((source) => source.id)));
export const networkModule = validateLearningModule(rawNetworkModule);
