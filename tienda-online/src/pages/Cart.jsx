// src/pages/Cart.jsx
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <Box sx={{ mt: 4 }}>
      {" "}
      {/* Agregamos un margen superior */}
      <Typography variant="h4" component="h2">
        Carrito de Compras
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">El carrito está vacío.</Typography>
      ) : (
        <>
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id} divider>
                <ListItemText
                  primary={item.name}
                  secondary={`Precio: $${item.price}`}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </Button>
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="error"
            onClick={clearCart}
            style={{ marginTop: "10px" }}
          >
            Vaciar Carrito
          </Button>
        </>
      )}
    </Box>
  );
}

export default Cart;
