import { useState } from "react";
import sum from "./api/sum";
import "./sumExample.css";

function SumExample() {
  const [result, setResult] = useState(0);

  const handleSum = () => {
    const num1 = Number(document.getElementById("number1").value);
    const num2 = Number(document.getElementById("number2").value);
    setResult(sum(num1, num2));
  };

  return (
    <div>
      <h1>Suma de Números</h1>
      <div className="sum-layout">
        <input
          id="number1"
          data-testid="number1"
          type="number"
          defaultValue={0}
        />
        <span className="operator">+</span>
        <input
          id="number2"
          data-testid="number2"
          type="number"
          defaultValue={0}
        />
        <button onClick={handleSum}>Sumar</button>
      </div>
      <div>
        <h2>
          Resultado: <span data-testid="result">{result}</span>
        </h2>
      </div>
    </div>
  );
}

export default SumExample;
