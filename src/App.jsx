import React, { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const config = {
  loader: { load: ["input/tex", "output/chtml"] },
};

export default function App() {
  const [input, setInput] = useState("");
  const [latex, setLatex] = useState("");

  const convertToLatex = (expr) => {
    // Replace `/` with \frac and identify numerators and denominators
    return expr
      .replace(/–/g, "-") // Replace en dash with regular minus
      .replace(/([^\s<>=]+)\(([^)]+)\)\/([^\s<>=]+)/g, (_, coeff, inner, denom) => {
        return `${coeff}\\frac{(${inner})}{${denom}}`;
      })
      .replace(/([^<>=\s]+)\/([^<>=\s]+)/g, (_match, num, den) => {
        return `\\frac{${num}}{${den}}`;
      })
      .replace(/</g, "<")
      .replace(/>/g, ">");
  };

  const handleChange = (e) => {
    const raw = e.target.value;
    setInput(raw);
    const latexConverted = convertToLatex(raw);
    setLatex(latexConverted);
  };
  console.log(latex);
  return (
    <MathJaxContext config={config}>
      <div style={{ padding: "2rem", fontFamily: "Arial" }}>
        <h2>🧮 Math to LaTeX Converter</h2>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Type expression like –2(x + 3)/–2 < –28/–2"
          style={{ width: "100%", padding: "0.5rem", fontSize: "1.2rem" }}
        />
        <h4>🔤 LaTeX Output:</h4>
        <code style={{ fontSize: "1.2rem" }}>{latex}</code>
        <h4>🧮 Rendered Output:</h4>
        <MathJax inline>{`\\(${latex}\\)`}</MathJax>
      </div>
    </MathJaxContext>
  );
}
