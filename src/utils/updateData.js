import axios from "@/api/axios";
import { isTokenValid } from "./validateToken";

export const updateData = async (page, itemId, data, accessToken) => {
  const result = {
    message: "",
    data: null,
    success: false,
  };

  const endpoints = {
    stock: "/api/...",
    user: "/api/users/...",
    branch: "/api/branches/...",
    order: "/api/orders/...",
  };

  const endpoint = endpoints[page];

  if (!page || !itemId || !data || !accessToken) {
    result.message = "Missing function parameters";
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
    const response = await axios.put(`${endpoint}/${itemId}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    result.data = response?.data;
    result.success = true;
    result.message = response?.data?.message || `${page} updated successfully`;
  } catch (error) {
    if (!error?.response) {
      result.message = "No server response. Check your internet connection.";
    } else if (error.response.status === 400) {
      result.message = "Invalid input. Please check your data and try again.";
    } else if (error.response.status === 401) {
      result.message = "Session expired. Please log in again.";
    } else if (error.response.status === 404) {
      result.message = "Requested item not found. Please verify and try again.";
    } else {
      result.message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      console.error("Error:", error);
    }
  }

  return result;
};
