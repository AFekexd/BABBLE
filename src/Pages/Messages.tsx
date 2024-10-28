import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import "../components/Chat/Fullsized/fullsizedChat.css";
import FChatLeftCard from "../components/Chat/Fullsized/FChatLeftCard";
import FChatRightCard from "../components/Chat/Fullsized/FChatRightCard";
import MobileChat from "../components/Chat/Mobile/MobileChat";
import { useState } from "react";
import UserSearch from "../components/Search/UserSearch";
const Messages = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState("person");

  return (
    <>
      <div className="hidden sm:flex flex-row p-1 md:p-3 lg:p-10 w-full  h-[92dvh] gap-5 ">
        <FChatLeftCard
          onOpen={onOpen}
          selected={selected}
          setSelected={setSelected}
        />
        <FChatRightCard />
      </div>
      <div className="flex sm:hidden h-[90dvh]">
        <MobileChat />{" "}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2>Új {selected === "person" ? "beszélgetés" : "csoport"}</h2>
                {selected === "group" && (
                  <p>Adja meg a csoport nevét és tagjait</p>
                )}
              </ModalHeader>
              <ModalBody>
                {selected === "person" && <UserSearch />}
                {selected === "group" && (
                  <>
                    <Input label="Csoport neve" placeholder="Csoport neve" />
                    <Input label="Tagok" placeholder="Felhasználók" />
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Mégse
                </Button>
                <Button color="primary" onPress={onClose}>
                  Létrehozás
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Messages;
