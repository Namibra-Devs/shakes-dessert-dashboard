import CustomButton from "@/components/CustomButton";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import { useApp } from "@/lib/AppStore";
import { useBranchStore } from "@/lib/PageStore";
import { CalendarClock } from "lucide-react";
import { ChevronRight, CupSoda } from "lucide-react";

const CreateBranch = () => {
  const { branch, updateField, clearFields } = useBranchStore((state) => state);
  const { setAlert } = useApp((state) => state);

  const handleAddBranch = async (e) => {
    e.preventDefault();
    console.log({ branch });
    setAlert({ message: "test", type: "success" });
  };
  return (
    <>
      <h3 className="page_header">Branch Management</h3>
      <p className="text-[13px] text-gray-500 flex items-center space-x-2">
        <span>Branch Management</span>
        <ChevronRight size={20} />
        <span className="text-primary_pink">Add Branch</span>
      </p>

      <form
        onSubmit={handleAddBranch}
        className="mt-5 w-full sm:w-[70%] lg:w-1/2"
      >
        <Input
          type={"text"}
          label={"Item Name"}
          value={branch?.itemName}
          onChange={(e) => updateField(e.target.value, "itemName")}
          name={"itemName"}
          id={"itemName"}
        />

        <Dropdown
          label={"Category"}
          options={["hello", "bye", "Clear"]}
          item={branch?.category}
          setItem={(selectedItem) => updateField(selectedItem, "category")}
          defaultSelect={
            <div className="text-dark flex items-center space-x-2">
              <CalendarClock />
              <span>Today&apos;s Menu</span>
            </div>
          }
        />

        <Dropdown
          label={"Food Type"}
          options={["hello", "bye", "Clear"]}
          item={branch?.foodType}
          setItem={(selectedItem) => updateField(selectedItem, "foodType")}
          defaultSelect={
            <div className="text-dark flex items-center space-x-2">
              <CupSoda />
              <span>Drinks</span>
            </div>
          }
        />

        <div>
          <label
            className="block font-[300] text-[16px] sm:text-[18px]"
            htmlFor={"description"}
          >
            Description
          </label>
          <textarea
            value={branch?.description}
            onChange={(e) => updateField(e.target.value, "description")}
            name={"description"}
            id={"description"}
            className="mt-1 block w-full h-[7rem] p-2 border-[1px] rounded-md border-gray-300 focus:ring-primary_pink focus:border-primary_pink text-gray-600 outline-none"
          />
        </div>

        <div>
          <Input
            type={"number"}
            label={"Price"}
            name={"price"}
            id={"price"}
            value={branch?.price}
            onChange={(e) => updateField(e.target.value, "price")}
          />
        </div>

        <Dropdown
          label={"Branch"}
          options={["Branch A", "Branch B", "Clear"]}
          item={branch?.branch}
          setItem={(selectedItem) => updateField(selectedItem, "branch")}
          defaultSelect={
            <div className="text-dark flex items-center space-x-2">
              <CupSoda />
              <span>Branch</span>
            </div>
          }
        />

        <Dropdown
          label={"Availability"}
          options={["In Stock", "Out Of Stock", "Clear"]}
          item={branch?.availability}
          setItem={(selectedItem) => updateField(selectedItem, "availability")}
          defaultSelect={
            <div className="text-dark flex items-center space-x-2">
              <CupSoda />
              <span>-</span>
            </div>
          }
        />

        <div className="flex items-center space-x-5 mb-5">
          <CustomButton
            label="cancel"
            variant="outlined"
            onClick={clearFields}
          />
          <CustomButton type={"submit"} label="save" variant="contained" />
        </div>
      </form>
    </>
  );
};
export default CreateBranch;
