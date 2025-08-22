import React, { useState } from "react";
import Button from "./Button";
import "./Calculator.css";

export default function Calculator() {
  const [input, setInput] = useState("0");
  const [lastInput, setLastInput] = useState(""); // stores last pressed key

  const handleClick = (value) => {
    if (value === "C") {
      setInput("0");
      setLastInput("");
      return;
    }

    if (value === "⌫") {
      if (input.length > 1) {
        setInput(input.slice(0, -1));
      } else {
        setInput("0");
      }
      return;
    }

    if (value === "=") {
      try {
        let expression = input
          .replace(/÷/g, "/")
          .replace(/×/g, "*")
          .replace(/−/g, "-");

        setInput(eval(expression).toString());
      } catch {
        setInput("Error");
      }
      return;
    }

   
    

    if (value === "%") {
      setInput((parseFloat(input) / 100).toString());
      return;
    }

    const operators = ["+", "−", "×", "÷"];

    if (operators.includes(value)) {
      if (operators.includes(lastInput)) {
        setInput(input.slice(0, -1) + value);
      } else {
        setInput(input + value);
      }
      setLastInput(value);
      return;
    }

    // handle decimal
    if (value === ".") {
      const parts = input.split(/[\+\−\×\÷]/);
      const lastNumber = parts[parts.length - 1];
      if (lastNumber.includes(".")) return; // prevent multiple decimals
    }

    // append numbers
    setInput(input === "0" ? value : input + value);
    setLastInput(value);
  };

  const buttons = [
    { label: "C", type: "light" },
    { label: "⌫", type: "light" }, // new Backspace button
    { label: "%", type: "light" },
    { label: "÷", type: "operator" },
    { label: "7", type: "number" },
    { label: "8", type: "number" },
    { label: "9", type: "number" },
    { label: "×", type: "operator" },
    { label: "4", type: "number" },
    { label: "5", type: "number" },
    { label: "6", type: "number" },
    { label: "−", type: "operator" },
    { label: "1", type: "number" },
    { label: "2", type: "number" },
    { label: "3", type: "number" },
    { label: "+", type: "operator" },
    { label: "0", type: "number zero" },
    { label: ".", type: "number" },
    { label: "=", type: "operator" },
    
  ];

  return (
    <div className="calculator">
      <div className="display">{input}</div>
      <div className="buttons">
        {buttons.map((btn, i) => (
          <Button key={i} label={btn.label} type={btn.type} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
}