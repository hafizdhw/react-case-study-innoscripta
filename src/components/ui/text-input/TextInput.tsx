import React from "react";
import "./TextInput.css";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
};

export const TextInput = ({
  value,
  onChange,
  placeholder = "",
  className = "",
  ...props
}: TextInputProps) => {
  const baseClasses = "text-input";
  const combinedClasses = `${baseClasses} ${className}`.trim();
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={combinedClasses}
      {...props}
    />
  );
};
