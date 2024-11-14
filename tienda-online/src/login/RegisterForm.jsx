import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setOpenSnackbar(true);
        setTimeout(() => navigate("/"), 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Error en el registro");
      }
    } catch (error) {
      setError("Error al conectarse al servidor");
      console.error("Error:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleRegister}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "300px",
        margin: "auto",
        mt: 4,
      }}
    >
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
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Nombre"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <TextField
        label="Apellido"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <Button variant="contained" component="label" color="primary">
        Subir Foto de Perfil
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
      </Button>
      <Button variant="contained" color="primary" type="submit">
        Registrarse
      </Button>

      {error && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Usuario registrado
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default RegisterForm;
