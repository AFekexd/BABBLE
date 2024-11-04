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
      query: ({ body }) => ({
        url: `/forum/thread/comment`,
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
    voteComment: builder.mutation({
      query: ({
        commentId,
        type,
        user_id,
      }: {
        commentId: string;
        type: "upvotes" | "downvotes";
        user_id: string;
      }) => ({
        url: `/forum/thread/comment/${type}/${commentId}/${user_id}`,
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
  useVoteCommentMutation,
} = forumCommentApiSlice;
