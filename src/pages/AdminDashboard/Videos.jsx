import React, { useState } from "react";
import VideoModal from "../../components/AdminPart/video/VideoModal";
import VideoTable from "../../components/AdminPart/video/VideoTable";
import Navbar from "../../components/Navbar";
import "../../style/output.css";

const Videos = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddVideoClick = () => {
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
              <button className="btn ml-auto" onClick={handleAddVideoClick}>
                Add Video
              </button>
            </div>
            {<VideoTable />}
          </div>
        </div>
      </section>
      {showModal && (
        <VideoModal showModal={showModal} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
};

export default Videos;
