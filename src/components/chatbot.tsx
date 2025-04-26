// Enhanced Chatbot Component with All Animations and Image Support
import React, { useState, useEffect, useRef } from 'react';
import { useColorMode, Tooltip } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWindowMinimize, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import supportIcon from '../assets/support.png';
import parse from 'html-react-parser';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [feedback, setFeedback] = useState<{ [key: number]: 'like' | 'dislike' | null }>({});
  const chatOutputRef = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  const suggestedPrompts = [
    'What is Junaid Jamshed?',
    'What is Shalwar Kameez?',
    'Is Shalwar Kameez only for adults?'
  ];

  const toggleChatBox = () => setIsOpen(!isOpen);

  const clearChat = () => {
    const btn = document.getElementById('clear-btn');
    if (btn) {
      btn.style.transition = 'transform 0.2s ease, background-color 0.2s ease';
      btn.style.transform = 'scale(1.2)';
      btn.style.backgroundColor = isDarkMode ? '#ff7961' : '#c62828';
      setTimeout(() => {
        btn.style.transform = 'scale(1)';
        btn.style.backgroundColor = '#f44336';
      }, 200);
    }
    setMessages([]);
    setFeedback({});
  };

  const handleFeedback = (index: number, type: 'like' | 'dislike') => {
    setFeedback(prev => ({
      ...prev,
      [index]: prev[index] === type ? null : type
    }));
  };

  const sendMessage = async () => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    if (userInput.trim()) {
      const newUserMessage: Message = {
        text: userInput,
        sender: 'user',
        timestamp
      };
      setMessages(prev => [...prev, newUserMessage]);
      setUserInput('');
      setTyping(true);

      try {
        const response = await fetch('http://localhost:5170/api/v1/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
       
        const botResponse: Message = {
          text: data.reply || "I'm sorry, I didn't quite catch that.",
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        };
        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        console.error('Error fetching GPT response:', error);
        setMessages(prev => [
          ...prev,
          {
            text: 'Something went wrong. Please try again later.',
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })
          }
        ]);
      } finally {
        setTyping(false);
      }
    }
  };

  useEffect(() => {
    if (chatOutputRef.current) {
      chatOutputRef.current.scrollTop = chatOutputRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const theme = {
    background: isDarkMode ? '#1f1f1f' : '#ffffff',
    border: isDarkMode ? '#444' : '#e0e0e0',
    chatbox: isDarkMode ? '#2c2c2c' : '#f7f9fc',
    input: isDarkMode ? '#2c2c2c' : '#ffffff',
    inputBorder: isDarkMode ? '#555' : '#ccc',
    userText: '#ffffff',
    botText: isDarkMode ? '#f5f5f5' : '#333',
    botBubble: isDarkMode ? '#3a3a3a' : '#d0e4ff'
  };

  return (
    <div>
      {!isOpen && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          style={chatbotIconStyle}
          onClick={toggleChatBox}
        >
          🛍
        </motion.div>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              ...chatbotContainerStyle,
              backgroundColor: theme.background,
              border: `1px solid ${theme.border}`
            }}
          >
            {/* Header */}
            <div style={headerStyle}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={supportIcon} alt="Support" style={supportIconStyle} />
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Milo</div>
                  <div style={{ fontSize: '12px', color: 'lightgreen' }}>● Online</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Tooltip label="Clear Chat" hasArrow placement="top">
                  <motion.button
                    id="clear-btn"
                    onClick={clearChat}
                    style={clearButtonStyle}
                    whileTap={{ scale: 1.1 }}
                  >
                    🗑
                  </motion.button>
                </Tooltip>
                <button onClick={toggleChatBox} style={closeButtonStyle}>
                  <FaWindowMinimize />
                </button>
              </div>
            </div>

            {/* Chatbox */}
            <div style={{ ...chatboxStyle, backgroundColor: theme.chatbox }}>
              {/* Suggested Prompts */}
              <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px' }}>
                {suggestedPrompts.map((prompt, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => {
                      setUserInput(prompt);
                      setTimeout(() => {
                        const enterEvent = new KeyboardEvent('keydown', {
                          key: 'Enter',
                          bubbles: true,
                          cancelable: true,
                        });
                        const input = document.querySelector<HTMLInputElement>('input[type="text"]');
                        input?.dispatchEvent(enterEvent);
                      }, 100);
                    }}
                    style={{
                      fontSize: '12px',
                      backgroundColor: '#e0f2f1',
                      color: '#00796b',
                      border: '1px solid #b2dfdb',
                      padding: '6px 10px',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      transition: '0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b2dfdb'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#e0f2f1'}
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>

              {/* Chat Output */}
              <div ref={chatOutputRef} style={chatOutputStyle}>
                <AnimatePresence>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      style={
                        msg.sender === 'user'
                          ? { ...userMessageStyle, color: theme.userText }
                          : { ...botMessageStyle, backgroundColor: theme.botBubble, color: theme.botText }
                      }
                    >
                      {/* For bot messages, parse the HTML so that images render correctly */}
                      <div>{msg.sender === 'bot' ? parse(msg.text) : msg.text}</div>
                      <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.6 }}>{msg.timestamp}</div>

                      {/* Feedback */}
                      {msg.sender === 'bot' && (
                        <div style={{ marginTop: '6px', fontSize: '16px', display: 'flex', gap: '8px' }}>
                          <motion.button
                            onClick={() => handleFeedback(index, 'like')}
                            whileTap={{ scale: 1.2, rotate: 10 }}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              color: feedback[index] === 'like' ? '#4CAF50' : '#888',
                              fontSize: '18px'
                            }}
                            title="Helpful"
                          >
                            <FaThumbsUp />
                          </motion.button>
                          <motion.button
                            onClick={() => handleFeedback(index, 'dislike')}
                            whileTap={{ scale: 1.2, rotate: -10 }}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              color: feedback[index] === 'dislike' ? '#f44336' : '#888',
                              fontSize: '18px'
                            }}
                            title="Not Helpful"
                          >
                            <FaThumbsDown />
                          </motion.button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {typing && (
                  <div style={{ ...botMessageStyle, fontStyle: 'italic', opacity: 0.7, backgroundColor: theme.botBubble, color: theme.botText, display: 'flex', gap: '4px' }}>
                    <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }}>.</motion.span>
                    <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>.</motion.span>
                    <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}>.</motion.span>
                  </div>
                )}
              </div>

              {/* Input */}
              <div style={{ ...inputContainerStyle, backgroundColor: theme.input }}>
                <motion.input
                  whileFocus={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Enter your message..."
                  style={{
                    ...inputStyle,
                    backgroundColor: theme.input,
                    color: theme.botText,
                    border: `1px solid ${theme.inputBorder}`
                  }}
                />
                <button onClick={sendMessage} style={sendButtonStyle}>📨</button>
              </div>

              {/* Footer */}
              <div style={{ textAlign: 'center', fontSize: '11px', color: '#888', padding: '4px 0' }}>
                Powered by <span style={{ fontWeight: 600, color: '#3399ff' }}>Google Gemini</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- STYLES ---
const chatbotIconStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '80px',
  right: '20px',
  fontSize: '24px',
  backgroundColor: '#1E3A8A',
  color: '#fff',
  padding: '16px',
  borderRadius: '50%',
  cursor: 'pointer',
  textAlign: 'center',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const chatbotContainerStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '140px',
  right: '20px',
  width: '360px',
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Segoe UI, sans-serif',
  overflow: 'hidden',
  zIndex: 999
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  backgroundColor: '#1E3A8A',
  color: '#fff'
};

const closeButtonStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: '#fff',
  fontSize: '18px',
  cursor: 'pointer'
};

const supportIconStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  marginRight: '10px',
  borderRadius: '50%',
  border: '2px solid white'
};

const chatboxStyle: React.CSSProperties = {
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
};

const chatOutputStyle: React.CSSProperties = {
  maxHeight: '260px',
  overflowY: 'auto',
  marginBottom: '10px',
  fontSize: '14px',
  padding: '5px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
};

const userMessageStyle: React.CSSProperties = {
  textAlign: 'right',
  backgroundColor: '#1E3A8A',
  padding: '10px 14px',
  borderRadius: '14px',
  marginBottom: '2px',
  maxWidth: '80%',
  alignSelf: 'flex-end',
  fontSize: '14px'
};

const botMessageStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 14px',
  borderRadius: '14px',
  marginBottom: '2px',
  maxWidth: '80%',
  alignSelf: 'flex-start',
  fontSize: '14px'
};

const inputContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  borderTop: '1px solid #eee',
  padding: '10px',
  borderRadius: '8px'
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: '10px 12px',
  borderRadius: '20px',
  fontSize: '14px',
  outline: 'none'
};

const sendButtonStyle: React.CSSProperties = {
  padding: '10px',
  backgroundColor: '#1E3A8A',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '42px',
  height: '42px'
};

const clearButtonStyle: React.CSSProperties = {
  padding: '6px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px'
};

export default Chatbot;
