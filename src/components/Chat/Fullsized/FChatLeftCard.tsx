import {
  Card,
  Tabs,
  Tab,
  Tooltip,
  Badge,
  Button,
  CardFooter,
  CardBody,
} from "@nextui-org/react";
import { MdPerson, MdGroup, MdGroupAdd } from "react-icons/md";
import ChatGroupCard from "./ChatGroupCard";
import ChatCard from "./ChatCard";
import { useEffect } from "react";

const FChatLeftCard = ({
  onOpen,
  selected,
  setSelected,
}: {
  onOpen: () => void;
  selected: string;
  setSelected: (key: string) => void;
}) => {
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  return (
    <Card
      border-none
      className="w-3/6 h-full pt-3 sm:w-2/5 p-2 bg-transparent shadow-none border-r-1 rounded-none"
    >
      <CardBody>
        {" "}
        <Tabs
          className="chat-tabs"
          onSelectionChange={(key) => setSelected(key.toString())}
        >
          <Tab
            key="person"
            className="h-full"
            title={
              <Tooltip content="Barátok" placement="bottom">
                <div className="chat-tab md:text-2xl">
                  <Badge color="warning" content="10" placement="bottom-right">
                    <MdPerson />
                  </Badge>
                </div>
              </Tooltip>
            }
          >
            <div className="chat-friendlist p-2 h-full">
              <ChatCard />
            </div>
          </Tab>
          <Tab
            key="group"
            className="h-full"
            title={
              <Tooltip content="Csoportok" placement="bottom">
                <div className="chat-tab">
                  <Badge color="warning" content="10" placement="bottom-right">
                    <MdGroup />
                  </Badge>
                </div>
              </Tooltip>
            }
          >
            <div className="p-3 h-full">
              <ChatGroupCard />
            </div>
          </Tab>
        </Tabs>
      </CardBody>
      <CardFooter>
        {" "}
        <Button
          className="w-full "
          color="primary"
          size="lg"
          startContent={<MdGroupAdd />}
          onPress={onOpen}
        >
          Új Beszélgetés
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FChatLeftCard;
