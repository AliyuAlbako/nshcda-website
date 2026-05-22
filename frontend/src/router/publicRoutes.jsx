import {
  Route,
} from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Programs from "../pages/Programs";
import ProgramDetails from "../pages/ProgramDetails";
import Opportunities from "../pages/Opportunities";
import OpportunityDetails from "../pages/OpportunityDetails";
import OpportunityApply from "../pages/OpportunityApply";
import Leadership from "../pages/Leadership";
import EventsPrograms from "../pages/EventsPrograms";
import EventProgramDetails from "../pages/EventProgramDetails";
import HumanCapitalMap from "../pages/HumanCapitalMap";
import Staff from "../pages/Staff"
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

function PublicRoutes() {
  return (
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />

      <Route path="about" element={<About />} />

      <Route path="programs" element={<Programs />} />
      <Route path="programs/:slug" element={<ProgramDetails />} />

      <Route path="events-programs" element={<EventsPrograms />} />
      <Route
        path="events-programs/:id"
        element={<EventProgramDetails />}
      />

      <Route path="opportunities" element={<Opportunities />} />
      <Route path="opportunities/:id" element={<OpportunityDetails />} />
      <Route
        path="opportunities/:id/apply"
        element={<OpportunityApply />}
      />

      <Route path="leadership" element={<Leadership />} />

      <Route path="contact" element={<Contact />} />
      <Route path="human-capital-map" element={<HumanCapitalMap />} />
      <Route path="staff" element={<Staff />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  );
}

export default PublicRoutes;