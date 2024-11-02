import { Box, Container } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <Router>
      <NavBar />
      <Container
        maxWidth={false}
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          sx={{ flexGrow: 1, mb: 2 }} // Margen inferior para separar del footer
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ProductList />} />
            <Route path="/productos/:id" element={<ProductDetails />} />
            <Route path="/carrito" element={<Cart />} />
          </Routes>
        </Box>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
