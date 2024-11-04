import { Button, Card, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdSend } from "react-icons/md";
import { useCreateCommentMutation } from "../../../features/forum/forumCommentApiSlice";
import { CustomToast } from "../../CustomToast";

const CommentCreator = ({ id, user_id }) => {
  const [trigger] = useCreateCommentMutation();

  const { t } = useTranslation();
  const [comment, setComment] = useState("");
  return (
    <Card className="m-auto space-y-5 p-4 w-2/3 ">
      <div className="flex space-x-4">
        <Textarea
          labelPlacement="outside"
          label={t("comment.creator")}
          placeholder="Write your comment here..."
          className="w-full"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          endContent={
            <Button
              variant="flat"
              color="primary"
              className="h-full"
              isDisabled={comment.length < 3}
              onClick={() => {
                trigger({
                  body: {
                    content: comment,
                    user_id: user_id,
                    thread_id: id,
                  },
                })
                  .then(() => {
                    CustomToast(t("comment.created"), "success");
                    setComment("");
                  })
                  .catch((err) => {
                    CustomToast(err.data.message, "error");
                  });
              }}
            >
              <MdSend />
            </Button>
          }
        />
      </div>
    </Card>
  );
};

export default CommentCreator;
