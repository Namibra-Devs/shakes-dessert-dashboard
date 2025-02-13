import CustomButton from "@/components/CustomButton";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import { useApp } from "@/lib/AppStore";
import { useStockStore } from "@/lib/PageStore";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import UploadIcon from "@/assets/images/image-upload.png";
import PropTypes from "prop-types";
import { useState } from "react";

const ImageUpload = ({ setFile }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
      setFile(selectedFile); // Set the actual file
    } else {
      setPreview(null);
      setFile(null);
    }
  };

  return (
    <div>
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary_red text-dark rounded-lg cursor-pointer border-[#FDCFF2] bg-[#FEEFFB80]"
      >
        <img src={UploadIcon} alt="" width={40} />
        <p className="mt-2 text-xl font-[200] text-dark">
          Click to upload a file
        </p>
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {preview && (
        <div className="w-full flex items-center flex-col mt-6">
          <CustomButton
            label="remove file"
            variant="contained"
            onClick={() => {
              setPreview(null);
              setFile(null);
            }}
          />
          <img
            src={preview}
            alt="File Preview"
            className="w-1/2 sm:w-2/5 lg:w-3/4 h-auto mt-2"
          />
        </div>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  setFile: PropTypes.func.isRequired,
};

const CreateStock = () => {
  const { stock, updateField, setStockImage, clearStock } = useStockStore(
    (state) => state
  );
  const { setAlert } = useApp((state) => state);

  const handleAddStock = async (e) => {
    e.preventDefault();

    for (let stockValue of Object.values(stock)) {
      if (!stockValue) {
        setAlert({ message: "All fields are required", type: "warning" });
        return;
      }
    }

    try {
      console.log({ stock });
      setAlert({
        message: "Stock Created",
        type: "success",
      });
    } catch {
      setAlert({
        message:
          "There was an error while trying to create stock item. Please try again.",
        type: "error",
      });
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
          <h3 className="page_header">Stock Management</h3>
          <p className="text-[13px] text-gray-500 flex items-center space-x-2">
            <span>Stock Management</span>
            <ChevronRight size={20} />
            <span className="text-primary_pink">Add Stock</span>
          </p>
        </div>
      </div>

      <form
        onSubmit={handleAddStock}
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
          options={["Todays Special", "Top Choice", "Clear"]}
          item={stock?.category}
          setItem={(selectedItem) => updateField(selectedItem, "category")}
        />

        <Dropdown
          label={"Food Type"}
          options={["Snack", "Drink", "Clear"]}
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
          options={["Accra", "Tamale", "Kumasi", "Clear"]}
          item={stock?.branch}
          setItem={(selectedItem) => updateField(selectedItem, "branch")}
        />

        <Dropdown
          label={"Availability"}
          options={["In Stock", "Out Of Stock", "Clear"]}
          item={stock?.availability}
          setItem={(selectedItem) => updateField(selectedItem, "availability")}
        />

        <div>
          <label
            className="block font-[300] text-[16px] sm:text-[18px] mt-5"
            htmlFor={"description"}
          >
            Stock Image
          </label>
          <ImageUpload
            setFile={(selectedItem) => setStockImage(selectedItem)}
          />
        </div>

        <div className="flex items-center space-x-5 my-5">
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
