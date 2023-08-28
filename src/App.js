// CalculatorApp.js
import React, { useState } from 'react';
import  './App.css'

const CalculatorApp = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const calculate = () => {
    try {
      setResult(eval(input));
    } catch (e) {
      setResult("Error");
    }
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
      {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((button) => (
    <button 
        key={button} 
        onClick={() => button === "=" ? calculate() : handleButtonClick(button)}
        data-operator={['/', '*', '-', '+', '='].includes(button) ? "true" : undefined}
    >
        {button}
    </button>
))}
<button onClick={clearInput} data-clear="true">Clear</button>

      </div>
    </div>
  );
};

export default CalculatorApp;

