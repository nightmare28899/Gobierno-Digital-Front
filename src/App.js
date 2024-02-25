import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login/LoginView";
import Home from "./home/HomeView";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import ValidateLogin from "./components/validateLogin/ValidateLogin";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer"
import Navegacion from "./components/navigation/Navigation";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Layout>
        <ToastContainer
          autoClose={2000}
          hideProgressBar
          pauseOnFocusLoss
          pauseOnHover
         />
        {/* <Navegacion /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ValidateLogin>
                <Home />
              </ValidateLogin>
            }
          />
        </Routes>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
