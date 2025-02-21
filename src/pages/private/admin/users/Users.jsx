import CustomButton from "@/components/CustomButton";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmptyImage from "@/assets/images/empty.png";
import { UsersTable } from "./UsersTable";
import { useApp } from "@/lib/AppStore";
import EditModal from "@/components/EditModal";
import DeleteAlert from "@/components/DeleteAlert";
import { useState } from "react";

const Users = () => {
  const { setModalState, setItemToEdit, setDeleteModal, deleteModal } = useApp(
    (state) => state
  );
  const [staffId, setStaffId] = useState(null);
  const navigate = useNavigate();
  const users = [
    {
      _id: "2860492856",
      staffName: "Mike Lio",
      email: "mike@yahoo.com",
      branch: "Accra",
      createdAt: "08-Oct-2024",
    },
    {
      _id: "9340912864",
      staffName: "Berlin",
      email: "lino@yahoo.com",
      branch: "Tamale",
      createdAt: "17-Nov-2024",
    },
  ];

  const onEditClick = (staff) => {
    setItemToEdit(staff);
    setModalState("open");
  };
  const onDeleteClick = (staffId) => {
    setStaffId(staffId);
    setDeleteModal(true);
  };
  return (
    <>
      <EditModal page={"User"} />
      <DeleteAlert
        page={"staff"}
        setDeleteModal={setDeleteModal}
        deleteModal={deleteModal}
        itemId={staffId}
      />
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
        (users?.length > 0 ? (
          <div className="w-[395px] sm:w-full overflow-auto">
            <UsersTable
              users={users}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          </div>
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
