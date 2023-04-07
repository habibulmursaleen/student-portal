import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAssignmentMarksQuery } from "../../../features/assignments/assignmentMarkSlice";
import { filterSelected } from "../../../features/assignments/markFilterSlice";
import "../../../style/output.css";
import Error from "../../ui/Error";
import MarkForm from "./MarkForm";

const AssignmentMarkTable = () => {
  const {
    data: assignmentMarks = [],
    isError,
    isLoading,
  } = useGetAssignmentMarksQuery();
  const { filter } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const filterByStatus = (assignmentMark) => {
    switch (filter) {
      case "total":
        return assignmentMark.status;
      case "pending":
        return assignmentMark.status === "pending";
      case "published":
        return assignmentMark.status === "published";

      default:
        return true;
    }
  };

  const handleFilterChange = (filterValue) => {
    dispatch(filterSelected(filterValue));
  };

  const numPublished = assignmentMarks.filter(
    (mark) => mark.status === "published"
  ).length;
  const numPending = assignmentMarks.filter(
    (mark) => mark.status === "pending"
  ).length;
  const total = assignmentMarks.length;

  // decide what to render
  let content = null;

  if (!isLoading && isError) {
    content = <Error message={isError} />;
  }

  if (!isLoading && !isError && assignmentMarks?.length === 0) {
    content = <Error message="No assignments found!" />;
  }

  function limitText(text, maxLength) {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }

  if (!isLoading && !isError && assignmentMarks?.length > 0) {
    content = (
      <>
        {assignmentMarks.filter(filterByStatus).map((assignmentMark) => (
          <tr key={assignmentMark.id}>
            <td className="table-td">{limitText(assignmentMark.title, 80)}</td>
            <td className="table-td">
              {limitText(assignmentMark.createdAt, 140)}{" "}
            </td>
            <td className="table-td">
              {limitText(assignmentMark.student_name, 80)}
            </td>
            <td className="table-td">
              {limitText(assignmentMark.repo_link, 140)}{" "}
            </td>
            <td className="table-td input-mark">
              <MarkForm assignmentMark={assignmentMark} />
            </td>
          </tr>
        ))}
      </>
    );
  }

  return (
    <div>
      <div className="px-3 py-20 bg-opacity-10">
        <ul className="assignment-status">
          <li>
            Total{" "}
            <span onClick={() => handleFilterChange("total")}>{total}</span>
          </li>
          <li onClick={() => handleFilterChange("pending")}>
            Pending <span>{numPending}</span>
          </li>
          <li>
            Mark Sent{" "}
            <span onClick={() => handleFilterChange("published")}>
              {numPublished}
            </span>
          </li>
        </ul>
        <div className="overflow-x-auto mt-4">
          <table className="divide-y-1 text-base divide-gray-600 w-full">
            <thead>
              <tr>
                <th className="table-th">Assignment</th>
                <th className="table-th">Date</th>
                <th className="table-th">Student Name</th>
                <th className="table-th">Repo Link</th>
                <th className="table-th">Mark</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-600/50">{content}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignmentMarkTable;
