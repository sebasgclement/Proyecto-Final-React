import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginForm() {
  const { login } = useAuth(); // El login debe enviar username y password al backend
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Intentar iniciar sesión con username y password
    const result = await login(username, password);

    // Si el login es exitoso, redirige al home
    if (result.success) {
      navigate("/"); // Redirigir al Home
    } else {
      setError(result.message); // Muestra el mensaje de error si el login falla
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 400,
        margin: "auto",
        padding: 3,
      }}
    >
      <Typography variant="h5" align="center">
        Iniciar Sesión
      </Typography>
      <TextField
        label="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextField
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained">
        Iniciar Sesión
      </Button>

      {/* Snackbar para mostrar mensajes de error */}
      <Snackbar
        open={!!error}
        message={error}
        autoHideDuration={3000}
        onClose={() => setError("")}
      />
    </Box>
  );
}

export default LoginForm;
