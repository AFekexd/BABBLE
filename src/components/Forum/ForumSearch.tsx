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
import SearchSelect from "../Search/SearchSelect";

const ForumSearch = () => {
  const [search, setSearch] = useState("");
  const [accordion, setAccordion] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  return (
    <Card className="m-2 flex flex-col gap-2 p-2 bg-primary-50">
      <div className="flex w-full gap-2">
        <SearchSelect type="tag" setTags={setTags} style="w-2/4" />
        <Input
          type="text"
          className="w-2/4"
          placeholder="Title"
          endContent={
            <MdSearch
              className="cursor-pointer hover:text-primary-500 transition-all duration-300 ease-in-out"
              onClick={() => console.log("Search")}
            />
          }
        />
      </div>

      <Divider />
      <Accordion className="w-full">
        <AccordionItem key="1" onPress={() => setAccordion(!accordion)}>
          <div className=" w-2/4">
            <Input type="text" placeholder="@username" className="w-full" />
            <Input type="text" placeholder="Name" className="w-full" />
          </div>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default ForumSearch;
