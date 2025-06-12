import React, { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const config = {
  loader: { load: ["input/tex", "output/chtml"] }
};

const App = () => {
  const [input, setInput] = useState("");
  const [latex, setLatex] = useState("");

  const convertToLatex = (expr) => {
    let latexExpr = expr;

    // Replace fractions like 1/2 with \frac{1}{2}
    latexExpr = latexExpr.replace(/(\d+)\s*\/\s*(\d+)/g, "\\frac{$1}{$2}");

    // Replace multiplication symbol
    latexExpr = latexExpr.replace(/\*/g, "\\cdot");

    // Remove existing \left and \right to avoid duplication
    latexExpr = latexExpr.replace(/\\left/g, "");
    latexExpr = latexExpr.replace(/\\right/g, "");

    // Wrap brackets with \left( and \right)
    latexExpr = latexExpr.replace(/\(/g, "\\left(");
    latexExpr = latexExpr.replace(/\)/g, "\\right)");

    return latexExpr;
  };

  const handleChange = (e) => {
    const userInput = e.target.value;
    setInput(userInput);
    const convertedLatex = convertToLatex(userInput);
    setLatex(convertedLatex);
  };

  return (
    <MathJaxContext config={config}>
      <div style={{ padding: "2rem", fontFamily: "Arial" }}>
        <h2>🧮 Math to LaTeX Converter</h2>

        <input
          type="text"
          placeholder="Enter expression like 12(1/3d-5)=12((d+2)/4)"
          value={input}
          onChange={handleChange}
          style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
        />

        <div style={{ marginTop: "1rem" }}>
          <strong>🔤 LaTeX Output:</strong>
          <pre style={{ backgroundColor: "#f0f0f0", padding: "1rem" }}>{latex}</pre>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <strong>🧮 Rendered Output:</strong>
          <div style={{ fontSize: "1.5rem", marginTop: "0.5rem" }}>
            <MathJax inline dynamic>{`\\(${latex}\\)`}</MathJax>
          </div>
        </div>
      </div>
    </MathJaxContext>
  );
};

export default App;
