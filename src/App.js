import React, { useState, useEffect } from "react";
import { QUESTIONS } from "./questions";
import Question from "./components/Question";
import { getScoreFromBackend, postScoreToBackend } from "./services/base";

const App = () => {
  const [averageScore, setAverageScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [totalYesAnswers, setTotalYesAnswers] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

  const handleRadioChange = (questionId, answer) => {
    if (!answers.hasOwnProperty(questionId) && answer === "yes") {
      const totalYes = totalYesAnswers + 1;
      const finalScore = (totalYes * 100) / Object.keys(QUESTIONS).length;
      setFinalScore(finalScore);
      setTotalYesAnswers((prev) => prev + 1);
      localStorage.setItem("score", finalScore);
    } else if (
      answers.hasOwnProperty(questionId) &&
      answers[questionId] === "no" &&
      answer === "yes"
    ) {
      const totalYes = totalYesAnswers + 1;
      const finalScore = (totalYes * 100) / Object.keys(QUESTIONS).length;
      setFinalScore(finalScore);
      setTotalYesAnswers((prev) => prev + 1);
      localStorage.setItem("score", finalScore);
    } else if (
      answers.hasOwnProperty(questionId) &&
      answers[questionId] === "yes" &&
      answer === "no"
    ) {
      const totalYes = totalYesAnswers - 1;
      const finalScore = (totalYes * 100) / Object.keys(QUESTIONS).length;
      setFinalScore(finalScore);
      setTotalYesAnswers((prev) => prev - 1);
      localStorage.setItem("score", finalScore);
    }
    setAnswers((answers) => ({
      ...answers,
      [questionId]: answer,
    }));
  };

  const getScore = async () => {
    const response = await getScoreFromBackend();
    setAverageScore(response.data.averageScore);
  };

  const sendScore = async () => {
    const localScore = localStorage.getItem("score");
    const body = {
      score: localScore,
    };

    localStorage.removeItem("score");

    const response = postScoreToBackend(body);
    console.log(response);
  };

  useEffect(() => {
    if (localStorage.getItem("score") !== null) {
      sendScore();
    }

    getScore();
  }, []);

  return (
    <div className="main__wrap">
      <main className="container">
        <div style={styles.container}>
          <h1 style={styles.left}>{averageScore}</h1>
          <h1 style={styles.right}>{finalScore}</h1>
        </div>
        <div>
          {Object.entries(QUESTIONS).map(([questionId, question]) => (
            <Question
              handleRadioChange={handleRadioChange}
              question={question}
              questionId={questionId}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  left: {
    marginRight: "auto",
  },
  right: {
    marginLeft: "auto",
  },
};

export default App;
