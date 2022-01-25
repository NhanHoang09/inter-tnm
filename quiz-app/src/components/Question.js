import React, { useState } from "react";
import { dataQuiz } from "../content/content";

function Question() {
  const [currentAnswer, setCurrentAnswer] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleChecked = (isCorrect) => {
    if (isCorrect === true) {
      setScore(score + 1);
    }
  }

  const handleOptionAnswer = () => {

    const nextQuestion = currentAnswer + 1;
    if (nextQuestion < dataQuiz.length) {
      setCurrentAnswer(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      {showScore ? (
        <div>
          <h2>
            You answered {score}/{dataQuiz.length} questions correctly
          </h2>
          <button onClick={handleReload}>Reload</button>
        </div>
      ) : (
        <div className="quiz-container" id="quiz">
          <div className="quiz-header">
            <h2 id="question">{dataQuiz[currentAnswer].question}</h2>
            <ul>
              {dataQuiz[currentAnswer].answerOptions.map((answer) => (
                <li key={answer.id}>
                  <input
                    type="radio"
                    name="answer"
                    id={answer.answer}
                    className="answer"
                    onChange={() =>handleChecked(answer.isCorrect)}
                  />
                  <label htmlFor={answer.answer}>
                    {answer.answer}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleOptionAnswer}
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
}

export default Question;
