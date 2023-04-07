import React, { useState } from "react";
import AssignmentModal from "../../components/AdminPart/assignment/AssignmentModal";
import AssignmentTable from "../../components/AdminPart/assignment/AssignmentTable";
import Navbar from "../../components/Navbar";
import "../../style/output.css";

const Assignment = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddAssignmentClick = () => {
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
              <button
                className="btn ml-auto"
                onClick={handleAddAssignmentClick}
              >
                Add Assignment
              </button>
            </div>
            {<AssignmentTable />}
          </div>
        </div>
      </section>
      {showModal && (
        <AssignmentModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Assignment;
