import CustomButton from "@/components/CustomButton";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import { useApp } from "@/lib/AppStore";
import { useEffect } from "react";
import { useState } from "react";

const EditUserForm = () => {
  const { itemToEdit } = useApp((state) => state);
  const [formData, setFormData] = useState({
    staffName: "",
    email: "",
    password: "",
  });
  const [branch, setBranch] = useState("");

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        staffName: itemToEdit?.staffName || "",
        email: itemToEdit?.email || "",
        password: itemToEdit?.password || "",
      });
      setBranch(itemToEdit?.branch || "");
    }
  }, [itemToEdit]);

  const handleUpdateStaff = async (e) => {
    e.preventDefault();
    console.log({ ...formData });
  };
  return (
    <form
      onSubmit={handleUpdateStaff}
      className="mt-5 w-full sm:w-[70%] lg:w-1/2"
    >
      <Input
        type={"text"}
        label={"Staff Name"}
        value={formData?.staffName}
        onChange={handleValueChange}
        name={"staffName"}
        id={"staffName"}
      />

      <Input
        type={"text"}
        label={"Email"}
        value={formData?.email}
        onChange={handleValueChange}
        name={"email"}
        id={"email"}
      />

      <Input
        type={"password"}
        label={"Password"}
        value={formData?.password}
        onChange={handleValueChange}
        name={"password"}
        id={"password"}
      />

      <Dropdown
        label={"Branch"}
        options={["Accra", "Tamale", "Kumasi"]}
        item={branch}
        setItem={(selectedItem) => setBranch(selectedItem)}
      />

      <CustomButton type={"submit"} label="Save" variant="contained" />
    </form>
  );
};
export default EditUserForm;
