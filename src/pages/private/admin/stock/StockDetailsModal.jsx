import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import CustomButton from "@/components/CustomButton";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useStockStore } from "@/lib/PageStore";
import { useEffect } from "react";
import { getDateTime } from "@/lib/getDateTime";

const StockDetailsModal = ({
  stockItem,
  viewModalState,
  setViewModalState,
}) => {
  const { stocks } = useStockStore((state) => state);
  const [currentStockIndex, setCurrentStockIndex] = useState(null);
  const [currentStock, setCurrentStock] = useState(stockItem);
  const { date } = getDateTime(currentStock?.createdAt);

  useEffect(() => {
    if (stockItem) {
      const index = stocks.findIndex((item) => item._id === stockItem._id);
      setCurrentStockIndex(index);
      setCurrentStock(stockItem);
    }
  }, [stockItem, stocks]);

  const handleNext = () => {
    setCurrentStockIndex((prevIndex) => {
      const newIndex = Math.min(stocks.length - 1, prevIndex + 1);
      setCurrentStock(stocks[newIndex]);
      return newIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentStockIndex((prevIndex) => {
      const newIndex = Math.max(0, prevIndex - 1);
      setCurrentStock(stocks[newIndex]);
      return newIndex;
    });
  };

  return ReactDOM.createPortal(
    <div
      className={`${
        viewModalState === "open" ? "fixed" : "hidden"
      } inset-0 z-30 flex items-center justify-end bg-black bg-opacity-50 sm:pr-2`}
    >
      <div className="bg-bg_gray rounded-lg shadow-xl w-full max-w-5xl h-screen flex flex-col relative">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-white border-gray-200 flex justify-between items-center rounded-t-lg">
          <h4 className="text-base text-gray-500">
            <div className="flex items-center space-x-5">
              <ChevronLeft
                className={`bg-white w-5 h-5 border-[2px] ${
                  currentStockIndex === 0
                    ? "border-gray-300 text-gray-300"
                    : "border-dark text-dark"
                } rounded-md cursor-pointer`}
                onClick={handlePrevious}
              />
              <ChevronRight
                className={`bg-white w-5 h-5 border-[2px] ${
                  currentStockIndex === stocks?.length - 1
                    ? "border-gray-300 text-gray-300"
                    : "border-dark text-dark"
                } rounded-md cursor-pointer`}
                onClick={handleNext}
              />
              <small>
                {currentStockIndex + 1} out of {stocks?.length}
              </small>

              <small>created on: {date}</small>
            </div>
          </h4>
          <button
            onClick={() => setViewModalState("close")}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <X />
          </button>
        </div>

        <div className="p-5 h-[80vh] overflow-auto flex flex-col sm:flex-row gap-5 text-dark">
          <div className="flex-[1] flex flex-col gap-3">
            <div className="bg-white p-5 rounded-[1rem] flex items-center justify-between">
              <p>{currentStock?.itemName}</p>
              <div
                className={`capitalize w-fit py-1 px-2 text-[12px] rounded-md ${
                  currentStock?.availability.toLowerCase() === "in stock"
                    ? "text-success bg-success/20"
                    : "text-danger bg-danger/20"
                }`}
              >
                {currentStock?.availability}
              </div>
            </div>
            <div className="bg-white p-5 rounded-[1rem] text-[14px]">
              {currentStock?.description}
            </div>
            <div className="bg-white p-5 rounded-[1rem] flex items-center justify-between">
              <p>Category</p>
              <small className="capitalize">{currentStock?.category}</small>
            </div>
            <div className="bg-white p-5 rounded-[1rem] flex items-center justify-between">
              <p>Food Type</p>
              <small className="capitalize">{currentStock?.foodType}</small>
            </div>
            <div className="bg-white p-5 rounded-[1rem] flex items-center justify-between">
              <p>Branch</p>
              <small className="capitalize">{currentStock?.branch}</small>
            </div>
            <div className="bg-white p-5 rounded-[1rem] flex items-center justify-between">
              <p>Price</p>
              <small className="capitalize">GHC {currentStock?.price}</small>
            </div>
          </div>
          <div className="flex-[2] bg-white p-5"></div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-white border-gray-200 absolute bottom-0 left-0 w-full">
          <CustomButton
            label="Back"
            variant="contained"
            onClick={() => setViewModalState("close")}
          />
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

StockDetailsModal.propTypes = {
  stockItem: PropTypes.object.isRequired,
  viewModalState: PropTypes.string.isRequired,
  setViewModalState: PropTypes.func.isRequired,
};

export default StockDetailsModal;
