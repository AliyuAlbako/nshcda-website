
import { Route } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";
import ProtectedAdminRoute from "../components/admin/ProtectedAdminRoute";

import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminApplications from "../pages/admin/AdminApplications";
import AdminOpportunities from "../pages/admin/AdminOpportunities";
import AdminOpportunityForm from "../pages/admin/AdminOpportunityForm";
import AdminMedia from "../pages/admin/AdminMedia";
import AdminEmploymentProfiles from "../pages/admin/AdminEmploymentProfiles";
import AdminCVRequests from "../pages/admin/AdminCVRequests";
import AdminPublications from "../pages/admin/AdminPublications";
import AdminNewsHighlights from "../pages/admin/AdminNewsHighlights";
import NotFound from "../pages/NotFound";

function AdminRoutes() {
  return (
    <>
      {/* Public Admin Login */}
      <Route
        path="admin/login"
        element={<AdminLogin />}
      />

      {/* Protected Admin Area */}
      <Route element={<ProtectedAdminRoute />}>
        <Route
          path="admin"
          element={<AdminLayout />}
        >
          {/* Default Admin Landing Page */}
          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />
          <Route
            path="employment-profiles"
            element={<AdminEmploymentProfiles />}
          />
                  <Route
          path="cv-requests"
          element={<AdminCVRequests />}
        />

          

          <Route
            path="applications"
            element={<AdminApplications />}
          />

          <Route
            path="opportunities"
            element={<AdminOpportunities />}
          />

          <Route path="news-highlights" element={<AdminNewsHighlights />}/>
          <Route
           path="opportunities/new"
           element={<AdminOpportunityForm />}
            />

            <Route
              path="opportunities/:id/edit"
              element={<AdminOpportunityForm />}
            />

            <Route
          path="publications"
        element={<AdminPublications />}
          />

          <Route
            path="media"
            element={<AdminMedia />}
          />

          {/* Future Admin Modules */}
          {/* 
          <Route path="programs" element={<AdminPrograms />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="leadership" element={<AdminLeadership />} />
          <Route path="partners" element={<AdminPartners />} />
          */}

          {/* Admin 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Route>
    </>
  );
}

export default AdminRoutes;

