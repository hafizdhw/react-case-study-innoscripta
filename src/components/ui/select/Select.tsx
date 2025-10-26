import React from "react";
import "./Select.css";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}: SelectProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="select"
    >
      <option className="select__default-option" value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
          className={`select__option ${
            value === opt.value ? "select__option--selected" : ""
          }`}
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
};
