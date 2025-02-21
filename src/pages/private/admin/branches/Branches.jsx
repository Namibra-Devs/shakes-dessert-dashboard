import CustomButton from "@/components/CustomButton";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BranchTable } from "./BranchTable";
import EmptyImage from "@/assets/images/empty.png";
import EditModal from "@/components/EditModal";
import { useApp } from "@/lib/AppStore";
// import useAppContext from "@/hooks/useAppContext";

const Branches = () => {
  const { setModalState, setItemToEdit } = useApp((state) => state);
  const navigate = useNavigate();
  // const { branches } = useAppContext();
  const branches = [
    {
      _id: "728ed52f",
      name: "Lemon Melon",
      location: "Accra",
      createdAt: "12-Dec-2024",
      status: "active",
    },
    {
      _id: "150vje19",
      name: "Apple Mable",
      location: "Tamale",
      createdAt: "12-Dec-2024",
      status: "inactive",
    },
  ];

  const dates = ["12-Dev-2024", "20-Dev-2024"];
  const locations = ["Tamale", "Accra"];

  const onEditClick = (branch) => {
    setItemToEdit(branch);
    setModalState("open");
  };
  const onDeleteClick = (branchId) => {
    console.log(branchId);
  };

  return (
    <>
      <EditModal page={"Branch"} />
      <div className="flex items-center justify-between">
        <h3 className="page_header">Branch Management</h3>
        <CustomButton
          label="Add Branch"
          variant="contained"
          icon={<Plus size={20} />}
          onClick={() => navigate("/dashboard/manage/branches/create")}
        />
      </div>

      {branches &&
        (branches.length > 0 ? (
          <div className="w-[395px] sm:w-full overflow-auto">
            <BranchTable
              branches={branches}
              dates={dates}
              locations={locations}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col h-[70vh] gap-5">
            <img src={EmptyImage} alt="" />
            <p className="w-full sm:w-[50%] text-center text-dark">
              No branches added yet! Once you add a new branch, they will appear
              here for tracking and updates.
            </p>
            <CustomButton
              label="Add Branch"
              variant="contained"
              icon={<Plus size={20} />}
              onClick={() => navigate("/dashboard/manage/branches/create")}
            />
          </div>
        ))}
    </>
  );
};
export default Branches;
