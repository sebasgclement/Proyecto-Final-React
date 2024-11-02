import { AppBar, Badge, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Asegúrate de importar useCart

function NavBar() {
  const { cartItems } = useCart(); // Obtén los elementos del carrito

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tienda Online
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Inicio
        </Button>
        <Button color="inherit" component={Link} to="/productos">
          Productos
        </Button>
        <Button color="inherit" component={Link} to="/carrito">
          <Badge badgeContent={cartItems.length} color="secondary">
            {" "}
            {/* Muestra el número de productos */}
            Carrito
          </Badge>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
