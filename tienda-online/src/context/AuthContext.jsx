import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (username, password) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/users?username=${username}`
      );
      if (data.length === 0) {
        const response = await axios.post("http://localhost:5000/users", {
          username,
          password,
        });
        setUser(response.data);
        return { success: true };
      } else {
        return { success: false, message: "Usuario ya registrado" };
      }
    } catch (error) {
      console.error("Error al registrar usuario", error);
    }
  };

  const login = async (username, password) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/users?username=${username}`
      );
      if (data.length > 0 && data[0].password === password) {
        setUser(data[0]);
        return { success: true };
      } else {
        return { success: false, message: "Credenciales incorrectas" };
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
