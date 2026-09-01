import "./learning.css";
import { useState } from "react";
import { learningModules } from "./content";
import { SUBJECTS, type Progress, type Subject } from "./types";
import { RichContent } from "./RichContent";
import { DiagramRegistry, type DiagramId } from "./DiagramRegistry";
import { TocDiagram } from "./TocDiagram";

type Props = {
  progress: Progress;
  onProgress: (next: Progress | ((current: Progress) => Progress)) => void;
  onPracticeTopic: (topic: string, subject?: Subject) => void;
};

const DIAGRAM_MAP: Record<string, Record<number, DiagramId>> = {
  "Computer Networks": {
    2: "osi-tcp-mapping",
    5: "sliding-window",
    7: "subnetting-hierarchy",
    11: "tcp-handshake",
  },
  "Operating Systems": {
    1: "process-states",
    6: "address-translation",
  },
  "Databases": {
    2: "precedence-graph",
    9: "transaction-states",
  },
  "Theory of Computation": {
    1: "dfa-transition",
    6: "pda-stack",
  },
  "Compiler Design": {
    1: "compiler-phases",
    4: "parse-tree-vs-ast",
  },
};

const getSubjectPrefix = (subject: string, id?: string) => {
  if (subject === "Computer Networks") return "network";
  if (subject === "Operating Systems") return "os";
  if (subject === "Databases") return "dbms";
  if (subject === "Theory of Computation") return "toc";
  if (subject === "Compiler Design") return "cd";
  return id ? id.replace("-module", "").replace("computer-", "") : subject.toLowerCase().replace(/[^a-z0-9]/g, "");
};

