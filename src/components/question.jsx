import React from "react";

export default function Question(props) {
  return (
    <>
      <div className="start">
        {props.data.map((x, index) => (
          <div key={index} className="mcqs">
            <h2>{x.question}</h2>
            {props
              .AnswerArray(x.incorrect_answers, x.correct_answer)
              .map((answer, idx) => (
                <div key={idx} className="radio">
                  <input type="radio" name={x.question} value={answer} />
                  <label>{answer}</label>
                </div>
              ))}
          </div>
        ))}
        <button onClick={props.fetchData} className="New Test">
          New Test
        </button>
      </div>
    </>
  );
}
