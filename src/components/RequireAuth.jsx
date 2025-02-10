import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useApp } from "../lib/AppStore";
// import { Sidebar as SidebarIcon } from "lucide-react";

const RequireAuth = () => {
  const {
    auth: { user },
  } = useApp((state) => state);

  const location = useLocation();

  return user ? (
    <div className="flex">
      <p className="flex-[1]">Sidebar</p>
      <main className="flex-[4] bg-white py-5 px-2 sm:px-5 h-fit sm:h-screen">
        {/* <SidebarIcon className="lg:hidden block" onClick={openSidebar} /> */}
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/" state={{ from: location.pathname }} replace />
  );
};
export default RequireAuth;
