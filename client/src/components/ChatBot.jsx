import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import API_URL from '../api';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I help you with your containers today?', sender: 'bot' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { text: userInput, sender: 'user' }];
    setMessages(newMessages);
    setUserInput('');
    setIsTyping(true);

    try {
      const res = await fetch(`${API_URL}/mcp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await res.json();
      setIsTyping(false);
      setMessages([...newMessages, { text: data.reply || 'No response from server', sender: 'bot' }]);
    } catch (error) {
      setIsTyping(false);
      setMessages([...newMessages, { text: 'Server error. Please try again.', sender: 'bot' }]);
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`chatbot ${isMinimized ? 'minimized' : ''}`}>
      <div className="chat-header" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="header-content">
          <div className="bot-avatar">🤖</div>
          <div className="header-text">
            <h3>Docker Assistant</h3>
            <span className="status-indicator">● Online</span>
          </div>
        </div>
        <button className="minimize-btn">
          {isMinimized ? '▲' : '▼'}
        </button>
      </div>

      {!isMinimized && (
        <>
          <div className="chat-window">
            {messages.map((msg, idx) => (
              <div key={idx} className={`msg ${msg.sender}`}>
                <div className="msg-content">{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="msg bot typing-indicator">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about your containers..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} disabled={!userInput.trim() || isTyping}>
              <span className="send-icon">➤</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;
