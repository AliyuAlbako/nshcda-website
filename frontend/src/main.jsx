import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/global.css";
import "./assets/styles/navbar.css";
import "./assets/styles/hero.css";
import "./assets/styles/about.css";
import "./assets/styles/programs.css";
import "./assets/styles/leadership.css";
import "./assets/styles/media.css";
import "./assets/styles/opportunities.css";
import "./assets/styles/admin.css";
import "./assets/styles/marketplace.css";
import "./assets/styles/staff.css";
import "./assets/styles/footer.css";
import "./assets/styles/dashboard.css";
import "./assets/styles/partners.css";
import "./assets/styles/news.css";
import "./assets/styles/map.css";
import "leaflet/dist/leaflet.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);