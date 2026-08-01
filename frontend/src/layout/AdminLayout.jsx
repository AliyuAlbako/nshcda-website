import { Outlet } from "react-router-dom";
import { useState } from "react";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

function AdminLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (

    <div className="admin-layout">

      <AdminSidebar
        sidebarOpen={sidebarOpen}
      />

      <div className="admin-content">

        <AdminNavbar
          onToggleSidebar={() =>
            setSidebarOpen(!sidebarOpen)
          }
        />

        <main className="admin-main">

          <Outlet />

        </main>

      </div>

    </div>

  );

}

export default AdminLayout;