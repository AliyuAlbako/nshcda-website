import { BrowserRouter, Routes } from "react-router-dom";

import PublicRoutes from "./publicRoutes";
import AdminRoutes from "./adminRoutes";

import ScrollToTop from "../components/ScrollToTop";

function AppRouter() {
  return (
    <BrowserRouter>

      <ScrollToTop />

      <Routes>
        {PublicRoutes()}
        {AdminRoutes()}
      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;