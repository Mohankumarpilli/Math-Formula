import React, { useState } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

function App() {
  const [input, setInput] = useState('');
  const [latex, setLatex] = useState('');

  const convertToLatex = (expr) => {
    let updated = expr.replace(/–/g, '-'); // replace En-dash with hyphen
    updated = updated.replace(/\s/g, '');  // remove whitespace

    // Replace all a/b with \frac{a}{b} (basic version)
    updated = updated.replace(/([^<>=]+?)\/([^<>=]+)/g, (match, numerator, denominator) => {
      return `\\frac{${numerator}}{${denominator}}`;
    });

    // Now split for inequality signs
    updated = updated.replace(/</g, ' < ');
    updated = updated.replace(/>/g, ' > ');
    updated = updated.replace(/=/g, ' = ');

    return updated;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    const converted = convertToLatex(value);
    setLatex(converted);
  };

  return (
    <MathJaxContext>
      <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
        <h2>🧮 Math to LaTeX Converter</h2>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter math like -2(x+3)/-2 < -28/-2"
          style={{ padding: '10px', width: '100%', fontSize: '1.2rem' }}
        />
        <h3>🔤 LaTeX Output:</h3>
        <pre style={{ background: '#f4f4f4', padding: '1rem' }}>{latex}</pre>

        <h3>🧮 Rendered Output:</h3>
        <MathJax dynamic inline>{`\\(${latex}\\)`}</MathJax>
      </div>
    </MathJaxContext>
  );
}

export default App;
