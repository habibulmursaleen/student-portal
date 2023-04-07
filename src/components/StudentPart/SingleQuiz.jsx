import React, { useState } from "react";
import "../../style/output.css";

const SingleQuiz = ({ quiz, handleQuizSubmit }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionSelect = (optionId) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  return (
    <div className="space-y-8 ">
      <div className="quiz">
        <h4 className="question">Question - {quiz.question}</h4>
        <div className="quizOptions">
          {quiz?.options?.map((quizOption) => (
            <label
              key={quizOption.id}
              htmlFor={`option${quizOption.id}_q${quiz.id}`}
            >
              <input
                type="checkbox"
                key={quizOption.id}
                id={`option${quizOption.id}_q${quiz.id}`}
                onChange={() => handleOptionSelect(quizOption.id)}
                checked={selectedOptions.includes(quizOption.id)}
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
