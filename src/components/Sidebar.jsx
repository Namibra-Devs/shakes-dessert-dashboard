import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import {
  LayoutDashboard,
  ShoppingCart,
  Building2,
  Users,
  User2,
  SidebarIcon,
} from "lucide-react";
import { useState } from "react";
import { useApp } from "../lib/AppStore";
import { ArrowDown } from "lucide-react";
import { LogOut } from "lucide-react";
import { Store } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname || "dashboard");

  const {
    auth: { user },
    sidebar,
    closeSidebar,
  } = useApp();

  const navigation_links = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "Orders",
      icon: <ShoppingCart size={20} />,
      path: "/dashboard/orders",
    },
    {
      name: "Branch Management",
      icon: <Building2 size={20} />,
      path: "/dashboard/manage/branches",
    },
    {
      name: "User Management",
      icon: <Users size={20} />,
      path: "/dashboard/manage/users",
    },
    {
      name: "Stock Management",
      icon: <Store size={20} />,
      path: "/dashboard/manage/stock",
    },
  ];

  return (
    <div
      className={`bg-bg_gray w-[80%] h-screen lg:h-[97vh] sm:w-[40%] lg:w-[20%] fixed top-0 z-10 lg:relative flex flex-col items-center px-4 py-3 transition-all duration-500 lg:left-0 ${
        sidebar ? "left-0 shadow-md" : "-left-full"
      }`}
    >
      <SidebarIcon
        onClick={closeSidebar}
        className="absolute top-5 right-5 cursor-pointer"
      />

      <img src={Logo} alt="" width={100} />

      <div className="flex justify-between flex-col items-center w-full h-full pt-3">
        {/* nav buttons */}
        <ul className="w-full">
          {navigation_links.map((item) => (
            <li
              key={item.name}
              onClick={() => {
                setActive(item.path);
                navigate(item.path);
                closeSidebar();
              }}
              className={`px-5 py-3 rounded-[1rem] border-[2px] text-dark hover:bg-white hover:border-gray-200 cursor-pointer flex space-x-2 items-center my-3 ${
                active === item.path
                  ? "bg-white border-gray-200"
                  : "bg-transparent border-transparent"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>

        {/* auth buttons */}
        <ul className="w-full">
          <li className="text-dark px-5 py-3 rounded-[1rem] flex items-center justify-between mt-3 cursor-pointer">
            <div className="flex space-x-2 items-center">
              <User2 size={20} />
              <span className="capitalize">{user?.role}</span>
            </div>
            <ArrowDown size={20} />
          </li>
          <li className="text-danger px-5 py-3 rounded-[1rem] flex items-center space-x-2 mt-3 cursor-pointer">
            <LogOut size={20} />
            <span className="capitalize">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
