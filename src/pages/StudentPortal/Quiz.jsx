import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import SingleQuiz from "../../components/StudentPart/SingleQuiz";
import Error from "../../components/ui/Error";
import { useSubmitQuizMutation } from "../../features/quiz/quizMarkSlice";
import { useGetQuizesQuery } from "../../features/quiz/quizSlice";
import { useGetVideoQuery } from "../../features/videos/videoSlice";
import "../../style/output.css";

const Quiz = () => {
  const { videoId } = useParams();
  const { data: quizes, isLoading, isError } = useGetQuizesQuery(videoId);
  const [submitQuiz] = useSubmitQuizMutation();
  const { data: video } = useGetVideoQuery(videoId);
  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { id: userId, name: userName } = loggedInUser || {};
  const { title } = video;
  const totalQuiz = quizes?.length;
  let totalMark = quizes?.length ? quizes.length * 5 : 0;
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [totalCorrect, setTotalCorrect] = useState(0);

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleSubmit = (newScore) => {
    const updatedTotalCorrect = totalCorrect + newScore;
    setTotalCorrect(updatedTotalCorrect);

    submitQuiz({
      student_id: userId,
      student_name: userName,
      video_id: Number(videoId),
      video_title: title,
      totalQuiz,
      totalMark,
      totalCorrect: updatedTotalCorrect,
      totalWrong: quizes?.length - updatedTotalCorrect,
      mark: updatedTotalCorrect * 5,
    });
  };

  const handleNextClick = () => {
    // Check if an option has been selected
    if (selectedOption === null) {
      return;
    }

    // Check if this is the last quiz
    if (quizIndex === quizes.length - 1) {
      // Calculate the score
      const newScore = quizes.reduce((acc, quiz) => {
        const correctOption = quiz.options.find((option) => option.isCorrect);
        const isOptionCorrect = selectedOption === correctOption.id;
        return acc + isOptionCorrect;
      }, 0);

      // Submit quiz
      handleSubmit(newScore);
    } else {
      // Move to the next quiz
      setQuizIndex(quizIndex + 1);
      setSelectedOption(null);
    }
  };

  let content = null;

  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }

  if (!isLoading && !isError && quizes?.length === 0) {
    content = <Error message="No videos found!" />;
  }

  if (!isLoading && !isError && quizes?.length > 0) {
    content = (
      <SingleQuiz
        key={quizes[quizIndex].id}
        quiz={quizes[quizIndex]}
        handleOptionChange={handleOptionChange}
      />
    );
  }

  return (
    <div>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Quizzes for "{video.title}"</h1>
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
          </div>
          {content}

          <button
            className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95"
            onClick={handleNextClick}
          >
            {quizIndex === quizes.length - 1 ? (
              <Link to={`/student/leaderboard/${userId}`}>Submit</Link>
            ) : (
              "Next"
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Quiz;
