import React, { useState, useEffect, useRef, useCallback } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
import { io, Socket } from "socket.io-client";

interface Message {
  conversation: string;
  senderId: string;
  text: string;
  _id?: string;
  createdAt?: string;
}

interface Conversation {
  _id: string;
  members: string[];
}

interface ChatPopupProps {
  userId: string;
  otherUserId: string;
  isBusinessUser: boolean;
}

const ChatPopup: React.FC<ChatPopupProps> = ({
  userId,
  otherUserId,
  isBusinessUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const initializeSocket = useCallback(() => {
    socketRef.current = io("http://localhost:8900", {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttempts: 10,
      transports: ["websocket"],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false
    });

    socketRef.current.on("connect_error", (err: Error) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socketRef.current.on("error", (err: Error) => {
      console.log(`Socket error: ${err.message}`);
    });

    socketRef.current.emit("new-user", userId);

    socketRef.current.on("getMessage", (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    initializeSocket();
  }, [initializeSocket]);

  const fetchConversationAndMessages = useCallback(async () => {
    if (!userId || !otherUserId) return;

    try {
      const conversationResp = await fetch(
        `http://localhost:5000/api/conversation/our/${userId}/${otherUserId}`
      );
      const conversationData = await conversationResp.json();
      setConversation(conversationData);
      const messagesResp = await fetch(
        `http://localhost:5000/api/messages/${conversationData?._id}`
      );
      const messagesData = await messagesResp.json();
      setMessages(messagesData);
    } catch (error) {
      console.error("Error fetching conversation or messages", error);
    }
  }, [userId, otherUserId]);

  useEffect(() => {
    if (isOpen) {
      fetchConversationAndMessages();
    }
  }, [isOpen, fetchConversationAndMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (inputMessage.trim() && conversation) {
      const newMessage = {
        conversationId: conversation?._id,
        senderId: userId,
        text: inputMessage?.trim(),
      };

      socketRef.current?.emit("sendMessage", {
        senderId: userId,
        receiverId: otherUserId,
        text: inputMessage,
      });

      try {
        const response = await fetch("http://localhost:5000/api/messages/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        });
        const data = await response.json();
        if (response.ok) {
          setMessages((prevMessages) => [...prevMessages, data]);
          setInputMessage("");
        }
      } catch (error) {
        console.error("Error sending message", error);
      }
    }
  }, [inputMessage, conversation, userId, otherUserId]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="fixed bottom-4 right-4">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors"
        >
          Chat
        </button>
      )}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 flex flex-col h-[32rem]">
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <RiCloseLargeFill size={20} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto px-2 py-1 space-y-3">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`flex ${
                  message?.senderId === userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message?.senderId === userId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p>{message.text}</p>
                  <span className="text-xs opacity-75 mt-1 block">
                    {message.createdAt && formatTime(message?.createdAt)}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-grow p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
              >
                <IoSend size={20} />
              </button>
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <FiPaperclip size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;