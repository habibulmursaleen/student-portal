import React, { useState } from "react";
import { useEditVideoMutation } from "../../../features/videos/videoSlice";
import Error from "../../ui/Error";
import Success from "../../ui/Success";
import TextArea from "../../ui/TextArea";
import TextInput from "../../ui/TextInput";

const VideoEditModal = ({ video, setShowModal, showModal }) => {
  const [editVideo, { isLoading, isError, isSuccess }] = useEditVideoMutation();

  const {
    id,
    title: initialTitle,
    description: initialDescription,
    url: initialUrl,
    // createdAt: initialCreatedAt,
    duration: initialDuration,
    views: initialViews,
  } = video;

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [views, setViews] = useState(initialViews);
  const [duration, setDuration] = useState(initialDuration);
  const [url, setUrl] = useState(initialUrl);
  // const [createdAt, setcreatedAt] = useState(initialCreatedAt);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDuration("");
    setViews("");
    setUrl("");
    // setcreatedAt("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editVideo({
      id,
      data: {
        title,
        description,
        duration,
        views,
        createdAt: new Date(),
        url,
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
            <h2 className="mb-8 text-xl font-bold text-center">Edit Video</h2>
            <form method="POST" onSubmit={handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <TextInput
                        type="text"
                        title="Video title"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <TextInput
                        type="text"
                        title="url"
                        value={url}
                        required
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6">
                      <TextArea
                        type="text"
                        title="Description"
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    {/* <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <TextInput
                        type="text"
                        title="Upload Date"
                        value={createdAt}
                        required
                        onChange={(e) => setcreatedAt(e.target.value)}
                      />
                    </div> */}

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <TextInput
                        type="text"
                        title="Video Duration"
                        value={duration}
                        required
                        onChange={(e) => setDuration(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <TextInput
                        title="Video no of views"
                        value={views}
                        required
                        type="text"
                        onChange={(e) => setViews(e.target.value)}
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

export default VideoEditModal;
