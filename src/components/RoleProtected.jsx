import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../lib/AppStore";
import PropTypes from "prop-types";

const RoleProtected = ({ allowedRoles, children }) => {
  const location = useLocation();
  const {
    auth: { user },
  } = useApp((state) => state);

  return (
    <>
      {allowedRoles?.includes(user?.role) ? (
        children
      ) : (
        <Navigate
          to="/unauthorized"
          state={{ from: location.pathname }}
          replace
        />
      )}
    </>
  );
};

RoleProtected.propTypes = {
  allowedRoles: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
};

export default RoleProtected;
