import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = ({ message, type }) => {
  const toastTypes = {
    success: toast.success,
    error: toast.error,
    warning: toast.warning,
    info: toast.info,
  };

  const showToast = () => {
    const toastFunction = toastTypes[type];
    if (toastFunction) {
      toastFunction(message);
    }
  };

  return <>{showToast()}</>;
};

export default Toast;
