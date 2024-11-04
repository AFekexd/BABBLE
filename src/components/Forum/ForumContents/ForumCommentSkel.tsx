import { Card, Skeleton } from "@nextui-org/react";

const ForumCommentSkel = ({ length }) => {
  return (
    <Card className="m-auto space-y-5 p-4 w-2/3 ">
      <div className="flex flex-row gap-2">
        <div className="w-1/4">
          <div className="flex flex-row">
            <Skeleton className="rounded-full w-2/5">
              <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>

            <div className="flex flex-col gap-2 ml-2 w-2/3">
              <Skeleton className="h-6  rounded-lg">
                <div className="h-2 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="h-6 w-2/4 rounded-lg">
                <div className="h-2 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>
          </div>
          <div className="flex flex-row gap-2 ml-2  mt-5">
            <Skeleton className="h-10 w-2/4 rounded-lg">
              <div className="h-2 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="h-10 w-2/4 rounded-lg">
              <div className="h-2 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
          </div>
        </div>

        <div className="w-5/6 ">
          <div
            className="space-y-4 mt-3 max-h-80 overflow-y-auto p-2"
            id="ForumCommentSection"
          >
            {Array(length)
              .fill(0)
              .map((_, i) => (
                <Skeleton className="w-5/5 rounded-lg">
                  <div className="h-6 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              ))}

            <Skeleton className="rounded-lg">
              <div className="rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ForumCommentSkel;
