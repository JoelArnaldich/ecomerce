import React, { createContext, useState } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
    <ProductsContext.Provider value={{ filteredProducts, setFilteredProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};