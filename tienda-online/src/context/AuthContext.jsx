// src/context/AuthContext.js
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    // Si ya tenemos un token, intentamos obtener los datos del usuario
    if (token) {
      axios.defaults.headers["Authorization"] = `Bearer ${token}`; // Configurar Axios con el token
      fetchUserData();
    }
  }, [token]);

  // Función para obtener los datos del usuario
  const fetchUserData = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/user-data/");
      setUser(data);
    } catch (error) {
      console.error("Error al obtener los datos del usuario", error);
    }
  };

  // Registrar nuevo usuario
  const register = async (username, password) => {
    try {
      // Verificamos si el nombre de usuario ya existe
      const { data } = await axios.get(
        `http://localhost:8000/api/usuarios/?username=${username}`
      );

      if (data.length === 0) {
        // Si no existe el usuario, lo creamos
        const response = await axios.post(
          "http://localhost:8000/api/usuarios/",
          { username, password }
        );

        setUser(response.data); // Guardamos el usuario creado
        return { success: true };
      } else {
        return { success: false, message: "Usuario ya registrado" };
      }
    } catch (error) {
      console.error("Error al registrar usuario", error);
      return { success: false, message: "Error en el registro" };
    }
  };

  // Iniciar sesión
  const login = async (username, password) => {
    try {
      // Hacemos la petición de login
      const { data } = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });

      if (data.access) {
        // Si recibimos un token, guardamos el usuario y el token en el estado y localStorage
        setToken(data.access);
        localStorage.setItem("token", data.access); // Almacenamos el token en localStorage
        axios.defaults.headers["Authorization"] = `Bearer ${data.access}`; // Configurar Axios con el token
        const userResponse = await axios.get(
          `http://localhost:8000/api/usuarios/${data.user_id}/`
        );
        setUser(userResponse.data);
        return { success: true };
      } else {
        return { success: false, message: "Credenciales incorrectas" };
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      return { success: false, message: "Error al iniciar sesión" };
    }
  };

  // Cerrar sesión
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers["Authorization"]; // Eliminar el token de las cabeceras de Axios
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
