import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import { useOrdersStore } from "@/lib/PageStore";
import { Trash2 } from "lucide-react";
import PropTypes from "prop-types";

const ItemBox = ({ item }) => {
  const {
    deleteOrderItem,
    decreaseItemQuantity,
    increaseItemQuantity,
    setOrderItem,
    setOrderItemPrice,
  } = useOrdersStore((state) => state);
  return (
    <div className="bg-white p-3 rounded-[10px] mb-3 relative">
      <div
        className="cursor-pointer bg-danger text-white w-8 h-8 flex items-center justify-center p-2 rounded-full absolute top-0 right-0"
        onClick={() => deleteOrderItem(item?._id)}
      >
        <Trash2 size={15} />
      </div>

      <Dropdown
        label={"Item"}
        options={["Item 1", "Item 2", "Item 3", "Item 4"]}
        item={item?.name}
        setItem={(selectedItem) => setOrderItem(item?._id, selectedItem)}
      />

      <Input
        type={"text"}
        label={"Price(GHC)"}
        value={item?.price}
        onChange={(e) => setOrderItemPrice(item?._id, e.target.value)}
        name={"location"}
        id={"location"}
      />

      <p className="text-[14px] mt-5 mb-3">Quantity</p>
      <div className="w-fit flex items-center space-x-3 bg-bg_gray px-2 py-1 rounded-full">
        <p
          className="w-10 h-10 rounded-full bg-white text-3xl font-semibold flex items-center justify-center cursor-pointer"
          onClick={() => decreaseItemQuantity(item?._id)}
        >
          -
        </p>
        <p className="text-base font-semibold">{item?.quantity}</p>
        <p
          className="w-10 h-10 rounded-full bg-white text-2xl font-semibold flex items-center justify-center cursor-pointer"
          onClick={() => increaseItemQuantity(item?._id)}
        >
          +
        </p>
      </div>
    </div>
  );
};

ItemBox.propTypes = {
  item: PropTypes.object.isRequired,
};
export default ItemBox;
