//@ts-nocheck
//TODO: REMOVE NO CHECK FOR FINAL BUILD
import { Divider } from "@nextui-org/react";
import ForumMainCard from "./ForumContents/ForumMainCard";
import ForumCommentList from "./ForumContents/ForumCommentList";
import "../Forum/Forum.css";
import { useGetThreadQuery } from "../../features/forum/mainForumApiSlice";
import { useEffect } from "react";
const ForumContent = () => {
  const { data, error, isLoading } = useGetThreadQuery(
    window.location.pathname.split("/")[2]
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="w-full max-h-[90vh] overflow-y-auto">
      <ForumMainCard item={data} isLoading={isLoading} />

      <Divider className="w-5/6 h-2 rounded-lg m-auto" />
      <ForumCommentList id={data} />
    </div>
  );
};

export default ForumContent;
