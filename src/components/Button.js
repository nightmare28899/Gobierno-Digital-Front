import React from "react";

const Button = ({ text, type, onClick, width = "100%" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        width: width,
        backgroundColor: "#4CAF50",
        color: "white",
        fontSize: "20px",
        padding: "14px 20px",
        margin: "8px 0",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
};

export default Button;
