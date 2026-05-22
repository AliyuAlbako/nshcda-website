import { BrowserRouter, Routes } from "react-router-dom";

import PublicRoutes from "./publicRoutes";
import AdminRoutes from "./adminRoutes";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {PublicRoutes()}
        {AdminRoutes()}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;