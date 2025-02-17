"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const DoctorChat = ({ params }) => {
  const { doctorId } = params;
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (user && doctorId) {
      const q = query(
        collection(db, "chats"),
        where("participants", "array-contains", user.uid),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const chatMessages = querySnapshot.docs.map((doc) => doc.data());
        setMessages(chatMessages);
      });

      return () => unsubscribe();
    }
  }, [user, doctorId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    await addDoc(collection(db, "chats"), {
      senderId: user.uid,
      receiverId: doctorId,
      message,
      timestamp: serverTimestamp(),
      participants: [user.uid, doctorId],
    });

    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              msg.senderId === user.uid
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <form
        onSubmit={sendMessage}
        className="p-4 border-t border-gray-300 flex"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
          placeholder="Type a message"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default DoctorChat;
