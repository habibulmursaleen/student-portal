import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAssignmentMarksQuery } from "../../features/assignments/assignmentMarkSlice";
import { assignment, quiz } from "../../features/marks/markSlice";
import { useGetQuizMarksQuery } from "../../features/quiz/quizMarkSlice";
import "../../style/output.css";
import Error from "../ui/Error";

const LeaderTable = () => {
  const dispatch = useDispatch();
  const { data: quizMarks = [], isError, isLoading } = useGetQuizMarksQuery();
  const { data: assignmentMarks = [] } = useGetAssignmentMarksQuery();
  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { id: userId, name: useName } = loggedInUser || {};
  const {
    assignment: assignmentMark,
    quiz: quizMarkks,
    subTotal,
  } = useSelector((state) => state.mark) || {};

  const subTotalMarkAssignment = assignmentMarks.reduce((acc, cur) => {
    if (cur.student_id === userId) {
      return acc + Number(cur.mark);
    }
    return acc;
  }, 0);

  const subTotalMarkQuiz = quizMarks.reduce((acc, cur) => {
    if (cur.student_id === userId) {
      return acc + Number(cur.mark);
    }
    return acc;
  }, 0);

  useEffect(() => {
    dispatch(assignment(subTotalMarkAssignment));
    dispatch(quiz(subTotalMarkQuiz));
  }, [dispatch, subTotalMarkAssignment, subTotalMarkQuiz]);

  // decide what to render
  let content = null;

  if (!isLoading && isError) {
    content = <Error message={isError} />;
  }

  if (!isLoading && !isError && quizMarks?.length === 0) {
    content = <Error message="No assignments found!" />;
  }

  if (!isLoading && !isError && quizMarks?.length > 0) {
    content = (
      <>
        {quizMarks.map((quizMark) => (
          <tr className="border-b border-slate-600/50" key={quizMark.id}>
            <td className="table-td text-center">{quizMark.student_id}</td>
            <td className="table-td text-center">{quizMark.student_name}</td>
            <td className="table-td text-center">{quizMarkks}</td>
            <td className="table-td text-center">{assignmentMark}</td>
            <td className="table-td text-center">{subTotal}</td>
          </tr>
        ))}
      </>
    );
  }

  return (
    <div>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr>
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-2 border-cyan">
                  <td className="table-td text-center font-bold">{userId}</td>
                  <td className="table-td text-center font-bold">{useName}</td>
                  <td className="table-td text-center font-bold">
                    {subTotalMarkQuiz}
                  </td>
                  <td className="table-td text-center font-bold">
                    {subTotalMarkAssignment}
                  </td>
                  <td className="table-td text-center font-bold">{subTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr className="border-b border-slate-600/50">
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>
              <tbody>{content}</tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeaderTable;
