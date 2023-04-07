import { apiSlice } from "../api/apiSlice";
export const leaderBoardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMarks: builder.query({
      query: () => ({
        url: "/assignmentMark",
        method: "GET",
      }),
      transformResponse(response) {
        const { assignmentMark, quizMark } = response.data;
        const users = {};

        // Process assignment marks
        assignmentMark.forEach((mark) => {
          const { student_id, student_name, mark: assignmentMark } = mark;
          if (!users[student_id]) {
            users[student_id] = {
              id: student_id,
              name: student_name,
              assignmentMark: 0,
              quizMark: 0,
              totalMark: 0,
            };
          }
          users[student_id].assignmentMark += parseInt(assignmentMark);
          users[student_id].totalMark += parseInt(assignmentMark);
        });

        // Process quiz marks
        quizMark.forEach((mark) => {
          const { student_id, mark: quizMark } = mark;
          if (!users[student_id]) {
            users[student_id] = {
              id: student_id,
              name: mark.student_name,
              assignmentMark: 0,
              quizMark: 0,
              totalMark: 0,
            };
          }
          users[student_id].quizMark += parseInt(quizMark);
          users[student_id].totalMark += parseInt(quizMark);
        });

        const userArray = Object.values(users).sort(
          (a, b) => b.totalMark - a.totalMark
        );
        return [
          ...userArray.slice(0, 20),
          userArray.find((user) => user.id === 8),
        ];
      },
      providesTags: ["Marks"],
    }),
  }),
});

export const { useGetMarksQuery } = leaderBoardApi;
