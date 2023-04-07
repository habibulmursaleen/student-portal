import React, { useState } from "react";
import { useSubmitAssignmentMarkMutation } from "../../../features/assignments/assignmentMarkSlice";
import "../../../style/output.css";

const MarkForm = ({ assignmentMark }) => {
  const [mark, setMark] = useState(assignmentMark.totalMark);
  const [submitAssignmentMark, { isLoading }] =
    useSubmitAssignmentMarkMutation();

  const handleSubmit = (e, id, mark, status) => {
    e.preventDefault();
    submitAssignmentMark({
      id,
      data: {
        mark,
        status: "published",
      },
    });
  };
  return (
    <div>
      {assignmentMark.status === "pending" ? (
        <form
          method="POST"
          onSubmit={(e) =>
            handleSubmit(e, assignmentMark.id, mark, assignmentMark.status)
          }
        >
          <input
            min="0"
            max={assignmentMark.totalMark.toString()}
            value={mark}
            onChange={(e) => setMark(e.target.value)}
          />
          <button disabled={isLoading} type="submit">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
        </form>
      ) : (
        assignmentMark.mark
      )}
    </div>
  );
};

export default MarkForm;
