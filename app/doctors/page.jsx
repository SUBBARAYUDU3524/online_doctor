"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  addDoc,
  orderBy,
  doc,
  setDoc,
} from "firebase/firestore";
import { AiOutlineArrowLeft } from "react-icons/ai"; // For back arrow icon
import UserContext from "../UserContext";
import ThemeContext from "../ThemeContext";
import { db } from "../FirebaseConfig";

// Helper function to get the initials
const getInitials = (name) => {
  const nameArray = name.split(" ");
  const initials = nameArray
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  return initials;
};

const ChatApp = () => {
  const [userType, setUserType] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false); // Track chat screen state

  const { currentUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const determineUserType = async () => {
      if (!currentUser || !currentUser.email) return;

      const userSnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", currentUser.email))
      );
      if (!userSnapshot.empty) {
        setUserType("user");
        return;
      }

      const doctorSnapshot = await getDocs(
        query(
          collection(db, "doctors"),
          where("email", "==", currentUser.email)
        )
      );
      if (!doctorSnapshot.empty) {
        setUserType("doctor");
      }
    };

    determineUserType();
  }, [currentUser]);

  useEffect(() => {
    // If user is a "user", fetch all doctors
    if (userType === "user") {
      const unsubscribe = onSnapshot(collection(db, "doctors"), (snapshot) => {
        setContacts(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
      return () => unsubscribe();
    }
    // If user is a "doctor", fetch all users who have a conversation with this doctor
    else if (userType === "doctor" && currentUser && currentUser?.uid) {
      const conversationsRef = collection(db, "conversations");
      const q = query(
        conversationsRef,
        where("doctorId", "==", currentUser.uid)
      );

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const userIds = snapshot.docs.map((doc) => doc.data().userId);

        if (userIds.length === 0) {
          setContacts([]);
          return;
        }

        const usersQuery = query(
          collection(db, "users"),
          where("uid", "in", userIds)
        );
        const usersSnapshot = await getDocs(usersQuery);

        setContacts(
          usersSnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });

      return () => unsubscribe();
    }
  }, [userType, currentUser]);

  useEffect(() => {
    // Fetch messages for the selected conversation
    if (selectedContact && currentUser && currentUser.uid) {
      const conversationId = getConversationId(
        currentUser.uid,
        selectedContact.id
      );
      const unsubscribe = onSnapshot(
        query(
          collection(db, "messages", conversationId, "chat"),
          orderBy("timestamp")
        ),
        (snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        }
      );
      return () => unsubscribe();
    }
  }, [selectedContact, currentUser]);

  const getConversationId = (uid1, uid2) => {
    return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
  };

  const sendMessage = async () => {
    if (newMessage.trim() !== "" && currentUser && currentUser.uid) {
      const conversationId = getConversationId(
        currentUser.uid,
        selectedContact.id
      );
      // Ensure a conversation document exists
      await setDoc(doc(db, "conversations", conversationId), {
        userId: userType === "user" ? currentUser.uid : selectedContact.id,
        doctorId: userType === "doctor" ? currentUser.uid : selectedContact.id,
        updatedAt: new Date(),
      });
      // Add the message
      await addDoc(collection(db, "messages", conversationId, "chat"), {
        senderId: currentUser.uid,
        message: newMessage,
        timestamp: new Date(),
      });
      setNewMessage("");
    }
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setIsChatOpen(true); // Open the chat view on mobile
  };

  const handleBackClick = () => {
    setSelectedContact(null);
    setIsChatOpen(false); // Go back to contact list on mobile
  };

  // (A) SIDEBAR COMPONENT
  const renderSidebar = () => {
    return (
      <div
        className={`flex flex-col w-full md:w-1/3 h-full lg:w-full lg:mr-3 ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        {/* (1) Current User Profile at top */}
        <div
          className={`flex items-center p-4 border-b border-gray-300 ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          {/* If you have a photo URL for the current user, place it here */}
          <div
            className={`w-12 h-12 rounded-full mr-3 flex items-center justify-center text-white font-bold ${
              theme === "dark" ? "bg-gray-500" : "bg-gray-400"
            }`}
          >
            {getInitials(currentUser?.displayName || "User")}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg">
              {currentUser?.displayName || currentUser?.email || "User"}
            </span>
            <span className="text-sm text-gray-600">
              {userType === "doctor" ? "Doctor" : "User"}
            </span>
          </div>
        </div>

        {/* (2) Search Bar */}
        <div className="p-2 border-b border-gray-300">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full p-2 rounded outline-none border text-sm"
          />
        </div>

        {/* (3) Contact List */}
        <div className="flex-1 overflow-y-auto">
          {contacts.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No Contacts</div>
          ) : (
            contacts.map((contact) => {
              const displayName =
                contact.data.userType === "doctor"
                  ? contact.data.doctorName
                  : contact.data.username;
              return (
                <div
                  key={contact.id}
                  onClick={() => handleContactClick(contact)}
                  className={`p-4 cursor-pointer flex items-center border-b border-gray-300 ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                      theme === "dark" ? "bg-gray-600" : "bg-gray-400"
                    }`}
                  >
                    {getInitials(displayName)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-lg">{displayName}</span>
                    <span className="text-sm text-gray-500">
                      {contact.data.specialization &&
                        `${contact.data.specialization} specialist`}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  // (B) CHAT PANEL COMPONENT
  const renderChatPanel = () => {
    if (!selectedContact) {
      return (
        <div
          className={`flex-1 flex items-center justify-center min-h-screen ${
            theme === "dark" ? "bg-gray-900" : "bg-white"
          }`}
        >
          Select a contact to start chatting
        </div>
      );
    }

    const contactDisplayName =
      selectedContact.data.userType === "doctor"
        ? selectedContact.data.doctorName
        : selectedContact.data.username;

    return (
      <div className="flex flex-col w-full h-full">
        {/* Chat Header */}
        <div
          className={`p-4 border-b border-gray-300 flex items-center justify-between ${
            theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100"
          }`}
        >
          {/* Back button for mobile screens */}
          <div className="flex items-center">
            <button
              onClick={handleBackClick}
              className={`md:hidden mr-4 text-xl ${
                theme === "dark" ? "text-blue-300" : "text-blue-600"
              }`}
            >
              <AiOutlineArrowLeft />
            </button>

            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                theme === "dark" ? "bg-gray-600" : "bg-gray-400"
              }`}
            >
              {getInitials(contactDisplayName)}
            </div>
            <span className="font-semibold text-lg">{contactDisplayName}</span>
          </div>
          {/* Optional icons could go on the right side (like WhatsApp) */}
        </div>

        {/* Messages Area */}
        <div
          className={`flex-1 overflow-y-auto p-4 ${
            theme === "dark" ? "bg-gray-900" : "bg-white"
          }`}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 flex ${
                msg.senderId === currentUser.uid
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] md:max-w-md p-2 rounded-lg text-sm ${
                  msg.senderId === currentUser.uid
                    ? "bg-blue-500 text-white"
                    : theme === "dark"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div
          className={`p-3 border-t border-gray-300 flex items-center ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            className={`flex-1 p-2 rounded border text-sm mr-2 outline-none ${
              theme === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white border-gray-300"
            }`}
          />
          <button
            onClick={sendMessage}
            className={`px-4 py-2 rounded text-white ${
              theme === "dark" ? "bg-blue-600" : "bg-blue-500"
            }`}
          >
            Send
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`h-screen w-full flex flex-col md:flex-row ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
    >
      {/* SIDEBAR (Hidden on mobile if chat is open) */}
      <div className={`md:flex ${isChatOpen ? "hidden" : "flex"} h-full`}>
        {renderSidebar()}
      </div>

      {/* CHAT PANEL */}
      <div className="flex-1 h-full">{renderChatPanel()}</div>
    </div>
  );
};

export default ChatApp;
