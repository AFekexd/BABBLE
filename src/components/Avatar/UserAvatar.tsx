import { Avatar } from "@nextui-org/react";
import { useLazyGetUserImageQuery } from "../../features/user/userApiSlice";
import { useEffect, useState } from "react";

const UserAvatar = ({
  userID,
  size,
  className,
}: {
  userID: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  const [pfpTrigger] = useLazyGetUserImageQuery();

  const [pfp, setPfp] = useState("");

  useEffect(() => {
    if (userID) {
      pfpTrigger(userID).then((res) => {
        if (res.data) {
          setPfp(res.data.pfp);
        }
      });
    }
  }, [userID, pfpTrigger]);

  return (
    <Avatar
      size={size}
      src={pfp}
      showFallback
      className={
        className
          ? className
          : "md:min-w-20 md:min-h-20 min-w-12 min-h-12 w-12 h-12"
      }
    />
  );
};

export default UserAvatar;
