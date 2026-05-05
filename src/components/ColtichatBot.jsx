import React, { useState, useRef, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Inter:wght@300;400;500&display=swap');

  .chat-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #000;
    font-family: 'Inter', sans-serif;
    padding: 20px;
    box-sizing: border-box;
  }

  /* ── Orb ring ── */
  .chat-orb-container {
    position: relative;
    width: 560px;
    height: 560px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }
  .chat-orb-container span {
    position: absolute;
    left: 0;
    width: 32px;
    height: 6px;
    background: #222;
    border-radius: 80px;
    transform-origin: 280px;
    transform: rotate(calc(var(--i) * (360deg / 50)));
    animation: orbBlink 3s linear infinite;
    animation-delay: calc(var(--i) * (3s / 50));
  }
  @keyframes orbBlink {
    0%   { background: #fff; }
    25%  { background: #222; }
  }

  /* ── Chat window ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .chat-window {
    position: absolute;
    z-index: 1;
    width: 86%;
    max-width: 380px;
    height: 460px;
    border-radius: 24px;
    background: rgba(8, 8, 8, 0.97);
    border: 1px solid rgba(255,255,255,0.12);
    box-shadow: 0 0 60px rgba(255,255,255,0.04);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: fadeUp 0.5s ease;
  }

  /* ── Header ── */
  .chat-header {
    padding: 16px 20px 14px;
    border-bottom: 1px solid #111;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }
  .chat-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .chat-avatar svg {
    width: 20px;
    height: 20px;
  }
  .chat-header-info {}
  .chat-header-name {
    font-family: 'Rajdhani', sans-serif;
    font-size: 1em;
    font-weight: 700;
    color: #fff;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    line-height: 1.1;
  }
  .chat-header-status {
    font-size: 0.68em;
    color: #3d3;
    letter-spacing: 0.4px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .chat-header-status::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #3d3;
    animation: pulse 2s ease infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  /* ── Messages ── */
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    scrollbar-width: thin;
    scrollbar-color: #1a1a1a transparent;
  }
  .chat-messages::-webkit-scrollbar { width: 4px; }
  .chat-messages::-webkit-scrollbar-track { background: transparent; }
  .chat-messages::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 4px; }

  .chat-msg {
    display: flex;
    flex-direction: column;
    max-width: 82%;
    animation: msgIn 0.25s ease;
  }
  @keyframes msgIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .chat-msg.bot { align-self: flex-start; }
  .chat-msg.user { align-self: flex-end; }

  .chat-bubble {
    padding: 10px 14px;
    border-radius: 18px;
    font-size: 0.83em;
    line-height: 1.6;
    font-weight: 400;
  }
  .chat-msg.bot .chat-bubble {
    background: #111;
    color: #ccc;
    border-bottom-left-radius: 4px;
    border: 1px solid #1e1e1e;
  }
  .chat-msg.user .chat-bubble {
    background: #fff;
    color: #000;
    border-bottom-right-radius: 4px;
    font-weight: 500;
  }

  .chat-sender {
    font-size: 0.62em;
    color: #333;
    margin-bottom: 4px;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    font-weight: 600;
  }
  .chat-msg.user .chat-sender { text-align: right; }

  /* ── Typing indicator ── */
  .typing-bubble {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 12px 16px;
  }
  .typing-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #444;
    animation: typingBounce 1.2s ease infinite;
  }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typingBounce {
    0%, 80%, 100% { transform: translateY(0); background: #333; }
    40% { transform: translateY(-6px); background: #888; }
  }

  /* ── Input area ── */
  .chat-input-area {
    padding: 12px 14px;
    border-top: 1px solid #111;
    display: flex;
    gap: 8px;
    align-items: center;
    flex-shrink: 0;
  }
  .chat-input {
    flex: 1;
    height: 40px;
    background: transparent;
    border: 1.5px solid #222;
    border-radius: 40px;
    font-size: 0.83em;
    color: #fff;
    padding: 0 16px;
    outline: none;
    font-family: 'Inter', sans-serif;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .chat-input::placeholder { color: #333; }
  .chat-input:focus {
    border-color: #555;
    box-shadow: 0 0 0 3px rgba(255,255,255,0.04);
  }
  .chat-input:disabled { opacity: 0.4; cursor: not-allowed; }

  .chat-send-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s, transform 0.15s;
  }
  .chat-send-btn:hover { background: #ddd; transform: scale(1.06); }
  .chat-send-btn:active { transform: scale(0.95); }
  .chat-send-btn:disabled { opacity: 0.3; cursor: not-allowed; transform: none; }
  .chat-send-btn svg {
    width: 16px;
    height: 16px;
    margin-left: 2px;
  }

  /* ── Error toast ── */
  .chat-error {
    font-size: 0.72em;
    color: #f87171;
    text-align: center;
    padding: 4px 10px 8px;
    flex-shrink: 0;
  }
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
        const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      setMessages([...newMessages, { sender: "bot", text: data.response }]);
    } catch (err) {
      setError("Couldn't reach the server. Make sure your backend is running.");
      // Still add a fallback bot message
      setMessages([...newMessages, { sender: "bot", text: "Sorry, I'm having trouble connecting right now. Please try again shortly." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="chat-page">
        <div className="chat-orb-container">
          {Array.from({ length: 50 }, (_, i) => (
            <span key={i} style={{ "--i": i }} />
          ))}

          <div className="chat-window">
            {/* Header */}
            <div className="chat-header">
              <div className="chat-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <div className="chat-header-info">
                <div className="chat-header-name">Coltibot</div>
                <div className="chat-header-status">Online</div>
              </div>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-msg ${msg.sender}`}>
                  <span className="chat-sender">
                    {msg.sender === "bot" ? "Coltibot" : "You"}
                  </span>
                  <div className="chat-bubble">{msg.text}</div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="chat-msg bot">
                  <span className="chat-sender">Coltibot</span>
                  <div className="chat-bubble">
                    <div className="typing-bubble">
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Error */}
            {error && <div className="chat-error">{error}</div>}

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
      </div>
    </>
  );
}
