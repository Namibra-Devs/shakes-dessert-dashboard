import { getDateTime } from "@/lib/getDateTime";
import { EllipsisVertical } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

const OptionsDropDown = ({ isOpen, setIsOpen, orderItem }) => {
  //   const { viewItem, setCurrentItem, triggerUpdate, setAlert } = useAppContext();

  //   const onViewClick = (item) => {
  //     viewItem("Order");
  //     setCurrentItem(item);
  //   };

  //   const toMappings = {
  //     pending: "onprogress",
  //     onprogress: "completed",
  //   };

  //   const handleUpdate = async () => {};

  return (
    <div className="relative inline-block text-left">
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10"
          role="menu"
        >
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            // onClick={() => onViewClick(order)}
            onClick={() => {
              console.log(orderItem);
              setIsOpen(false);
            }}
          >
            View More
          </button>
          {!["in_progress", "ready"].includes(orderItem?.status) && (
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {orderItem?.status === "pending"
                ? "Send To Kitchen"
                : "Delivered"}
            </button>
          )}
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
            role="menuitem"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

OptionsDropDown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  orderItem: PropTypes.object.isRequired,
};

const OrderCard = ({ orderItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { date, time } = getDateTime(orderItem?.date, true);

  const colorMapping = {
    pending: "bg-[#FFF2D9]",
    in_progress: "bg-[#D9F5FF]",
    ready: "bg-[#E0F8E0]",
    completed: "bg-[#ECECEC]",
  };

  const nameMappings = {
    pending: "Pending",
    in_progress: "In Progress",
    ready: "Ready for pickup",
    completed: "Completed",
  };

  const nameColorMapping = {
    Customer: "bg-[#FEEFFB] text-[#57234B]",
    Staff: "bg-[#EDF4FC] text-[#1A324F]",
  };

  return (
    <div className="bg-bg_gray p-3 rounded-[1rem] text-dark relative h-fit">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">OrderID: {orderItem?._id}</p>
        <div>
          <small
            className={`capitalize px-2 py-1 rounded-[1rem] ${
              colorMapping[orderItem?.status]
            }`}
          >
            {nameMappings[orderItem?.status]}
          </small>
        </div>

        <EllipsisVertical
          size={15}
          className="cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        />

        <div className="absolute top-2 right-0">
          <OptionsDropDown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            orderItem={orderItem}
          />
        </div>
      </div>

      <small>
        {date} at {time}
      </small>

      <div className="bg-white p-3 rounded-[1rem] my-5 text-sm">
        <div className="flex items-center justify-between">
          <span>Name:</span>
          <span
            className={`${
              nameColorMapping[orderItem?.name]
            } px-2 py-1 rounded-[10px]`}
          >
            {orderItem?.name}
          </span>
        </div>
        <div className="flex items-center justify-between mt-5">
          <span>Seat No:</span>
          <span>{orderItem?.seatNo}</span>
        </div>
      </div>

      <div className="bg-white p-3 rounded-[1rem] my-5 text-sm">
        <div className="flex items-center justify-between">
          <span>OrderItems</span>
          <span>Quantity</span>
        </div>
        {orderItem?.items?.map((item, index) => (
          <div key={index} className="flex items-center justify-between my-3">
            <span>{item?.name}</span>
            <span>{item?.quantity}</span>
          </div>
        ))}
      </div>

      <div className="bg-white p-3 rounded-[1rem] mt-5 text-sm flex items-center justify-between">
        <span>Total Amount:</span>
        <span>GHC {orderItem?.totalAmount}</span>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  orderItem: PropTypes.object.isRequired,
};
export default OrderCard;
