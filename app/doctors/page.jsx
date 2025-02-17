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
import UserContext from "../UserContext";
import { db } from "../FirebaseConfig";

const ChatApp = () => {
  const [userType, setUserType] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { currentUser } = useContext(UserContext);
  console.log(contacts, "contacts");
  console.log("currentuser", currentUser);
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

  return (
    <div className="h-screen flex">
      <div className="w-1/3 border-r border-gray-300 overflow-y-auto">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => setSelectedContact(contact)}
            className="p-4 cursor-pointer border-b border-gray-300 hover:bg-gray-100"
          >
            {contact.data.userType === "doctor"
              ? contact.data.doctorName
              : contact.data.username}
          </div>
        ))}
      </div>
      <div className="w-2/3 flex flex-col">
        {selectedContact ? (
          <>
            <div className="p-4 border-b border-gray-300 bg-gray-100">
              {selectedContact.data.userType === "doctor"
                ? selectedContact.data.doctorName
                : selectedContact.data.username}
            </div>
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
            <div className="p-4 border-t border-gray-300 flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded mr-2"
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-blue-500 text-white rounded"
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
