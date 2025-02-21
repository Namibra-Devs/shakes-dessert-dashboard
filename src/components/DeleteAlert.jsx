import { X } from "lucide-react";
import CustomButton from "./CustomButton";
import PropTypes from "prop-types";
import { handleDelete } from "@/utils/deleteData";
import { useState } from "react";
import useAppContext from "@/hooks/useAppContext";
import { useApp } from "@/lib/AppStore";

const DeleteAlert = ({ page, setDeleteModal, deleteModal, itemId }) => {
  const { accessToken, setAlert } = useApp();
  const { triggerUpdate } = useAppContext();
  const [loading, setLoading] = useState(false);

  const deleteItem = async () => {
    setLoading(true);
    try {
      const { data, message, success } = await handleDelete(
        accessToken,
        page,
        itemId
      );

      if (!success) {
        setAlert({ message, type: "error" });
        return;
      }

      console.log(data);
      setAlert({ message: `${page} deleted successfully`, type: "success" });
      setDeleteModal(false);

      // Update related data after deletion
      const resourcesToUpdate =
        page === "branch" ? ["branch", "stock", "user", "order"] : [page];
      resourcesToUpdate.forEach((resource) => triggerUpdate(resource));
    } catch (error) {
      console.error("Error during deletion:", error.message || error);
      setAlert({
        message: error.message || "Couldn't delete item. Try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full h-[100vh] fixed left-0 top-0 ${
        deleteModal ? "block" : "hidden"
      } 
          flex items-start justify-center bg-black bg-opacity-50 z-20 pt-5 top-0`}
    >
      <div className="w-[90%] sm:w-[30rem] max-w-md bg-white rounded-lg shadow-lg relative">
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10 rounded-lg flex items-center justify-center">
            <div className="h-12 w-12 border-4 border-t-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        )}

        <div className="flex items-center justify-between bg-danger px-5 py-2 text-white rounded-t-sm">
          <h3 className="text-base capitalize">Delete {page} details</h3>
          <button
            onClick={() => {
              setDeleteModal(false);
              setAlert({ message: "" });
            }}
            className=""
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="p-5 text-base text-gray-600 border-b-2 border-gray-200">
          Deleting {page} item with ID ({itemId})
        </p>

        <div className="flex justify-end gap-2 m-3">
          <CustomButton
            label="Cancel"
            variant="outlined"
            onClick={() => {
              setDeleteModal(false);
              setAlert({ message: "" });
            }}
          />
          <CustomButton
            label="Delete"
            variant="contained"
            onClick={deleteItem}
          />
        </div>
      </div>
    </div>
  );
};

DeleteAlert.propTypes = {
  page: PropTypes.string.isRequired,
  setDeleteModal: PropTypes.func.isRequired,
  deleteModal: PropTypes.bool.isRequired,
  itemId: PropTypes.string,
};

export default DeleteAlert;
