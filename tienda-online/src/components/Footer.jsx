import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "primary.main",
        color: "white",
        textAlign: "center",
        position: "relative",
        bottom: 0,
        width: "100%",
        margin: 0,
        left: 0,
      }}
    >
      <Typography variant="body1" component="div">
        &copy; 2024 Tienda Online
      </Typography>
      <Typography variant="body2" component="div">
        Todos los derechos reservados
      </Typography>
    </Box>
  );
}

export default Footer;
