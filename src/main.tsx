import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "maplibre-gl/dist/maplibre-gl.css";
import "./components/charts/chartConfig";
import "./styles/globals.css";
import "./styles/layout.css";
import "./styles/scrolly.css";
import "./styles/profiles.css";

if (typeof window !== "undefined") {
  const win = window as typeof window & { browser?: unknown };
  if (!win.browser && typeof (window as typeof window & { chrome?: unknown }).chrome !== "undefined") {
    win.browser = (window as typeof window & { chrome?: unknown }).chrome;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
