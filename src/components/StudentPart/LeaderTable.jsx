import React from "react";
import { useSelector } from "react-redux";
import { useGetAssignmentMarksQuery } from "../../features/assignments/assignmentMarkSlice";
import { useGetQuizMarksQuery } from "../../features/quiz/quizMarkSlice";
import "../../style/output.css";
import Error from "../ui/Error";

const LeaderTable = () => {
  const { data: quizMarks = [], isError, isLoading } = useGetQuizMarksQuery();
  const { data: assignmentMarks = [] } = useGetAssignmentMarksQuery();
  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { id: userId, name: useName } = loggedInUser || {};

  const quizMarkForUser = quizMarks.filter(
    (quizMark) => quizMark.student_id === userId
  );
  const totalMarkSumQuiz = quizMarkForUser.reduce(
    (sum, quiz) => sum + quiz.totalMark,
    0
  );

  const subTotalMarkAssignment = assignmentMarks.filter(
    (assignmentMark) => assignmentMark.student_id === userId
  );
  const totalMarkSumAssignment = subTotalMarkAssignment.reduce(
    (sum, assignmentMark) => sum + Number(assignmentMark.mark),
    0
  );

  // Calculate total marks for each student
  const studentMarks = quizMarks.reduce((marks, quizMark) => {
    const studentId = quizMark.student_id;
    if (!marks[studentId]) {
      marks[studentId] = {
        student_id: studentId,
        student_name: quizMark.student_name,
        quiz_total: 0,
        assignment_total: 0,
        total: 0,
      };
    }
    marks[studentId].quiz_total += quizMark.totalMark;
    return marks;
  }, {});

  assignmentMarks.forEach((assignmentMark) => {
    const studentId = assignmentMark.student_id;
    if (!studentMarks[studentId]) {
      studentMarks[studentId] = {
        student_id: studentId,
        student_name: assignmentMark.student_name,
        quiz_total: 0,
        assignment_total: 0,
        total: 0,
      };
    }
    studentMarks[studentId].assignment_total += Number(assignmentMark.mark);
    studentMarks[studentId].total =
      studentMarks[studentId].quiz_total +
      studentMarks[studentId].assignment_total;
  });

  // Sort students by total marks
  const sortedStudentMarks = Object.values(studentMarks).sort(
    (a, b) => b.total - a.total
  );

  const rank = sortedStudentMarks.findIndex(
    (student) => student.student_id === userId
  );

  // decide what to render
  let content = null;

  if (!isLoading && isError) {
    content = <Error message={isError} />;
  }

  if (!isLoading && !isError && quizMarks?.length === 0) {
    content = <Error message="No assignments found!" />;
  }

  if (!isLoading && !isError && sortedStudentMarks?.length > 0) {
    const top20 = sortedStudentMarks.slice(0, 20);
    content = (
      <>
        {top20.map((studentMark, index) => (
          <tr
            className="border-b border-slate-600/50"
            key={studentMark.student_id}
          >
            <td className="table-td text-center">{index + 1}</td>
            <td className="table-td text-center">{studentMark.student_name}</td>
            <td className="table-td text-center">{studentMark.quiz_total}</td>
            <td className="table-td text-center">
              {studentMark.assignment_total}
            </td>
            <td className="table-td text-center">{studentMark.total}</td>
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
                  <td className="table-td text-center font-bold">{rank + 1}</td>
                  <td className="table-td text-center font-bold">{useName}</td>
                  <td className="table-td text-center font-bold">
                    {totalMarkSumQuiz}
                  </td>
                  <td className="table-td text-center font-bold">
                    {totalMarkSumAssignment}
                  </td>
                  <td className="table-td text-center font-bold">
                    {totalMarkSumQuiz + totalMarkSumAssignment}
                  </td>
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
