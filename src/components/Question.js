import React from "react";

function Question({ questionId, question, handleRadioChange }) {
  return (
    <div style={styles.questionContainer} key={questionId}>
      <p style={styles.question}>{question}</p>
      <div style={styles.radioContainer}>
        <label style={styles.label}>
          <input
            type="radio"
            name={`question${questionId}`}
            value="yes"
            onChange={() => handleRadioChange(questionId, "yes")}
            style={styles.radioButton}
          />{" "}
          Yes
        </label>
        <label style={styles.label}>
          <input
            type="radio"
            name={`question${questionId}`}
            value="no"
            onChange={() => handleRadioChange(questionId, "no")}
            style={styles.radioButton}
          />{" "}
          No
        </label>
      </div>
    </div>
  );
}

const styles = {
  questionContainer: {
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  question: {
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  radioContainer: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    marginRight: "20px",
    fontSize: "14px",
  },
  radioButton: {
    marginRight: "5px",
  },
};

export default Question;
