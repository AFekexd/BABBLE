//@ts-nocheck
//TODO: REMOVE NO CHECK FOR FINAL BUILD
import { Card, Chip } from "@nextui-org/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserAvatar from "../Avatar/UserAvatar";

const ForumItem = ({ item }: { item: any }) => {
  //on card click navigate to forumContent

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Link to={`/forum/` + item.id}>
        <Card className="space-y-4 p-1 sm:p-2 hover:brightness-125 bg-primary-50">
          <div className="flex flex-row gap-1 sm:gap-2 w-full">
            <div className="w-6/12 sm:2/12 flex flex-row">
              {item && (
                <>
                  <div className="flex flex-row gap-2 ml-2 ">
                    <UserAvatar userID={item.userid} size="lg" />
                    <div>
                      <h2> {item.name} </h2>
                      <p className="text-sm  text-default-400">
                        @{item.username}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="w-4/12 sm:w-8/12">
              {item.tag_names && (
                <div className="flex flex-row gap-1">
                  {item.tag_names.map((tag: string, index: number) => (
                    <>
                      {tag !== null && (
                        <Chip key={index} color="primary" size="sm">
                          {tag}
                        </Chip>
                      )}
                    </>
                  ))}
                </div>
              )}
              {item && (
                <h1
                  className="text-lg font-bold text-white truncate"
                  title={item.title}
                >
                  {item.title}
                </h1>
              )}
            </div>

            <div className="w-2/12 grid justify-items-end">
              <p className="text-default-400 text-sm">
                {new Date(item.created_at).toLocaleDateString("hu-HU")}
              </p>
            </div>
          </div>
        </Card>
      </Link>
    </>
  );
};

export default ForumItem;
