//@ts-nocheck
//TODO: REMOVE NO CHECK FOR FINAL BUILD
import { Card } from "@nextui-org/react";
import UserAvatar from "../../Avatar/UserAvatar";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import { useVoteCommentMutation } from "../../../features/forum/forumCommentApiSlice";

const ForumComment = ({ comment, user_id }) => {
  const [trigger] = useVoteCommentMutation();
  return (
    <Card className="m-auto space-y-5 p-4 w-2/3 ">
      <div className="flex space-x-4">
        <UserAvatar userID={comment.user_id} size="lg" />
        <div className="w-full">
          <div className="flex justify-between">
            <div className="font-bold">{comment.uname}</div>
            <div className="text-sm text-gray-500">{comment.created_at}</div>
          </div>
          <div>{comment.content}</div>
        </div>
        {/* upvotes, downvotes */}
        <div className="flex flex-row gap-4 justify-center items-center">
          <div className="flex flex-row gap-2 items-center">
            <div className=" font-bold text-green-300">{comment.upvotes}</div>
            <div
              className="text-xl text-gray-500 hover:text-green-500 cursor-pointer"
              onClick={() => {
                trigger({
                  type: "upvotes",
                  user_id: user_id,
                  commentId: comment.id,
                });
              }}
            >
              <MdThumbUp />
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div
              className="text-xl text-gray-500 hover:text-red-500 cursor-pointer"
              onClick={() => {
                trigger({
                  type: "downvotes",
                  user_id: user_id,
                  commentId: comment.id,
                });
              }}
            >
              <MdThumbDown />
            </div>
            <div className="font-bold text-red-500">{comment.downvotes}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ForumComment;
