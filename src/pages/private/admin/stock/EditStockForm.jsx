import { useApp } from "@/lib/AppStore";
import CustomButton from "@/components/CustomButton";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
// import { useStockStore } from "@/lib/PageStore";
import { useState } from "react";
import { useEffect } from "react";

const EditStockForm = () => {
  const { itemToEdit } = useApp((state) => state);
  // const { updateField } = useStockStore((state) => state);
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    price: "",
  });
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("");
  const [availability, setAvailability] = useState("");
  const [branch, setBranch] = useState("");

  const handleValueChange = (data) => {
    const { name, value } = data;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        itemName: itemToEdit?.itemName || "",
        description: itemToEdit?.description || "",
        price: itemToEdit?.price || "",
      });
      setCategory(itemToEdit?.category || "");
      setFoodType(itemToEdit?.foodType || "");
      setAvailability(itemToEdit?.availability || "");
      setBranch(itemToEdit?.branch || "");
    }
  }, [itemToEdit]);

  const handleStockUpdate = async (e) => {
    e.preventDefault();
    console.log({ ...formData, category, foodType, availability, branch });
  };

  return (
    <form onSubmit={handleStockUpdate} className="mt-5 w-full sm:w-[70%]">
      <Input
        type={"text"}
        label={"Item Name"}
        value={formData?.itemName}
        onChange={(e) => {
          handleValueChange(e.target);
        }}
        name={"itemName"}
        id={"itemName"}
      />

      <Dropdown
        label={"Category"}
        options={["Todays Special", "Top Choice", "Clear"]}
        item={category}
        setItem={(selectedItem) => setCategory(selectedItem)}
      />

      <Dropdown
        label={"Food Type"}
        options={["Snack", "Drink", "Clear"]}
        item={foodType}
        setItem={(selectedItem) => setFoodType(selectedItem)}
      />

      <div>
        <label
          className="block font-[300] text-[16px] sm:text-[18px]"
          htmlFor={"description"}
        >
          Description
        </label>
        <textarea
          value={formData?.description}
          onChange={(e) => {
            handleValueChange(e.target);
          }}
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
          value={formData?.price}
          onChange={(e) => {
            handleValueChange(e.target);
          }}
          required
          autoComplete="new-password"
          className={`block w-full p-2 border-[1px] rounded-md border-gray-300 focus:ring-primary_pink focus:border-primary_pink text-gray-600 outline-none`}
        />
      </div>

      <Dropdown
        label={"Branch"}
        options={["Accra", "Tamale", "Kumasi", "Clear"]}
        item={branch}
        setItem={(selectedItem) => setBranch(selectedItem)}
      />

      <Dropdown
        label={"Availability"}
        options={["In Stock", "Out Of Stock", "Clear"]}
        item={availability}
        setItem={(selectedItem) => setAvailability(selectedItem)}
      />

      {/* <div>
        <label
          className="block font-[300] text-[16px] sm:text-[18px] mt-5"
          htmlFor={"description"}
        >
          Stock Image
        </label>
        <ImageUpload setFile={(selectedItem) => setStockImage(selectedItem)} />
      </div> */}

      <CustomButton type={"submit"} label="save" variant="contained" />
    </form>
  );
};
export default EditStockForm;
