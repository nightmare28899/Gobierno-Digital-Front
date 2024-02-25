//generat a confirmation alert
import React from "react";
import "./ConfirmationAlert.css";

const ConfirmationAlert = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-alert">
      <div className="confirmation-alert-content">
        <p>{message}</p>
        <div className="confirmation-alert-buttons">
          <button onClick={onCancel}>Cancelar</button>
          <button onClick={onConfirm}>Aceptar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationAlert;
