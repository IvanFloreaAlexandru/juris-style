import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { LanguageProvider } from "./contexts/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
