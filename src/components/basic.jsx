import React from "react";

export default function Basic(props) {
  return (
    <div className="start">
      <h1>Quizzical</h1>
      <p>Are you Smart ? </p>

      <button onClick={props.fetchData}>Start Quiz </button>
    </div>
  );
}
