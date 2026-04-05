import React, { useEffect, useState } from "react";
import "./userlist.css";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import ChatPage from "../../pages/Chatpage";
import { useNavigate } from "react-router-dom";


function UsersList({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "users"),
      where("uid", "!=", currentUser.uid) // excludes logged-in user (from Login.jsx)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const usersArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersArray);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  // Filter users by search input
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase(); // matches Signup.jsx fields
    return (
      fullName.includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="users-container">
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="users-container">
      <h3>Users</h3>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        filteredUsers.map((user) => (
          <div
            className="user-card"
            key={user.id}
            onClick={() => onSelectUser && onSelectUser(user)} // open chat on click
          >
            {/* Avatar using first letter of firstName */}
            <div className="user-avatar">
              {user.firstName?.charAt(0).toUpperCase()}
            </div>

            <div className="user-info">
              {/* firstName & lastName match Signup.jsx */}
              <p>{user.firstName} {user.lastName}</p>
              <span>{user.email}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UsersList;