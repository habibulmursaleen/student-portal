import React, { useState } from "react";
import QuizModal from "../../components/AdminPart/quiz/QuizModal";
import QuizzTable from "../../components/AdminPart/quiz/QuizzTable";
import Navbar from "../../components/Navbar";
import "../../style/output.css";

const Quizzes = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddQuizClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button className="btn ml-auto" onClick={handleAddQuizClick}>
                Add Quiz
              </button>
            </div>
            {<QuizzTable />}
          </div>
        </div>
      </section>
      {showModal && (
        <QuizModal showModal={showModal} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
};

export default Quizzes;
