//@ts-nocheck

import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import SearchSelect from "../Search/SearchSelect";
import { useCreateThreadMutation } from "../../features/forum/mainForumApiSlice";
import { useEffect, useState } from "react";
import { DecodeToken } from "../../features/jwt";
import { useSelector } from "react-redux";
import CustomEditor from "../Editor/CustomEditor";
import { CustomToast } from "../CustomToast";

const ForumModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
}) => {
  const [trigger] = useCreateThreadMutation();
  const jwt = useSelector((state: any) => state.user.jwt);
  const decoded = DecodeToken(jwt);

  const [Thread, setThread] = useState<{
    title: string;
    tags: string[];
    userID: string;
  }>({
    title: "",
    tags: ["123"],
    userID: "",
  });

  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  useEffect(() => {
    if (tags) {
      console.log(tags);
      setThread({ ...Thread, tags: tags });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 bg-primary">
              <h1 className="text-white text-xl">Új Fórum Poszt</h1>
              <p className="text-white text-sm">
                Kérjük töltsd ki az alábbi mezőket.
              </p>
            </ModalHeader>
            <ModalBody>
              <Input
                label="Cím"
                value={Thread.title}
                onChange={(e) =>
                  setThread({ ...Thread, title: e.target.value })
                }
              />
              <SearchSelect setTags={setTags} />
              <Divider />
              <div className="h-96 w-full bg-white rounded-lg overflow-y-auto mt-4 mb-4">
                <CustomEditor content={content} setContent={setContent} />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Bezárás
              </Button>
              <Button
                color="primary"
                variant="solid"
                onPress={() => {
                  if (Thread.title === "" || content === "") {
                    CustomToast("Minden mezőt ki kell tölteni!", "error");
                    return;
                  }
                  trigger({
                    title: Thread.title,
                    tags: Thread.tags,
                    userID: decoded.sub,
                    content: content,
                  }).then((res) => {
                    if (res.error) {
                      CustomToast("Hiba történt a mentés során", "error");
                      console.log(res.error);
                    } else {
                      CustomToast(
                        "Sikeresen létrehoztad a fórum posztot",
                        "success"
                      );

                      console.log(res.data);
                    }

                    onClose();
                  });
                }}
              >
                Mentés
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ForumModal;
