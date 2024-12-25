// src/context/ProductContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create the ProductContext
export const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);


  console.log(cartItems);
  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://shoping-txma.onrender.com/api/products'); // Replace with your backend API
        setProducts(response.data.products);
      } catch (err) {
        console.log('Failed to fetch products:', err.message);
      }
    };

    fetchProducts();
  }, []);

  // Function to add or remove items from cart (toggle behavior)
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.find((cartItem) => cartItem._id === item._id);

      if (isItemInCart) {
        // If item is already in cart, remove it
        return prevItems.filter((cartItem) => cartItem._id !== item._id);
      } else {
        // Else add the item to cart
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Function to remove an item from the cart explicitly
  const removeFromCart = (_id) => {
    setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem._id !== _id));
  };

  const updateProduct = async (_id, updatedProduct) => {
    try {
      const response = await axios.put(`https://shoping-txma.onrender.com/api/product/${_id}`, updatedProduct);

      setProducts((prev) =>
        prev.map((product) => (product._id === _id ? response.data.product : product))
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };


  return (
    <ProductContext.Provider value={{ products, addToCart, removeFromCart, cartItems, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom Hook to use ProductContext
export const useProducts = () => {
  return useContext(ProductContext);
};
