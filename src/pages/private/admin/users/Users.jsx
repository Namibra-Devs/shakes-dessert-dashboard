import CustomButton from "@/components/CustomButton";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmptyImage from "@/assets/images/empty.png";

const Users = () => {
  const navigate = useNavigate();
  const users = [];
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="page_header">User Management</h3>
        <CustomButton
          label="Add User"
          variant="contained"
          icon={<Plus size={20} />}
          onClick={() => navigate("/dashboard/manage/users/create")}
        />
      </div>

      {users &&
        (users.length > 0 ? (
          <p>users table</p>
        ) : (
          <div className="flex items-center justify-center flex-col h-[70vh] gap-5">
            <img src={EmptyImage} alt="" />
            <p className="w-full sm:w-[50%] text-center text-dark">
              No users added yet! Once you add new users, they will appear here
              for tracking and updates.
            </p>
            <CustomButton
              label="Add User"
              variant="contained"
              icon={<Plus size={20} />}
              onClick={() => navigate("/dashboard/manage/users/create")}
            />
          </div>
        ))}
    </>
  );
};
export default Users;
