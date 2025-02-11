import CustomButton from "@/components/CustomButton";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmptyImage from "@/assets/images/empty.png";

const Orders = () => {
  const navigate = useNavigate();
  const orders = [];
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
          <p>table</p>
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
