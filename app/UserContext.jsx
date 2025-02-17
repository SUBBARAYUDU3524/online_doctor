"use client";

import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./FirebaseConfig";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]); // New state for cart items
  const [projectDetails, setProjectDetails] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  // Function to add item to cart
  const addItemToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  // Function to remove item from cart
  const removeItemFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  console.log(currentUser);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        projectDetails,
        setProjectDetails,
        cartItems,
        addItemToCart,
        removeItemFromCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
