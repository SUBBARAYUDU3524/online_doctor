"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  onSnapshot,
  doc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "../FirebaseConfig";
import ThemeContext from "../ThemeContext";

const Chat = ({ selectedUser, currentUser }) => {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const createOrFetchConversation = async () => {
      if (!selectedUser || !selectedUser.id || !currentUser.uid) {
        console.log("Invalid user data");
        return;
      }

      try {
        const conversationsRef = collection(db, "conversations");
        const q = query(
          conversationsRef,
          where("participants", "array-contains", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);

        let conversation = querySnapshot.docs.find((doc) =>
          doc.data().participants.includes(selectedUser.id)
        );

        if (!conversation) {
          const conversationDoc = await addDoc(conversationsRef, {
            participants: [currentUser.uid, selectedUser.id],
            createdAt: new Date(),
          });

          setConversationId(conversationDoc.id);
        } else {
          setConversationId(conversation.id);
        }

        if (conversation) {
          const messagesRef = collection(
            db,
            `conversations/${conversation.id}/messages`
          );
          const messagesQuery = query(messagesRef, orderBy("createdAt"));

          onSnapshot(messagesQuery, (snapshot) => {
            const messagesList = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setMessages(messagesList);
          });
        }
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    };

    createOrFetchConversation();
  }, [selectedUser, currentUser.uid]);

  useEffect(() => {
    if (selectedUser && selectedUser.id) {
      const userDocRef = doc(db, "users", selectedUser.id);
      updateDoc(userDocRef, { lastSeen: new Date() });
    }
  }, [selectedUser]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !conversationId || isSending) return;

    setIsSending(true);

    try {
      const messagesRef = collection(
        db,
        `conversations/${conversationId}/messages`
      );
      await addDoc(messagesRef, {
        senderId: currentUser.uid,
        text: newMessage,
        createdAt: new Date(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center p-4 bg-gray-300">
        <img
          src={
            selectedUser?.profileImage ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              selectedUser?.username || "User"
            )}&background=random`
          }
          alt={selectedUser?.name || "User"}
          className="w-10 h-10 rounded-full mr-2"
        />
        <h2 className="text-xl font-bold">
          {selectedUser?.username || "User"}
        </h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-2 ${
              message.senderId === currentUser.uid ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-2 rounded ${
                message.senderId === currentUser.uid
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {message.text}
              <div className="text-xs text-gray-500 mt-1">
                {new Date(message.createdAt.toDate()).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-gray-100 sticky bottom-0">
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={isSending}
        />
        <button
          className="mt-2 p-2 bg-blue-500 text-white rounded"
          onClick={sendMessage}
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
