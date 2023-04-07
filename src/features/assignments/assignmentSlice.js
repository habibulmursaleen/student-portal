import { apiSlice } from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => "/assignments",
      keepUnusedDataFor: 600,
      providesTags: ["Assignments"],
    }),
    getAssignment: builder.query({
      query: (videoId) => `/assignments?video_id=${videoId}`,
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Assignments"],
    }),
    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Assignments"],
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assignments"],
    }),
  }),
});

export const {
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetAssignmentsQuery,
  useGetAssignmentQuery,
  useGetRelatedAssignmentsQuery,
} = assignmentApi;
