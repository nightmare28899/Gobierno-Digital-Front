import React from "react";
import Image from "../assets/img/background.jpg"

const Layout = ({children }) => {
  return (
    <div
      style={{
        background: 'url('+Image+')',
        backgroundSize: "cover",
        width: "100%",
        height: "100vh",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

export default Layout;
