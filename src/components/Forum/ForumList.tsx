//@ts-nocheck
//TODO: REMOVE NO CHECK FOR FINAL BUILD
import ForumItem from "./ForumItem";
import { Card, Pagination, Skeleton } from "@nextui-org/react";

const ForumList = ({
  data,
  isLoading,
  page,
  setPage,
}: {
  data: any;
  isLoading: boolean;
  page: any;
  setPage: any;
}) => {
  return (
    <div className="h-[75dvh] ">
      <div className="w-full flex flex-col gap-5 p-2 overflow-y-auto min-h-[85%] max-h-[85%]">
        {!isLoading &&
          data.forums?.map((item, index) => (
            <ForumItem key={index} item={item} />
          ))}
        {isLoading &&
          Array.from({ length: 6 }, (_, index) => (
            <Card className="w-full space-y-5" radius="lg" key={index}>
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
            </Card>
          ))}
      </div>
      <div className="flex justify-center p-3">
        {data?.total > 0 && (
          <Pagination
            showControls
            onChange={(e) => setPage(e)}
            total={Math.ceil(data.total / 6)}
            initialPage={1}
            color="primary"
          />
        )}
      </div>
    </div>
  );
};

export default ForumList;
