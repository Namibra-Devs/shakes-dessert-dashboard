import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useApp } from "../lib/AppStore";
import PropTypes from "prop-types";

const RoleProtected = ({ allowedRoles }) => {
  const location = useLocation();
  const {
    auth: { user },
  } = useApp((state) => state);

  return user?.role.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />
  ) : (
    <Navigate to="/" state={{ from: location.pathname }} replace />
  );
};

RoleProtected.propTypes = {
  // children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.array.isRequired,
};

export default RoleProtected;
