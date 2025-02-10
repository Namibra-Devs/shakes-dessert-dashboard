import CustomButton from "@/components/CustomButton";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Branches = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="page_header">Branch Management</h3>
        <CustomButton
          label="Add Branch"
          variant="contained"
          icon={<Plus size={20} />}
          onClick={() => navigate("/dashboard/manage/branches/create")}
        />
      </div>
    </>
  );
};
export default Branches;
