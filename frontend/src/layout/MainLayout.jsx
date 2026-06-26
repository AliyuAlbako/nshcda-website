import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PartnersStrip from "../components/PartnersStrip";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <PartnersStrip />
      <Footer />
    </>
  );
}

export default MainLayout;