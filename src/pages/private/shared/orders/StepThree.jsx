import CustomButton from "@/components/CustomButton";
import { useOrdersStore } from "@/lib/PageStore";
import PropTypes from "prop-types";

const StepThree = ({ setCurrentPage, makeOrder }) => {
  const { orderData, decreaseItemQuantity, increaseItemQuantity, clearOrder } =
    useOrdersStore((state) => state);

  let totalAmount = 0;
  orderData.items?.forEach((item) => {
    totalAmount += item?.price * item?.quantity;
  });

  return (
    <>
      <CustomButton
        label="Back"
        variant="outlined"
        onClick={() => setCurrentPage(2)}
      />
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="p-5 rounded-[1rem]">
          {orderData.items?.map((orderItem) => (
            <div key={orderItem?._id} className="my-5 flex justify-between">
              <div className="flex space-x-3 text-dark">
                <div className="w-20 h-20 bg-primary_pink rounded-md"></div>
                <div>
                  <p className="capitalize text-base font-semibold">
                    {orderItem?.name}
                  </p>
                  <small>GHC {orderItem?.price}</small>
                </div>
              </div>

              {/* counter */}
              <div className="w-[10rem] flex items-center justify-center space-x-3 bg-bg_gray rounded-full">
                <p
                  className="w-10 h-10 rounded-full bg-white text-3xl font-semibold flex items-center justify-center cursor-pointer"
                  onClick={() => decreaseItemQuantity(orderItem?._id)}
                >
                  -
                </p>
                <p className="text-base font-semibold">{orderItem?.quantity}</p>
                <p
                  className="w-10 h-10 rounded-full bg-white text-2xl font-semibold flex items-center justify-center cursor-pointer"
                  onClick={() => increaseItemQuantity(orderItem?._id)}
                >
                  +
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-bg_gray p-5 rounded-[1rem]">
          <div className="bg-white p-3 rounded-[1rem] my-5 text-sm">
            <div className="flex items-center justify-between">
              <span>OrderItems</span>
              <span>Subtotal</span>
            </div>
            {orderData?.items?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between my-3"
              >
                <span>{item?.name}</span>
                <span>GHC {item?.price * item?.quantity}</span>
              </div>
            ))}

            <div className="flex items-center justify-between mt-10">
              <span>Total</span>
              <span>{totalAmount}</span>
            </div>
          </div>
          <div className="flex items-center space-x-5 my-5">
            <CustomButton
              label="Cancel"
              variant="outlined"
              onClick={() => {
                clearOrder();
                window.history.back();
              }}
            />
            <CustomButton
              type={"submit"}
              label="Order Now"
              variant="contained"
              onClick={makeOrder}
            />
          </div>
        </div>
      </div>
    </>
  );
};

StepThree.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  makeOrder: PropTypes.func.isRequired,
};
export default StepThree;
