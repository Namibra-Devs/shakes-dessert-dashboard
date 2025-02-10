import CustomButton from "@/components/CustomButton";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Stock = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-[400] text-[25px] capitalize text-dark">
          Stock Management
        </h3>
        <CustomButton
          label="Add Stock"
          variant="contained"
          icon={<Plus />}
          onClick={() => navigate("/dashboard/manage/stock/create")}
        />
      </div>
    </>
  );
};
export default Stock;
