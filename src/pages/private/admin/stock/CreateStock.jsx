import CustomButton from "@/components/CustomButton";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import { useApp } from "@/lib/AppStore";
import { useStockStore } from "@/lib/PageStore";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

const CreateStock = () => {
  const { stock, updateField, clearStock } = useStockStore((state) => state);
  const { setAlert } = useApp((state) => state);

  const handleAddBranch = async (e) => {
    e.preventDefault();
    console.log({ stock });
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
          <h3 className="page_header">Stock Management</h3>
          <p className="text-[13px] text-gray-500 flex items-center space-x-2">
            <span>Stock Management</span>
            <ChevronRight size={20} />
            <span className="text-primary_pink">Add Stock</span>
          </p>
        </div>
      </div>

      <form
        onSubmit={handleAddBranch}
        className="mt-5 w-full sm:w-[70%] lg:w-1/2"
      >
        <Input
          type={"text"}
          label={"Item Name"}
          value={stock?.itemName}
          onChange={(e) => updateField(e.target.value, "itemName")}
          name={"itemName"}
          id={"itemName"}
        />

        <Dropdown
          label={"Category"}
          options={["hello", "bye", "Clear"]}
          item={stock?.category}
          setItem={(selectedItem) => updateField(selectedItem, "category")}
        />

        <Dropdown
          label={"Food Type"}
          options={["hello", "bye", "Clear"]}
          item={stock?.foodType}
          setItem={(selectedItem) => updateField(selectedItem, "foodType")}
        />

        <div>
          <label
            className="block font-[300] text-[16px] sm:text-[18px]"
            htmlFor={"description"}
          >
            Description
          </label>
          <textarea
            value={stock?.description}
            onChange={(e) => updateField(e.target.value, "description")}
            name={"description"}
            id={"description"}
            className="mt-1 block w-full h-[7rem] p-2 border-[1px] rounded-md border-gray-300 focus:ring-primary_pink focus:border-primary_pink text-gray-600 outline-none"
          />
        </div>

        <label
          className="block font-[300] text-[16px] sm:text-[18px] mt-5"
          htmlFor={"description"}
        >
          Price
        </label>
        <div className="flex items-center space-x-2 mb-4">
          <div className="border-[1px] border-gray-400 rounded-md px-3 py-2">
            GHC
          </div>
          <input
            type={"number"}
            name={"price"}
            id={"price"}
            value={stock?.price}
            onChange={(e) => updateField(e.target.value, "price")}
            required
            autoComplete="new-password"
            className={`block w-full p-2 border-[1px] rounded-md border-gray-300 focus:ring-primary_pink focus:border-primary_pink text-gray-600 outline-none`}
          />
        </div>

        <Dropdown
          label={"Branch"}
          options={["Branch A", "Branch B", "Clear"]}
          item={stock?.branch}
          setItem={(selectedItem) => updateField(selectedItem, "branch")}
        />

        <Dropdown
          label={"Availability"}
          options={["In Stock", "Out Of Stock", "Clear"]}
          item={stock?.availability}
          setItem={(selectedItem) => updateField(selectedItem, "availability")}
        />

        <div className="flex items-center space-x-5 mb-5">
          <CustomButton
            label="cancel"
            variant="outlined"
            onClick={clearStock}
          />
          <CustomButton type={"submit"} label="save" variant="contained" />
        </div>
      </form>
    </>
  );
};
export default CreateStock;
