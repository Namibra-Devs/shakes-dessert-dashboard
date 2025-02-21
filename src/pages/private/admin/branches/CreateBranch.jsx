import CustomButton from "@/components/CustomButton";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import useAppContext from "@/hooks/useAppContext";
import { useApp } from "@/lib/AppStore";
import { useBranchStore } from "@/lib/PageStore";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

const CreateBranch = () => {
  const { branch, updateField, clearBranch } = useBranchStore((state) => state);
  const { setAlert } = useApp((state) => state);
  const { triggerUpdate } = useAppContext();

  const handleAddBranch = async (e) => {
    e.preventDefault();

    try {
      console.log({ branch });
      setAlert({ message: "test", type: "success" });

      triggerUpdate("branch");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <div className="flex items-center space-x-5">
        <ChevronLeft
          className="bg-white w-5 h-5 border-[2px] border-dark rounded-md cursor-pointer"
          onClick={() => window.history.back()}
        />
        <div>
          <h3 className="page_header">Branch Management</h3>
          <p className="text-[13px] text-gray-500 flex items-center space-x-2">
            <span>Branch Management</span>
            <ChevronRight size={20} />
            <span className="text-primary_pink">Add Branch</span>
          </p>
        </div>
      </div>

      <form
        onSubmit={handleAddBranch}
        className="mt-5 w-full sm:w-[70%] lg:w-1/2"
      >
        <Input
          type={"text"}
          label={"Branch Name"}
          value={branch?.branchName}
          onChange={(e) => updateField(e.target.value, "branchName")}
          name={"branchName"}
          id={"branchName"}
        />

        <Input
          type={"text"}
          label={"Location"}
          value={branch?.location}
          onChange={(e) => updateField(e.target.value, "location")}
          name={"location"}
          id={"location"}
        />

        <Dropdown
          label={"Status"}
          options={["active", "Inactive"]}
          item={branch?.status}
          setItem={(selectedItem) => updateField(selectedItem, "status")}
        />

        <div className="flex items-center space-x-5 mb-5">
          <CustomButton
            label="cancel"
            variant="outlined"
            onClick={clearBranch}
          />
          <CustomButton type={"submit"} label="save" variant="contained" />
        </div>
      </form>
    </>
  );
};
export default CreateBranch;
