import CustomButton from "@/components/CustomButton";
import Dropdown from "@/components/Dropdown";
import { useApp } from "@/lib/AppStore";
import { useOrdersStore } from "@/lib/PageStore";
import PropTypes from "prop-types";

const StepTwo = ({ setCurrentPage }) => {
  const { orderData, setPaymentMethod } = useOrdersStore((state) => state);
  const { setAlert } = useApp((state) => state);

  const moveToPreview = (e) => {
    e.preventDefault();
    if (!orderData?.paymentMethod) {
      setAlert({ message: "Please select a payment method", type: "warning" });
      return;
    }
    setCurrentPage(3);
  };
  return (
    <form className="mt-5 w-full sm:w-[70%] lg:w-1/2" onSubmit={moveToPreview}>
      <Dropdown
        label={"Payment Method"}
        options={["Cash", "MoMo", "VCash", "VISA Card", "PayPal", "Clear"]}
        item={orderData?.paymentMethod}
        setItem={(selectedItem) => setPaymentMethod(selectedItem)}
      />

      <div className="flex items-center space-x-5 my-5">
        <CustomButton
          label="Back"
          variant="outlined"
          onClick={() => setCurrentPage(1)}
        />
        <CustomButton type={"submit"} label="Preview" variant="contained" />
      </div>
    </form>
  );
};

StepTwo.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};
export default StepTwo;
