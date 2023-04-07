import { apiSlice } from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizMarks: builder.query({
      query: () => "/quizMark",
      keepUnusedDataFor: 600,
      providesTags: ["Quizsmarks"],
    }),

    submitQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quizsmarks"],
    }),
  }),
});

export const { useGetQuizMarksQuery, useSubmitQuizMutation } = quizApi;
