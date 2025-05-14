import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/authContext";
import BarCode from "./components/barCode/barCode";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BarCode />
    </AuthProvider>
  </React.StrictMode>,
);
