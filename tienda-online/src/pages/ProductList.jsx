import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

function ProductList() {
  const { addToCart } = useCart();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Grid2 container spacing={2} justifyContent="center" marginTop="12px">
        {products.map((product) => (
          <Grid2
            item
            xs={12}
            sm={6}
            md={4}
            key={product.id}
            display="flex"
            justifyContent="center"
          >
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6">${product.price}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  component={Link}
                  to={`/productos/${product.id}`}
                >
                  Ver detalles
                </Button>
                <Button onClick={() => handleAddToCart(product)} size="small">
                  Agregar al carrito
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Producto agregado al carrito"
      />
    </>
  );
}

export default ProductList;
