import CustomButton from "@/components/CustomButton";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import { useApp } from "@/lib/AppStore";
import { useEffect, useState } from "react";

const EditBranchForm = () => {
  const { itemToEdit } = useApp((state) => state);
  const [formData, setFormData] = useState({
    branchName: "",
    location: "",
  });
  const [status, setStatus] = useState("");

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        branchName: itemToEdit?.name || "",
        location: itemToEdit?.location || "",
      });
      setStatus(itemToEdit?.status || "");
    }
  }, [itemToEdit]);

  const handleUpdateBranch = async (e) => {
    e.preventDefault();
    console.log({ ...formData, status });
  };

  return (
    <form
      onSubmit={handleUpdateBranch}
      className="mt-5 w-full sm:w-[70%] lg:w-1/2"
    >
      <Input
        type={"text"}
        label={"Branch Name"}
        value={formData?.branchName}
        onChange={handleValueChange}
        name={"branchName"}
        id={"branchName"}
      />

      <Input
        type={"text"}
        label={"Location"}
        value={formData?.location}
        onChange={handleValueChange}
        name={"location"}
        id={"location"}
      />

      <Dropdown
        label={"Status"}
        options={["active", "Inactive"]}
        item={status}
        setItem={(selectedItem) => setStatus(selectedItem, "status")}
      />

      <div className="flex items-center space-x-5 mb-5">
        <CustomButton type={"submit"} label="Save" variant="contained" />
      </div>
    </form>
  );
};
export default EditBranchForm;
