import CustomButton from "@/components/CustomButton";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Branches = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-[400] text-[25px] capitalize text-dark">
          Branch Management
        </h3>
        <CustomButton
          label="Add Branch"
          variant="contained"
          icon={<Plus />}
          onClick={() => navigate("create")}
        />
      </div>
    </>
  );
};
export default Branches;
