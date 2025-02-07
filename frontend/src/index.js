import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import App from "./App";

// Use createRoot to render the app
const root = createRoot(document.getElementById("root"));
root.render(<App />);
