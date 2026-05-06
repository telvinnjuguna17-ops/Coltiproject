import React, { useState, useRef, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Inter:wght@300;400;500&display=swap');

  .chat-page {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    background: #000;
    font-family: 'Inter', sans-serif;
    padding: 100px 20px 60px;
    box-sizing: border-box;
  }

  /* ── Chat window ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .chat-window {
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: column;
    animation: fadeUp 0.5s ease;
  }

  /* ── Header ── */
  .chat-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
  }
  .chat-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 0 30px rgba(255,255,255,0.15);
  }
  .chat-avatar svg { width: 24px; height: 24px; }
  .chat-header-name {
    font-family: 'Rajdhani', sans-serif;
    font-size: 1.4em;
    font-weight: 700;
    color: #fff;
    letter-spacing: 2px;
    text-transform: uppercase;
    line-height: 1;
  }
  .chat-header-status {
    font-size: 0.72em;
    color: #3d3;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
  }
  .chat-header-status::before {
    content: '';
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #3d3;
    animation: pulse 2s ease infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  /* ── Divider ── */
  .chat-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, #222, transparent);
    margin-bottom: 32px;
  }

  /* ── Messages ── */
  .chat-messages {
    display: flex;
    flex-direction: column;
    gap: 28px;
    margin-bottom: 40px;
  }

  .chat-msg {
    display: flex;
    flex-direction: column;
    animation: msgIn 0.3s ease;
  }
  @keyframes msgIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .chat-msg.user { align-items: flex-end; }
  .chat-msg.bot  { align-items: flex-start; }

  .chat-sender {
    font-size: 0.68em;
    color: #333;
    margin-bottom: 8px;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    font-weight: 700;
  }
  .chat-msg.user .chat-sender { color: #555; }

  /* Bot messages — large glowing text */
  .chat-msg.bot .chat-bubble {
    font-size: 1.05em;
    line-height: 1.85;
    color: #ccc;
    font-weight: 300;
    max-width: 100%;
    white-space: pre-wrap;
    word-break: break-word;
    text-shadow: 0 0 40px rgba(255,255,255,0.08);
    border-left: 2px solid #1e1e1e;
    padding-left: 20px;
  }

  /* User messages — pill bubble */
  .chat-msg.user .chat-bubble {
    background: #fff;
    color: #000;
    font-size: 0.9em;
    font-weight: 500;
    padding: 12px 20px;
    border-radius: 40px;
    max-width: 60%;
    line-height: 1.5;
    box-shadow: 0 0 20px rgba(255,255,255,0.08);
  }

  /* ── Typing indicator ── */
  .typing-wrap {
    display: flex;
    align-items: center;
    gap: 6px;
    padding-left: 22px;
    margin-bottom: 28px;
  }
  .typing-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #333;
    animation: typingBounce 1.2s ease infinite;
  }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typingBounce {
    0%, 80%, 100% { transform: translateY(0); background: #333; }
    40% { transform: translateY(-5px); background: #888; }
  }

  /* ── Error ── */
  .chat-error {
    font-size: 0.78em;
    color: #f87171;
    margin-bottom: 16px;
    padding-left: 22px;
  }

  /* ── Input area ── */
  .chat-input-area {
    display: flex;
    gap: 10px;
    align-items: center;
    border-top: 1px solid #111;
    padding-top: 24px;
    position: sticky;
    bottom: 0;
    background: #000;
    padding-bottom: 10px;
  }
  .chat-input {
    flex: 1;
    height: 48px;
    background: rgba(255,255,255,0.03);
    border: 1.5px solid #1e1e1e;
    border-radius: 40px;
    font-size: 0.9em;
    color: #fff;
    padding: 0 20px;
    outline: none;
    font-family: 'Inter', sans-serif;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .chat-input::placeholder { color: #333; }
  .chat-input:focus {
    border-color: #444;
    box-shadow: 0 0 0 3px rgba(255,255,255,0.03);
  }
  .chat-input:disabled { opacity: 0.4; cursor: not-allowed; }

  .chat-send-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 0 20px rgba(255,255,255,0.1);
  }
  .chat-send-btn:hover {
    background: #ddd;
    transform: scale(1.06);
    box-shadow: 0 0 30px rgba(255,255,255,0.2);
  }
  .chat-send-btn:active { transform: scale(0.95); }
  .chat-send-btn:disabled { opacity: 0.3; cursor: not-allowed; transform: none; box-shadow: none; }
  .chat-send-btn svg { width: 16px; height: 16px; margin-left: 2px; }
`;

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm Coltibot, your restored vehicle assistant. Ask me anything about our classic cars, restoration process, pricing, or availability." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages = [...messages, { sender: "user", text }];
    setMessages(newMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      setMessages([...newMessages, { sender: "bot", text: data.response }]);
    } catch (err) {
      setError("Couldn't reach the server. Make sure your backend is running.");
      setMessages([...newMessages, { sender: "bot", text: "Sorry, I'm having trouble connecting right now. Please try again shortly." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="chat-page">
        <div className="chat-window">

          {/* Header */}
          <div className="chat-header">
            <div className="chat-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <div>
              <div className="chat-header-name">Coltibot</div>
              <div className="chat-header-status">Online</div>
            </div>
          </div>

          <div className="chat-divider" />

          {/* Messages — all visible, no clipping */}
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.sender}`}>
                <span className="chat-sender">
                  {msg.sender === "bot" ? "Coltibot" : "You"}
                </span>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
          </div>

          {/* Typing indicator */}
          {loading && (
            <div className="typing-wrap">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          )}

          {/* Error */}
          {error && <div className="chat-error">{error}</div>}

          <div ref={bottomRef} />

          {/* Input */}
          <div className="chat-input-area">
            <input
              className="chat-input"
              type="text"
              placeholder="Ask about our restored cars..."
              value={input}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="chat-send-btn"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#000" stroke="none" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
