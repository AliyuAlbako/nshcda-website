import { Route } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";

import ProtectedAdminRoute from "../components/admin/ProtectedAdminRoute";

import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminApplications from "../pages/admin/AdminApplications";
import AdminOpportunities from "../pages/admin/AdminOpportunities";
import AdminMedia from "../pages/admin/AdminMedia";

function AdminRoutes() {
  return (
    <>
      <Route path="admin/login" element={<AdminLogin />} />

      <Route element={<ProtectedAdminRoute />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="opportunities" element={<AdminOpportunities />} />
          <Route path="media" element={<AdminMedia />} />
        </Route>
      </Route>
    </>
  );
}

export default AdminRoutes;