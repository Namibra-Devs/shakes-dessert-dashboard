import CustomButton from "@/components/CustomButton";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BranchTable } from "./BranchTable";

const Branches = () => {
  const navigate = useNavigate();
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
    console.log(branch);
  };
  const onDeleteClick = (branchId) => {
    console.log(branchId);
  };

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

      {branches.length > 0 ? (
        <div className="w-screen sm:w-full overflow-auto">
          <BranchTable
            branches={branches}
            dates={dates}
            locations={locations}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        </div>
      ) : (
        <p>No Data</p>
      )}
    </>
  );
};
export default Branches;
