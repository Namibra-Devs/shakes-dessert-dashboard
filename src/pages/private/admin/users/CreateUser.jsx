import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";

const CreateUser = () => {
  return (
    <>
      <div className="flex items-center space-x-5">
        <ChevronLeft
          className="bg-white w-5 h-5 border-[2px] border-dark rounded-md cursor-pointer"
          onClick={() => window.history.back()}
        />
        <div>
          <h3 className="page_header">User Management</h3>
          <p className="text-[13px] text-gray-500 flex items-center space-x-2">
            <span>User Management</span>
            <ChevronRight size={20} />
            <span className="text-primary_pink">Add User</span>
          </p>
        </div>
      </div>
    </>
  );
};
export default CreateUser;
