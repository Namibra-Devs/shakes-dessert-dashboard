import CustomButton from "@/components/CustomButton";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-[400] text-[25px] capitalize text-dark">
          User Management
        </h3>
        <CustomButton
          label="Add User"
          variant="contained"
          icon={<Plus />}
          onClick={() => navigate("/dashboard/manage/users/create")}
        />
      </div>
    </>
  );
};
export default Users;
