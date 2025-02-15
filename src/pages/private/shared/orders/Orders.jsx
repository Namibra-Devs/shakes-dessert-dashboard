import CustomButton from "@/components/CustomButton";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmptyImage from "@/assets/images/empty.png";
import OrderCard from "./OrderCard";
import { useState } from "react";
import { useOrdersStore } from "@/lib/PageStore";
import { useEffect } from "react";

const Orders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const { orders } = useOrdersStore((state) => state);
  const [filteredOrders, setFilteredOrders] = useState();

  let pendingCount = 0;
  let in_progressCount = 0;
  let readyCount = 0;
  let completedCount = 0;

  orders?.forEach((order) => {
    switch (order?.status) {
      case "pending":
        pendingCount += 1;
        break;
      case "in_progress":
        in_progressCount += 1;
        break;
      case "ready":
        readyCount += 1;
        break;
      case "completed":
        completedCount += 1;
        break;
    }
  });

  const tabItems = [
    { id: "all", tabName: "All", count: orders?.length },
    {
      id: "pending",
      tabName: "Pending",
      count: pendingCount,
    },
    {
      id: "in_progress",
      tabName: "In Progress",
      count: in_progressCount,
    },
    {
      id: "ready",
      tabName: "Ready For Pickup",
      count: readyCount,
    },
    {
      id: "completed",
      tabName: "Completed",
      count: completedCount,
    },
  ];

  useEffect(() => {
    if (!orders || !activeTab) return;

    if (activeTab === "all") {
      setFilteredOrders(orders);
    } else {
      const newList = orders.filter(
        (order) => order?.status.toLowerCase() === activeTab
      );
      // : staffData.filter((item) => !roles.includes(item.role.toLowerCase()));
      setFilteredOrders(newList);
    }
  }, [activeTab, orders, setFilteredOrders]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="page_header">Orders</h3>
        <CustomButton
          label="Add Order"
          variant="contained"
          icon={<Plus size={20} />}
          onClick={() => navigate("/dashboard/manage/orders/create")}
        />
      </div>

      {orders &&
        (orders.length > 0 ? (
          <>
            <ul className="flex flex-wrap items-center mt-5 bg-gray-200 w-fit p-1 rounded-[10px]">
              {tabItems.map((item, index) => (
                <li
                  key={index}
                  role="tab"
                  aria-selected={activeTab === item.id}
                  onClick={() => activeTab !== item.id && setActiveTab(item.id)}
                  className={`${
                    activeTab === item.id ? "bg-white" : "bg-transparent"
                  } w-fit p-2 rounded-[10px] text-[13px] flex items-center space-x-1 cursor-pointer`}
                >
                  <span className="capitalize">{item.tabName}</span>
                  <small
                    className={`w-8 h-5 rounded-full bg-primary_pink text-white flex items-center justify-center`}
                  >
                    {item.count < 99 ? item.count : "99+"}
                  </small>
                </li>
              ))}
            </ul>

            <div className="orders_container mt-3 px-5 sm:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 h-[80vh] overflow-auto">
              {filteredOrders?.map((orderItem) => (
                <OrderCard key={orderItem?._id} orderItem={orderItem} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-col h-[70vh] gap-5">
            <img src={EmptyImage} alt="" />
            <p className="w-full sm:w-[50%] text-center text-dark">
              No orders placed yet! Once you create or receive orders from
              customers they will appear here for tracking and updates.
            </p>
            <CustomButton
              label="Add Order"
              variant="contained"
              icon={<Plus size={20} />}
              onClick={() => navigate("/dashboard/manage/orders/create")}
            />
          </div>
        ))}
    </>
  );
};

export default Orders;
