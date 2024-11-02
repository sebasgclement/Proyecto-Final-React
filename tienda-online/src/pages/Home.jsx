import { Box, Typography } from "@mui/material";
import React from "react";

function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // Ocupa toda la altura de la pantalla
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Bienvenidos a Tienda Online
      </Typography>
      <img
        src="./public/mi-tienda-online-belcorp.jpg"
        alt="Tienda online"
        style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }} // Ajustes de estilo para la imagen
      />
    </Box>
  );
}

export default Home;
