import { useState } from "react";
import Logo from "../../assets/images/logo.png";
import { LucideEyeClosed, LucideEye } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../lib/AppStore";
import { AuthenticateUser } from "@/utils/auth";

const Login = () => {
  const [inputState, setInputState] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";

  const { setAuth, setAlert } = useApp((state) => state);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, message } = await AuthenticateUser(email, password);
      const user = data?.user;
      const accessToken = data?.accessToken;

      if (!data) {
        setAlert({
          message: message || "An error occurred",
          type: "error",
        });
        return;
      }

      setAlert({
        message: message || "Login Successful",
        type: "success",
      });

      setAuth({ accessToken, user });

      if (user?.role === "admin") {
        navigate(from, { replace: true });
      } else {
        navigate("/dashboard/orders", { replace: true });
      }
    } catch (error) {
      console.log(error);
      setAlert((prev) => ({
        ...prev,
        message: "An unexpected error occurred. Please try again.",
        type: "error",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary_pink/20 to-gray-200">
      <img src={Logo} alt="shakes-dessert" className="w-[10rem] mb-3" />

      <form
        onSubmit={handleLogin}
        className="w-[90%] sm:w-[70%] lg:w-1/3 bg-white rounded-[2rem] relative text-dark p-5 sm:p-10"
      >
        <div className="border-b-2 border-gray-400">
          <label htmlFor="email-address" className="text-[17px]">
            Email
          </label>
          <input
            type="email"
            id="email-address"
            name="email-address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none w-full p-2 text-[17px]"
          />
        </div>

        <div className="mt-10 border-b-2 border-gray-400">
          <label htmlFor="password" className="text-[17px]">
            Password
          </label>
          <div className="flex items-center space-x-5">
            <input
              type={inputState === "text" ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none w-full p-2 text-[17px]"
            />
            <button
              type="button"
              onClick={() =>
                setInputState(inputState === "text" ? "password" : "text")
              }
              className=""
            >
              {inputState === "text" ? <LucideEye /> : <LucideEyeClosed />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`text-black w-full py-3 rounded-md text-center capitalize mt-10 active:scale-105 transition-all duration-300 ${
            loading ? "bg-gray-200 text-black" : "bg-primary_pink text-white"
          }`}
        >
          {loading ? "Logging In ..." : "Login"}
        </button>
      </form>
    </div>
  );
};
export default Login;
