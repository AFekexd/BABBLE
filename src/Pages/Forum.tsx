import ForumList from "../components/Forum/ForumList";

import { Divider, Tooltip, useDisclosure } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import ForumModal from "../components/Modals/ForumModal";

import "../components/Forum/Forum.css";
import { useLazyGetForumQuery } from "../features/forum/mainForumApiSlice";
import { useEffect, useState } from "react";
import ForumSearch from "../components/Forum/ForumSearch";
const Forum = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [trigger, { isLoading }] = useLazyGetForumQuery({});
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!isOpen) getData();
  }, [isOpen, page]);

  const getData = () => {
    trigger({
      offset: (page - 1) * 5,
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  return (
    <>
      <ForumModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <Tooltip content="Új fórum poszt készítése" placement="left">
        <div
          className="fixed z-5 bottom-5 right-5 rounded-full bg-primary p-2 hover:bg-primary-300 cursor-pointer hover:animate-pulse"
          onClick={onOpen}
        >
          <FaPlus className="text-white" size={25} />
        </div>
      </Tooltip>
      <div className="w-[95%] md:w-[60%] m-auto ">
        <div id="forumBody" className="  gap-4 h-95dvh sm:h-50dvh">
          <div id="forumList">
            <div id="forumHeader">
              <ForumSearch />
            </div>
            <ForumList
              data={data}
              isLoading={isLoading}
              page={page}
              setPage={setPage}
            />

            <Divider className="sm:hidden" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Forum;
