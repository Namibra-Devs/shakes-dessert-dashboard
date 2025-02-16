import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { useOrdersStore } from "@/lib/PageStore";
import { useApp } from "@/lib/AppStore";

const CreateOrder = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { orderData, clearOrder } = useOrdersStore((state) => state);
  const { setAlert } = useApp((state) => state);

  const makeOrder = async () => {
    if (orderData?.items.length === 0) {
      setAlert({
        message: "There are no items in your order. Please add some",
        type: "warning",
      });
      return;
    }

    try {
      console.log(orderData);
      setAlert({ message: "Your Order was created", type: "success" });
    } catch (error) {
      console.log(error);
      setAlert({
        message: "Couldn't create your order. Please try again",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="flex items-center space-x-5">
        <ChevronLeft
          className="bg-white w-5 h-5 border-[2px] border-dark rounded-md cursor-pointer"
          onClick={() => {
            clearOrder();
            window.history.back();
          }}
        />
        <div>
          <h3 className="page_header">Order Management</h3>
          <p className="text-[13px] text-gray-500 flex items-center space-x-2">
            <span>Order Management</span>
            <ChevronRight size={20} />
            <span className="text-primary_pink">Add Order</span>
          </p>
        </div>
      </div>

      <div className="mt-5">
        {currentPage === 1 ? (
          <StepOne setCurrentPage={setCurrentPage} />
        ) : currentPage === 2 ? (
          <StepTwo setCurrentPage={setCurrentPage} />
        ) : (
          <StepThree setCurrentPage={setCurrentPage} makeOrder={makeOrder} />
        )}
      </div>
    </>
  );
};
export default CreateOrder;
