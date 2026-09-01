# IOCL Prep Hub — Content Policy

## Purpose

Trustworthy preparation content is a release requirement. No question is better than a plausible but unverified question.

## 1. Allowed provenance labels

Every visible question must carry exactly one label:

- **Official** — reproduced from a named first-party examination body document. The UI must name the body and year, for example “Official GATE 2025”; “Official” never implies “Official IOCL” unless IOCL actually published that question.
- **Adapted** — materially based on a named source but changed for format, clarity, numbers, options, or IOCL single-answer compatibility. The changed item needs a fresh solution and review; it must not be represented as a previous-year question.
- **Original** — authored for this project from registered syllabus topics and verified against named authoritative references. “Original” does not mean uncited.

The provenance label is separate from correctness review status.

## 2. Required question record

A question is publishable only when all fields below are present:

```ts
type Question = {
  id: string;
  status: "approved" | "draft" | "quarantined";
  provenance: "official" | "adapted" | "original";
  attribution: string;
  sourceId: string;
  sourceLocator: string;
  section: "quant" | "reasoning" | "english" | "domain";
  subject: string;
  topic: string;
  stem: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  verificationSources: { sourceId: string; locator: string }[];
  reviewNote: string;
};
```

Only `approved` questions may appear in practice or mocks. Draft and quarantined records may remain in source files but must be excluded by validation.

## 3. Source hierarchy

Use the highest available source:

1. Current official IOCL advertisement, addendum/corrigendum, vacancy notice, and syllabus
2. Official GATE syllabus for detailed CS topic expansion only
3. Official examination paper and official final key for a historical official question
4. Primary technical sources: standards, language specifications, RFCs, official documentation, or canonical textbooks/academic references
5. Reputable secondary educational references only when a primary source is impractical

Search snippets, unsourced coaching pages, AI output, forum consensus, and memory are not evidence.

If sources conflict, quarantine the item until the conflict is resolved and document the decision.

## 4. IOCL and GATE boundaries

- IOCL documents alone define the IOCL pattern, marking, vacancies, date status, and broad subjects.
- `GATE-CS-SYL-2026` may expand only an IOCL subject with the same heading. It must not introduce a new IOCL subject.
- Historical GATE papers do not define IOCL weightage, question type, or likely frequency.
- A GATE question must display its exact GATE year/set attribution and must never be called an IOCL PYQ.
- GATE MSQ and NAT items are excluded from exact IOCL mocks because the IOCL notice specifies objective MCQs. An adapted single-answer version requires the `adapted` label and a complete new review.
- No supplied file is evidence of an official IOCL CS/IT previous-year question.

## 5. Personal CIL record

`PERSONAL-CIL-2026` is private diagnostic material.

- Use only the user-supplied section baselines and stated weak areas.
- Do not publish the participant name, participant ID, test centre, question text, or chosen options.
- Do not infer correctness from the response sheet because no accepted answer key is present.
- Do not label CIL questions as IOCL, adapted IOCL, or official IOCL.
- General Awareness in CIL does not create an IOCL General Awareness syllabus area.

## 6. Copyright and paid content

- Do not copy, scrape, paraphrase, screenshot, or encode paid test-series content.
- Do not reproduce third-party copyrighted question banks without documented permission or a licence that allows it.
- Public availability is not by itself permission.
- Keep attribution and locator for official public papers used as official questions.
- Prefer original questions grounded in registered references when reuse rights are uncertain.
- A change of numbers or wording does not automatically make unauthorized content acceptable.
- Do not embed source PDFs in the application bundle unless permission and need are established; link or cite metadata instead.

## 7. Explanation standard

Every explanation must:

- state why the keyed option is correct;
- show the calculation or reasoning needed to reach it;
- explain why other options fail when that is useful and verifiable;
- use the same assumptions as the question;
- cite at least one registered verification source with a precise locator;
- avoid invented quotations, page numbers, standards clauses, or URLs.

An official answer key proves the keyed answer, not the explanation. Explanations written for official questions still require independent verification.

## 8. Review workflow

1. **Register source** — add stable source ID, authority, title, location, and access/review date to `SOURCE_REGISTRY.md` or the application source data.
2. **Draft item** — map it to exactly one section, IOCL subject, and approved detailed topic.
3. **Verify answer** — calculate/check the answer against the first-party key or authoritative reference.
4. **Verify explanation** — check each factual and mathematical step against registered references.
5. **Check rights and label** — assign official/adapted/original; quarantine if reuse is uncertain.
6. **Independent review** — a second deliberate pass checks wording, ambiguity, options, key, explanation, locator, and syllabus fit.
7. **Approve** — set `status: "approved"`; automated validation then allows publication.

Any later correction creates a documented content change. Historical attempts retain the question ID and content version used when answered.

## 9. Automatic validation gate

The build/test should fail if an enabled question has:

- missing or duplicate ID;
- status other than `approved`;
- fewer than two options or duplicate option IDs;
- a correct option not present in its options;
- missing explanation, attribution, source ID, locator, verification source, subject, or topic;
- a topic outside `docs/SPEC.md`;
- an unsupported question type in an IOCL mock;
- an “official IOCL” label without an IOCL-published question source.

Automated validation checks completeness, not truth. Human source review remains mandatory.

## 10. Corrections and uncertainty

- Show a local “report issue” action that flags an item for review; it need not contact a server.
- Quarantine disputed content immediately from future sessions without deleting attempt history.
- Never silently change a key to improve a score.
- If official IOCL documents change, update the registry and specification first, then tests and app behavior.
- Display “tentative” for the exam date until a current official document makes it final.

## 11. Mathematical & Visual Presentation Policy

- **LaTeX Delimiters**: All mathematical notation, variables, set expressions, logic formulas, relational algebra, and matrix equations MUST use KaTeX math delimiters (`$...$` for inline math and `$$...$$` for block display math).
- **No Raw Unescaped LaTeX**: Content strings must never contain raw unformatted LaTeX strings (e.g. `\sum_{i=1}^n` without `$`).
- **Responsive Diagram Registry**: Technical diagrams must not be embedded as inline raw HTML or arbitrary unstyled SVGs. All complex visual diagrams (e.g., state transition diagrams, syntax trees, ER models, protocol headers) must be registered with stable IDs in `DiagramRegistry.tsx`.
- **Global Rich Content Component**: All text rendering in lessons, questions, option stems, and explanations must pass through the standardized `<RichContent />` component to ensure KaTeX mathematical expressions and responsive markdown tables render consistently.


