import PropTypes from "prop-types";

const CustomButton = ({ type, label, onClick, icon, variant }) => {
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      className={`w-fit text-[13px] sm:text-[15px] outline-none py-2 px-3 sm:py-2 sm:px-5 rounded-md focus:outline-none flex items-center sm:gap-x-2 border-[1px] active:scale-105 transition-all duration-300 ${
        variant === "outlined"
          ? "bg-transparent text-dark border-gray-300 active:bg-gray-300"
          : "bg-primary_pink text-white border-transparent active:bg-primary_pink/80"
      }`}
    >
      {icon ? icon : ""}
      {label}
    </button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  variant: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CustomButton;
