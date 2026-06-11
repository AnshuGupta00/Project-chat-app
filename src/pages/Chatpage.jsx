import React, { useState } from "react";
import { UserPresence } from "./UserPresence"; // ✅ matches export from UserPresence.jsx
import UsersList from "../components/Chat/userlist"; // ✅ capital U in UsersList to match component name
import Chat from "../components/Chat/Chat";
import { auth } from "../firebase"; // ✅ import auth to get current user
import "./Chatpage.css";

function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const currentUser= auth.currentUser; // Assuming you have a way to get the current user
  UserPresence(currentUser?. uid);// ✅ pass the current user's UID to UserPresence


  return (
    <div className="chatpage-container">
      {/* Left Side - Users List */}
      <div className="chatpage-sidebar">
        <UsersList onSelectUser={setSelectedUser} /> {/* ✅ matches import */}
      </div>

      {/* Right Side - Chat Window */}
      <div className="chatpage-main">
        <Chat selectedUser={selectedUser} />
      </div>
    </div>
  );
}

export default ChatPage;