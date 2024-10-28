import { NextUIProvider, Spinner } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="azure-dark">
            <App />
          </NextThemesProvider>
        </NextUIProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
