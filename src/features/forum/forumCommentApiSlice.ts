import { apiSlice } from "../../app/api/apiSlice";

export const forumCommentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //TODO: Implementálja a szükséges végpontokat
    getComments: builder.query({
      query: (threadId) => ({
        url: `/forum/thread/${threadId}/comment`,
        method: "GET",
      }),
    }),
    createComment: builder.mutation({
      query: ({ threadId, body }) => ({
        url: `/forum/thread/${threadId}/comment`,
        method: "POST",
        body,
      }),
    }),
    deleteComment: builder.mutation({
      query: ({ threadId, commentId }) => ({
        url: `/forum/thread/${threadId}/comment/${commentId}`,
        method: "DELETE",
      }),
    }),
    updateComment: builder.mutation({
      query: ({ threadId, commentId, body }) => ({
        url: `/forum/thread/${threadId}/comment/${commentId}`,
        method: "PUT",
        body,
      }),
    }),
    upvoteComment: builder.mutation({
      query: ({ threadId, commentId }) => ({
        url: `/forum/thread/${threadId}/comment/${commentId}/upvote`,
        method: "PUT",
      }),
    }),
    downvoteComment: builder.mutation({
      query: ({ threadId, commentId }) => ({
        url: `/forum/thread/${threadId}/comment/${commentId}/downvote`,
        method: "PUT",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useUpvoteCommentMutation,
  useDownvoteCommentMutation,
} = forumCommentApiSlice;
