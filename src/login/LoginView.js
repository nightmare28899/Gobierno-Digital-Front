import React, { useState } from "react";
import "./LoginView.css";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import apiService from "../services/apiService";
import logo from "../assets/img/userLogo.png";
import Toast from "../components/Toast";
import { saveToken, saveRole, saveUser } from "../services/authentication";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const LoginView = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    name === "email" ? setEmail(value) : setPassword(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (email === "" || password === "") {
      Toast({ message: "Completa todos los campos", type: "warning" });
      return;
    }
    setLoading(true);
    apiService
      .login(email, password)
      .then((data) => {
        saveUser(data.user);
        saveRole(data.roles[0]);
        saveToken(data.token);
        Toast({ message: "Inicio de sesión exitoso", type: "success" });
        navigate("/home");
        setLoading(false);
      })
      .catch((error) => {
        Toast({ message: "Error al iniciar sesión", type: "error" });
        setLoading(false);
        //console.error("Error al iniciar sesión:", error);
      });
  };

  return (
    <div className="container">
      {loading && <Loading />}
      <h2
        style={{
          textAlign: "center",
          color: "white",
        }}
      >
        Iniciar sesión
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <img src={logo} alt="" width="100" height="100" />
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="formContainer">
          <Label text={"Correo electrónico:"} size={16} color={"white"} />
          <br />
          <Input
            type={"email"}
            name={"email"}
            value={email}
            onChange={handleInputChange}
            placeholder={"Coloca tu correo electrónico"}
            autoComplete={"off"}
          />
        </div>
        <br />
        <div className="formContainer">
          <Label text={"Contraseña:"} size={16} color={"white"} /> <br />
          <Input
            type={"password"}
            name={"password"}
            value={password}
            onChange={handleInputChange}
            placeholder={"Coloca tu contraseña"}
            autoComplete={"off"}
          />
        </div>
        <br />
        <Button type="submit" text="Entrar" width="100%" />
      </form>
    </div>
  );
};

export default LoginView;
