import { useApp } from "@/lib/AppStore";
import InfoCard from "./InfoCard";
import { Users, Salad, Building2 } from "lucide-react";
import { Utensils } from "lucide-react";
import { Pizza } from "lucide-react";
import { CupSoda } from "lucide-react";

const Dashboard = () => {
  const info_details = [
    {
      title: "Products",
      tag: "products",
      count: 35,
      icon: <Salad size={20} />,
    },
    {
      title: "Branches",
      tag: "branches",
      count: 7,
      icon: <Building2 size={20} />,
    },
    {
      title: "Active Staff",
      tag: "active_staff",
      count: 20,
      icon: <Users size={20} />,
    },
    {
      title: "Inactive Staff",
      tag: "inactive_staff",
      count: 3,
      icon: <Users size={20} />,
    },
    {
      title: "Items Added",
      tag: "items",
      count: 1700,
      icon: <Utensils size={20} />,
    },
    {
      title: "Snacks",
      tag: "snacks",
      count: 690,
      icon: <Pizza size={20} />,
    },
    {
      title: "Drinks",
      tag: "drinks",
      count: 400,
      icon: <CupSoda size={20} />,
    },
  ];

  const {
    auth: { user },
  } = useApp((state) => state);

  return (
    <>
      <h3 className="font-[600] sm:font-[400] text-[20px] sm:text-[25px] capitalize text-dark">
        Hello, {user?.role}
      </h3>
      <p className="text-base text-gray-600">
        Here&apos;s an overview of your dashboard
      </p>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {info_details.slice(0, 4).map((info) => (
          <InfoCard key={info.tag} info={info} />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-5 mt-10">
        <div className="flex-[3] shadow-md rounded-[1rem] p-3">Graph</div>
        <div className="flex-[1] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3">
          {info_details.slice(4).map((info) => (
            <InfoCard key={info.tag} info={info} />
          ))}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
