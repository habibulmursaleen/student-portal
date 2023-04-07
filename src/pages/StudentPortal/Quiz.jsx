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
  let totalMark = quizes?.length * 5;

  const [mark, setMark] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);

  const handleQuizSubmit = (marks) => {
    setMark(totalCorrect * 5);
    setTotalCorrect(1);
    setTotalWrong(quizes?.length - totalCorrect);
  };

  let content = null;

  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }

  if (!isLoading && !isError && quizes?.length === 0) {
    content = <Error message="No videos found!" />;
  }

  if (!isLoading && !isError && quizes?.length > 0) {
    content = quizes.map((quiz) => (
      <SingleQuiz
        key={quiz.id}
        quiz={quiz}
        handleQuizSubmit={handleQuizSubmit}
      />
    ));
  }

  const handleSubmit = () => {
    submitQuiz({
      student_id: userId,
      student_name: userName,
      video_id: videoId,
      video_title: title,
      totalQuiz,
      totalMark,
      totalCorrect,
      totalWrong,
      mark,
    });
  };

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
            onClick={handleSubmit}
            className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95"
          >
            <Link to={`/student/leaderboard/${userId}`}>Submit</Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Quiz;
