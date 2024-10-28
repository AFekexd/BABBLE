import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Input,
  Link,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useAppDispatch } from "../app/hooks";

import "../styles/Login.css";
import { CustomToast } from "../components/CustomToast";
import { setCredentials } from "../features/auth/authSlice";
const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [trigger, { isLoading }] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: any) => {
    console.log("submit");
    e.preventDefault();

    trigger({ username, password }).then((res) => {
      if (res.data) {
        dispatch(
          setCredentials({
            jwt: res.data.access_token,
            refresh_token: res.data.refresh_token,
            parsedToken: res.data.parsedToken as any,
          })
        );
        CustomToast("Sikeres bejelentkezés", "success");
      } else {
        CustomToast("Sikertelen bejelentkezés", "error");
      }
    });
  };

  //on enter press submit
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <Card className="flex flex-col items-center justify-center gap-2">
        <CardHeader className="flex bg-primary flex-row items-center justify-center gap-2 p-2">
          <Image
            src="/logobabble.png"
            alt="Chatter"
            width={200}
            height={50}
            className="logo"
          />
          <ThemeSwitcher />
        </CardHeader>
        <CardBody className="flex flex-col items-center justify-center gap-2">
          {" "}
          <form
            onSubmit={handleSubmit}
            onKeyPress={handleKeyPress}
            className="flex flex-col items-center gap-2 w-72"
          >
            <Input
              variant="faded"
              size="sm"
              isRequired
              label="Felhasználónév"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <Input
              variant="faded"
              size="sm"
              label="Jelszó"
              isRequired
              type={isPasswordVisible ? "text" : "password"}
              className="flex flex-row items-center justify-center gap-2"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              endContent={
                <div
                  className="focus:outline-none"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <BsEyeSlash className="text-xl text-default-400 pointer-events-none" />
                  ) : (
                    <BsEye className="text-xl text-default-400 pointer-events-none" />
                  )}
                </div>
              }
            />
          </form>
        </CardBody>
        <CardFooter className="flex flex-col items-center justify-center gap-2">
          <Button
            as={Link}
            href="/home"
            type="submit"
            className="w-72"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: 10 }}
          >
            {" "}
            Bejelentkezés{" "}
          </Button>
        </CardFooter>
      </Card>

      <div>
        <p className="text-sm mt-2">
          {" "}
          Még nincs fiókod?{" "}
          <Link href="/register" className="italic ">
            Regisztrálj!
          </Link>
        </p>
      </div>
      <Spinner size="md" className={isLoading ? "pt-3" : "pt-3 invisible"} />
    </div>
  );
};

export default Login;
