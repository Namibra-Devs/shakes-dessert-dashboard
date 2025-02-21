import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetchAllItems from "@/hooks/useFetchAllItems";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [dataVersion, setDataVersion] = useState(0); // Trigger updates
  const [modifiedResource, setModifiedResource] = useState(null);

  // Fetch stock data
  const { data: stock, refetch: refetchStock } = useFetchAllItems({
    resourceType: "stock",
    customEndpoint: "/api/stock",
  });

  // Fetch branches data
  const { data: branches, refetch: refetchBranches } = useFetchAllItems({
    resourceType: "branch",
    customEndpoint: "/api/branches",
  });

  // Fetch users data
  const { data: users, refetch: refetchUsers } = useFetchAllItems({
    resourceType: "user",
    customEndpoint: "/api/users",
  });

  // Fetch orders data
  const { data: orders, refetch: refetchOrders } = useFetchAllItems({
    resourceType: "order",
    customEndpoint: "/api/orders",
  });

  const triggerUpdate = (resource) => {
    setModifiedResource(resource);
    setDataVersion((prev) => prev + 1);
  };

  useEffect(() => {
    if (modifiedResource) {
      console.log(
        "Data version:",
        dataVersion,
        "Modified resource:",
        modifiedResource
      );

      switch (modifiedResource) {
        case "stock":
          refetchStock();
          break;
        case "branch":
          refetchBranches();
          break;
        case "user":
          refetchUsers();
          break;
        case "order":
          refetchOrders();
          break;
        default:
          console.warn("Unknown resource:", modifiedResource);
      }
    }
  }, [dataVersion, modifiedResource]);

  const values = {
    stock,
    branches,
    users,
    orders,
    triggerUpdate,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
