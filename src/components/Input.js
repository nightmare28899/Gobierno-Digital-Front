import React from "react";

const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
  autoComplete,
  width = "100%",
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: width,
        padding: "12px 20px",
        margin: "8px 0",
        display: "inline-block",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border-box",
      }}
      required={required}
      autoComplete={autoComplete}
    />
  );
};



export default Input;
