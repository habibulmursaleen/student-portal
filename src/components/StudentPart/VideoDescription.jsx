import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetAssignmentMarksQuery } from "../../features/assignments/assignmentMarkSlice";
import { useGetAssignmentsQuery } from "../../features/assignments/assignmentSlice";
import { useGetQuizMarksQuery } from "../../features/quiz/quizMarkSlice";
import { useGetQuizesQuery } from "../../features/quiz/quizSlice";
import "../../style/output.css";
import AssignmentSubmitModal from "./AssignmentSubmitModal";

const VideoDescription = ({ video }) => {
  const { videoId } = useParams();
  const { data: quizes } = useGetQuizesQuery(videoId);
  const { data: assignments, isLoading } = useGetAssignmentsQuery();
  const { id, title, description, url, createdAt } = video;
  const [showModal, setShowModal] = useState(false);
  const { data: quizMarks } = useGetQuizMarksQuery();
  const { data: assignmentMarks } = useGetAssignmentMarksQuery();
  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { id: userId } = loggedInUser || {};

  const assignmentSelected = assignments?.find(
    (assignment) => assignment?.video_id === videoId
  );

  const assignmentSubmitted = assignmentMarks?.some(
    (assignmentMark) =>
      assignmentMark?.student_id === userId &&
      assignmentMark?.assignment_id === Number(assignmentSelected?.id)
  );

  const quizSubmitted = quizMarks?.some(
    (quizMark) =>
      quizMark?.student_id === userId &&
      Number(quizMark?.video_id) === Number(videoId)
  );

  const handleAssignmentClick = () => {
    setShowModal(true);
  };
  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      <iframe
        width="100%"
        className="aspect-video"
        src={url}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-100">
          {title}
        </h1>
        <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
          Uploaded on {createdAt}
        </h2>

        <div className="flex gap-4">
          {!assignmentSubmitted && assignmentSelected ? (
            <div
              className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              onClick={handleAssignmentClick}
            >
              এসাইনমেন্ট
            </div>
          ) : null}

          {!quizSubmitted && quizes?.length > 0 ? (
            <div>
              <Link
                to={`/videos/${id}/quiz`}
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              >
                কুইজে অংশগ্রহণ করুন
              </Link>
            </div>
          ) : null}
        </div>
        <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
      </div>
      {showModal && (
        <AssignmentSubmitModal
          showModal={showModal}
          setShowModal={setShowModal}
          assignmentSelected={assignmentSelected}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default VideoDescription;
