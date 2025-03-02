"use client";

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Define the message type
interface ChatMessage {
  senderId: string;
  receiverId?: string;
  message: string;
  createdAt?: string;
}

// Initialize the Socket.IO client
const socket = io("http://10.0.10.39:5001/api/v1"); // Replace with your server URL

const SingleChat = () => {
  const [userId, setUserId] = useState<string>(""); // Your User ID
  const [otherUserId, setOtherUserId] = useState<string>(""); // Other User's ID
  const [roomId, setRoomId] = useState<string>(""); // Room ID
  const [message, setMessage] = useState<string>(""); // Current Message
  const [messages, setMessages] = useState<ChatMessage[]>([]); // List of Messages

  useEffect(() => {
    console.log("useEffect triggered", { userId, otherUserId });

    if (userId && otherUserId) {
      const room = [userId, otherUserId].sort().join("-"); // Generate unique room ID
      setRoomId(room);
      console.log(`Generated Room ID: ${room}`);

      socket.emit("joinSingleChat", { userId, otherUserId });
      console.log(`Emitted joinSingleChat for room: ${room}`);
    }

    // Listen for incoming messages
    socket.on("receiveMessage", (chatMessage: ChatMessage) => {
      console.log("Received message:", chatMessage);
      setMessages((prevMessages) => [...prevMessages, chatMessage]);
    });

    return () => {
      console.log("Component unmounting, disconnecting socket...");
      socket.disconnect();
    };
  }, [userId, otherUserId]);

  const sendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", {
        senderId: userId,
        receiverId: otherUserId,
        message,
      });
      socket.emit("sendMessage", {
        senderId: userId,
        receiverId: otherUserId,
        message,
      });

      // Optimistic UI update
      const newMessage = {
        senderId: userId,
        message,
        createdAt: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log("Updated messages state:", [...messages, newMessage]);

      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Single Chat</h2>

      {/* User ID Input */}
      <div>
        <label>
          Your User ID:
          <input
            type="text"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              console.log("User ID set to:", e.target.value);
            }}
          />
        </label>
      </div>

      {/* Other User ID Input */}
      <div>
        <label>
          Other User's ID:
          <input
            type="text"
            value={otherUserId}
            onChange={(e) => {
              setOtherUserId(e.target.value);
              console.log("Other User ID set to:", e.target.value);
            }}
          />
        </label>
      </div>

      {/* Messages */}
      <div
        style={{
          marginTop: "20px",
          height: "200px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <ul>
          {messages.map((msg, index) => (
            <li key={index} style={{ margin: "5px 0" }}>
              <b>{msg.senderId === userId ? "You" : "Them"}:</b> {msg.message}
            </li>
          ))}
        </ul>
      </div>

      {/* Message Input */}
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={message}
          placeholder="Type a message"
          onChange={(e) => {
            setMessage(e.target.value);
            console.log("Message input changed:", e.target.value);
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default SingleChat;
