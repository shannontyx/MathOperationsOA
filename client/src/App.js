import React, { useState } from 'react';
import './App.css';

function App() {
  const [num1, setNum1] = useState(''); 
  const [num2, setNum2] = useState(''); 
  const [result, setResult] = useState(null);

  // Function to handle addition
  const handleAdd = async () => {
    const response = await fetch('/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        num1: num1,
        num2: num2
      })
    });
    const data = await response.json();
    setResult(data.result);
  };

  // Function to handle subtraction
  const handleSubtract = async () => {
    const response = await fetch('/api/subtract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        num1: num1,
        num2: num2
      })
    });
    const data = await response.json();
    setResult(data.result);
  };

  return (
    <div className="App">
      <header>
        Math Operations
      </header>

      <div className="info">
        <p>Rule: First number +/- Second number = Result</p>
      </div>

      <div>
        <input
          type="number"
          placeholder="First number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <input
          type="number"
          placeholder="Second number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
      </div>

      <div>
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleSubtract}>Subtract</button>
      </div>

      <div className="result">
        {result !== null && (
          <p>Result: {result}</p>
        )}
      </div>
    </div>
  );
}

export default App;
