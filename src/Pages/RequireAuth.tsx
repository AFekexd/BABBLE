//@ts-nocheck
//TODO: REMOVE NO CHECK FOR FINAL BUILD
import Forbidden from "./Forbidden";
import { useEffect, useState } from "react";
import Login from "./Login";
import { NavigateOptions, Outlet, Router, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DecodeToken } from "../features/jwt";
import Navigation from "../components/Navigation/Navigation";

type Props = {
  roles: string[];
};

const RequireAuth: React.FunctionComponent<Props> = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const jwt = useSelector((state) => state.user.jwt);
  const refreshToken = useSelector((state) => state.user.refresh_token);
  const router = Router;
  const navigate: (to: To, options?: NavigateOptions) => void = useNavigate();
  useEffect(() => {
    if (jwt) {
      const token = DecodeToken(jwt);
      const refresh = DecodeToken(refreshToken);
      console.log(token);
      console.log(refresh);
      if (token.exp < Date.now() / 1000) {
        setIsLogged(false);
        navigate("/");
      } else {
        setIsLogged(true);
      }
    } else {
      setIsLogged(false);
      navigate("/");
    }
  }, [jwt]);

  return !isLogged ? (
    <Login />
  ) : !props.roles.includes("ADMIN") ? (
    <div className="flex flex-col h-screen gap-4">
      <Navigation />
      <Outlet />
    </div>
  ) : (
    <Forbidden />
  );
};

export default RequireAuth;
