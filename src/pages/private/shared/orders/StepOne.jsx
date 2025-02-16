import PropTypes from "prop-types";
import CustomButton from "@/components/CustomButton";
import Input from "@/components/Input";
import { useOrdersStore } from "@/lib/PageStore";
import { Trash2 } from "lucide-react";
import { Plus } from "lucide-react";
import ItemBox from "./ItemBox";
import { useApp } from "@/lib/AppStore";

const StepOne = ({ setCurrentPage }) => {
  const { orderData, updateField, addOrderItem, removeOrderItems } =
    useOrdersStore((state) => state);
  const { setAlert } = useApp((state) => state);

  const moveToPayment = (e) => {
    e.preventDefault();

    if (!orderData?.seatNumber) {
      setAlert({ message: "Seat Number is required", type: "warning" });
      return;
    }

    if (orderData?.items.length === 0) {
      setAlert({ message: "Please add at least one item", type: "warning" });
      return;
    }

    for (let orderItem of Object.values(orderData.items)) {
      for (let itemValue of Object.values(orderItem)) {
        if (!itemValue) {
          setAlert({ message: "Missing Item Values", type: "warning" });
          return;
        }
      }
    }

    setCurrentPage(2);
  };

  return (
    <form className="mt-5 w-full sm:w-[70%] lg:w-1/2" onSubmit={moveToPayment}>
      <Input
        type={"text"}
        label={"Seat Number"}
        value={orderData?.seatNumber}
        onChange={(e) => updateField(e.target.value, "seatNumber")}
        name={"seatNumber"}
        id={"seatNumber"}
      />

      <div className="bg-bg_gray p-5 rounded-[1rem]">
        <div className="flex items-center justify-between text-sm">
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={removeOrderItems}
          >
            <Trash2 size={20} />
            <p>Remove Items</p>
          </div>
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={() => addOrderItem(String(new Date()))}
          >
            <Plus size={20} />
            <p>Add Item</p>
          </div>
        </div>

        <div className="mt-5 p-5 max-h-[50vh] overflow-auto">
          {orderData?.items?.map((item, index) => (
            <ItemBox key={index} item={item} />
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-5 my-5">
        <CustomButton label="Cancel" variant="outlined" onClick={() => {}} />
        <CustomButton type={"submit"} label="Proceed" variant="contained" />
      </div>
    </form>
  );
};

StepOne.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};
export default StepOne;
