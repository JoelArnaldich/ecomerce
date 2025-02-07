import React, { useState, useEffect } from "react";
import { Slider, FormGroup, FormControlLabel, Checkbox, Box, Typography } from "@mui/material";
import { fetchProducts } from "../services/productService";

const SidebarFilters = ({ setFilteredProducts }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const products = await fetchProducts();
      const uniqueCategories = [...new Set(products.map((p) => p.category))];
      setCategories(uniqueCategories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const applyFilters = async () => {
      const products = await fetchProducts();
      const filtered = products.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1] &&
        (selectedCategories.length === 0 || selectedCategories.includes(product.category))
      );
      setFilteredProducts(filtered);
    };
    applyFilters();
  }, [priceRange, selectedCategories, setFilteredProducts]);

  return (
    <Box sx={{ padding: 2, width: "250px", borderRight: "1px solid #ddd" }}>
      <Typography variant="h6">Filtrar per Preu</Typography>
      <Slider
        value={priceRange}
        onChange={(event, newValue) => setPriceRange(newValue)}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
      />
      <Typography variant="h6" sx={{ marginTop: 2 }}>Categories</Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={<Checkbox checked={selectedCategories.includes(category)}
              onChange={(e) => {
                const newSelected = e.target.checked
                  ? [...selectedCategories, category]
                  : selectedCategories.filter(c => c !== category);
                setSelectedCategories(newSelected);
              }}
            />}
            label={category}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default SidebarFilters;