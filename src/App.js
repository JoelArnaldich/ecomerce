import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Assegura't d'importar BrowserRouter
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ProductGrid from "./components/ProductGrid";
import SidebarFilters from "./components/SidebarFilters";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import { Box, CssBaseline } from "@mui/material";

const Success = () => <h1>Pagament completat!</h1>;
const Cancel = () => <h1>El pagament s'ha cancel·lat.</h1>;

const App = () => {
  const [filteredProducts, setFilteredProducts] = useState([]); // ✅ Afegim estat per als productes filtrats

  return (
    <Router>  {/* ✅ Assegura't que tot estigui dins de <Router> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Navbar />
        <Routes>  {/* ✅ Routes ha d'estar dins de <Router> */}
          <Route
            path="/"
            element={
              <Box sx={{ display: "flex" }}>
                <SidebarFilters setFilteredProducts={setFilteredProducts} />
                <Box sx={{ flexGrow: 1 }}>
                  <Banner />
                  <ProductGrid filteredProducts={filteredProducts} />
                </Box>
              </Box>
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
        <Footer />
      </Box>
    </Router> 
  );
};

export default App;
