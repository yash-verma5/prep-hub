import { useEffect, useRef, useState } from "react";
import { questions } from "./content";
import Learning from "./Learning";
import { RichContent } from "./RichContent";
import { filterWrongAnswers } from "./lib/revision";
import { scoreAttempts } from "./lib/scoring";
import { clearProgress, loadProgress, parseProgress, saveProgress } from "./lib/storage";
import { SUBJECTS, type Attempt, type Confidence, type Progress, type Question, type RevisionFilters, type Subject } from "./types";

type View = "Dashboard" | "Syllabus" | "Learning" | "Practice" | "Exam" | "Revision" | "Data";
const VIEWS: View[] = ["Dashboard", "Syllabus", "Learning", "Practice", "Exam", "Revision", "Data"];
const CONFIDENCES: Confidence[] = ["Sure", "Doubtful", "Guess"];
const EXAM_DATE = new Date("2026-09-24T00:00:00+05:30");
const INITIAL_NOW = Date.now();
const DAYS_REMAINING = Math.max(0, Math.ceil((EXAM_DATE.getTime() - INITIAL_NOW) / 86_400_000));

const percentage = (correct: number, total: number) => total ? `${Math.round((correct / total) * 100)}%` : "—";
const uid = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

function makeAttempt(question: Question, selectedOptionId: string | null, confidence: Confidence | null, mode: "practice" | "exam", elapsedSeconds = 0): Attempt {
  return {
    id: uid(), questionId: question.id, selectedOptionId, confidence,
    correct: selectedOptionId === question.correctOptionId, skipped: selectedOptionId === null,
    subject: question.subject, topic: question.topic, difficulty: question.difficulty,
    mode, elapsedSeconds, createdAt: new Date().toISOString(),
  };
}

function App() {
  const [view, setView] = useState<View>("Dashboard");
  const [practiceTopic, setPracticeTopic] = useState<string | undefined>();
  const [practiceSubject, setPracticeSubject] = useState<Subject | undefined>();
  const [progress, setProgress] = useState<Progress>(() => loadProgress());

  const updateProgress = (next: Progress | ((current: Progress) => Progress)) => {
    setProgress((current) => {
      const value = typeof next === "function" ? next(current) : next;
      saveProgress(value);
      return value;
    });
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setView("Dashboard")} aria-label="Open dashboard">
          <span className="brand-mark">IO</span><span>IOCL Prep Hub<small>CS &amp; IT · Grade A</small></span>
        </button>
        <div className="exam-chip"><strong>{DAYS_REMAINING}</strong><span>days left<small>Tentative date</small></span></div>
      </header>
      <div className="layout">
        <nav className="sidebar" aria-label="Primary navigation">
          {VIEWS.map((item) => <button key={item} className={view === item ? "active" : ""} onClick={() => setView(item)}>{item}</button>)}
          <p className="source-note">CBT date: 24 Sep 2026<br /><strong>Tentative</strong> · verify on IOCL careers.</p>
        </nav>
        <main>
          {view === "Dashboard" && <Dashboard progress={progress} go={setView} />}
          {view === "Syllabus" && <Syllabus progress={progress} update={updateProgress} />}
          {view === "Learning" && <Learning progress={progress} onProgress={updateProgress} onPracticeTopic={(topic, subject) => { setPracticeTopic(topic); if (subject) setPracticeSubject(subject); setView("Practice"); }} />}
          {view === "Practice" && <Practice progress={progress} update={updateProgress} initialTopic={practiceTopic} initialSubject={practiceSubject} />}
          {view === "Exam" && <Exam update={updateProgress} />}
          {view === "Revision" && <Revision progress={progress} update={updateProgress} />}
          {view === "Data" && <DataControls progress={progress} update={updateProgress} />}
        </main>
      </div>
    </div>
  );
}

