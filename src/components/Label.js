import React from "react";

const Label = ({ text, size = 20, color = "white" }) => {
  return (
    <label
      style={{
        fontSize: size,
        color: color,
      }}
    >
      {text}
    </label>
  );
};

export default Label;
