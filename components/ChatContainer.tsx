"use client"

import type React from "react"
import ChatBubble from "./ChatBubble"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatContainerProps {
  messages: Message[]
  chatEndRef: React.RefObject<HTMLDivElement>
  loading: boolean
}

export default function ChatContainer({ messages, chatEndRef, loading }: ChatContainerProps) {
  return (
    <div className="chat-container">
      <div className="chat-content">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}

        {loading && (
          <div className="loading-bubble">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <style jsx>{`
        .chat-container {
          flex: 1;
          display: flex;
          overflow: hidden;
          background: linear-gradient(135deg, #ffe0f0, #ffffff);
        }

        .chat-content {
          flex: 1;
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scroll-behavior: smooth;
        }

        .chat-content::-webkit-scrollbar {
          width: 6px;
        }

        .chat-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-content::-webkit-scrollbar-thumb {
          background: #e5e5e5;
          border-radius: 3px;
        }

        .chat-content::-webkit-scrollbar-thumb:hover {
          background: #d0d0d0;
        }

        .loading-bubble {
          display: flex;
          justify-content: flex-start;
          animation: fadeInUp 0.4s ease-out;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e5e5e5;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ff74b1;
          animation: typingBounce 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes typingBounce {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .chat-content {
            padding: 16px;
            gap: 10px;
          }
        }

        @media (max-width: 480px) {
          .chat-content {
            padding: 12px;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  )
}