function PageTitle({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <div className="page-title"><div><p>{eyebrow}</p><h1>{title}</h1></div>{children}</div>;
}

function Dashboard({ progress, go }: { progress: Progress; go: (view: View) => void }) {
  const score = scoreAttempts(progress.attempts);
  const completed = SUBJECTS.filter((subject) => progress.syllabus[subject]).length;
  const bySubject = SUBJECTS.map((subject) => {
    const attempts = progress.attempts.filter((attempt) => attempt.subject === subject && !attempt.skipped);
    return { subject, attempts: attempts.length, correct: attempts.filter((attempt) => attempt.correct).length };
  });
  const byConfidence = CONFIDENCES.map((confidence) => {
    const attempts = progress.attempts.filter((attempt) => attempt.confidence === confidence && !attempt.skipped);
    return { confidence, attempts: attempts.length, correct: attempts.filter((attempt) => attempt.correct).length };
  });

  return <>
    <PageTitle eyebrow="Your preparation" title="Dashboard"><button className="primary" onClick={() => go("Practice")}>Start practice</button></PageTitle>
    <section className="hero-grid">
      <article className="countdown-card"><span>Target</span><strong>{DAYS_REMAINING}</strong><h2>days remaining</h2><p>24 September 2026 · tentative</p></article>
      <article className="progress-card"><div className="card-head"><div><span>Syllabus progress</span><strong>{completed}/{SUBJECTS.length}</strong></div><b>{Math.round((completed / SUBJECTS.length) * 100)}%</b></div><progress value={completed} max={SUBJECTS.length} /><p>Mark a subject complete only after revision and practice.</p></article>
    </section>
    <section className="stats-grid" aria-label="Attempt statistics">
      {[['Attempted', score.attempted], ['Correct', score.correct], ['Incorrect', score.incorrect], ['Skipped', score.skipped]].map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}
    </section>
    <section className="two-column">
      <article className="panel"><div className="card-head"><div><span>Subject performance</span><h2>Accuracy by subject</h2></div></div>
        <div className="performance-list">{bySubject.map(({ subject, attempts, correct }) => <div key={subject}><span>{subject}</span><div><i style={{ width: `${attempts ? correct / attempts * 100 : 0}%` }} /></div><strong>{percentage(correct, attempts)}</strong><small>{attempts} answered</small></div>)}</div>
      </article>
      <div className="stack">
        <article className="panel"><span>Confidence calibration</span><h2>Accuracy by confidence</h2><div className="confidence-grid">{byConfidence.map(({ confidence, attempts, correct }) => <div key={confidence}><strong>{percentage(correct, attempts)}</strong><span>{confidence}</span><small>{correct}/{attempts} correct</small></div>)}</div></article>
        <article className="panel priority"><span>Focus first</span><h2>Current priorities</h2><ol><li>Computer Networks</li><li>Theory of Computation</li><li>Timed Quantitative Aptitude</li></ol></article>
      </div>
    </section>
  </>;
}

function Syllabus({ progress, update }: { progress: Progress; update: (next: Progress | ((current: Progress) => Progress)) => void }) {
  const completed = SUBJECTS.filter((subject) => progress.syllabus[subject]).length;
  return <>
    <PageTitle eyebrow="13 notified areas" title="Syllabus tracker" />
    <article className="panel syllabus-summary"><div><strong>{completed}</strong><span>subjects complete</span></div><progress value={completed} max={SUBJECTS.length} /><b>{Math.round(completed / SUBJECTS.length * 100)}%</b></article>
    <section className="syllabus-grid">{SUBJECTS.map((subject, index) => <label key={subject} className={progress.syllabus[subject] ? "done" : ""}>
      <input type="checkbox" checked={Boolean(progress.syllabus[subject])} onChange={(event) => update((current) => ({ ...current, syllabus: { ...current.syllabus, [subject]: event.target.checked } }))} />
      <span>{String(index + 1).padStart(2, "0")}</span><strong>{subject}</strong><small>{progress.syllabus[subject] ? "Completed" : "In progress"}</small>
    </label>)}</section>
  </>;
}

function Practice({ progress, update, initialTopic, initialSubject }: { progress: Progress; update: (next: Progress | ((current: Progress) => Progress)) => void; initialTopic?: string; initialSubject?: Subject }) {
  const [subject, setSubject] = useState<Subject>(initialSubject ?? "Computer Networks");
  const [topic, setTopic] = useState(initialTopic ?? "");
  const availableTopics = [...new Set(questions.filter((question) => question.subject === subject).map((question) => question.topic))];
  const pool = questions.filter((question) => question.subject === subject && (!topic || question.topic === topic));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<Confidence | null>(null);
  const [revealed, setRevealed] = useState(false);
  const started = useRef(INITIAL_NOW);
  const question = pool.length > 0 ? pool[index % pool.length] : null;

  const resetQuestion = (nextIndex: number) => { setIndex(nextIndex); setSelected(null); setConfidence(null); setRevealed(false); started.current = Date.now(); };
  const record = (skip = false) => {
    if (!question) return;
    if (!skip && (!selected || !confidence)) return;
    if (skip) { setSelected(null); setConfidence(null); }
    update((current) => ({ ...current, attempts: [...current.attempts, makeAttempt(question, skip ? null : selected, skip ? null : confidence, "practice", Math.round((Date.now() - started.current) / 1000))] }));
    setRevealed(true);
  };
  const toggle = (field: "bookmarks" | "reports") => update((current) => {
    if (!question) return current;
    const set = new Set(current[field]);
    if (set.has(question.id)) set.delete(question.id); else set.add(question.id);
    return { ...current, [field]: [...set] };
  });

  return <>
    <PageTitle eyebrow="Confidence-aware learning" title="Practice mode" />
    <div className="practice-toolbar"><label>Subject<select value={subject} onChange={(event) => { setSubject(event.target.value as Subject); setTopic(""); resetQuestion(0); }}>{SUBJECTS.map((item) => <option key={item}>{item}</option>)}</select></label><label>Topic<select value={topic} onChange={(event) => { setTopic(event.target.value); resetQuestion(0); }}><option value="">All topics</option>{availableTopics.map((item) => <option key={item}>{item}</option>)}</select></label><span>{pool.length > 0 ? (index % pool.length) + 1 : 0} of {pool.length}</span></div>
    {question ? (
      <>
        <QuestionCard question={question} selected={selected} confidence={confidence} revealed={revealed} onSelect={setSelected} onConfidence={setConfidence} />
        <div className="question-actions">
          <button className={progress.bookmarks.includes(question.id) ? "selected-action" : ""} onClick={() => toggle("bookmarks")}>★ {progress.bookmarks.includes(question.id) ? "Bookmarked" : "Bookmark"}</button>
          <button className={progress.reports.includes(question.id) ? "selected-action" : ""} onClick={() => toggle("reports")}>⚑ {progress.reports.includes(question.id) ? "Error reported" : "Report error"}</button>
          <span />
          {!revealed ? <><button onClick={() => record(true)}>Skip</button><button className="primary" disabled={!selected || !confidence} onClick={() => record()}>Submit answer</button></> : <button className="primary" onClick={() => resetQuestion((index + 1) % pool.length)}>Next question</button>}
        </div>
      </>
    ) : (
      <div className="empty"><strong>No questions available</strong><p>Try selecting a different topic or subject.</p></div>
    )}
  </>;
}

export function QuestionCard({ question, selected, confidence, revealed, onSelect, onConfidence }: { question: Question; selected: string | null; confidence: Confidence | null; revealed: boolean; onSelect: (id: string) => void; onConfidence: (value: Confidence) => void }) {
  return <article className="question-card">
    <div className="question-meta"><span>{question.subject}</span><span>{question.topic}</span><span>{question.difficulty}</span></div>
    <h2><RichContent content={question.stem} /></h2>
    <fieldset className="options" disabled={revealed}><legend className="sr-only">Answer options</legend>{question.options.map((option, index) => <label key={option.id} className={`${selected === option.id ? "chosen" : ""} ${revealed && option.id === question.correctOptionId ? "correct" : ""} ${revealed && selected === option.id && selected !== question.correctOptionId ? "wrong" : ""}`}><input type="radio" name={`answer-${question.id}`} checked={selected === option.id} onChange={() => onSelect(option.id)} /><b>{String.fromCharCode(65 + index)}</b><span><RichContent content={option.text} /></span></label>)}</fieldset>
    <fieldset className="confidence" disabled={revealed}><legend>How confident are you?</legend>{CONFIDENCES.map((item) => <label key={item} className={confidence === item ? "chosen" : ""}><input type="radio" name={`confidence-${question.id}`} checked={confidence === item} onChange={() => onConfidence(item)} /><span>{item}</span></label>)}</fieldset>
    {revealed && <div className="explanation" aria-live="polite"><strong>{selected === question.correctOptionId ? "Correct" : selected ? "Incorrect" : "Skipped"}</strong><h3>Explanation</h3><RichContent content={question.explanation} />{question.closestDistractorExplanation && <><h3>Closest distractor</h3><RichContent content={question.closestDistractorExplanation} /></>}<small>{question.attribution} · {question.sourceId}, {question.sourceLocator}</small>{question.sourceUrl && <p className="question-source"><a href={question.sourceUrl} target="_blank" rel="noreferrer">{question.sourceTitle}</a></p>}</div>}
  </article>;
}

type ExamState = { status: "active" | "result"; section: "A" | "B"; index: number; timeLeft: number; answers: Record<string, string>; confidences: Record<string, Confidence>; resultAttempts?: Attempt[] };

function Exam({ update }: { update: (next: Progress | ((current: Progress) => Progress)) => void }) {
  const [exam, setExam] = useState<ExamState | null>(null);
  const sectionA = questions.filter((question) => question.section !== "domain");
  const sectionB = SUBJECTS.slice(0, 10).flatMap((subject) => questions.filter((question) => question.subject === subject).slice(0, 5));
  const sectionQuestions = exam?.section === "B" ? sectionB : sectionA;

  const examStatus = exam?.status;
  const examSection = exam?.section;
  useEffect(() => {
    if (examStatus !== "active") return;
    const timer = window.setInterval(() => setExam((current) => current?.status === "active" ? { ...current, timeLeft: Math.max(0, current.timeLeft - 1) } : current), 1000);
    return () => window.clearInterval(timer);
  }, [examStatus, examSection]);

  if (!exam) return <>
    <PageTitle eyebrow="Official pattern" title="Full exam mode" />
    <article className="exam-intro panel"><span className="pill">100 questions · 150 minutes</span><h2>Section A, then Section B</h2><div className="exam-pattern"><div><strong>50</strong><span>General Aptitude</span><small>20 Quant · 15 Reasoning · 15 English<br />60 minutes</small></div><div><strong>50</strong><span>Domain Knowledge</span><small>10 CS/IT subjects<br />90 minutes</small></div></div><p><b>Scoring:</b> +1 correct · −0.25 incorrect · 0 skipped. Qualification does not guarantee shortlisting.</p><button className="primary large" onClick={() => setExam({ status: "active", section: "A", index: 0, timeLeft: 3600, answers: {}, confidences: {} })}>Start full exam</button></article>
  </>;

  if (exam.status === "result") {
    const attempts = exam.resultAttempts ?? [];
    const total = scoreAttempts(attempts);
    return <><PageTitle eyebrow="Mock complete" title="Exam analysis"><button onClick={() => setExam(null)}>New exam</button></PageTitle><section className="result-hero"><div><span>Final score</span><strong>{total.marks.toFixed(2)}</strong><small>out of 100</small></div><div><span>Accuracy</span><strong>{total.accuracy.toFixed(1)}%</strong><small>{total.correct} correct · {total.incorrect} incorrect</small></div></section><Analysis attempts={attempts} /></>;
  }

  const question = sectionQuestions[exam.index];
  const selected = exam.answers[question.id] ?? null;
  const confidence = exam.confidences[question.id] ?? null;
  const finishSection = () => {
    const attempts = sectionQuestions.map((item) => makeAttempt(item, exam.answers[item.id] ?? null, exam.confidences[item.id] ?? null, "exam"));
    update((current) => ({ ...current, attempts: [...current.attempts, ...attempts] }));
    if (exam.section === "A") setExam({ ...exam, section: "B", index: 0, timeLeft: 5400 });
    else {
      const previous = sectionA.map((item) => makeAttempt(item, exam.answers[item.id] ?? null, exam.confidences[item.id] ?? null, "exam"));
      setExam({ ...exam, status: "result", resultAttempts: [...previous, ...attempts] });
    }
  };

  return <>
    <div className="exam-header"><div><span>Section {exam.section}</span><strong>{exam.section === "A" ? "General Aptitude" : "Domain Knowledge"}</strong></div><div className={exam.timeLeft < 300 ? "timer danger" : "timer"}><span>Time remaining</span><strong>{formatTime(exam.timeLeft)}</strong></div><button onClick={() => { if (confirm(`Submit Section ${exam.section}? Unanswered questions will be skipped.`)) finishSection(); }}>Submit section</button></div>
    <div className="exam-layout"><QuestionCard question={question} selected={selected} confidence={confidence} revealed={false} onSelect={(id) => setExam({ ...exam, answers: { ...exam.answers, [question.id]: id } })} onConfidence={(value) => setExam({ ...exam, confidences: { ...exam.confidences, [question.id]: value } })} />
      <aside className="palette"><h2>Question palette</h2><div>{sectionQuestions.map((item, index) => <button key={item.id} className={`${index === exam.index ? "current" : ""} ${exam.answers[item.id] ? "answered" : ""}`} onClick={() => setExam({ ...exam, index })}>{index + 1}</button>)}</div><p><i className="dot answered" /> Answered <i className="dot" /> Not answered</p></aside>
    </div>
    <div className="question-actions"><button disabled={exam.index === 0} onClick={() => setExam({ ...exam, index: exam.index - 1 })}>Previous</button><span />{exam.index < sectionQuestions.length - 1 ? <button className="primary" onClick={() => setExam({ ...exam, index: exam.index + 1 })}>Save &amp; next</button> : <button className="primary" onClick={() => { if (confirm(`Submit Section ${exam.section}?`)) finishSection(); }}>Submit Section {exam.section}</button>}</div>
  </>;
}

function Analysis({ attempts }: { attempts: Attempt[] }) {
  const groups = [
    ["Quantitative Aptitude", attempts.filter((a) => a.subject === "Quantitative Aptitude")],
    ["Logical Reasoning", attempts.filter((a) => a.subject === "Logical Reasoning")],
    ["English", attempts.filter((a) => a.subject === "English")],
    ["Domain Knowledge", attempts.filter((a) => !["Quantitative Aptitude", "Logical Reasoning", "English"].includes(a.subject))],
  ] as const;
  return <section className="two-column"><article className="panel"><h2>Section analysis</h2><table><thead><tr><th>Section</th><th>Correct</th><th>Incorrect</th><th>Skipped</th><th>Marks</th></tr></thead><tbody>{groups.map(([label, items]) => { const score = scoreAttempts(items); return <tr key={label}><td>{label}</td><td>{score.correct}</td><td>{score.incorrect}</td><td>{score.skipped}</td><td>{score.marks.toFixed(2)}</td></tr>; })}</tbody></table></article><article className="panel"><h2>Confidence analysis</h2><div className="confidence-grid">{CONFIDENCES.map((item) => { const filtered = attempts.filter((attempt) => attempt.confidence === item); const score = scoreAttempts(filtered); return <div key={item}><strong>{percentage(score.correct, score.attempted)}</strong><span>{item}</span><small>{score.attempted} answered</small></div>; })}</div></article></section>;
}

function Revision({ progress, update }: { progress: Progress; update: (next: Progress | ((current: Progress) => Progress)) => void }) {
  const [tab, setTab] = useState<"wrong" | "bookmarks">("wrong");
  const [filters, setFilters] = useState<RevisionFilters>({});
  const wrong = filterWrongAnswers(progress.attempts, questions, filters);
  const latest = new Map<string, Attempt>(); progress.attempts.forEach((attempt) => latest.set(attempt.questionId, attempt));
  const bookmarked = questions.filter((question) => progress.bookmarks.includes(question.id)).map((question) => ({ question, attempt: latest.get(question.id) }))
    .filter(({ question, attempt }) => (!filters.subject || question.subject === filters.subject) && (!filters.topic || question.topic === filters.topic) && (!filters.difficulty || question.difficulty === filters.difficulty) && (!filters.confidence || attempt?.confidence === filters.confidence));
  const items = tab === "wrong" ? wrong : bookmarked;
  const topics = [...new Set(questions.filter((q) => !filters.subject || q.subject === filters.subject).map((q) => q.topic))].sort();
  return <>
    <PageTitle eyebrow="Targeted revision" title="Revision notebook" />
    <div className="tabs"><button className={tab === "wrong" ? "active" : ""} onClick={() => setTab("wrong")}>Wrong answers ({filterWrongAnswers(progress.attempts, questions).length})</button><button className={tab === "bookmarks" ? "active" : ""} onClick={() => setTab("bookmarks")}>Bookmarks ({progress.bookmarks.length})</button></div>
    <div className="filters"><select aria-label="Filter by subject" value={filters.subject ?? ""} onChange={(e) => setFilters({ ...filters, subject: e.target.value, topic: "" })}><option value="">All subjects</option>{SUBJECTS.map((subject) => <option key={subject}>{subject}</option>)}</select><select aria-label="Filter by topic" value={filters.topic ?? ""} onChange={(e) => setFilters({ ...filters, topic: e.target.value })}><option value="">All topics</option>{topics.map((topic) => <option key={topic}>{topic}</option>)}</select><select aria-label="Filter by difficulty" value={filters.difficulty ?? ""} onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}><option value="">All difficulties</option><option>Easy</option><option>Medium</option><option>Hard</option></select><select aria-label="Filter by confidence" value={filters.confidence ?? ""} onChange={(e) => setFilters({ ...filters, confidence: e.target.value })}><option value="">All confidence</option>{CONFIDENCES.map((item) => <option key={item}>{item}</option>)}</select></div>
    <section className="revision-list">{items.length ? items.map(({ question, attempt }) => <article key={`${question.id}-${attempt?.id ?? "bookmark"}`}><div className="question-meta"><span>{question.subject}</span><span>{question.topic}</span><span>{question.difficulty}</span>{attempt?.confidence && <span>{attempt.confidence}</span>}</div><h2><RichContent content={question.stem} /></h2>{attempt && <p>Your answer: <b><RichContent content={question.options.find((option) => option.id === attempt.selectedOptionId)?.text ?? "Skipped"} /></b></p>}<p className="answer">Correct answer: <b><RichContent content={question.options.find((option) => option.id === question.correctOptionId)?.text ?? ""} /></b></p><details><summary>Show explanation</summary><RichContent content={question.explanation} /><small>{question.sourceId} · {question.sourceLocator}</small></details>{progress.bookmarks.includes(question.id) && <button onClick={() => update((current) => ({ ...current, bookmarks: current.bookmarks.filter((id) => id !== question.id) }))}>Remove bookmark</button>}</article>) : <div className="empty"><strong>Nothing here yet</strong><p>Complete practice questions or add bookmarks, then return here.</p></div>}</section>
  </>;
}

