import { useApp } from "@/lib/AppStore";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { Suspense } from "react";

const CheckRoles = ({ allowedRoles }) => {
  const {
    auth: { user },
  } = useApp((state) => state);

  return allowedRoles.includes(user?.role) ? (
    <Suspense fallback={<LoadingPage />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

CheckRoles.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};
export default CheckRoles;
