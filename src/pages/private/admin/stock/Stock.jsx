import CustomButton from "@/components/CustomButton";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmptyImage from "@/assets/images/empty.png";

const Stock = () => {
  const navigate = useNavigate();
  const stock = [];
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="page_header">Stock Management</h3>
        <CustomButton
          label="Add Stock"
          variant="contained"
          icon={<Plus size={20} />}
          onClick={() => navigate("/dashboard/manage/stock/create")}
        />
      </div>

      {stock &&
        (stock.length > 0 ? (
          <p>table</p>
        ) : (
          <div className="flex items-center justify-center flex-col h-[70vh] gap-5">
            <img src={EmptyImage} alt="" />
            <p className="w-full sm:w-[50%] text-center text-dark">
              No stock added yet! Once you add new stock, they will appear here
              for tracking and updates.
            </p>
            <CustomButton
              label="Add Stock"
              variant="contained"
              icon={<Plus size={20} />}
              onClick={() => navigate("/dashboard/manage/stock/create")}
            />
          </div>
        ))}
    </>
  );
};
export default Stock;
