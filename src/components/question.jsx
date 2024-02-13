import React, { useState, useId } from "react";
import { decode } from "html-entities";

export default function Question(props) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [check, setCheck] = useState(true);
  const [correct, setCorrect] = useState(false);

  const handleAnswerSelect = (question, selectedAnswer) => {
    setSelectedAnswers((prevSelected) => ({
      ...prevSelected,
      [question]: selectedAnswer,
    }));
  };

  const AnswerCheck = () => {
    props.data.forEach((question) => {
      const selectedAnswer = selectedAnswers[question.question];
      const correctAnswer = question.correct_answer;
      if (selectedAnswer === correctAnswer) {
        setScore((prev) => prev + 1);
        if (selectedAnswer) {
          document
            .getElementById(selectedAnswer)
            .classList.add("correct-answer");
        }
      } else {
        if (selectedAnswer) {
          document
            .getElementById(selectedAnswer)
            .classList.add("incorrect-answer");
        }
      }

      const correctAnswerElement = document.getElementById(correctAnswer);
      if (correctAnswerElement) {
        correctAnswerElement.classList.add("correct-answer");
      }

      setShowAnswer(true);
      setCheck(false);
    });
  };

  return (
    <div className="start background-container">
      <h2 className="quiz">Quiz</h2>
      {props.data.map((x, index) => {
        const Answer = x.correct_answer;
        const Question = decode(x.question);

        return (
          <div key={index} className="mcqs">
            <h2>{Question}</h2>
            <div className="options">
              {props
                .AddAnswerArray(x.incorrect_answers, x.correct_answer)
                .map((answer, idx) => {
                  const Answers = decode(answer);
                  const Id = useId();
                  return (
                    <div key={Id} className=" radio-button " id={answer}>
                      <input
                        type="radio"
                        name={x.question}
                        value={Answers}
                        id={Id}
                        onChange={() => handleAnswerSelect(x.question, answer)}
                      />
                      <label htmlFor={Id}>{Answers}</label>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
      {showAnswer && (
        <div className="result">
          <p className="score">You scored {score}/5 correct answers</p>
          <button
            onClick={() => {
              props.fetchData();
              setSelectedAnswers({});
              setScore(0);
              setShowAnswer(false);
              setCheck(true);

              // Uncheck all radio inputs
              document
                .querySelectorAll('input[type="radio"]')
                .forEach((radio) => {
                  radio.checked = false;
                  radio.parentElement.classList.remove("incorrect-answer");
                  radio.parentElement.classList.remove("correct-answer");
                });
            }}
            className="New Test"
          >
            Play Again
          </button>
        </div>
      )}
      {check && (
        <button className="check" onClick={AnswerCheck}>
          Check Answers
        </button>
      )}
    </div>
  );
}
