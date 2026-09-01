import "./learning.css";
import { useState } from "react";
import { networkModule } from "./content";
import type { Progress } from "./types";

type Props = {
  progress: Progress;
  onProgress: (next: Progress | ((current: Progress) => Progress)) => void;
  onPracticeTopic: (topic: string) => void;
};

export default function Learning({ progress, onProgress, onPracticeTopic }: Props) {
  const [activeTopic, setActiveTopic] = useState(1);
  const understood = progress.learning;
  const goTo = (order: number) => {
    setActiveTopic(order);
    document.getElementById(`network-topic-${order}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const toggleUnderstood = (order: number) => onProgress((current) => ({ ...current, learning: { ...current.learning, [`network-topic-${order}`]: !current.learning[`network-topic-${order}`] } }));

  return <>
    <div className="page-title"><div><p>Computer Networks module</p><h1>Learn in exam order</h1></div><button className="primary" onClick={() => onPracticeTopic(networkModule.topics[activeTopic - 1].title)}>Practice this topic</button></div>
    <p className="module-intro">Begin with the idea, then use the method, examples and quick recall. Lessons are original study material—not IOCL or GATE previous-year questions.</p>
    <nav className="topic-index" aria-label="Computer Networks topics">
      {networkModule.topics.map((topic) => <button key={topic.order} className={activeTopic === topic.order ? "active" : ""} onClick={() => goTo(topic.order)}><span>{topic.order}</span>{topic.title}</button>)}
    </nav>
    <section className="learning-topics">
      {networkModule.topics.map((topic) => {
        const complete = Boolean(understood[`network-topic-${topic.order}`]);
        return <article id={`network-topic-${topic.order}`} key={topic.order} className="learning-topic">
          <header><span>Topic {topic.order} of 14</span><h2>{topic.title}</h2><p className="one-line"><b>In one line:</b> {topic.oneLine}</p></header>
          <section className="lesson-section"><h3>Why this matters in the exam</h3><p>{topic.whyItMatters}</p></section>
          <div className="learning-grid">
            <section className="lesson-section"><h3>Understand it simply</h3>{topic.understandSimply.map((item) => <p key={item}>{item}</p>)}</section>
            {topic.analogy && <section className="lesson-section analogy"><h3>{topic.analogy.title}</h3><p>{topic.analogy.text}</p></section>}
          </div>
          <section className="lesson-section"><h3>Technical explanation</h3>{topic.technicalExplanation.map((item) => <p key={item}>{item}</p>)}</section>
          <div className="learning-grid">
            <section className="lesson-section"><h3>Important definitions</h3><dl>{topic.definitions.map((item) => <div key={item.term}><dt>{item.term}</dt><dd>{item.definition}</dd></div>)}</dl></section>
            <section className="lesson-section"><h3>How it works step by step</h3><ol className="steps">{topic.steps.map((step) => <li key={step.title}><b>{step.title}</b><span>{step.description}</span></li>)}</ol></section>
          </div>
          <section className="lesson-section"><h3>Formula or method: when to use it</h3><ul>{topic.formulasAndMethods.map((item) => <li key={item}>{item}</li>)}</ul></section>
          {topic.comparisons.map((comparison) => <section className="lesson-section comparison" key={comparison.title}><h3>{comparison.title}</h3><div className="table-scroll"><table><thead><tr>{comparison.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{comparison.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody></table></div></section>)}
          <section className="lesson-section examples"><h3>Two solved examples</h3>{topic.solvedExamples.map((example, index) => <div key={example.question}><strong>Example {index + 1}: {example.question}</strong><p>{example.solution}</p></div>)}</section>
          <div className="learning-grid">
            <section className="lesson-section trap-box"><h3>Common MCQ traps</h3><ul>{topic.traps.map((trap) => <li key={trap}>{trap}</li>)}</ul></section>
            <section className="lesson-section flash-box"><h3>Five exam takeaways</h3><ol>{topic.takeaways.map((point) => <li key={point}>{point}</li>)}</ol></section>
          </div>
          <section className="lesson-section recall"><h3>Quick recall</h3><p>Open each prompt only after trying to answer it yourself.</p>{topic.quickRecall.map((item, index) => <details key={item.question}><summary>Question {index + 1}: {item.question}</summary><p><b>Answer:</b> {item.answer}</p></details>)}</section>
          <footer><b>Sources used</b>{topic.sources.map((source) => <span key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><small> — {source.usedFor.join("; ")}</small></span>)}</footer>
          <div className="lesson-actions"><button onClick={() => goTo(Math.max(1, topic.order - 1))} disabled={topic.order === 1}>Previous topic</button><button className={complete ? "selected-action" : ""} onClick={() => toggleUnderstood(topic.order)}>{complete ? "✓ Understood" : "Mark as understood"}</button><button onClick={() => onPracticeTopic(topic.title)}>Practice topic</button><button className="primary" onClick={() => goTo(Math.min(networkModule.topics.length, topic.order + 1))} disabled={topic.order === networkModule.topics.length}>Next topic</button></div>
        </article>;
      })}
    </section>
  </>;
}
