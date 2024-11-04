import { Button, Card, Textarea } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { MdSend } from "react-icons/md";

const CommentCreator = ({ id }) => {
  const { t } = useTranslation();
  return (
    <Card className="m-auto space-y-5 p-4 w-2/3 ">
      <div className="flex space-x-4">
        {t("comment.creator")}
        <Textarea
          labelPlacement="outside"
          label="Comment"
          placeholder="Write your comment here..."
          className="w-full"
          endContent={
            <Button variant="flat" color="primary" className="h-full">
              <MdSend />
            </Button>
          }
        />
      </div>
    </Card>
  );
};

export default CommentCreator;
