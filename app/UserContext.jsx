"use client";

import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "./FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]); // New state for cart items
  const [projectDetails, setProjectDetails] = useState();
  const [userType, setUserType] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userDocRef = doc(db, "users", user.uid);
        const doctorDocRef = doc(db, "doctors", user.uid);

        const userDocSnap = await getDoc(userDocRef);
        const doctorDocSnap = await getDoc(doctorDocRef);

        if (userDocSnap.exists()) {
          setUserType("user");
        } else if (doctorDocSnap.exists()) {
          setUserType("doctor");
        } else {
          setUserType(null);
        }
      } else {
        setCurrentUser(null);
        setUserType(null);
      }
    });

    return () => unsubscribe();
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
        userType,
        setUserType,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
