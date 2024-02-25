//generate a modal to put an form
import React, { useState, useEffect } from "react";
import "./Modal.css";
import Button from "./Button";
import Input from "./Input";
import Label from "./Label";
import apiService from "../services/apiService";
import Toast from "./Toast";
import Loading from "./Loading";

const Modal = ({ show = false, onClose = {}, user, type = "", updateUser }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState(user ? user.password : "");
  const [role, setRole] = useState(user ? user.role : "");

  useEffect(() => {
    cleanForm();
    if (updateUser) {
      setName(updateUser.name);
      setEmail(updateUser.email);
      setPassword(updateUser.password);
      setRole(updateUser.role);
    }
  }, [show]);

  const createUser = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      name,
      email,
      password,
      role,
    };
    if (type !== "edit") {
      apiService
        .createUser(data)
        .then((data) => {
          setLoading(false);
          onClose();
          window.location.reload();
          Toast({ message: "Usuario creado", type: "success" });
        })
        .catch((error) => {
          setLoading(false);
          Toast({ message: "Error al crear usuario", type: "error" });
          // console.error("Error al crear usuario:", error);
        });
      return;
    }
    data.id = updateUser.id;
    apiService
      .updateUser(data)
      .then((data) => {
        setLoading(false);
        onClose();
        window.location.reload();
        Toast({ message: "Usuario actualizado", type: "success" });
      })
      .catch((error) => {
        setLoading(false);
        Toast({ message: "Error al actualizar usuario", type: "error" });
        // console.error("Error al actualizar usuario:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const cleanForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{type === "create" ? "Crear usuario" : "Editar usuario"}</h2>
        <form onSubmit={createUser}>
          <Label text="Nombre:" size={16} color={"black"} />
          <Input
            type="text"
            name={"name"}
            value={name}
            onChange={handleInputChange}
            placeholder={"Coloca el nombre del usuario"}
            autoComplete={"off"}
          />
          <Label text="Email:" size={16} color={"black"} />
          <Input
            type="email"
            name={"email"}
            value={email}
            onChange={handleInputChange}
            placeholder={"Coloca el email del usuario"}
            autoComplete={"off"}
          />
          <Label text="Contraseña:" size={16} color={"black"} />
          <Input
            type="password"
            name={"password"}
            value={password}
            onChange={handleInputChange}
            placeholder={"Coloca la contraseña del usuario"}
            autoComplete={"off"}
          />
          <Label text="Rol" />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Selecciona un rol</option>
            <option value="1">Admin</option>
            <option value="2">User</option>
          </select>
          <Button
            text={type !== "create" ? "Actualizar" : "Crear usuario"}
            type="submit"
          />
        </form>
        {loading && <Loading />}
      </div>
    </div>
  );
};

export default Modal;
