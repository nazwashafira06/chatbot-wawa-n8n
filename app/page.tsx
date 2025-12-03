"use client"

import { useState, useRef, useEffect } from "react"
import ChatContainer from "@/components/ChatContainer"
import ChatInput from "@/components/ChatInput"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Halo! Saya adalah AI Assistant Anda. Bagaimana cara saya membantu Anda hari ini?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    try {
      console.log("[v0] Sending message via API proxy")

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text.trim(),
        }),
      })

      console.log("[v0] API response status:", response.status)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] API response data:", data)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || data.message || data.output || "Maaf, saya tidak dapat memproses permintaan Anda.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("[v0] Fetch error:", error)

      let errorText = "Maaf, terjadi kesalahan. Silakan coba lagi."

      if (error instanceof TypeError) {
        if (error.message.includes("Failed to fetch")) {
          errorText = "❌ Tidak dapat menghubungi server. Pastikan URL n8n benar dan webhook aktif."
        }
      } else if (error instanceof Error) {
        errorText = `❌ Error: ${error.message}`
      }

      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: errorText,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chatbot-container">
      <header className="chatbot-header">
        <div className="header-content">
          <div className="logo">✨</div>
          <h1 className="header-title">My AI Assistant</h1>
        </div>
      </header>

      <ChatContainer messages={messages} chatEndRef={chatEndRef} loading={loading} />

      <ChatInput onSendMessage={handleSendMessage} disabled={loading} />

      <style jsx>{`
        .chatbot-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: linear-gradient(135deg, #ffe0f0, #ffffff);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .chatbot-header {
          padding: 16px 20px;
          background: #ffffff;
          border-bottom: 1px solid #f0f0f0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 12px;
          max-width: 800px;
          margin: 0 auto;
        }

        .logo {
          font-size: 24px;
          line-height: 1;
        }

        .header-title {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
          letter-spacing: -0.3px;
        }

        @media (max-width: 768px) {
          .chatbot-header {
            padding: 12px 16px;
          }

          .header-title {
            font-size: 16px;
          }

          .logo {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  )
}
