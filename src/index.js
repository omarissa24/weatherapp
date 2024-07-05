import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TempProvider } from "./contexts/tempContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TempProvider>
      <App />
    </TempProvider>
  </React.StrictMode>
);
