import { useLazyGetCommentsQuery } from "../../../features/forum/forumCommentApiSlice";
import { useEffect } from "react";
import ForumCommentSkel from "./ForumCommentSkel";
import ForumComment from "./ForumComment";
import CommentCreator from "./CommentCreator";

const ForumCommentList = () => {
  const [getComments, { data, error, isLoading }] = useLazyGetCommentsQuery();
  const postId = window.location.pathname.split("/")[2];
  useEffect(() => {
    getComments(postId);
  }, [getComments]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex flex-col gap-4 mt-12">
      <CommentCreator id={postId} />
      {isLoading &&
        Array(5)
          .fill(0)
          .map((_, i) => (
            <ForumCommentSkel
              key={i}
              length={Math.floor(Math.random() * 20) + 1}
            />
          ))}
      {!isLoading &&
        data &&
        data.map((comment) => (
          <ForumComment key={comment.id} comment={comment as any} />
        ))}
      {data && data.length === 0 && (
        <>
          <div className="text-center text-lg">No comments yet</div>
        </>
      )}
    </div>
  );
};

export default ForumCommentList;
