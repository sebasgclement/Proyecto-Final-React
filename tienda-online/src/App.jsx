import { Box, Container } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import LoginForm from "./login/LoginForm";
import RegisterForm from "./login/RegisterForm";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
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
            sx={{ flexGrow: 1, mb: 2 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<ProductList />} />
              <Route path="/productos/:id" element={<ProductDetails />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
            </Routes>
          </Box>
        </Container>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
