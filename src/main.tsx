import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../node_modules/tw-animate-css/dist/tw-animate.css";
import App from "./App.tsx";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
