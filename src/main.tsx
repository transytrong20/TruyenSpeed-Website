import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/ui/theme-toggle/theme-provider";

const rootElement = document.getElementById("root") as HTMLElement;
if (!rootElement) {
  throw new Error("Failed to find root element");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
