import React, { useState } from "react";
import UsersList from "../components/Chat/userlist"; // ✅ capital U
import Chat from "../components/Chat/Chat";
import "./ChatPage.css";

function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(null);

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