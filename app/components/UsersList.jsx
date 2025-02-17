"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";

const UsersList = ({ onSelectUser, currentUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!currentUser) return;

      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);

      const usersList = usersSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((user) => user.id !== currentUser.uid); // Exclude current user

      setUsers(usersList);
    };

    fetchUsers();
  }, [currentUser]);

  const getLastSeen = (lastSeen) => {
    if (!lastSeen) return "Offline";
    const secondsAgo = (new Date() - lastSeen.toDate()) / 1000;
    if (secondsAgo < 60) return "Online";
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) return `${minutesAgo} min ago`;
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `${hoursAgo} hr ago`;
    const daysAgo = Math.floor(hoursAgo / 24);
    return `${daysAgo} days ago`;
  };

  return (
    <div className="h-full p-4 hidden md:block lg:block">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <ul className="h-full md:overflow-y-auto">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-2 cursor-pointer hover:bg-gray-300 flex items-center"
            onClick={() => onSelectUser(user)}
          >
            <img
              src={
                user.profileImage ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}&background=random`
              }
              alt={user.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <div className="flex items-center">
                {user.username}
                {user.online ? (
                  <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>
                ) : (
                  <span className="ml-2 text-sm text-gray-500">
                    {getLastSeen(user.lastSeen)}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
