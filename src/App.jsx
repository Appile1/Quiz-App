import React, { useState, useEffect } from "react";
import "./App.css";
import Basic from "./components/basic";
import Question from "./components/question";

export default function App() {
  const [first, setFirst] = useState(true);
  const [data, setData] = useState([]);

  async function fetchData() {
    let response = await fetch("https://opentdb.com/api.php?amount=5");
    let data = await response.json();
    setData(data.results);
    setFirst(false);
  }

  function AddAnswerArray(arr, x) {
    if (arr.includes(x)) {
      return arr;
    } else {
      arr.splice(((arr.length + 1) * Math.random()) | 0, 0, x);
      return arr;
    }
  }

  return (
    <>
      {first && <Basic fetchData={fetchData} />}
      {!first && (
        <Question
          data={data}
          fetchData={fetchData}
          AddAnswerArray={AddAnswerArray}
        />
      )}
    </>
  );
}
