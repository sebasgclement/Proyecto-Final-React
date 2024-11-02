import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === parseInt(id));

  console.log("ID:", id);
  console.log("Producto encontrado:", product);

  if (!product) {
    return <Typography variant="h6">Producto no encontrado</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6">${product.price}</Typography>
        </CardContent>
        <Button
          size="small"
          variant="contained"
          onClick={() => addToCart(product)}
        >
          Agregar al carrito
        </Button>
      </Card>
    </Box>
  );
}

export default ProductDetails;
