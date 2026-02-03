import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";

const AdminLayout = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main className="col-10 bg-dark text-light min-vh-100 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
