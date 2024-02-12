import React, { useState } from "react";
import { decode } from "html-entities";

export default function Question(props) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showAnswer, setshowAnswer] = useState(false);

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
      }

      setshowAnswer(true);
    });
  };

  return (
    <div className="start background-container">
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
                  return (
                    <div key={idx} className=" radio-button ">
                      <input
                        type="radio"
                        name={x.question}
                        value={Answers}
                        id={Answers}
                        onChange={() => handleAnswerSelect(x.question, answer)}
                      />
                      <label htmlFor={Answers}>{Answers}</label>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
      {showAnswer && <p>5 / {score}</p>}
      <button className="check" onClick={AnswerCheck}>
        Check Answers
      </button>
      <button onClick={props.fetchData} className="New Test">
        New Test
      </button>
    </div>
  );
}
