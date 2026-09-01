import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { formatMathDelimiters } from "./lib/math-utils";

interface RichContentProps {
  content: string;
  className?: string;
}

export const RichContent: React.FC<RichContentProps> = ({ content, className = "" }) => {
  if (!content) return null;

  const formattedContent = formatMathDelimiters(content);

  return (
    <div className={`rich-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          table({ children }) {
            return (
              <div className="table-scroll">
                <table>{children}</table>
              </div>
            );
          },
          p({ children }) {
            return <p>{children}</p>;
          },
        }}
      >
        {formattedContent}
      </ReactMarkdown>
    </div>
  );
};
