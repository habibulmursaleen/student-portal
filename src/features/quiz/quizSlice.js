import { apiSlice } from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizesList: builder.query({
      query: () => "/quizzes",
      keepUnusedDataFor: 600,
      providesTags: ["Quizes"],
    }),
    getQuizes: builder.query({
      query: (videoId) => `/quizzes?video_id=${videoId}`,
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quizes"],
    }),
    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Quizes"],
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quizes"],
    }),
  }),
});

export const {
  useAddQuizMutation,
  useDeleteQuizMutation,
  useEditQuizMutation,
  useGetQuizesListQuery,
  useGetQuizesQuery,
} = quizApi;
