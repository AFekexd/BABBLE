import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./Pages/RequireAuth";
import { Suspense, lazy } from "react";
import { Spinner } from "@nextui-org/react";

const homePage = lazy(() => import("./Pages/Home"));
const messagesPage = lazy(() => import("./Pages/Messages"));
const forumPage = lazy(() => import("./Pages/Forum"));
const forumContentPage = lazy(() => import("./components/Forum/ForumContent"));
const adminPage = lazy(() => import("./Pages/Admin"));
const registerPage = lazy(() => import("./Pages/Register"));
const notfoundPage = lazy(() => import("./Pages/Notfound"));

const Pages = () => {
  const lazyElement = (
    Component: React.LazyExoticComponent<() => JSX.Element>
  ) => {
    return (
      <Suspense
        fallback={
          <div className="loading flex justify-center items-center h-screen">
            <Spinner size="lg" />
          </div>
        }
      >
        <Component />
      </Suspense>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RequireAuth roles={["MUNKALAP_CREATE"]} />}>
          <Route index path="/" element={lazyElement(homePage)}></Route>
          <Route index path="/chat" element={lazyElement(messagesPage)}></Route>
          <Route index path="/forum" element={lazyElement(forumPage)}></Route>

          <Route path="*" element={lazyElement(notfoundPage)}></Route>
          <Route
            path="/forum/:forumId"
            element={lazyElement(forumContentPage)}
          ></Route>
          {true && (
            <Route path="/admin" element={lazyElement(adminPage)}></Route>
          )}
          <Route path="*" element={lazyElement(notfoundPage)}></Route>
        </Route>
        <Route path="/register" element={lazyElement(registerPage)}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
