//@ts-nocheck
//TODO: REMOVE NO CHECK FOR FINAL BUILD
import {
  Card,
  Avatar,
  Button,
  Input,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { MdAdd, MdSend } from "react-icons/md";
import ChatItem from "../ChatItem";
import { useState } from "react";

const FChatRightCard = () => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [status, setStatus] = useState("danger");
  return (
    <Card className="w-5/6 p-0 bg-transparent hover:bg-primary-50">
      <CardHeader className="justify-between bg-primary p-3">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="lg"
            color={status === "online" ? "success" : "danger"}
            src="https://nextui.org/avatars/avatar-1.png"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-secondary">
              Zoey Lang
            </h4>
            <h5 className="text-small tracking-tight text-secondary-100">
              @zoeylang
            </h5>
          </div>
        </div>
        <Button
          className={
            isFollowed
              ? "bg-transparent text-foreground border-default-200"
              : ""
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="bg-transparent dark:bg-gray-900">
        <div className="flex flex-col gap-2 p-2 mb-2 w-full">
          {Array.from({ length: 20 }).map((_, index) => (
            <ChatItem recieved={index % 2 === 0} />
          ))}
        </div>
      </CardBody>
      <CardFooter>
        <div className="w-full">
          <Input
            className="w-full"
            startContent={
              <button
                type="submit"
                className="btn btn-primary "
                onClick={() => console.log("asd")}
              >
                <MdAdd />
              </button>
            }
            endContent={
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => console.log("asd")}
              >
                <MdSend />
              </button>
            }
            type="text"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default FChatRightCard;
