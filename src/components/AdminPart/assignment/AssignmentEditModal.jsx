import React, { useState } from "react";
import { useEditAssignmentMutation } from "../../../features/assignments/assignmentSlice";
import { useGetVideosQuery } from "../../../features/videos/videoSlice";
import Error from "../../ui/Error";
import Success from "../../ui/Success";
import TextInput from "../../ui/TextInput";

const AssignmentEditModal = ({ assignment, setShowModal, showModal }) => {
  const [editAssignment, { isLoading, isSuccess, isError }] =
    useEditAssignmentMutation();
  const { data: videos } = useGetVideosQuery();

  const {
    id,
    title: initialTitle,
    video_title: initialVideo_title,
    totalMark: initialTotalMark,
    video_id: initialVideo_id,
  } = assignment;

  const [title, setTitle] = useState(initialTitle);
  const [video_title, setVideo_title] = useState(initialVideo_title);
  const [totalMark, setTotalMark] = useState(initialTotalMark);
  const [video_id, setVideo_id] = useState(initialVideo_id);

  const videoSelected = videos.find((video) => video.id === Number(video_id));

  const resetForm = () => {
    setTitle("");
    setVideo_title("");
    setTotalMark("");
    setVideo_id("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editAssignment({
      id,
      data: {
        title,
        video_title: videoSelected.title,
        totalMark,
        video_id,
      },
    });
    resetForm();
    setShowModal(false);
  };

  const handleCancle = () => {
    resetForm();
    setShowModal(false);
  };

  return (
    <div className="bg-slate-900 p-4 border border-slate-700/80 rounded-md">
      {/* <button onClick={() => setShowModal(true)}>Add Video</button> */}
      {showModal && (
        <div>
          <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
            <h2 className="mb-8 text-xl font-bold text-center">
              Edit Assignment
            </h2>
            <form method="POST" onSubmit={handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <TextInput
                        type="text"
                        title="Assignment title"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 ">
                      <label className="block text-sm font-medium text-gray-700">
                        Assign To
                      </label>
                      <select
                        name="video"
                        id="lws-video"
                        required
                        className="px-3 py-3 text-input mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={video_id}
                        onChange={(e) => {
                          setVideo_id(e.target.value);
                          setVideo_title(
                            e.target.options[e.target.selectedIndex].text
                          );
                        }}
                      >
                        <option value="" hidden defaultValue>
                          Select Video
                        </option>
                        {videos.map((video) => (
                          <option key={video.id} value={video.id}>
                            {video.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <TextInput
                        type="text"
                        title="Video Title"
                        value={video_title}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <TextInput
                        type="text"
                        title="Video Id"
                        value={video_id}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <TextInput
                        title="Total Marks"
                        value={totalMark}
                        required
                        type="text"
                        onChange={(e) => setTotalMark(e.target.value)}
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
                    Update
                  </button>

                  <button
                    disabled={isLoading}
                    className="btn ml-2 mt-3"
                    onClick={handleCancle}
                  >
                    Cancel
                  </button>
                </div>

                {isSuccess && (
                  <Success message="Video was added successfully" />
                )}
                {isError && (
                  <Error message="There was an error adding video!" />
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentEditModal;
