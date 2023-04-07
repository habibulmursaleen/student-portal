import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useSubmitAssignmentMutation } from "../../features/assignments/assignmentMarkSlice";
import { useGetUserQuery } from "../../features/users/usersApi";
import Error from "../ui/Error";
import TextInput from "../ui/TextInput";

const AssignmentSubmitModal = ({
  assignmentSelected,
  showModal,
  setShowModal,
}) => {
  const [submitAssignment, { isLoading }] = useSubmitAssignmentMutation();
  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { email: myEmail } = loggedInUser || {};
  const { data: userData } = useGetUserQuery(myEmail);

  const { title, totalMark, id: assignment_id } = assignmentSelected;
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    submitAssignment({
      student_id: userData[0].id,
      student_name: userData[0].name,
      assignment_id,
      title,
      createdAt: new Date(),
      totalMark,
      repo_link: link,
      status: "pending",
    });

    setLink("");
    setShowModal(false);
  };

  // decide what to render
  let content = null;

  if (!assignmentSelected) {
    content = <Error message="No assignments found!" />;
  }
  setShowModal(true);
  content = (
    <>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  type="text"
                  title="Assignment GitHub Repo Link"
                  value={link}
                  required
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              disabled={isLoading}
              type="submit"
              className="btn ml-2 mt-3"
            >
              Submit
            </button>

            <button
              disabled={showModal}
              className="btn ml-2 mt-3"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );

  return content;
};

export default AssignmentSubmitModal;