export default function Learning({ progress, onProgress, onPracticeTopic }: Props) {
  const [selectedSubject, setSelectedSubject] = useState<Subject>("Computer Networks");
  const [activeTopic, setActiveTopic] = useState(1);
  const understood = progress.learning;

  const currentModule = learningModules[selectedSubject];
  const topicPrefix = getSubjectPrefix(selectedSubject, currentModule?.id);

  const goTo = (order: number) => {
    setActiveTopic(order);
    const element = document.getElementById(`${topicPrefix}-topic-${order}`);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const toggleUnderstood = (order: number) =>
    onProgress((current) => {
      const key = `${topicPrefix}-topic-${order}`;
      const learningMap = current.learning || {};
      return {
        ...current,
        learning: {
          ...learningMap,
          [key]: !learningMap[key],
        },
      };
    });

  return (
    <>
      <div className="page-title">
        <div>
          <p>{selectedSubject} module</p>
          <h1>Learn in exam order</h1>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem" }}>
            <b>Subject:</b>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value as Subject);
                setActiveTopic(1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{ padding: "0.4rem 0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }}
            >
              {SUBJECTS.filter((s) => !["Quantitative Aptitude", "Logical Reasoning", "English"].includes(s)).map((subj) => (
                <option key={subj} value={subj}>
                  {subj} {learningModules[subj] ? "✓ Ready" : "(Upcoming)"}
                </option>
              ))}
            </select>
          </label>
          {currentModule && (
            <button
              className="primary"
              onClick={() => onPracticeTopic(currentModule.topics[activeTopic - 1]?.title ?? "", selectedSubject)}
            >
              Practice this topic
            </button>
          )}
        </div>
      </div>

      <p className="module-intro">
        Begin with the idea, then use the method, examples and quick recall. Lessons are original study material—not IOCL or GATE previous-year questions.
      </p>

      {currentModule ? (
        <>
          <nav className="topic-index" aria-label={`${selectedSubject} topics`}>
            {currentModule.topics.map((topic) => (
              <button
                key={topic.order}
                className={activeTopic === topic.order ? "active" : ""}
                onClick={() => goTo(topic.order)}
              >
                <span>{topic.order}</span>
                {topic.title}
              </button>
            ))}
          </nav>
          <section className="learning-topics">
            {currentModule.topics.map((topic) => {
              const sectionId = `${topicPrefix}-topic-${topic.order}`;
              const complete = Boolean(understood?.[sectionId]);
              const registeredDiagramId = DIAGRAM_MAP[selectedSubject]?.[topic.order];

              return (
                <article id={sectionId} key={topic.order} className="learning-topic">
                  <header>
                    <span>Topic {topic.order} of {currentModule.topics.length}</span>
                    <h2>{topic.title}</h2>
                    <div className="one-line">
                      <b>In one line:</b> <RichContent content={topic.oneLine} />
                    </div>
                  </header>
                  <section className="lesson-section">
                    <h3>Why this matters in the exam</h3>
                    <RichContent content={topic.whyItMatters} />
                  </section>
                  <div className="learning-grid">
                    <section className="lesson-section">
                      <h3>Understand it simply</h3>
                      {topic.understandSimply.map((item) => (
                        <RichContent key={item} content={item} />
                      ))}
                    </section>
                    {topic.analogy && (
                      <section className="lesson-section analogy">
                        <h3>{topic.analogy.title}</h3>
                        <RichContent content={topic.analogy.text} />
                      </section>
                    )}
                  </div>
                  <section className="lesson-section">
                    <h3>Technical explanation</h3>
                    {topic.technicalExplanation.map((item) => (
                      <RichContent key={item} content={item} />
                    ))}
                  </section>

                  {/* Registered SVG Diagram Section */}
                  {registeredDiagramId && <DiagramRegistry id={registeredDiagramId} />}
                  {selectedSubject === "Theory of Computation" && !registeredDiagramId && (
                    <TocDiagram topicOrder={topic.order} />
                  )}

                  <div className="learning-grid">
                    <section className="lesson-section">
                      <h3>Important definitions</h3>
                      <dl>
                        {topic.definitions.map((item) => (
                          <div key={item.term}>
                            <dt>{item.term}</dt>
                            <dd>
                              <RichContent content={item.definition} />
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                    <section className="lesson-section">
                      <h3>How it works step by step</h3>
                      <ol className="steps">
                        {topic.steps.map((step) => (
                          <li key={step.title}>
                            <b>{step.title}</b>
                            <RichContent content={step.description} />
                          </li>
                        ))}
                      </ol>
                    </section>
                  </div>
                  <section className="lesson-section">
                    <h3>Formula or method: when to use it</h3>
                    <ul>
                      {topic.formulasAndMethods.map((item) => (
                        <li key={item}>
                          <RichContent content={item} />
                        </li>
                      ))}
                    </ul>
                  </section>
                  {topic.comparisons.map((comparison) => (
                    <section className="lesson-section comparison" key={comparison.title}>
                      <h3>{comparison.title}</h3>
                      <div className="table-scroll">
                        <table>
                          <thead>
                            <tr>
                              {comparison.columns.map((column) => (
                                <th key={column}>{column}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {comparison.rows.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                  <td key={`${rowIndex}-${cellIndex}`}>
                                    <RichContent content={cell} />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  ))}
                  <section className="lesson-section examples">
                    <h3>Two solved examples</h3>
                    {topic.solvedExamples.map((example, index) => (
                      <div key={example.question}>
                        <strong>
                          Example {index + 1}: <RichContent content={example.question} />
                        </strong>
                        <RichContent content={example.solution} />
                      </div>
                    ))}
                  </section>
                  <div className="learning-grid">
                    <section className="lesson-section trap-box">
                      <h3>Common MCQ traps</h3>
                      <ul>
                        {topic.traps.map((trap) => (
                          <li key={trap}>
                            <RichContent content={trap} />
                          </li>
                        ))}
                      </ul>
                    </section>
                    <section className="lesson-section flash-box">
                      <h3>Five exam takeaways</h3>
                      <ol>
                        {topic.takeaways.map((point) => (
                          <li key={point}>
                            <RichContent content={point} />
                          </li>
                        ))}
                      </ol>
                    </section>
                  </div>
                  <section className="lesson-section recall">
                    <h3>Quick recall</h3>
                    <p>Open each prompt only after trying to answer it yourself.</p>
                    {topic.quickRecall.map((item, index) => (
                      <details key={item.question}>
                        <summary>
                          Question {index + 1}: <RichContent content={item.question} />
                        </summary>
                        <div style={{ padding: "0.5rem 0" }}>
                          <b>Answer:</b> <RichContent content={item.answer} />
                        </div>
                      </details>
                    ))}
                  </section>
                  <footer>
                    <b>Sources used</b>
                    {topic.sources.map((source) => (
                      <span key={source.url}>
                        <a href={source.url} target="_blank" rel="noreferrer">
                          {source.title}
                        </a>
                        <small> — {source.usedFor.join("; ")}</small>
                      </span>
                    ))}
                  </footer>
                  <div className="lesson-actions">
                    <button onClick={() => goTo(Math.max(1, topic.order - 1))} disabled={topic.order === 1}>
                      Previous topic
                    </button>
                    <button className={complete ? "selected-action complete-action" : ""} onClick={() => toggleUnderstood(topic.order)}>
                      {complete ? "✓ Understood" : "Mark as understood"}
                    </button>
                    <button onClick={() => onPracticeTopic(topic.title, selectedSubject)}>Practice topic</button>
                    <button
                      className="primary"
                      onClick={() => goTo(Math.min(currentModule.topics.length, topic.order + 1))}
                      disabled={topic.order === currentModule.topics.length}
                    >
                      Next topic
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        </>
      ) : (
        <article className="panel" style={{ padding: "3rem 2rem", textAlign: "center", marginTop: "2rem" }}>
          <span className="pill" style={{ marginBottom: "1rem" }}>
            Module coming soon
          </span>
          <h2>{selectedSubject}</h2>
          <p style={{ maxWidth: "600px", margin: "1rem auto", color: "var(--muted)" }}>
            Structured lesson content for {selectedSubject} is prioritized in the platform roadmap. You can already practice MCQs for this subject in Practice Mode.
          </p>
          <button className="primary" onClick={() => onPracticeTopic("", selectedSubject)}>
            Go to {selectedSubject} Practice MCQs
          </button>
        </article>
      )}
    </>
  );
}
