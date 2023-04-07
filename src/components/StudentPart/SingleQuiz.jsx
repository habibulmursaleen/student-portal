import React, { useState } from "react";
import "../../style/output.css";

const SingleQuiz = ({ quiz }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelect = (optionId) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedOptionIds = selectedOptions.map((option) => parseInt(option));
    const correctOptionIds = quiz.options
      .filter((option) => option.isCorrect)
      .map((option) => option.id);

    const isCorrect =
      selectedOptionIds.sort().toString() ===
      correctOptionIds.sort().toString();

    alert(isCorrect ? "Correct!" : "Incorrect!");
  };

  return (
    <div className="space-y-8 ">
      <div className="quiz">
        <h4 className="question">Quiz 1 - {quiz.question}</h4>
        <form className="quizOptions" onSubmit={handleSubmit}>
          {quiz?.options?.map((quizOption) => (
            <label htmlFor={`option${quizOption.id}_q${quiz.id}`}>
              <input
                type="checkbox"
                id={`option${quizOption.id}_q${quiz.id}`}
                onChange={() => handleOptionSelect(quizOption.id)}
                checked={selectedOptions.includes(quizOption.id)}
              />
              {quizOption.option}
            </label>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SingleQuiz;
