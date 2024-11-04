//@ts-nocheck
//TODO: REMOVE NO CHECK FOR FINAL BUILD
import { Card } from "@nextui-org/react";

const ForumComment = () => {
  return (
    <Card className="m-auto space-y-5 p-4 w-2/3 ">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4">asd</div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded">{id}</div>
            <div className="h-4 bg-gray-200 rounded w-5/6">asd</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ForumComment;
