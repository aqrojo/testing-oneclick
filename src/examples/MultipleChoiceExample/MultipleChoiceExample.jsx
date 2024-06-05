import { useState } from "react";
import data from "./data.json";
import "./multipleChoiceExample.css";

function MultipleChoiceExample() {
  return <MultipleChoice data={data} />;
}

function MultipleChoice({ data }) {
  const [userResponse, setUserResponse] = useState(undefined);
  const [completed, setCompleted] = useState(undefined);

  const isSuccess = userResponse === data.correctAnswer;
  const feedback = completed ? (isSuccess ? "success" : "error") : "";

  function selectOption(option) {
    setUserResponse(option);
  }

  function checkAnswer() {
    setCompleted(true);
  }

  function reset() {
    setUserResponse(undefined);
    setCompleted(false);
  }

  return (
    <div data-testid="exercise" className={"multiple-choice " + feedback}>
      <Title>{data.stimulus}</Title>
      <div data-testid="optionList" className="options">
        {data.options.map((option) => (
          <Option
            key={option}
            option={option}
            isSelected={userResponse === option}
            disabled={completed}
            onClick={selectOption}
          />
        ))}
      </div>
      <Controls checkAnswer={checkAnswer} reset={reset} completed={completed} />
    </div>
  );
}

function Title({ children }) {
  return <h2 className="stimulus">{children}</h2>;
}

function Option({ option, isSelected, onClick, disabled }) {
  const className = isSelected ? "option selected" : "option";
  return (
    <button
      className={className}
      data-testid="option"
      disabled={disabled}
      onClick={() => onClick(option)}
    >
      {option}
    </button>
  );
}

function Controls({ checkAnswer, reset, completed }) {
  return (
    <div className="controls">
      <button onClick={checkAnswer} disabled={completed}>
        Comprobar
      </button>
      <button onClick={reset} disabled={!completed}>
        Reiniciar
      </button>
    </div>
  );
}

export default MultipleChoiceExample;
