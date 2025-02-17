"use client";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DoctorList from "../components/DoctorList";
import DocChat from "../components/DocChat";

const MainComponent = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-screen">
      <div
        className={`w-full md:w-1/4 h-full md:overflow-y-auto ${
          selectedUser ? "hidden md:block" : "block"
        }`}
      >
        <DoctorList onSelectUser={setSelectedUser} currentUser={currentUser} />
      </div>
      <div
        className={`w-full md:w-3/4 h-full flex flex-col ${
          selectedUser ? "block" : "hidden md:block"
        }`}
      >
        {selectedUser ? (
          <DocChat selectedUser={selectedUser} currentUser={currentUser} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl">Select a Doctor to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainComponent;