function DataControls({ progress, update }: { progress: Progress; update: (next: Progress | ((current: Progress) => Progress)) => void }) {
  const [message, setMessage] = useState("");
  const exportData = () => { const url = URL.createObjectURL(new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" })); const link = document.createElement("a"); link.href = url; link.download = `iocl-prep-progress-${new Date().toISOString().slice(0, 10)}.json`; link.click(); URL.revokeObjectURL(url); };
  const importData = async (file?: File) => { if (!file) return; try { const next = parseProgress(JSON.parse(await file.text())); if (confirm("Replace current progress with this backup?")) { update(next); setMessage("Progress imported successfully."); } } catch (error) { setMessage(error instanceof Error ? error.message : "Import failed."); } };
  const reset = () => { if (confirm("Reset all attempts, syllabus progress, bookmarks and reports? This cannot be undone unless you exported a backup.")) { clearProgress(); update({ version: 1, attempts: [], bookmarks: [], reports: [], syllabus: {}, learning: {} }); setMessage("All local progress was reset."); } };
  return <><PageTitle eyebrow="Local-only persistence" title="Your data" /><section className="data-grid"><article className="panel"><h2>Export progress</h2><p>Download attempts, confidence, bookmarks, reports and syllabus progress as JSON.</p><button className="primary" onClick={exportData}>Export JSON</button></article><article className="panel"><h2>Import progress</h2><p>The file is validated before it can replace current data.</p><label className="file-button">Choose JSON<input type="file" accept="application/json,.json" onChange={(event) => void importData(event.target.files?.[0])} /></label></article><article className="panel danger-zone"><h2>Reset progress</h2><p>Export a backup first. Reset requires confirmation.</p><button onClick={reset}>Reset all data</button></article></section>{message && <p className="notice" role="status">{message}</p>}<article className="panel storage-summary"><h2>Stored locally</h2><dl><div><dt>Attempts</dt><dd>{progress.attempts.length}</dd></div><div><dt>Bookmarks</dt><dd>{progress.bookmarks.length}</dd></div><div><dt>Reported questions</dt><dd>{progress.reports.length}</dd></div></dl></article></>;
}

export default App;
