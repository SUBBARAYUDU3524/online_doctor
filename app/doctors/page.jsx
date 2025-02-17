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
import { db } from "../FirebaseConfig";
import ThemeContext from "../ThemeContext";

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
  const { theme } = useContext(ThemeContext); // Access the theme context

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
    if (userType === "user") {
      const unsubscribe = onSnapshot(collection(db, "doctors"), (snapshot) => {
        setContacts(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
      return () => unsubscribe();
    } else if (userType === "doctor" && currentUser && currentUser?.uid) {
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
      await setDoc(doc(db, "conversations", conversationId), {
        userId: userType === "user" ? currentUser.uid : selectedContact.id,
        doctorId: userType === "doctor" ? currentUser.uid : selectedContact.id,
        updatedAt: new Date(),
      });
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
    setIsChatOpen(true); // Open the chat view on contact click
  };

  const handleBackClick = () => {
    setSelectedContact(null);
    setIsChatOpen(false); // Close the chat view and show contacts
  };

  return (
    <div
      className={`h-screen flex flex-col md:flex-row ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-white to-blue-200 text-gray-900"
      }`}
    >
      {/* Contact List for Desktop */}
      <div
        className={`w-full md:w-1/3 border-b md:border-r border-gray-300 overflow-y-auto md:block ${
          isChatOpen ? "hidden" : ""
        }`}
      >
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => handleContactClick(contact)}
            className={`p-4 cursor-pointer border-b border-gray-300 hover:bg-gray-100 flex items-center ${
              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full  flex items-center justify-center text-white font-bold mr-4 ${
                theme === "dark" ? "bg-gray-600" : "bg-gray-300"
              }`}
            >
              {getInitials(
                contact.data.userType === "doctor"
                  ? contact.data.doctorName
                  : contact.data.username
              )}
            </div>
            <span>
              {contact.data.userType === "doctor"
                ? contact.data.doctorName
                : contact.data.username}
            </span>
          </div>
        ))}
      </div>

      {/* Chat Screen */}
      <div className="w-full md:w-2/3 flex flex-col">
        {selectedContact ? (
          <>
            {/* Back Button on Mobile */}
            <div className="md:hidden p-4 flex items-center">
              <button
                onClick={handleBackClick}
                className={`text-xl flex items-center ${
                  theme === "dark" ? "text-blue-400" : "text-blue-500"
                }`}
              >
                <AiOutlineArrowLeft className="mr-2" />
                Back to Contacts
              </button>
            </div>

            {/* Chat Header */}
            <div
              className={`p-4 border-b border-gray-300 flex items-center ${
                theme === "dark"
                  ? "bg-gray-700"
                  : "bg-gradient-to-br from-white to-blue-200 "
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                  theme === "dark" ? "bg-gray-600" : "bg-gray-300"
                }`}
              >
                {getInitials(
                  selectedContact.data.userType === "doctor"
                    ? selectedContact.data.doctorName
                    : selectedContact.data.username
                )}
              </div>
              <span className="text-xl font-semibold">
                {selectedContact.data.userType === "doctor"
                  ? selectedContact.data.doctorName
                  : selectedContact.data.username}
              </span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    msg.senderId === currentUser.uid
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded ${
                      msg.senderId === currentUser.uid
                        ? "bg-blue-500 text-white"
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
              className={`p-4 border-t border-gray-300 flex ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className={`flex-1 p-2 border border-gray-300 rounded mr-2 ${
                  theme === "dark" ? "bg-gray-700" : "bg-white"
                }`}
              />
              <button
                onClick={sendMessage}
                className={`p-2 ${
                  theme === "dark" ? "bg-blue-500" : "bg-blue-500"
                } text-white rounded`}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            Select a contact to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
