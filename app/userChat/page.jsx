"use client";
import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import Chat from "../components/Chat";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaArrowLeft } from "react-icons/fa"; // You can use any icon for the back arrow

const MainComponent = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showContacts, setShowContacts] = useState(true); // State to control contacts visibility

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

  const handleBackClick = () => {
    setShowContacts(true); // Show contacts screen again when back is clicked
    setSelectedUser(null); // Optionally reset selected user
  };

  return (
    <div className="flex h-screen">
      {/* Contacts List */}
      <div
        className={`w-full md:w-1/4 h-full md:overflow-y-auto ${
          showContacts ? "block" : "hidden"
        }`}
      >
        <UsersList onSelectUser={setSelectedUser} currentUser={currentUser} />
      </div>

      {/* Chat Screen */}
      <div
        className={`w-full md:w-3/4 h-full flex flex-col ${
          selectedUser ? "block" : "hidden md:block"
        }`}
      >
        {selectedUser ? (
          <>
            {/* Back Arrow and Text */}
            <div className="p-4 flex items-center">
              <button
                onClick={handleBackClick}
                className="mr-4 text-xl text-blue-500 flex items-center"
              >
                <FaArrowLeft /> {/* Back arrow */}
                <span className="ml-2">Back to Contacts</span> {/* Text */}
              </button>
            </div>
            <Chat selectedUser={selectedUser} currentUser={currentUser} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainComponent;
