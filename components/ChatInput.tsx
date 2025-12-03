"use client"

import type React from "react"
import { useState } from "react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSendMessage(input)
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  return (
    <div className="input-container">
      <div className="input-wrapper">
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik pesan Anda..."
            className="chat-input"
            disabled={disabled}
            autoFocus
          />
          <button type="submit" className="send-button" disabled={disabled || !input.trim()} aria-label="Kirim pesan">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </form>
      </div>

      <style jsx>{`
        .input-container {
          padding: 16px 20px;
          background: #ffffff;
          border-top: 1px solid #f0f0f0;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
        }

        .input-wrapper {
          max-width: 800px;
          margin: 0 auto;
        }

        .input-form {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .chat-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #e5e5e5;
          border-radius: 24px;
          font-size: 15px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          outline: none;
          transition: all 0.3s ease;
          background: #fafafa;
          color: #1a1a1a;
          letter-spacing: -0.2px;
        }

        .chat-input::placeholder {
          color: #999;
        }

        .chat-input:focus {
          border-color: #ff74b1;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(255, 116, 177, 0.1);
        }

        .chat-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .send-button {
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff74b1, #ff5aa7);
          color: #ffffff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-size: 0;
          padding: 0;
          flex-shrink: 0;
        }

        .send-button svg {
          width: 20px;
          height: 20px;
        }

        .send-button:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(255, 116, 177, 0.3);
        }

        .send-button:active:not(:disabled) {
          transform: scale(0.95);
        }

        .send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .input-container {
            padding: 12px 16px;
          }

          .chat-input {
            padding: 10px 14px;
            font-size: 14px;
          }

          .send-button {
            width: 36px;
            height: 36px;
          }

          .send-button svg {
            width: 18px;
            height: 18px;
          }
        }

        @media (max-width: 480px) {
          .input-container {
            padding: 10px 12px;
          }

          .input-form {
            gap: 8px;
          }

          .chat-input {
            padding: 10px 12px;
            font-size: 14px;
            border-radius: 20px;
          }

          .send-button {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </div>
  )
}
