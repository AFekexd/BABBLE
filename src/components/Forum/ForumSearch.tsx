//@ts-nocheck
//TODO: REMOVE NO CHECK FOR FINAL BUILD
import {
  Accordion,
  AccordionItem,
  Card,
  Divider,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

const ForumSearch = () => {
  const [search, setSearch] = useState("");
  const [accordion, setAccordion] = useState(false);
  return (
    <Card className="m-2 flex flex-col gap-2 p-2 bg-primary-50">
      <Input
        type="text"
        className="w-full"
        placeholder="Title"
        endContent={
          <MdSearch
            className="cursor-pointer hover:text-primary-500 transition-all duration-300 ease-in-out"
            onClick={() => console.log("Search")}
          />
        }
      />
      <Divider />
      <Accordion className="w-full">
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="Filters"
          onPress={() => setAccordion(!accordion)}
        >
          <Input type="text" placeholder="@username" className="w-full" />
          <Input type="text" placeholder="Name" className="w-full" />
          <Input type="text" placeholder="Filter" className="w-full" />
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default ForumSearch;
