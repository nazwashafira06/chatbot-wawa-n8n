"use client"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatBubbleProps {
  message: Message
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === "user"
  const timeStr = message.timestamp.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className={`bubble-wrapper ${isUser ? "user" : "bot"}`}>
      <div className={`bubble ${isUser ? "user-bubble" : "bot-bubble"}`}>
        <p className="bubble-text">{message.text}</p>
        <span className="bubble-time">{timeStr}</span>
      </div>

      <style jsx>{`
        .bubble-wrapper {
          display: flex;
          margin-bottom: 4px;
          animation: fadeInUp 0.4s ease-out;
        }

        .bubble-wrapper.user {
          justify-content: flex-end;
        }

        .bubble-wrapper.bot {
          justify-content: flex-start;
        }

        .bubble {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 20px;
          word-wrap: break-word;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .user-bubble {
          background: #ffd6ea;
          color: #1a1a1a;
          border-radius: 20px 20px 4px 20px;
          box-shadow: 0 2px 8px rgba(255, 116, 177, 0.15);
        }

        .bot-bubble {
          background: #ffffff;
          color: #1a1a1a;
          border: 1px solid #e5e5e5;
          border-radius: 20px 20px 20px 4px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .bubble-text {
          margin: 0;
          font-size: 15px;
          line-height: 1.4;
          letter-spacing: -0.2px;
        }

        .bubble-time {
          font-size: 12px;
          opacity: 0.6;
          margin-top: 2px;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .bubble {
            max-width: 85%;
            padding: 10px 14px;
            font-size: 14px;
          }

          .bubble-text {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .bubble {
            max-width: 90%;
            padding: 10px 12px;
          }

          .bubble-text {
            font-size: 13px;
          }

          .bubble-time {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  )
}
