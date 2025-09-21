import React, { useState, useEffect, useRef } from 'react';
import './Assistant.css';

const AxionTwin = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: "Hi! I’m Axion, your AI assistant. Want to explore Mohammed’s featured projects, tech stack, or advice column?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text) => {
    if (!text.trim()) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages(prev => [...prev, { role: 'user', content: text, time: timestamp }]);
    setInput('');
    setTyping(true);

    try {
      const res = await fetch('http://16.171.23.173:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.reply, time: timestamp }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'bot',
        content: "Sorry, I couldn't reach the server. Please try again later.",
        time: timestamp,
        error: true
      }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="axion-panel active">
      {/* Header */}
      <div className="axion-header">
        <img src="/images/Avatar.jpg" alt="Axion" className="axion-avatar" />
        <span>Axion – AI Assistant</span>
        <button className="axion-close" onClick={onClose}>×</button>
      </div>

      {/* Messages */}
      <div className="axion-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`axion-message ${msg.role === 'user' ? 'user' : 'bot'} ${msg.error ? 'error' : ''}`}
            data-time={msg.time}
          >
            {msg.content}
            {msg.error && (
              <button className="axion-retry" onClick={() => handleSend(msg.content)}>Retry</button>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {typing && (
          <div className="axion-message bot typing" data-time="">
            <span className="typing-label">Thinking...</span>
            <span></span><span></span><span></span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="axion-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
        />
        <button onClick={() => handleSend(input)}>↗ Send</button>
      </div>
    </div>
  );
};

export default AxionTwin;
