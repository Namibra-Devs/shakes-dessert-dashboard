import axios from "@/api/axios";
import { isTokenValid } from "./validateToken";

export const handleDelete = async (accessToken, page, itemId) => {
  const result = {
    data: null,
    message: "",
    success: false,
  };

  const endpoints = {
    stock: "/api/...",
    staff: "/api/staff/...",
    branch: "/api/branches/...",
    order: "/api/orders/...",
  };

  const endpoint = endpoints[page];

  if (!page || !accessToken || !itemId) {
    result.message = "Missing required parameter(s).";
    return result;
  }

  if (!endpoint) {
    result.message = `Invalid page: ${page}`;
    return result;
  }

  // Validate token
  if (!isTokenValid(accessToken)) {
    console.warn("Token is invalid or expired. Redirecting to login...");
    result.message = "Token expired. Redirecting to login...";
    // replace with logout function later
    setTimeout(() => (window.location.href = "/"), 1500);
    return result;
  }

  try {
    const response = await axios.delete(`${endpoint}/${itemId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    result.data = response.data;
    result.success = true;
    result.message = response?.data?.message || `${page} deleted successfully`;
  } catch (error) {
    console.error("Error during deletion:", error);
    const status = error?.response?.status;
    if (!error?.response) {
      result.message = "No server response. Check your connection.";
    } else if (status === 400) {
      result.message = "Invalid request. Please check the data.";
    } else if (status === 401) {
      result.message = "Authorization failed. Please log in again.";
    } else if (status === 404) {
      result.message = `${page} not found. It may have been deleted already.`;
    } else {
      result.message =
        error.response?.data?.message || `Failed to delete ${page}. Try again.`;
    }
  }

  return result;
};
