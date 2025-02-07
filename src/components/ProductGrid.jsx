import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import { Grid, Card, CardMedia, CardContent, Typography, Button, CircularProgress, Box } from "@mui/material";

const ProductGrid = ({ filteredProducts }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {displayProducts.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardMedia component="img" height="200" image={product.imageURL} alt={product.name} sx={{ objectFit: "cover" }} />
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">{product.description}</Typography>
              <Typography variant="h6" sx={{ marginTop: "10px" }}>
                €{product.price}
              </Typography>
              <Button variant="contained" color="primary" sx={{ marginTop: "10px" }}>Comprar ara</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
