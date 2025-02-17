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
  doc,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/app/FirebaseConfig";

const DoctorChat = ({ params }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      setDoctorId(unwrappedParams.doctorId);
    };

    unwrapParams();
  }, [params]);

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
    if (doctorId) {
      const fetchDoctorDetails = async () => {
        const doctorDocRef = doc(db, "doctors", doctorId);
        const doctorDoc = await getDoc(doctorDocRef);
        if (doctorDoc.exists()) {
          const doctorData = doctorDoc.data();
          setDoctorDetails(doctorData);
          console.log("Doctor Details:", doctorData);
        } else {
          console.log("No such doctor!");
        }
      };

      fetchDoctorDetails();
    }
  }, [doctorId]);

  useEffect(() => {
    if (user && doctorId) {
      const q = query(
        collection(db, "chats"),
        where("participants", "array-contains", user.uid)
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

  const getDefaultProfileImage = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random`;
  };

  return (
    <div className="flex flex-col h-screen">
      {doctorDetails && (
        <div className="flex items-center p-4 bg-gray-200 border-b border-gray-300">
          <img
            src={
              doctorDetails.profileImage ||
              getDefaultProfileImage(doctorDetails.doctorName)
            }
            alt={doctorDetails.doctorName}
            className="h-12 w-12 rounded-full mr-4"
          />
          <div>
            <div className="text-lg font-bold">{doctorDetails.doctorName}</div>
            <div className="text-sm text-gray-600">
              {doctorDetails.specialization}
            </div>
          </div>
        </div>
      )}
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
