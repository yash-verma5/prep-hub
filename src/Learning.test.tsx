import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { QuestionCard } from "./App";
import Learning from "./Learning";
import { questions } from "./content";
import { EMPTY_PROGRESS } from "./lib/storage";

describe("Computer Networks rendering", () => {
  it("renders all 14 learning topics", () => {
    const html = renderToStaticMarkup(<Learning progress={EMPTY_PROGRESS} onProgress={() => undefined} onPracticeTopic={() => undefined} />);
    expect((html.match(/id="network-topic-/g) ?? [])).toHaveLength(14);
    expect(html).toContain("Network fundamentals and performance terms");
    expect(html).toContain("Network security fundamentals");
    expect(html).toContain("Two solved examples");
    expect(html).toContain("Quick recall");
    expect(html).toContain("Mark as understood");
    expect(html).toContain("Practice topic");
  });

  it("hides Practice explanations before submission and shows verified details after", () => {
    const question = questions.find((item) => item.id === "cn-001")!;
    const props = { question, selected: "b", confidence: "Sure" as const, onSelect: () => undefined, onConfidence: () => undefined };
    const before = renderToStaticMarkup(<QuestionCard {...props} revealed={false} />);
    const after = renderToStaticMarkup(<QuestionCard {...props} revealed />);
    expect(before).not.toContain("Closest distractor");
    expect(after).toContain("Closest distractor");
    expect(after).toContain(question.sourceUrl);
  });
});
