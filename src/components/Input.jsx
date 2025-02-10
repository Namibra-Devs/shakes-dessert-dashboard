import PropTypes from "prop-types";
import { LucideEyeClosed, LucideEye } from "lucide-react";
import { useState } from "react";

const Input = ({ label, name, id, value, onChange, type }) => {
  const [inputState, setInputState] = useState(type);
  return (
    <div className="mb-4">
      <label
        className="block font-[300] text-[16px] sm:text-[18px]"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <input
          type={inputState}
          id={id}
          name={name || ""}
          value={value}
          onChange={onChange}
          required
          autoComplete="new-password"
          className={`mt-1 block w-full p-2 border-[1px] rounded-md border-gray-300 focus:ring-primary_pink focus:border-primary_pink text-gray-600 outline-none`}
        />
        <button
          type="button"
          onClick={() =>
            setInputState(inputState === "text" ? "password" : "text")
          }
          className={`${type === "password" ? "block" : "hidden"}`}
        >
          {inputState !== "password" ? <LucideEye /> : <LucideEyeClosed />}
        </button>
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.any,
  value: PropTypes.any,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
