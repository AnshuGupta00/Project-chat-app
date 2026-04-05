import React, { useEffect, useState, useRef } from "react";
import {
  collection, addDoc, onSnapshot,
  query, orderBy, serverTimestamp
} from "firebase/firestore";
import { db, auth } from "../../firebase";

function Chat({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef(null);

  const currentUser = auth.currentUser;

  // Create a unique chat room ID for two users
  const getChatId = () => {
    const ids = [currentUser.uid, selectedUser.uid].sort();
    return `${ids[0]}_${ids[1]}`; // always same ID for both users
  };

  // Fetch messages in real-time
  useEffect(() => {
    if (!selectedUser) return;

    const chatId = getChatId();
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [selectedUser]);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const chatId = getChatId();

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: newMessage,
      senderId: currentUser.uid,
      senderName: currentUser.displayName || "User",
      createdAt: serverTimestamp(),
    });

    setNewMessage("");
  };

  // Send on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  if (!selectedUser) {
    return (
      <div className="chat-placeholder">
        <p>Select a user to start chatting 💬</p>
      </div>
    );
  }
  
  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-avatar">
          {selectedUser.firstName?.charAt(0).toUpperCase()}
        </div>
        <h3>{selectedUser.firstName} {selectedUser.lastName}</h3>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.senderId === currentUser.uid ? "sent" : "received"}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
export default Chat;