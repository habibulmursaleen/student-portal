import { apiSlice } from "../api/apiSlice";

export const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMarks: builder.query({
      query: () => "/assignmentMark",
      keepUnusedDataFor: 600,
      providesTags: ["Assignmentsmarks"],
    }),

    submitAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Assignmentsmarks"],
    }),

    submitAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Assignmentsmarks"],
    }),
  }),
});

export const {
  useSubmitAssignmentMarkMutation,
  useGetAssignmentMarksQuery,
  useSubmitAssignmentMutation,
} = assignmentMarkApi;
