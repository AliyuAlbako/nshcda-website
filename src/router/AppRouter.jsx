import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import ThematicAreas from "../pages/ThematicAreas";
import Programs from "../pages/Programs";
import Dashboard from "../pages/Dashboard";
import NewsMedia from "../pages/NewsMedia";
import Reports from "../pages/Reports";
import Partnerships from "../pages/Partnerships";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import HumanCapitalMap from "../pages/HumanCapitalMap";
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="thematic-areas" element={<ThematicAreas />} />
          <Route path="programs" element={<Programs />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="news-media" element={<NewsMedia />} />
          <Route path="reports" element={<Reports />} />
          <Route path="partnerships" element={<Partnerships />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="human-capital-map" element={<HumanCapitalMap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;