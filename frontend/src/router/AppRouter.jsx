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
import Gallery from "../pages/Gallery";
import Leadership from "../pages/Leadership";
import Opportunities from "../pages/Opportunities";
import OpportunityDetails from "../pages/OpportunityDetails";
import OpportunityApply from "../pages/OpportunityApply";
import Staff from "../pages/Staff";
import EventsPrograms from "../pages/EventsPrograms";



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
           <Route path="human-capital-map" element={<HumanCapitalMap />} />
           <Route path="opportunities" element={<Opportunities />} />
           <Route path="opportunities/:id" element={<OpportunityDetails />} />
          <Route path="opportunities/:id/apply" element={<OpportunityApply />} />
          <Route path="gallery" element={<Gallery />} />
           <Route path="leadership" element={<Leadership />} />
          <Route path="news-media" element={<NewsMedia />} />
          <Route path="reports" element={<Reports />} />
          <Route path="partnerships" element={<Partnerships />} />
          <Route path="/events-programs" element={<EventsPrograms />} />
          <Route path="staff" element={<Staff />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
         
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;