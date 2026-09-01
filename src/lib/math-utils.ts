/**
 * Utility functions for pre-processing math notation and formatting LaTeX strings.
 */

/**
 * Pre-processes text content to ensure mathematical expressions are properly
 * wrapped in inline ($...$) or display ($$...$$) math delimiters for KaTeX rendering.
 */
export function formatMathDelimiters(text: string): string {
  if (!text) return "";

  // 1. Clean up JSON escaping defects where \n was attached to label initials
  let cleaned = text
    .replace(/\\nCT/g, "\nCompletion Time")
    .replace(/\\nTAT/g, "\nTurnaround Time")
    .replace(/\\nWT/g, "\nWaiting Time")
    .replace(/\\nStep/g, "\nStep")
    .replace(/\\nTotal/g, "\nTotal")
    .replace(/\\nMinimum/g, "\nMinimum")
    .replace(/\\nMaximum/g, "\nMaximum")
    .replace(/\\nSuper/g, "\nSuper")
    .replace(/\\nBy/g, "\nBy")
    .replace(/\\nON/g, "\nON")
    .replace(/\\nSince/g, "\nSince")
    .replace(/\\nPoints/g, "\nPoints")
    .replace(/\\nFinal/g, "\nFinal")
    .replace(/\\nempty/g, "\nempty")
    .replace(/\\nfull/g, "\nfull")
    .replace(/\\nWasted/g, "\nWasted");

  // 2. Format existing display math blocks ($$...$$) with clean surrounding newlines for remark-math
  cleaned = cleaned.replace(/\s*\$\$\s*([^$]+)\s*\$\$\s*/g, "\n\n$$$$ $1 $$$$\n\n");

  // 3. Process unwrapped LaTeX commands without touching existing $...$ or $$...$$ math blocks
  const parts = cleaned.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+\$)/g);

  return parts
    .map((part) => {
      if (!part || part.startsWith("$")) return part;

      if (/\\[a-zA-Z]+/.test(part)) {
        // If the section is a short standalone equation string
        if (
          (part.includes("=") ||
            part.includes("\\sum") ||
            part.includes("\\delta") ||
            part.includes("\\sigma") ||
            part.includes("\\pi") ||
            part.includes("\\bowtie")) &&
          !part.includes("\n") &&
          part.length < 120
        ) {
          return `$${part.trim()}$`;
        }
        // Wrap individual LaTeX command tokens
        return part.replace(/(\\[a-zA-Z]+(\{[^}]*\}|_[a-zA-Z0-9]+|\^[a-zA-Z0-9]+)*)/g, "$$$1$");
      }
      return part;
    })
    .join("");
}
