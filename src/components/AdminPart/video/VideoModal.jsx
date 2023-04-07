import React, { useState } from "react";
import { useAddVideoMutation } from "../../../features/videos/videoSlice";
import Error from "../../ui/Error";
import Success from "../../ui/Success";
import TextArea from "../../ui/TextArea";
import TextInput from "../../ui/TextInput";

const VideoModal = ({ handleCloseModal, showModal }) => {
  const [addVideo, { isLoading, isSuccess, isError }] = useAddVideoMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");
  const [url, setUrl] = useState("");
  // const [createdAt, setcreatedAt] = useState("");

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
    addVideo({
      title,
      description,
      duration,
      views,
      createdAt: new Date(),
      url,
    });
    resetForm();
    handleCloseModal(false);
  };

  const handleCancle = () => {
    resetForm();
    handleCloseModal(false);
  };

  return (
    <div className="bg-slate-900 p-4 border border-slate-700/80 rounded-md">
      {/* <button onClick={() => setShowModal(true)}>Add Video</button> */}
      {showModal && (
        <div>
          <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
            <h2 className="mb-8 text-xl font-bold text-center">Add Video</h2>
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
                        title="No of views"
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
                    Save
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

export default VideoModal;
