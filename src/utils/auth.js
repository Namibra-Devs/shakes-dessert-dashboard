import axios from "@/api/axios";
const LoginURL = "api/auth/login";

export const AuthenticateUser = async (email, password) => {
  const result = {
    data: null,
    message: "",
  };

  if (!email.trim() || !password) {
    result.message = "Please enter email and password";
    return result;
  }

  try {
    // Uncomment this when making actual API requests
    // const response = await axios.post(LoginURL, { email, password });
    // result.data = response.data;
    // result.message = response.data.message;

    // Mock response (Remove when using actual API)
    result.data = {
      user: {
        _id: "e9e9e9e",
        email: "john@email.com",
        username: "John Doe",
        role: "admin",
      },
      accessToken: "08571-hello-world-80393",
    };
    result.message = "Login Successful";
  } catch (error) {
    if (!error?.response) {
      result.message = "No server response. Please check your connection";
    } else if (error.response.status === 400) {
      result.message = "Please enter a valid Email and Password";
    } else if (error.response.status === 401) {
      result.message =
        "Unauthorized. Please check your credentials and try again";
    } else {
      result.message =
        error.response.data?.message || "An error occurred. Please try again.";
    }
  }

  return result;
};
