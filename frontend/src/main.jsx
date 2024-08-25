import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import { NewsProvider } from "./context/NewsContex.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <NewsProvider>
        <App />
      </NewsProvider>
    </Provider>
  </StrictMode>
);
