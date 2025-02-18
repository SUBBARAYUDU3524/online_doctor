"use client";
import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import Chat from "../components/Chat";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AiOutlineArrowLeft } from "react-icons/ai";

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
        className={`w-full lg:w-1/4 h-full lg:block ${
          showContacts ? "block" : "hidden"
        }`}
      >
        <UsersList
          onSelectUser={(user) => {
            setSelectedUser(user);
            setShowContacts(false); // Hide contacts on user select
          }}
          currentUser={currentUser}
        />
      </div>

      {/* Chat Screen */}
      <div
        className={`w-full lg:w-3/4 h-full flex flex-col ${
          selectedUser ? "block" : "hidden lg:block"
        }`}
      >
        {selectedUser ? (
          <>
            {/* Back Arrow and Text */}
            {/* Back button for mobile screens */}
            <div className="flex items-center p-4 bg-gray-300 lg:hidden">
              <button
                onClick={handleBackClick}
                className={`lg:hidden mr-4 text-xl`}
              >
                <AiOutlineArrowLeft />
              </button>
              <h2 className="text-xl text-blue-700">Back to Users</h2>
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
