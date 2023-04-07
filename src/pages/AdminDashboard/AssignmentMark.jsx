import React from "react";
import AssignmentMarkTable from "../../components/AdminPart/AssignmentMark/AssignmentMarkTable";
import Navbar from "../../components/Navbar";
import "../../style/output.css";

const AssignmentMark = () => {
  return (
    <div>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <AssignmentMarkTable />
        </div>
      </section>
    </div>
  );
};

export default AssignmentMark;
