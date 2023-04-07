import React, { useState } from "react";
import "../../style/output.css";

const SingleQuiz = ({ quiz, handleOptionChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChangee = (optionId) => {
    setSelectedOption(optionId);
    handleOptionChange(optionId);
  };

  return (
    <div className="space-y-8 ">
      <div className="quiz">
        <h4 className="question">Quiz 1 - {quiz.question}</h4>
        <div className="quizOptions">
          {quiz?.options?.map((quizOption) => (
            <label htmlFor={`option${quizOption.id}_q${quiz.id}`}>
              <input
                type="checkbox"
                id={`option${quizOption.id}_q${quiz.id}`}
                onChange={() => handleOptionChangee(quizOption.id)}
                checked={selectedOption === quizOption.id}
              />
              {quizOption.option}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleQuiz;
