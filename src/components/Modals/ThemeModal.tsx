//@ts-nocheck
//TODO: REMOVE NO CHECK FOR FINAL BUILD
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import "./theme.css";
import ThemeSelector from "../ThemeSwitcher/ThemeSwitcher";

const ThemeModal = ({ isOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 bg-primary">
              Profil megtekintése
            </ModalHeader>
            <ModalBody>
              <div className="flex justify-center gap-3">
                <ThemeSelector />
              </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ThemeModal;
