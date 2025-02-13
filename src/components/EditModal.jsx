import PropTypes from "prop-types";
import EditStockForm from "@/pages/private/admin/stock/EditStockForm";
import ReactDOM from "react-dom";
import { useApp } from "@/lib/AppStore";
import { X } from "lucide-react";
import CustomButton from "./CustomButton";

const EditModal = ({ page }) => {
  const allowedPages = ["Stock", "User", "Branch"];
  const { modalState, setModalState } = useApp((state) => state);

  return ReactDOM.createPortal(
    <div
      className={`${
        modalState === "open" ? "fixed" : "hidden"
      } inset-0 z-30 flex items-center justify-end bg-black bg-opacity-50 sm:pr-2`}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-screen flex flex-col  relative">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h4 className="text-base text-gray-500">Edit {page} Item</h4>
          <button
            onClick={() => setModalState("close")}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <X />
          </button>
        </div>

        {allowedPages.includes(page) &&
          (page === "Stock" ? (
            <EditStockForm />
          ) : page === "User" ? (
            "edit user form"
          ) : (
            "edit branch form"
          ))}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-4">
          <CustomButton
            label="Back"
            variant="outlined"
            onClick={() => setModalState("close")}
          />
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

EditModal.propTypes = {
  page: PropTypes.string.isRequired,
};
export default EditModal;
