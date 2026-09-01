import rawQuestions from "./questions.json";
import domain1 from "./domain-1.json";
import domain2 from "./domain-2.json";
import domain3 from "./domain-3.json";
import domain4 from "./domain-4.json";
import domain5 from "./domain-5.json";
import networkQuestions from "./network-questions.json";
import rawNetworkModule from "./network-module.json";
import osQuestions from "./os-questions.json";
import rawOsModule from "./os-module.json";
import dbmsQuestions from "./dbms-questions.json";
import rawDbmsModule from "./dbms-module.json";
import tocQuestions from "./toc-questions.json";
import rawTocModule from "./toc-module.json";
import compilerDesignQuestions from "./compiler-design-questions.json";
import rawCompilerDesignModule from "./compiler-design-module.json";
import algorithmsQuestions from "./algorithms-questions.json";
import rawAlgorithmsModule from "./algorithms-module.json";
import pdsQuestions from "./programming-data-structures-questions.json";
import rawPdsModule from "./programming-data-structures-module.json";
import coaQuestions from "./computer-organization-architecture-questions.json";
import rawCoaModule from "./computer-organization-architecture-module.json";
import digitalLogicQuestions from "./digital-logic-questions.json";
import rawDigitalLogicModule from "./digital-logic-module.json";
import engineeringMathematicsQuestions from "./engineering-mathematics-questions.json";
import rawEngineeringMathematicsModule from "./engineering-mathematics-module.json";
import sources from "./sources.json";
import { validateQuestions } from "../lib/questions";
import { validateLearningModule } from "../lib/learning";

export const contentSources = sources;
export const questions = validateQuestions(
  [...rawQuestions, ...domain1, ...domain2, ...domain3, ...domain4, ...domain5, ...networkQuestions, ...osQuestions, ...dbmsQuestions, ...tocQuestions, ...compilerDesignQuestions, ...algorithmsQuestions, ...pdsQuestions, ...coaQuestions, ...digitalLogicQuestions, ...engineeringMathematicsQuestions],
  new Set(sources.map((source) => source.id))
);
export const networkModule = validateLearningModule(rawNetworkModule);
export const osModule = validateLearningModule(rawOsModule);
export const dbmsModule = validateLearningModule(rawDbmsModule);
export const tocModule = validateLearningModule(rawTocModule);
export const compilerDesignModule = validateLearningModule(rawCompilerDesignModule);
export const algorithmsModule = validateLearningModule(rawAlgorithmsModule);
export const pdsModule = validateLearningModule(rawPdsModule);
export const coaModule = validateLearningModule(rawCoaModule);
export const digitalLogicModule = validateLearningModule(rawDigitalLogicModule);
export const engineeringMathematicsModule = validateLearningModule(rawEngineeringMathematicsModule);

export const learningModules = {
  "Computer Networks": networkModule,
  "Operating Systems": osModule,
  "Databases": dbmsModule,
  "Theory of Computation": tocModule,
  "Compiler Design": compilerDesignModule,
  "Algorithms": algorithmsModule,
  "Programming and Data Structures": pdsModule,
  "Computer Organization and Architecture": coaModule,
  "Digital Logic": digitalLogicModule,
  "Engineering Mathematics": engineeringMathematicsModule,
} as Record<string, typeof networkModule>;
