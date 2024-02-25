// ApiService.js
class ApiService {
  // URL base de tu API local
  baseUrl = "http://127.0.0.1:8000/api";
  prefix = "/auth";

  // Función para realizar una solicitud GET
  async getUsers() {
    try {
      const response = await fetch(
        `${this.baseUrl + this.prefix + "/" + "manageusers"}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Función para realizar una solicitud POST
  async login(email, password) {
    const body = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch(
        `${this.baseUrl + this.prefix + "/" + "login"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const response = await fetch(
        `${this.baseUrl + this.prefix + "/" + "get-user" + "/" + id}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createUser(data) {
    const body = {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: data.role,
    };
    console.log("body", body);
    try {
      const response = await fetch(
        `${this.baseUrl + this.prefix + "/" + "create-user"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error("Error al crear el usuario");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateUser(data) {
    const body = {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: data.role,
    };
    
    try {
      const response = await fetch(
        `${this.baseUrl + this.prefix + "/" + "edit-user" + "/" + body.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const response = await fetch(
        `${this.baseUrl + this.prefix + "/" + "delete-user" + "/" + id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al eliminar el usuario");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new ApiService();
