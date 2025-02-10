import { useState } from "react";
import Logo from "../../assets/images/logo.png";
import { LucideEyeClosed, LucideEye } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../lib/AppStore";

const Login = () => {
  const [inputState, setInputState] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";

  const { setAuth } = useApp((state) => state);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const user = {
        _id: "e9e9e9e",
        email: "john@email.com",
        username: "John Doe",
        role: "admin",
      };
      const accessToken = "08571-hello-world-80393";
      setAuth({ accessToken, user });

      if (user?.role === "admin") {
        navigate(from, { replace: true });
      } else {
        const from_path = from || "/dashboard/orders";
        navigate(from_path, { replace: true });
      }
    } catch (error) {
      console.log(error);
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
