"use client";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserContext from "../UserContext";

const ProtectedRoute = ({ children, allowedUserTypes }) => {
  const router = useRouter();
  const { currentUser, userType } = useContext(UserContext);

  useEffect(() => {
    if (!currentUser || !allowedUserTypes.includes(userType)) {
      router.push("/login");
    }
  }, [currentUser, userType, router, allowedUserTypes]);

  if (!currentUser || !allowedUserTypes.includes(userType)) {
    return null; // Or display a loading spinner
  }

  return children;
};

export default ProtectedRoute;
