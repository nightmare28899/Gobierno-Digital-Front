import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { getRole, getUser, closeSession } from "../services/authentication";
import Toast from "../components/Toast";
import ConfirmationAlert from "../components/ConfirmationAlert";
import Modal from "../components/Modal";
import "./HomeView.css";

const HomeView = () => {
  const [users, setUsers] = useState([]);
  const [roleUser, setRoleUser] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [userInfoById, setUserInfoById] = useState([]);
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [type, setType] = useState("create");
  const [updateUser, setUpdateUser] = useState([]);

  useEffect(() => {
    apiService
      .getUsers()
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => {
        Toast({ message: "Error al obtener datos de usuarios", type: "error" });
        // console.error("Error al obtener datos de usuarios:", error);
      });
    getUserRole();
    getUserInfo();
  }, []);

  const getUserRole = () => {
    const role = getRole();
    setRoleUser(role);
  };

  const getUserInfo = () => {
    const user = getUser();
    const userObj = JSON.parse(user);
    setUserInfo(userObj);
  };

  const renderItems = () => {
    return users.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          {roleUser === "Admin" && (
            <td>
              <button className="btn-editar" onClick={() => openModal("edit", user)}>
                Editar
              </button>
              <button
                className="btn-eliminar"
                onClick={() => deleteUser(user.id)}
              >
                Eliminar
              </button>
            </td>
          )}
        </tr>
      );
    });
  };

  const getUserById = (id) => {
    apiService
      .getUserById(id)
      .then((data) => {
        setUserInfoById(data.user);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  };

  const deleteUser = (id) => {
    getUserById(id);
    setShowConfirmationAlert(true);
  };

  const deleteUserConfirmed = () => {
    apiService
      .deleteUser(JSON.stringify(userInfoById?.id))
      .then((data) => {
        Toast({ message: data.message, type: "success" });
        setShowConfirmationAlert(false);
        const newUsers = users.filter((user) => user.id !== userInfoById?.id);
        setUsers(newUsers);
      })
      .catch((error) => {
        Toast({ message: "Error al eliminar el usuario", type: "error" });
        // console.error("Error al eliminar el usuario:", error);
      });
  };

  const closeSessionHandler = () => {
    Toast({ message: "Sesión cerrada", type: "warning" });
    Toast({ message: "Seras redirigo en breve", type: "info" });
    setTimeout(() => {
      closeSession();
      window.location.href = "/";
    }, 3000);
  };

  if (showModalCreateUser) {
    return (
      <div style={styles.headerContainer}>
        <Modal
          show={showModalCreateUser}
          type={type}
          onClose={() => setShowModalCreateUser(false)}
          user={userInfoById}
          getUserRole={getUserRole}
          updateUser={updateUser}
        />
      </div>
    );
  }

  const openModal = (type, data = null) => {
    setType(type);
    setShowModalCreateUser(true);

    if (data) {
      setUpdateUser(data);
    }
  };

  return (
    <div style={styles.container}>
      {showConfirmationAlert && userInfoById && (
        <ConfirmationAlert
          message={
            "¿Estás seguro de que quieres eliminar este usuario" +
            JSON.stringify(userInfoById?.name) +
            "?"
          }
          onConfirm={() => deleteUserConfirmed(userInfoById?.id)}
          onCancel={() => setShowConfirmationAlert(false)}
        />
      )}

      <div style={styles.headerContainer}>
        <p
          style={{
            fontSize: "20px",
            marginBottom: "20px",
            marginRight: "40px",
          }}
        >
          Bienvenido a la página de inicio <b>{userInfo.name}</b>
        </p>
        <div>
          {roleUser === "Admin" && (
            <button className="btn-crear" onClick={() => openModal("create", null)}>
              Crear usuario
            </button>
          )}
          <button className="btn-cerrar" onClick={closeSessionHandler}>
            Cerrar sesión
          </button>
        </div>
      </div>
      <table className="mi-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            {roleUser === "Admin" && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "80%",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "80%",
  },
};

export default HomeView;
