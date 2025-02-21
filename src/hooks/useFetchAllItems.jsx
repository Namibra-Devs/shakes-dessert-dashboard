import { useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import axios from "@/api/axios";
import { isTokenValid } from "@/utils/validateToken";
import { useApp } from "@/lib/AppStore";

const useFetchAllItems = ({ resourceType, customEndpoint }) => {
  const { accessToken, user } = useApp();
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const endpoints = {
    stock: "/api/stock",
    user: "/api/users",
    branch: "/api/branches",
    order: "/api/orders",
  };

  const endpoint = customEndpoint || `${endpoints[resourceType]}/${user?.id}`;

  const fetchData = useCallback(async () => {
    if (!resourceType || !endpoint) {
      setMessage("Invalid resource type.");
      return;
    }

    if (!isTokenValid(accessToken)) {
      console.warn("Token is invalid or expired. Redirecting to login...");
      setMessage("Session expired. Redirecting to login...");
      setTimeout(() => (window.location.href = "/"), 1500);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setData(response?.data);
      setSuccess(true);
      setMessage("Data fetched successfully.");
    } catch (err) {
      console.error("Error fetching data:", err);
      const status = err?.response?.status;

      if (!err?.response) {
        setMessage("No server response. Check your internet.");
      } else if (status === 401) {
        setMessage("Authorization failed. Please log in again.");
      } else if (status === 404) {
        setMessage("Requested resource not found.");
      } else {
        setMessage(err?.response?.data?.message || "Failed to fetch data.");
      }
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }, [accessToken, endpoint, resourceType]);

  useEffect(() => {
    if (user?.id && accessToken) {
      fetchData();
    }
  }, [user?.id, accessToken, fetchData]);

  return { data, message, success, loading, refetch: fetchData };
};

useFetchAllItems.propTypes = {
  resourceType: PropTypes.string.isRequired,
  customEndpoint: PropTypes.string,
};

export default useFetchAllItems;
