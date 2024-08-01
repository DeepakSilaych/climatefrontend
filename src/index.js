import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactGA from "react-ga";
import "./styles.css";

// import App from "./App_maintain";
import App from "./App";


const TRACKING_ID = "G-76SVHYWKZX";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

ReactGA.initialize(TRACKING_ID);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
