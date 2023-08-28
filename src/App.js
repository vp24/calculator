import React, { useState } from 'react';
import './App.css';

const CalculatorApp = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [justCalculated, setJustCalculated] = useState(false);

  const handleButtonClick = (value) => {
    if (justCalculated) {
        if (["+", "-", "*", "/", "^", "(", ")"].includes(value)) {
            setInput(result + value);
            setJustCalculated(false);
        } else {
            setInput(value);
            setJustCalculated(false);
        }
    } else {
        setInput((prevInput) => prevInput + value);
    }
  };

  const calculate = () => {
    try {
      // Replace ^ with ** for evaluation
      const evalExpression = input.replace(/\^/g, '**');
      let currentResult = eval(evalExpression);
      
      // Fixing floating point precision issue
      currentResult = Math.round(currentResult * 1000000) / 1000000;

      setResult(currentResult);
      setHistory(prevHistory => [...prevHistory, { calculation: input, result: currentResult }]);
      setJustCalculated(true);
    } catch (e) {
      setResult("Error");
    }
  };

  const clearInput = () => {
    setInput("");
    setResult("");
    setJustCalculated(false);
  };

  const getFontSize = () => {
    if (input.length > 10) {
      return "18px";
    }
    return "24px";
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">
          <div className="input" style={{ fontSize: getFontSize() }}>{input}</div>
          <div className="result">{result}</div>
        </div>
        <div className="buttons">
          {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', '^', '(', ')'].map((button) => (
            <button 
              key={button} 
              onClick={() => button === "=" ? calculate() : handleButtonClick(button)}
            >
              {button}
            </button>
          ))}
          <button onClick={clearInput}>Clear</button>
        </div>
      </div>

      <div className="history">
        <h2>History</h2>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              {entry.calculation} = {entry.result}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalculatorApp;
