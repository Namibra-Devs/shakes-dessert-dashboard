import CustomButton from "@/components/CustomButton";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import { useApp } from "@/lib/AppStore";
import { useUserStore } from "@/lib/PageStore";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";

const CreateUser = () => {
  const { user, updateField, clearUser } = useUserStore((state) => state);
  const { setAlert } = useApp((state) => state);

  const handleAddBranch = async (e) => {
    e.preventDefault();
    console.log({ user });
    setAlert({ message: "test", type: "success" });
  };

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

      <form
        onSubmit={handleAddBranch}
        className="mt-5 w-full sm:w-[70%] lg:w-1/2"
      >
        <Input
          type={"text"}
          label={"Staff Name"}
          value={user?.staffName}
          onChange={(e) => updateField(e.target.value, "staffName")}
          name={"staffName"}
          id={"staffName"}
        />

        <Input
          type={"text"}
          label={"Email"}
          value={user?.email}
          onChange={(e) => updateField(e.target.value, "email")}
          name={"email"}
          id={"email"}
        />

        <Input
          type={"password"}
          label={"Password"}
          value={user?.password}
          onChange={(e) => updateField(e.target.value, "password")}
          name={"password"}
          id={"password"}
        />

        <Dropdown
          label={"Branch"}
          options={["Accra", "Tamale", "Kumasi"]}
          item={user?.branch}
          setItem={(selectedItem) => updateField(selectedItem, "branch")}
        />

        <div className="flex items-center space-x-5 mb-5">
          <CustomButton label="cancel" variant="outlined" onClick={clearUser} />
          <CustomButton type={"submit"} label="save" variant="contained" />
        </div>
      </form>
    </>
  );
};
export default CreateUser;
