import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

const Dropdown = ({ options, item, setItem, label, defaultSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <label className="block font-[300] text-[16px] sm:text-[20px]">
        {label}
      </label>
      <div className="relative text-dark cursor-pointer">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between border-2 border-gray-300 rounded-md px-4 py-2 w-full text-sm"
        >
          {item ? item : defaultSelect}
          <ChevronDown size={20} />
        </div>
        {isOpen && (
          <ul className="absolute z-10 bg-white border-[1px] border-gray-300 rounded-md mt-1 w-fit">
            {options?.map((option) => (
              <li
                key={option}
                className={`px-4 py-2 text-sm ${
                  option === "Clear"
                    ? "border-t-[1px] border-gray-200"
                    : "border-t-transparent"
                } hover:bg-gray-100 cursor-pointer w-[10rem]`}
                onClick={() => {
                  setItem(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  item: PropTypes.string,
  setItem: PropTypes.func.isRequired,
  label: PropTypes.string,
  defaultSelect: PropTypes.node,
};

export default Dropdown;
