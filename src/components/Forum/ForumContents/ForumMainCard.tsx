//TODO: REMOVE NO CHECK FOR FINAL BUILD
import {
  Button,
  Card,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@nextui-org/react";
import UserAvatar from "../../Avatar/UserAvatar";
import { useGetUserViaIdQuery } from "../../../features/user/userApiSlice";
import { useEffect } from "react";
import { User } from "../../../types/User";

import "./Content.css";
import { BiDotsHorizontal } from "react-icons/bi";

const ForumMainCard = ({ item, isLoading }) => {
  const { data: userData, refetch } = useGetUserViaIdQuery(
    item ? item.creator : ""
  ) as { data: User; refetch: () => void };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    refetch();
    console.log(item);
  }, [refetch, item]);

  return isLoading ? (
    <>
      <Card className="m-3 space-y-5 p-4 mb-8">
        <div className="flex flex-row gap-2">
          <div className="w-1/6">
            <div className="flex flex-row">
              <Skeleton className="rounded-full w-1/3">
                <div className="h-24  rounded-lg bg-default-300"></div>
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

            <div className="space-y-4 mt-3 ">
              <Skeleton className="w-3/6 rounded-lg">
                <div className="h-6 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>

              <Skeleton className="w-3/6 rounded-lg">
                <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-3/6 rounded-lg">
                <div className="h-6 w-2/5 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </div>

          <div className="w-5/6 ">
            <Skeleton className="rounded-lg">
              <div className="h-12 rounded-lg bg-default-300"></div>
            </Skeleton>
            <Divider className="mt-2 mb-12" />
            <div className="space-y-4 mt-3">
              <Skeleton className="w-1/7 rounded-lg">
                <div className="h-6 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-5/5 rounded-lg">
                <div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-5/5 rounded-lg">
                <div className="h-6 w-2/5 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </div>
        </div>
        <Divider />
        <Skeleton className="w-1/7 rounded-lg">
          <div className="h-60 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </Card>
    </>
  ) : (
    <>
      <Card className="m-3 space-y-5 p-4 mb-8">
        <div className="flex flex-row gap-2">
          <div className="w-1/6">
            <div className="flex flex-row">
              <UserAvatar userID={item.creator} className="w-20 h-20" />
              <div className="flex flex-col gap-2 ml-2 w-2/3">
                <h3 className="text-lg font-semibold">{userData?.name}</h3>
                <p className="text-sm text-gray-500">@{userData?.username}</p>
              </div>
            </div>
          </div>

          <div className="w-5/6 ">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <Divider className="mt-2 mb-4" />
            <div className="space-y-4 mt-3">
              <p className="text-sm text-gray-500">
                {" "}
                {item.tag_names?.map((tag: string, index: number) => (
                  <>
                    {tag !== null && (
                      <Chip key={index} color="primary" size="sm">
                        {tag}
                      </Chip>
                    )}
                  </>
                ))}
              </p>
            </div>
          </div>
          <div className="justify-self-end">
            {" "}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  isIconOnly
                  startContent={<BiDotsHorizontal />}
                ></Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">New file</DropdownItem>
                <DropdownItem key="copy">Copy link</DropdownItem>
                <DropdownItem key="edit">Edit file</DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                >
                  Delete file
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <Divider />
        {
          <div
            className="h-60 w-full rounded-lg overflow-y-auto "
            dangerouslySetInnerHTML={{ __html: item.content }}
          ></div>
        }
      </Card>
    </>
  );
};

export default ForumMainCard;
