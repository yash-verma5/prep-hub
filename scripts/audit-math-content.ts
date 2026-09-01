import fs from "node:fs";
import path from "node:path";
import { formatMathDelimiters } from "../src/lib/math-utils";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

function auditText(text: string, context: string): string[] {
  const issues: string[] = [];
  if (!text) return issues;

  // Check raw string before processing for literal escaped \n concatenated to words (e.g., "\\nCT")
  if (/\\n[A-Z]/.test(text)) {
    issues.push(`[${context}] Contains literal double-escaped '\\n' string artifact`);
  }

  const formatted = formatMathDelimiters(text);

  // Check if after formatting there are still unwrapped LaTeX math commands outside $ or $$
  // Match \cmd where there's no $ preceding it on the line before next $
  const unhandledLatex = formatted.split("$").filter((_, index) => index % 2 === 0).join(" ");
  const rawCmds = unhandledLatex.match(/\\[a-zA-Z]+/g);

  if (rawCmds) {
    issues.push(`[${context}] Contains unwrapped LaTeX commands outside math delimiters: ${Array.from(new Set(rawCmds)).join(", ")}`);
  }

  return issues;
}

function auditJsonFile(filePath: string): string[] {
  const contentStr = fs.readFileSync(filePath, "utf-8");
  const fileName = path.basename(filePath);
  const issues: string[] = [];

  try {
    const data = JSON.parse(contentStr);

    if (Array.isArray(data)) {
      // Questions or lessons array
      data.forEach((item: any, idx: number) => {
        const itemLabel = item.id || item.title || `Item #${idx}`;
        if (item.stem) issues.push(...auditText(item.stem, `${fileName} -> ${itemLabel} -> stem`));
        if (item.explanation) issues.push(...auditText(item.explanation, `${fileName} -> ${itemLabel} -> explanation`));
        if (item.options && Array.isArray(item.options)) {
          item.options.forEach((opt: any, optIdx: number) => {
            if (opt.text) issues.push(...auditText(opt.text, `${fileName} -> ${itemLabel} -> option[${optIdx}]`));
          });
        }
        if (item.content) {
          // Lesson content sections
          Object.entries(item.content).forEach(([section, text]) => {
            if (typeof text === "string") {
              issues.push(...auditText(text, `${fileName} -> ${itemLabel} -> content.${section}`));
            }
          });
        }
      });
    } else if (typeof data === "object") {
      // Modules object (e.g. subjects mapping)
      Object.entries(data).forEach(([key, value]: [string, any]) => {
        if (Array.isArray(value)) {
          value.forEach((lesson: any, idx: number) => {
            const lessonLabel = lesson.id || lesson.title || `Lesson #${idx}`;
            if (lesson.content) {
              Object.entries(lesson.content).forEach(([section, text]) => {
                if (typeof text === "string") {
                  issues.push(...auditText(text, `${fileName} -> ${key} -> ${lessonLabel} -> content.${section}`));
                }
              });
            }
          });
        }
      });
    }
  } catch (err: any) {
    issues.push(`Failed to parse JSON file: ${err.message}`);
  }

  return issues;
}

export function runContentAudit(): void {
  console.log("🔍 Auditing content files in src/content for math & formatting policy...\n");

  if (!fs.existsSync(CONTENT_DIR)) {
    console.error("❌ Content directory not found:", CONTENT_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".json"));
  let totalIssues = 0;

  for (const file of files) {
    const fullPath = path.join(CONTENT_DIR, file);
    const issues = auditJsonFile(fullPath);

    if (issues.length > 0) {
      console.log(`❌ ${file}:`);
      for (const issue of issues) {
        console.log(`   - ${issue}`);
      }
      totalIssues += issues.length;
    } else {
      console.log(`✅ ${file}: Passed Math & Formatting Audit`);
    }
  }

  console.log(`\nAudit complete. Total issues: ${totalIssues}`);
  if (totalIssues > 0) {
    process.exit(1);
  }
}

if (process.argv[1]?.endsWith("audit-math-content.ts")) {
  runContentAudit();
}
