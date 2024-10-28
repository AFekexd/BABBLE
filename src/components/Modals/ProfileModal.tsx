//@ts-nocheck
//TODO: REMOVE NO CHECK FOR FINAL BUILD
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Card,
  Button,
  Image,
  ButtonGroup,
  Avatar,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { User } from "../../types/User";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useUploadUserImageMutation } from "../../features/user/userApiSlice";
const ProfileModal = ({ pfp, refetchPfp, isOpen, onOpenChange }) => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({} as User);

  const [image, setImage] = useState("");
  const [croppedImage, setCroppedImage] = useState();
  const cropperRef = useRef<ReactCropperElement>(null);
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;

    setCroppedImage(cropper.url);
  };

  const [trigger] = useUploadUserImageMutation();

  useEffect(() => {
    console.log(image);
  }, [image]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      size="lg"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 bg-primary">
              Profil megtekintése
            </ModalHeader>
            <ModalBody>
              {!pfp && image == "" && (
                <label
                  htmlFor="pfp-upload"
                  className="cursor-pointer translate-y-5 flex justify-center"
                >
                  <Avatar
                    style={{ height: 400, width: "100%" }}
                    isZoomed
                    src={pfp}
                    isBlurred
                  />
                </label>
              )}
              {pfp && image == "" && (
                <label
                  htmlFor="pfp-upload"
                  className="cursor-pointer translate-y-5 flex justify-center"
                >
                  <Image
                    style={{ height: 400, width: "100%" }}
                    isZoomed
                    src={pfp}
                    isBlurred
                  />
                </label>
              )}
              <input
                id="pfp-upload"
                className="invisible"
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();

                  reader.onload = () => setImage(reader.result as string);

                  reader.readAsDataURL(file);
                }}
              ></input>
              {image && (
                <>
                  <Cropper
                    src={image}
                    style={{ height: 400, width: "100%" }}
                    background={false}
                    zoomable={true}
                    guides={true}
                    viewMode={1}
                    aspectRatio={1}
                    ref={cropperRef}
                    crop={onCrop}
                    scalable={false}
                    cropBoxResizable={false}
                    cropBoxMovable={true}
                    dragMode="move"
                  />
                  <ButtonGroup>
                    <Button
                      onClick={() => {
                        const cropper = cropperRef.current?.cropper;
                        console.log(cropper.getCroppedCanvas().toDataURL());
                        trigger({
                          image: cropper.getCroppedCanvas().toDataURL(),
                        }).then(() => {
                          setImage("");
                          refetchPfp();
                        });
                      }}
                    >
                      Crop
                    </Button>
                    <Button
                      onClick={() => {
                        setImage("");
                      }}
                    >
                      Mégse
                    </Button>
                  </ButtonGroup>
                </>
              )}
              {editMode ? (
                <>
                  <Input
                    label="Név"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                  <Input
                    label="Email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </>
              ) : (
                <>
                  <div className="flex-col gap-2 hidden">
                    <Card></Card>
                    <Card>
                      <p>Név: {user.name}</p>
                      <p>Email: {user.email}</p>
                    </Card>
                  </div>
                </>
              )}
              <button onClick={() => setEditMode(!editMode)} className="hidden">
                {editMode ? "Mentés" : "Szerkesztés"}
              </button>
            </ModalBody>
            <ModalFooter>
              <Button
                fullWidth
                color="danger"
                onClick={() => {
                  onClose();
                }}
              >
                Bezárás
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
