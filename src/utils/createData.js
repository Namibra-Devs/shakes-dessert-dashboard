import axios from "@/api/axios";
import { isTokenValid } from "./validateToken";

export const createData = async (page, data, accessToken) => {
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

  // Validate input parameters
  if (!page || !data || !accessToken) {
    result.message = "Missing function parameters";
    return result;
  }

  const endpoint = endpoints[page];

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
    const response = await axios.post(endpoint, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    result.data = response.data;
    result.message = response?.data?.message || `${page} created successfully`;
  } catch (error) {
    const status = error?.response?.status;
    if (!error?.response) {
      result.message = "No response from server. Check your internet.";
    } else if (status === 400) {
      result.message = "Invalid input. Please check your details.";
    } else if (status === 401) {
      result.message = "Session expired. Please log in again.";
    } else {
      result.message =
        error.response?.data?.message || `Failed to create ${page}. Try again.`;
      console.error("Error:", error);
    }
  }
  return result;
};
